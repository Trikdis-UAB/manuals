// Builds sp3.json: a sample FLEXi SP3 configuration shaped like POST /v3/api/config/read `data` for the
// app's SP3 configurator (configurators/sp3, type SPDevice in models/types.ts).
//   node fixtures/config/sp3.build.mjs
// Read from the configurator's code (Protegus_v3 origin/master_eu, 2026-11-25), not from a real panel:
// reading the configuration sets up its input list from exactly 8 RS485 slots, 8 keypads and
// 42 wireless devices, and lists up to 64 zones on firmware 1.18+ with a revision ending in 4.
// Values follow the manual's TrikdisConfig screenshots (a panel reporting SP3_1E74, firmware 1.23) so
// the two tabs agree: System Options, Areas, System troubles, Access and Zones. Invented where those
// show nothing. NOT CONFIRMED against a real panel's read: the number of schedules and holidays (16
// each), the users list (40, from "40 control codes" in the manual), the wireless house-ID list, the numbers of
// outputs, Set action rows and sensors (16, 16, 8), and the CID codes of the system events after the tenth.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const F = (n) => Array(n).fill(false);
const AREAS = 8, USERS = 40, RECIPIENTS = 8; // 8 areas; SMS and calls go to 8 phone numbers
const AREA1 = () => [true, ...F(AREAS - 1)];

// --- System Options (TrikdisConfig "System Options" window, System general tab)
const systemGeneral = {
  version: 1, objectNumber: 0x0001, objectName: 'SP3 security77',
  testPeriod: 24, testStart: { hour: 13, minute: 30 }, testStartEnabled: true, // 1 day 0 h, at 13:30
  callTimes: 2, clearEventsAfterReset: true, suspendEvents: { seconds: 10, events: 10 },
  charset: 2,                                   // Cyrillic alphabet
  smsAreas: [true, ...F(AREAS - 1)],            // area 1 in test SMS
  restoreEventReporting: 1, eolType: 0,         // 2k2+2k2+4k7
  commPathTestType: 2, commPathTestTime: 1,     // every 1 day
  ledOut: false, timeZone: { hours: 2, minutes: 0 }, daylightSaving: true, acFailureDelay: 300,
  timeServer: 2,                                // GSM modem
  simSettings: { pin: '1234', apn: 'internet', user: '', pass: '', iccidLock: '', preferredOperator: 0 },
};

// Partitions tab: 8 areas. tamperMode 0 silent, 1 audible when armed, 2 always audible; keyswitch 0 level, 1 pulse.
const area = (i, o = {}) => ({ entryTime: 30, exitTime: 30, bellTime: 120, squackOn: false, rearmOn: false, forceArm: false,
  keyswitchMode: 0, tamperMode: 0, smsText: `Area ${i + 1}`, armAfter: 0, ...o });
const areas = Array.from({ length: AREAS }, (_, i) => area(i));
areas[0] = area(0, { entryTime: 10, exitTime: 45, bellTime: 300, tamperMode: 2 });
areas[1] = area(1, { keyswitchMode: 1, tamperMode: 1 });

// Scheduler and Holidays tabs: the TrikdisConfig screenshots show only factory rows (00:00 Disarm; holidays
// enabled on 01.01.2000), so the first rows here show a typical use instead: area 1 armed at 22:00 and
// disarmed at 07:00 on weekdays, skipped on group-1 holidays, and Christmas as a group-1 holiday.
// action 0 disarm, 1 arm; holidayAction 1 ignore on holidays; days Monday first.
const WEEKDAYS = () => [true, true, true, true, true, false, false];
const schedule = (o = {}) => ({ enabled: false, days: F(7), area: 0, hour: 0, minute: 0, action: 0, holidayAction: 0, holidayGroup: 0, notArmed: false, ...o });
const scheduler = Array.from({ length: 16 }, () => schedule());
scheduler[0] = schedule({ enabled: true, days: WEEKDAYS(), hour: 22, action: 1, holidayAction: 1, holidayGroup: 1 });
scheduler[1] = schedule({ enabled: true, days: WEEKDAYS(), hour: 7, action: 0, holidayAction: 1, holidayGroup: 1 });
const holiday = (o = {}) => ({ enabled: true, groups: F(4), start: { year: 2000, month: 1, day: 1 }, stop: { year: 2000, month: 1, day: 1 }, ...o });
const holidays = Array.from({ length: 16 }, () => holiday());
holidays[0] = holiday({ groups: [true, false, false, false], start: { year: 2026, month: 12, day: 24 }, stop: { year: 2026, month: 12, day: 26 } });
// The app shows these names as the panel stores them (System troubles tab).
const TROUBLES = ['AC Fault', 'Battery Trouble', 'Aux Trouble', 'Bell Missing', 'Bell Overcurrent', 'CMS Communication Trouble',
  'RS485 Module Fault', 'Wireless Device Lost', 'Wireless Device Low Battery', 'Fire Loop Trouble', 'Tamper Fault',
  '2-Wire Fire Sensors in Alarm', 'Antimasking Fault'];

