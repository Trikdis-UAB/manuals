// Builds sp3.json: a sample FLEXi SP3 configuration shaped like POST /v3/api/config/read `data` for the
// app's SP3 configurator (configurators/sp3, type SPDevice in models/types.ts).
//   node fixtures/config/sp3.build.mjs
// Read from the configurator's code (Protegus_v3 origin/master_eu, 2026-11-25), not from a real panel:
// reading the configuration sets up its input list from exactly 8 RS485 slots, 8 keypads and
// 42 wireless devices, and lists up to 64 zones on firmware 1.18+ with a revision ending in 4.
// Values follow the manual's TrikdisConfig screenshots (a panel reporting SP3_1E74, firmware 1.23) so
// the two tabs agree: System Options, Areas, System troubles, Access and Zones. Invented where those
// show nothing. NOT CONFIRMED against a real panel's read: the number of schedules and holidays (16
// each), the users list (40, from "40 control codes" in the manual), the wireless house-ID list.

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

// --- Reporting to CMS (filled when that window is captured)
const channel = (o = {}) => ({ commType: 0, domain: '', port: 0, protocol: 0, siaDcsMode: false, phone: '', key: '', keySia: '', enableEncryption: false, isHexMode: false, ...o });
const reportingCms = {
  reporting: {
    primaryChannel: channel({ commType: 1, domain: 'receiver.example.com', port: 55555 }), backupChannel: channel(), backupChannel2: { phone: '' },
    parallelChannel: channel(), parallelBackupChannel: channel(), parallelBackupChannel2: { phone: '' },
  },
  settings: {
    settings: { primaryAfter: 0, gprsPing: 180, gprsPingEnabled: true, smsPing: 0, smsPingEnabled: false, backupAfterTries: 3,
      dns1: '8.8.8.8', dns2: '8.8.4.4', siaObjectId: '', siaReceiverNr: '', siaLineNr: '', localTimeInSia: false },
    wifiParams: { dhcpMode: true, staticIp: '', subnetMask: '', gateway: '', ssid: '', ssidPass: '' },
    reportingMode: { mainTypeCms: 0, backupTypeCms: 0, backupType2Cms: 0, mainTypeProtegus: 0, backupTypeProtegus: 0, backupType2Protegus: 0, radioT16: false, returnToMain: 0 },
    simParams: { disableSimIndication: false, useDialSmsOverNet: false, disableMobileData: false },
    lanParams: { dhcpMode: true, staticIp: '', subnetMask: '', gateway: '', lanTrouble3: false, lanTrouble4: false },
  },
};

// --- Users & Reporting
const user = (q, o = {}) => ({ queueNo: q, areas: F(AREAS), canArm: false, canDisarm: false, canGetResponse: false, readdressSms: false,
  canRemotePgm: false, name: '', phone: '', code: '', tagCode: '', email: '', ...o });
const usersRep = {
  users: Array.from({ length: USERS }, (_, q) => user(q)),
  protegus: { enableCloud: true, parallelReporting: false, protegusCode: '123456' },
  sms: { commandDone: { answer: '', text: '' }, wrongCode: { answer: '', text: '' }, wrongData: { answer: '', text: '' }, wrongCommand: { answer: '', text: '' } },
};

// --- Modules: 8 keypad slots and 8 RS485 slots, all empty for now.
const modules = {
  keypads: {
    keypadParams: { type: 1, additionalWiegand: false, duressType: 0, quickArm: false, lockoutAfter: 5, lockoutDuration: 5, panicType: 0,
      medicalType: 0, fireType: 0, useFingerprint: false, lowVoltageReader: false, doNotChangeCharset: false, customEntryBeep: false, sixDigitCode: false },
    keypads: Array.from({ length: 8 }, () => ({ sn: '00000000', areas: F(AREAS), type: 0 })),
  },
  rs485: Array.from({ length: 8 }, () => ({ id: 0, sn: '', fw: '', name: '', area: 0 })),
  rs485lan: { dhcpMode: true, staticIp: '', subnetMask: '', gateway: '' },
  rs485pstn: null,
};

// --- Wireless: 42 device slots, empty.
const wireless = {
  devices: Array.from({ length: 42 }, (_, i) => ({ id: i, sn: '', type: 0, group: 0, user: 0, areas: F(AREAS), key3: 0, key4: 0 })),
  houseIds: [0], supervisionTime: 0,
};

// --- Zones (Zones settings tab): zones 1-10 on the panel's 10 I/O terminals (hwType 0, input = terminal),
// in area 1. Definition 2 instant, 6 interior; type 2 EOL, 3 EOL_T. The other 54 are not connected.
const zone = (q, o = {}) => ({ queueNo: q, hwType: 0, name: `Zone ${q + 1}`, input: 0, areas: AREA1(), definition: 2, type: 2,
  chime: false, bypass: true, force: false, cms: true, protegus: true, delay: 400, cid: '130',
  smsForUsersE: F(RECIPIENTS), smsForUsersR: F(RECIPIENTS), callForUsersE: F(RECIPIENTS), callForUsersR: F(RECIPIENTS), eventText: '', restoreText: '', ...o });
const zones = Array.from({ length: 64 }, (_, q) => zone(q, q < 10 ? { input: q + 1 } : {}));
zones[0] = zone(0, { input: 1, type: 3 });
zones[1] = zone(1, { input: 2, definition: 6, cid: '132' });

export const data = {
  systemOptions: {
    systemGeneral,
    partitions: { areaCount: AREAS - 1, areas },
    scheduler, holidays,
    systemTroubles: TROUBLES.map((name, i) => ({ queueNo: i + 1, name, restrictArm: false })),
    access,
  },
  reportingCms, usersRep, modules, wireless, zones,
  outputs: { outSettings: [], actions: [], control: { entryControl: [], paradoxKeypadOutputs: [], keypadOutputTypes: [] }, scheduler: [], thermostats: [] },
  sensors: { sensorType: 0, sensors: [] },
  events: [],
  a1: '', a2: '',
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  fs.writeFileSync(path.join(dir, 'sp3.json'), JSON.stringify({ _comment: 'Generated by sp3.build.mjs; edit that file, not this one.', ...data }) + '\n');
  console.log('wrote sp3.json');
}