// Access tab: the default codes. The app opens as administrator when the installer code differs from the
// code it reads with (123456); permissions 0 editable, 1 read only, 2 hidden.
const access = {
  adminCode: '123456', smsCode: '123456', instCode: '654321',
  installerPermissions: { objectId: true, simCard: true, areas: 0, users: 0, modules: 0, zones: 0, pgms: 0, reporting: 0, events: 0 },
};

// --- Reporting to CMS. Settings and Reporting mode as in the TrikdisConfig screenshot (return to primary
// after 5 min, IP ping 60 s, backup after 3 attempts; main type WiFi, backup SIM). The TrikdisConfig Reporting
// tab shows every channel disabled; here the primary channel goes to a receiver, to show its settings.
// An SP3 has no SMS or phone channel in the app (SP4 only). commType 0 off, 1 TCP/IP, 2 UDP/IP;
// protocol 0 TRK, 1 SIA DC-09_2012; reporting type 0 disabled, 1 SIM, 2 WiFi, 3 LAN (RS485).
const channel = (o = {}) => ({ commType: 0, domain: '', port: 0, protocol: 0, siaDcsMode: false, phone: '', key: '', keySia: '', enableEncryption: false, isHexMode: false, ...o });
const reportingCms = {
  reporting: {
    primaryChannel: channel({ commType: 1, domain: 'receiver.example.com', port: 55555, protocol: 1, siaDcsMode: true, enableEncryption: true, key: '123456', keySia: '0123456789ABCDEF' }),
    backupChannel: channel(), backupChannel2: { phone: '' },
    parallelChannel: channel(), parallelBackupChannel: channel(), parallelBackupChannel2: { phone: '' },
  },
  settings: {
    settings: { primaryAfter: 5, gprsPing: 60, gprsPingEnabled: true, smsPing: 10, smsPingEnabled: false, backupAfterTries: 3,
      dns1: '8.8.8.8', dns2: '1.1.1.1', siaObjectId: '0001', siaReceiverNr: '1', siaLineNr: '1', localTimeInSia: false },
    wifiParams: { dhcpMode: true, staticIp: '0.0.0.0', subnetMask: '0.0.0.0', gateway: '0.0.0.0', ssid: 'Sample-WiFi', ssidPass: 'sample-wifi-pass' },
    reportingMode: { mainTypeCms: 2, backupTypeCms: 1, backupType2Cms: 0, mainTypeProtegus: 2, backupTypeProtegus: 1, backupType2Protegus: 0, radioT16: false, returnToMain: 10 },
    simParams: { disableSimIndication: true, useDialSmsOverNet: true, disableMobileData: false },
    lanParams: { dhcpMode: true, staticIp: '', subnetMask: '', gateway: '', lanTrouble3: false, lanTrouble4: false },
  },
};

// --- Users & Reporting: 40 users (A = the first 8, who also receive SMS and calls). Invented people;
// codes are 4 digits (6 only from firmware 1.24). Tag code 000000000000 = no tag, as TrikdisConfig shows it.
const user = (q, o = {}) => ({ queueNo: q, areas: F(AREAS), canArm: false, canDisarm: false, canGetResponse: false, readdressSms: false,
  canRemotePgm: false, name: '', phone: '', code: '', tagCode: '000000000000', email: '', ...o });
const users = Array.from({ length: USERS }, (_, q) => user(q));
users[0] = user(0, { name: 'John Smith', phone: '+447700900123', email: 'john.smith@example.com', code: '1234', areas: [true, true, ...F(AREAS - 2)],
  canArm: true, canDisarm: true, canRemotePgm: true, canGetResponse: true, readdressSms: true });
users[1] = user(1, { name: 'Emma Jones', phone: '+447700900456', email: 'emma.jones@example.com', code: '5678', areas: AREA1(), canArm: true, canDisarm: true, canGetResponse: true });
users[2] = user(2, { name: 'Cleaner', code: '2468', areas: AREA1(), canArm: true, canDisarm: true });
const usersRep = {
  users,
  protegus: { enableCloud: true, parallelReporting: true, protegusCode: '123456' },
  // Row labels come from the panel; the texts are the defaults on the manual's TrikdisConfig screenshot. The app has
  // only these four; Zone alarm, Zone restore, Output ON and Output OFF are TrikdisConfig-only (models/types.ts).
  sms: { commandDone: { answer: 'Command done', text: 'Command done' }, wrongCode: { answer: 'Wrong password', text: 'Wrong password' },
    wrongData: { answer: 'Wrong data', text: 'Wrong data' }, wrongCommand: { answer: 'Wrong command', text: 'Wrong command' } },
};

// --- Modules. Keypad parameters as in the TrikdisConfig screenshot (Paradox/Protegus keypads, duress
// "0 instead of first digit", quick ARM, lockout after 3 codes for 1 min, panic/medical/fire silent), and one
// FLEXi LCD Button keypad (serial prefix 52). RS485: an RF-LORA receiver and an iO-8 expander.
const keypad = (sn = '00000000', areas = F(AREAS)) => ({ sn, areas, type: 0 });
const modules = {
  keypads: {
    keypadParams: { type: 1, additionalWiegand: false, duressType: 2, quickArm: true, lockoutAfter: 3, lockoutDuration: 1, panicType: 1,
      medicalType: 1, fireType: 1, useFingerprint: false, lowVoltageReader: false, doNotChangeCharset: false, customEntryBeep: false, sixDigitCode: false },
    keypads: [keypad('52001A3C', [true, true, ...F(AREAS - 2)]), ...Array.from({ length: 7 }, () => keypad())],
  },
  rs485: [
    { id: 0x28, sn: '0A13F7', fw: '1.04', name: 'RF-LORA', area: 0, rssi: 92, voltage: 12.1 },
    { id: 0x29, sn: '0B2C51', fw: '1.10', name: 'Garage', area: 0, rssi: 78, voltage: 12.0 },
    ...Array.from({ length: 6 }, () => ({ id: 0, sn: '', fw: '', name: '', area: 0 })),
  ],
  rs485lan: { dhcpMode: true, staticIp: '', subnetMask: '', gateway: '' },
  rs485pstn: null,
};

// --- Wireless: 42 slots. Maximum security devices on the RF-LORA receiver (revision ending in 4): a Corner
// PIR (the device the manual's learning example uses), a magnet, a smoke sensor and a remote control.
// group 1 detectors (each becomes a zone input), group 3 remotes. A free slot is '0', as the app writes it.
const wl = (i, o = {}) => ({ id: i, sn: '0', type: 0, group: 0, user: 0, areas: F(AREAS), key3: 0, key4: 0, ...o });
const PIR_CONFIG = { warning: false, led: true, sleepTime: 10, pir1Sensitivity: 10, pir1Pulses: 3, pir2Sensitivity: 0, pir2Pulses: 0,
  microwaveSensitivity: 0, microwavePulses: 0, antimaskingSensitivity: 0, sirenSoundness: 0, sensitivity: 0 };
const NO_CONFIG = { ...PIR_CONFIG, led: false, sleepTime: 0, pir1Sensitivity: 0, pir1Pulses: 0 };
const devices = Array.from({ length: 42 }, (_, i) => wl(i));
devices[0] = wl(0, { sn: '403117', type: 0x08, group: 1, config: PIR_CONFIG });
devices[1] = wl(1, { sn: '403542', type: 0x03, group: 1, config: NO_CONFIG });
devices[2] = wl(2, { sn: '404018', type: 0x10, group: 1, config: NO_CONFIG });
devices[3] = wl(3, { sn: '405233', type: 0x30, group: 3, user: 1, areas: AREA1(), key3: 0x20, key4: 0x10 }); // key 3 arms, key 4 disarms area 1
const wireless = { devices, houseIds: Array(AREAS).fill(0), supervisionTime: 120 };

// --- Zones (Zones settings tab): zones 1-7 on panel terminals 1-7 (hwType 0, input = terminal), in area 1, as
// in the TrikdisConfig screenshot; terminals 8-10 are outputs (PGM below), so zones 8-10 are not connected.
// Zones 11-13 are the wireless devices (hwType 9, input = wireless slot). Definition 2 instant, 4 fire,
// 5 delay, 6 interior; type 1 NC, 2 EOL, 3 EOL_T.
const zone = (q, o = {}) => ({ queueNo: q, hwType: 0, name: `Zone ${q + 1}`, input: 0, areas: AREA1(), definition: 2, type: 2,
  chime: false, bypass: true, force: false, cms: true, protegus: true, delay: 400, cid: '130',
  smsForUsersE: F(RECIPIENTS), smsForUsersR: F(RECIPIENTS), callForUsersE: F(RECIPIENTS), callForUsersR: F(RECIPIENTS), eventText: '', restoreText: '', ...o });
const zones = Array.from({ length: 64 }, (_, q) => zone(q, q < 7 ? { input: q + 1 } : {}));
zones[0] = zone(0, { input: 1, type: 3 });
zones[1] = zone(1, { input: 2, definition: 6, cid: '132' });
zones[10] = zone(10, { hwType: 9, input: 1, type: 1 });
zones[11] = zone(11, { hwType: 9, input: 2, type: 1, definition: 5, cid: '134' });
zones[12] = zone(12, { hwType: 9, input: 3, type: 1, definition: 4, cid: '110', delay: 2000 });

// --- PGM. Outputs as in the TrikdisConfig screenshot (PGM 1 BELL siren, PGM 2 LED system state, PGM 3 on
// terminal 10 resets fire sensors, the rest remote control, 20 s), plus garden lights on terminal 9 and the
// heating on terminal 8. hwId 0 + hwNumber 11 BELL, 12 LED, 1-10 the terminals. Definition 0 siren,
// 1 remote control, 3 fire sensor reset, 4 system state, 6 thermostat. 16 outputs [to confirm].
const out = (q, o = {}) => ({ queueNo: q, name: `PGM ${q + 1}`, hwId: 0, hwNumber: 0, definition: 1, pulseTime: 20, areas: F(AREAS), cms: false, protegus: false,
  eventText: '', restoreText: '', smsForUsersE: F(RECIPIENTS), smsForUsersR: F(RECIPIENTS), callForUsersE: F(RECIPIENTS), callForUsersR: F(RECIPIENTS), mode: 0, ...o });
const outSettings = Array.from({ length: 16 }, (_, q) => out(q));
outSettings[0] = out(0, { hwNumber: 11, definition: 0, areas: AREA1() });
outSettings[1] = out(1, { hwNumber: 12, definition: 4, areas: AREA1() });
outSettings[2] = out(2, { hwNumber: 10, definition: 3 });
outSettings[3] = out(3, { name: 'Garden lights', hwNumber: 9, definition: 1, protegus: true });
outSettings[4] = out(4, { name: 'Heating', hwNumber: 8, definition: 6 });
// Set action: garden lights on when area 1 is armed, off when it is disarmed. 0xff = an empty row.
// action 0 off, 1 on; factor 6 arm, 7 disarm (factorNumber = area from 0); outputId = output index. 16 rows [to confirm].
const NONE = 0xff;
const action = (o = {}) => ({ enabled: false, outputId: NONE, action: 0, pulseTime: 0, factor: NONE, factorNumber: NONE, startWhen: NONE, floatValue: 0, smsText: '', ...o });
const actions = Array.from({ length: 16 }, () => action());
actions[0] = action({ enabled: true, outputId: 3, action: 1, factor: 6, factorNumber: 0 });
actions[1] = action({ enabled: true, outputId: 3, action: 0, factor: 7, factorNumber: 0 });
// Control: an iButton turns on the garden lights (output 4, numbered from 1) and arms/disarms; utility key 2 of
// a Paradox keypad drives the same output. outputMode 0 pulse; areaAction 3 arm/disarm.
const entry = (o = {}) => ({ enabled: false, code: false, output: 0, outputMode: 0, areaAction: 0, pulseTime: 0, ...o });
const control = { entryControl: [entry({ enabled: true, output: 4, areaAction: 3, pulseTime: 3 }), entry(), entry()],
  paradoxKeypadOutputs: [4, 0, 0, 0, 0], keypadOutputTypes: Array(8).fill(0) };
// Output schedulers (10, from the manual): one on, 19:00-23:00 every day.
const outSchedule = (o = {}) => ({ enabled: false, startHour: 0, startMinute: 0, stopHour: 0, stopMinute: 0, startAtDays: F(7), stopAtDays: F(7), ...o });
const outScheduler = Array.from({ length: 10 }, () => outSchedule());
outScheduler[0] = outSchedule({ enabled: true, startHour: 19, stopHour: 23, startAtDays: Array(7).fill(true), stopAtDays: Array(7).fill(true) });
// Thermostats (4, each with 4 sensor slots): the heating keeps the living room at 21.5 °C. outputNumber from 1;
// mode 0 heat; -500 = not set.
const thermostat = (o = {}) => ({ enabled: false, outputNumber: 0, mode: 0, activeSensor: 0, assignedSensors: [0, 0, 0, 0], assignedTemperatures: [-500, -500, -500, -500], ...o });
const thermostats = [thermostat({ enabled: true, outputNumber: 5, activeSensor: 1, assignedSensors: [1, 0, 0, 0], assignedTemperatures: [21.5, -500, -500, -500] }),
  thermostat(), thermostat(), thermostat()];

// --- Sensors: Dallas 1-Wire (sensorType 0); one temperature sensor on the 1-Wire input. 8 slots [to confirm].
const sensor = (q, o = {}) => ({ queueNo: q, hwType: 0, seqNumber: 0, alarmLow: false, alarmHigh: false, name: '', minTemp: 0, maxTemp: 0,
  serialNumber: '0000000000000000', delay: 0, ...o });
const sensors = Array.from({ length: 8 }, (_, q) => sensor(q));
sensors[0] = sensor(0, { seqNumber: 1, name: 'Living room', minTemp: 5, maxTemp: 30, serialNumber: '28FF6A1B3C160452' });

// --- System events: names are the app's label keys (config_sp3.sections.events.*); periodicTest must be
// second. The first ten names and CID codes are those in the TrikdisConfig screenshot; the rest are the
// standard Contact ID codes [to confirm against a panel].
const EVENTS = [['lowBattery', '302'], ['periodicTest', '602'], ['armDisarm', '401'], ['rs485fault', '333'], ['highTemp', '158'], ['lowTemp', '159'],
  ['sensorLost', '380'], ['gsmJam', '344'], ['aacFault', '301'], ['partialArm', '456'], ['zoneBypass', '570'], ['wlLowBat', '384'],
  ['wlDeviceLost', '381'], ['auxOverCurrent', '312'], ['bellMissing', '321'], ['bellOverCurrent', '322'], ['lowVolt', '302'], ['highVolt', '309'],
  ['remoteArm', '407'], ['automaticArm', '403'], ['stayArm', '441'], ['sleepArm', '441'], ['tamper', '137'], ['duressAlarm', '121'],
  ['lowHumidity', '158'], ['highHumidity', '159'], ['comPathTrouble', '350'], ['fireLoopTrouble', '373'], ['fireAlarm', '110'], ['startIp', '305'],
  ['antimaskAlarm', '388'], ['keyswArm', '409'], ['keyswStay', '409'], ['batteryMissing', '311'], ['pbLora', '120']];
const events = EVENTS.map(([name, cid]) => ({ special: false, name, enabled: true, area: 0, cid, cms: true, protegus: true,
  smsForUsersE: F(RECIPIENTS), smsForUsersR: F(RECIPIENTS), callForUsersE: F(RECIPIENTS), callForUsersR: F(RECIPIENTS), smsTextE: '', smsTextR: '', hasRestore: true }));

export const data = {
  systemOptions: {
    systemGeneral,
    partitions: { areaCount: AREAS - 1, areas },
    scheduler, holidays,
    systemTroubles: TROUBLES.map((name, i) => ({ queueNo: i + 1, name, restrictArm: false })),
    access,
  },
  reportingCms, usersRep, modules, wireless, zones,
  outputs: { outSettings, actions, control, scheduler: outScheduler, thermostats },
  sensors: { sensorType: 0, sensors },
  events,
  a1: '', a2: '',
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  fs.writeFileSync(path.join(dir, 'sp3.json'), JSON.stringify({ _comment: 'Generated by sp3.build.mjs; edit that file, not this one.', ...data }) + '\n');
  console.log('wrote sp3.json');
}
