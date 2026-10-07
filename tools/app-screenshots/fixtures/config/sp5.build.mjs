// Builds sp5.json: a sample SP5 configuration shaped like GET /v3/api/config/read `data`.
//   node fixtures/config/sp5.build.mjs
// Shapes and array lengths follow the app's USB parser (configurators/wired/sp5-communication.service.ts):
// 16 areas, 192 zones, 64 outputs and RS485 modules, 16 keypads, 96 wireless devices, 20 sensors,
// 8 thermostats, 32 groups, 40 blacklist slots, 37 panel events. All values are invented.
// Inferred and unverified against a real SP5: panel-event Contact ID codes (standard codes where one
// exists), keypad serial-number prefixes (52 = LCD, 51 = LED), wireless device settings.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const F = (n) => Array(n).fill(false);
const flags = (n, ...on) => Array.from({ length: n }, (_, i) => on.includes(i));
const HOME = () => flags(16, 0), GARAGE = () => flags(16, 1), BOTH = () => flags(16, 0, 1);
const ADMIN = () => flags(8, 0);

// --- zones: 0 = panel I/O, 1..64 = RS485 module queueNo, 202 = wireless, 203 = keypad input
const zone = (q, o = {}) => ({
  queueNo: q, hwType: 0, input: 0, definition: 2, type: 0, areas: HOME(), cid: 0x130, cms: true, protegus: true,
  smsForUsersE: F(8), smsForUsersR: F(8), delay: 400, reminderTime: 0, inactive: 0, force: false, bypass: true,
  chime: false, intellizone: false, name: `Zone ${q + 1}`, ...o,
});
const zones = Array.from({ length: 192 }, (_, q) => zone(q));
const setZone = (q, o) => { zones[q] = zone(q, o); };
setZone(0, { input: 1, definition: 5, type: 2, cid: 0x134, chime: true, smsForUsersE: ADMIN(), name: 'Front door' });
setZone(1, { input: 2, definition: 6, type: 2, cid: 0x132, name: 'Hall PIR' });
setZone(2, { input: 3, definition: 4, type: 2, cid: 0x110, delay: 2000, bypass: false, smsForUsersE: ADMIN(), smsForUsersR: ADMIN(), name: 'Kitchen smoke' });
setZone(3, { input: 4, definition: 2, type: 2, cid: 0x130, name: 'Living room window' });
setZone(4, { input: 5, definition: 2, type: 2, cid: 0x130, name: 'Bedroom window' });
setZone(5, { hwType: 1, input: 1, definition: 5, type: 2, cid: 0x134, areas: GARAGE(), name: 'Garage door' });
setZone(6, { hwType: 1, input: 2, definition: 6, type: 2, cid: 0x132, areas: GARAGE(), name: 'Garage PIR' });
setZone(7, { hwType: 203, input: 1, definition: 5, type: 2, cid: 0x134, name: 'Back door' });
// Wireless devices take their name and areas from a zone on hwType 202, input = device slot + 1.
setZone(12, { hwType: 202, input: 1, definition: 5, type: 2, cid: 0x134, chime: true, name: 'Terrace door' });
setZone(13, { hwType: 202, input: 2, definition: 6, type: 2, cid: 0x132, name: 'Living room PIR' });
setZone(14, { hwType: 202, input: 3, definition: 0, type: 2, cid: 0x133, areas: BOTH(), name: 'Outdoor siren tamper' });
setZone(15, { hwType: 202, input: 4, definition: 0, type: 2, cid: 0x154, name: 'Boiler room leak' });

// --- outputs (hwId 0 = panel, 1.. = RS485 module; hwNumber = terminal)
const out = (q, o = {}) => ({
  queueNo: q, hwId: 0, hwNumber: 0, definition: 0, mode: 0, pulseTime: 0, smsForUsersE: F(8), cms: false, protegus: false,
  smsForUsersR: F(8), callForUsersE: F(8), callForUsersR: F(8), areas: F(16), schedule: 0, inState: 0, inConfirm: 0,
  zoneInControl: 0, pulseTimeMs: 0, name: '', ...o,
});
const outSettings = Array.from({ length: 64 }, (_, q) => out(q));
outSettings[0] = out(0, { hwNumber: 11, definition: 0, areas: BOTH(), cms: true, protegus: true, name: 'Siren' });
outSettings[1] = out(1, { hwNumber: 12, definition: 1, mode: 1, pulseTime: 3, protegus: true, name: 'Garage gate' });
outSettings[2] = out(2, { hwNumber: 8, definition: 1, protegus: true, name: 'Garden lights' });
outSettings[3] = out(3, { hwId: 1, hwNumber: 3, definition: 1, protegus: true, name: 'Garage light' });
outSettings[4] = out(4, { hwNumber: 7, definition: 6, protegus: true, name: 'Heating' });

// --- sensors (201 = NTC on a panel I/O, 204 = wireless device temperature; seqNumber = I/O or device slot)
const sensor = (q, o = {}) => ({ queueNo: q, hwType: 0, seqNumber: 0, alarmLow: false, alarmHigh: false, port: 0, name: '', delay: 0, minTemp: 0, maxTemp: 0, bConst: 0, ntcR0: 0, ...o });
const sensors = Array.from({ length: 20 }, (_, q) => sensor(q));
sensors[0] = sensor(0, { hwType: 201, seqNumber: 9, alarmLow: true, alarmHigh: true, delay: 60, minTemp: 5, maxTemp: 30, bConst: 3950, ntcR0: 10000, name: 'Living room temperature' });
sensors[1] = sensor(1, { hwType: 204, seqNumber: 1, alarmHigh: true, delay: 60, minTemp: 0, maxTemp: 40, name: 'Hall PIR temperature' });

const thermostats = Array.from({ length: 8 }, (_, i) => ({ enabled: false, outputNumber: 0, mode: 0, hysteresis: 0, activeSensor: 0, assignedSensors: [0], assignedTemperatures: [0], name: `Thermostat ${i + 1}` }));
thermostats[0] = { enabled: true, outputNumber: 7, mode: 0, hysteresis: 1, activeSensor: 1, assignedSensors: [1], assignedTemperatures: [21.5], name: 'Living room heating' };

// --- RS485 modules: iO8 expander and the RF-S8 wireless receiver
const rs485 = Array.from({ length: 64 }, (_, i) => ({ queueNo: i === 63 ? 0 : i + 1, id: 0, group: 0, area: 0, sn: '', name: '', fw: '' }));
rs485[0] = { queueNo: 1, id: 0x29, group: 0, area: 2, sn: '0A1B2C', name: 'Garage iO8', fw: '1.04' };
rs485[1] = { queueNo: 2, id: 0x58, group: 0, area: 0, sn: '1B7C40', name: 'Wireless receiver', fw: '1.02' };

// --- keypads (serial-number prefix sets the model: 52 = LCD, 51 = LED; inferred)
const kp = (sn, name, areas) => ({ sn, areas, type: 1, pgmQueueNo: [0, 0, 0, 0, 0, 0], pgmMode: [0, 0, 0, 0, 0, 0], pgmPulse: [0, 0, 0, 0, 0, 0], sff: '00000000', name });
const keypads = Array.from({ length: 16 }, (_, i) => kp('00000000', `Keypad ${i + 1}`, Array(16).fill(true)));
keypads[0] = kp('52A1C3F0', 'Hall keypad', BOTH());
keypads[1] = kp('51B20417', 'Garage keypad', GARAGE());

// --- wireless devices (group:type pairs from the app's catalog; icons exist in the release)
const noCfg = { warning: false, led: false, antimaskingSensitivity: 0, microwaveSensitivity: 0, microwavePulses: 0, sleepTime: 0, pir1Sensitivity: 0, pir2Sensitivity: 0, pir1Pulses: 0, pir2Pulses: 0, sirenSoundness: 0, sensitivity: 0 };
const devices = Array.from({ length: 96 }, (_, q) => ({ queueNo: q, id: 0, sn: 0, type: 0, group: 0, user: 0, area: 0, key3: 0, key4: 0, config: { ...noCfg } }));
devices[0] = { queueNo: 0, id: 2, sn: 8412173, type: 19, group: 1, user: 0, area: 0, key3: 0, key4: 0, config: { ...noCfg, led: true } };            // Maximum Security Magnet Wireless LV
devices[1] = { queueNo: 1, id: 50, sn: 8412590, type: 20, group: 1, user: 0, area: 0, key3: 0, key4: 0, config: { ...noCfg, led: true, antimaskingSensitivity: 3, microwaveSensitivity: 12, microwavePulses: 2, sleepTime: 180, pir1Sensitivity: 14, pir2Sensitivity: 14, pir1Pulses: 2, pir2Pulses: 2 } }; // VIP Wireless LV
devices[2] = { queueNo: 2, id: 0, sn: 9017344, type: 81, group: 2, user: 0, area: 3, key3: 0, key4: 0, config: { ...noCfg, sirenSoundness: 3 } };      // Siren Wireless LV
devices[3] = { queueNo: 3, id: 0x14, sn: 2712847380, type: 8, group: 9, user: 0, area: 0, key3: 0, key4: 0, config: null };                            // Heyi water leakage

// --- panel events (names and order from the parser; Contact ID codes are standard codes, unverified for SP5)
const NO_RESTORE = ['periodicTest', 'medicalAlarm', 'panicAlarm', 'keyswStay', 'keyswSleep', 'partialArm', 'automaticArm', 'stayArm', 'sleepArm', 'remoteArm', 'duressAlarm', 'autoArmFailed'];
const EVENT_CIDS = {
  lowBattery: '0302', batteryMissing: '0311', aacFault: '0301', periodicTest: '0602', auxOverCurrent: '0312', bellOverCurrent: '0321',
  bellMissing: '0320', tamper: '0137', zoneBypass: '0570', rs485fault: '0333', comPathTrouble: '0350', fireLoopTrouble: '0373',
  fireAlarm: '0110', medicalAlarm: '0100', panicAlarm: '0120', antimaskAlarm: '0380', keyswArm: '0409', keyswStay: '0409',
  keyswSleep: '0409', armDisarm: '0401', partialArm: '0456', automaticArm: '0403', stayArm: '0441', sleepArm: '0441', remoteArm: '0407',
  duressAlarm: '0121', wlLowBat: '0384', wlDeviceLost: '0381', highTemp: '0158', lowTemp: '0159', sensorFault: '0380', lowVolt: '0302',
  highVolt: '0150', lowHumidity: '0150', highHumidity: '0150', autoArmFailed: '0455', zoneOpened: '0130',
};
const DISABLED = new Set(['bellMissing', 'zoneBypass', 'lowHumidity', 'highHumidity', 'lowVolt', 'highVolt']);
const events = Object.keys(EVENT_CIDS).map((name, q) => ({
  queueNo: q, name, enabled: !DISABLED.has(name), partition: 0, cid: EVENT_CIDS[name], cms: true, protegus: name !== 'periodicTest',
  smsForUsersE: ['lowBattery', 'aacFault', 'tamper', 'fireAlarm'].includes(name) ? ADMIN() : F(8),
  smsForUsersR: name === 'lowBattery' ? ADMIN() : F(8), callForUsersE: F(8), callForUsersR: F(8), siaE: 0, siaR: 0, text: '',
  hasRestore: !NO_RESTORE.includes(name),
}));

// --- users (groups and blacklist live in config/read; the user list comes from config/users/read)
const group = (q, o = {}) => ({ queueNo: q, enabled: false, scheduleDeny: false, validFromEnabled: false, validToEnabled: false, rights: { arm: false, disarm: false, pgmDoorControl: false }, areaControl: 0, doorsControl: [0, 0], pgmControl: [0, 0], pgmDial: [0, 0], schedules: [0, 0], validFrom: 0, validUntil: 0, name: '', ...o });
const groups = Array.from({ length: 32 }, (_, q) => group(q));
groups[0] = group(0, { enabled: true, name: 'Family', rights: { arm: true, disarm: true, pgmDoorControl: true }, areaControl: 3, pgmControl: [6, 0], pgmDial: [2, 0] });
groups[1] = group(1, { enabled: true, name: 'Cleaning staff', rights: { arm: true, disarm: true, pgmDoorControl: false }, areaControl: 1 });
// +44 7700 900xxx is the UK range reserved for fiction, so no real number can appear.
const blacklist = Array.from({ length: 40 }, (_, q) => ({ queueNo: q, type: 0, identifier: q === 0 ? '+447700900999' : '' }));

const AREA_DEFAULT = { entryTime1: 30, exitTime: 30, entryTime2: 45, bellTime: 120, squackOn: false, rearmOn: false, keyswitchMode: 0, tamperMode: 0, stayMode: 1, autoArm: 0, autoArmEnabled: false, crossTimer: 20, name: '' };
const areas = Array.from({ length: 16 }, () => ({ ...AREA_DEFAULT, armWithArea: F(16) }));
areas[0] = { ...AREA_DEFAULT, entryTime1: 30, exitTime: 45, entryTime2: 15, bellTime: 180, rearmOn: true, tamperMode: 1, armWithArea: F(16), name: 'Home' };
areas[1] = { ...AREA_DEFAULT, entryTime1: 20, exitTime: 30, entryTime2: 10, bellTime: 120, squackOn: true, stayMode: 0, armWithArea: F(16), name: 'Garage' };

const off = () => ({ commType: 0, domain: '', port: 0, protocol: 0, siaDcsMode: false, key: '' });

export const data = {
  isInstaller: false,
  f: 'screenshot-mode',
  systemOptions: {
    systemGeneral: {
      version: 1, callTimes: 3, timeServer: 12, testStart: { minute: 0, hour: 12 }, testStartEnabled: true, testPeriod: 24,
      suspendEvents: { enabled: true, seconds: 30, events: 3 }, restoreEventReporting: 30, ioTo2wire: false, vibroSensitivity: 0,
      commPathTestTime: 24, commPathTestType: 1, hangUpAfter: 30, charset: 0, smsAreas: [true, true, false, false, false, false, false, false],
      objectNumber: '1234', objectName: 'Sample system', clearEventsAfterReset: false, eolType: 0, tamperNoZone: false,
      daylightSaving: true, timeZone: { minutes: 0, hours: 2 }, acFailureDelay: 300, ntpServerAddress: 'pool.ntp.org',
      configurationTimestamp: Date.UTC(2026, 9, 6, 9, 30),
    },
    systemTroubles: [
      'AC Fault', 'Battery Trouble', 'Aux Trouble', 'Bell Missing', 'Bell Overcurrent', 'CMS Communication Trouble', 'RS485 Module Fault',
      'Wireless Device Lost', 'Wireless Device Low Battery', 'Fire Loop Trouble', 'Tamper Fault', '2-Wire Fire Sensors in Alarm', 'Antimasking fault',
    ].map((name, i) => ({ queueNo: i + 1, name, restrictArm: [1, 6, 7, 9, 10, 11].includes(i) })),
    access: {
      adminCode: '123456', smsCode: '222222', protegusCode: '123456', instCode: '654321',
      installerPermissions: { objectId: true, simCard: true, communications: 0, areasAndZones: 0, accessControl: 0, terminals: 0, devicesAndInterfaces: 0, users: 0, panelEvents: 0, automation: 0, diagnostics: 0 },
    },
    partitions: { enabledAreas: flags(16, 0, 1), areas },
    smsTexts: { zoneAlarm: 'alarm', zoneRestore: 'restore', outputOn: 'on', outputOff: 'off', eventAlarm: 'event', eventRestore: 'event restore', disarm: 'disarmed by', arm: 'armed by', greeting: 'Welcome to the Sample system' },
  },
  reportingCms: {
    reporting: {
      primaryChannel: { commType: 1, domain: 'receiver.example.com', port: 55555, protocol: 6, siaDcsMode: false, key: '0123456789ABCDEF' },
      backupChannel: off(), backupChannel2: { enabled: false, key: '', phone: '' },
      parallelChannel: off(), parallelBackupChannel: off(), parallelBackupChannel2: { enabled: false, key: '', phone: '' },
    },
    settings: {
      settings: { gprsPing: 120, gprsPingEnabled: true, smsPing: 0, smsPingEnabled: false, primaryAfter: 5, backupAfterTries: 3, siaReceiverNr: '1', siaLineNr: '1' },
      reportingMode: { mainTypeCms: 2, backupTypeCms: 1, backupType2Cms: 0, mainTypeCloud: 2, backupTypeCloud: 1, backupType2Cloud: 0, returnToMainCms: 10, returnToMainCloud: 10, enableCloud: true, parallelCloud: true },
      sim: { simCard: { pin: '', apn: 'internet', user: '', pass: '', iccidLock: '', iccidLockEnabled: false, dns1: '8.8.8.8', dns2: '8.8.4.4' }, simParams: { disableSimIndication: false, useDialSmsOverNet: false, disableMobileData: false }, preferredOperator: 0 },
      wifi: { dhcpMode: true, staticIp: '0.0.0.0', subnetMask: '255.255.255.0', gateway: '0.0.0.0', dns: '8.8.8.8', ssid: 'Sample-WiFi', ssidPass: 'samplepass1' },
      lan: { dhcpMode: true, staticIp: '192.168.1.50', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns1: '8.8.8.8', dns2: '1.1.1.1', lanTrouble: true },
    },
  },
  modules: {
    rs485,
    keypads: { keypadParams: { duressType: 0, quickArm: true, lockoutAfter: 5, lockoutDuration: 300, panicType: 2, medicalType: 1, fireType: 2, useFingerprint: false, doNotChangeCharset: false, customEntryBeep: false, sixDigitCode: true }, keypads },
  },
  wireless: { devices },
  zones,
  events,
  outputs: { outSettings, thermostats },
  sensors,
  users: { groups, blacklist },
  systemStatus: null, // replaced by get-system-status-new on the cloud path
};

// The user list, served by GET /config/users/read (not part of config/read).
const user = (o) => ({
  enabled: true, counter: 0, currentCounter: 0, admin: 0, groupPar: 0,
  rights: { forwardUnknownSms: false, arm: true, disarm: true, sleep: false, stay: true, smsACK: false, canEditUser: false, canSeeEvents: false, greetings: false, pgmControl: false },
  validFrom: 0, validUntil: 0, validFromEnabled: false, validToEnabled: false, scheduleDeny: false, areaControl: 0, pgmControl: [0, 0], pgmDial: [0, 0],
  doorsControl: [0, 0], groupAssign: [0, 0], schedules: [0, 0], code: '', tagCode: '', phone: '', name: '', email: '', presentInDevice: true, modified: false, f: '', ...o,
});
export const users = [
  user({ queueNo: 1, admin: 1, name: 'Admin', code: '123456', phone: '+447700900001', email: 'admin@example.com', areaControl: 3, pgmControl: [15, 0],
    rights: { forwardUnknownSms: true, arm: true, disarm: true, sleep: true, stay: true, smsACK: true, canEditUser: true, canSeeEvents: true, greetings: false, pgmControl: true } }),
  user({ queueNo: 2, name: 'Sample user 1', code: '111111', tagCode: '4A3B2C1D', phone: '+447700900002', groupAssign: [1, 0] }),
  user({ queueNo: 3, name: 'Sample user 2', code: '222222', phone: '+447700900003', validToEnabled: true, validUntil: Math.floor(Date.UTC(2026, 11, 31, 12) / 1000), groupAssign: [2, 0] }),
  user({ queueNo: 4, name: 'Sample user 3', enabled: false, code: '333333', phone: '+447700900004', groupAssign: [1, 0] }),
];

// Live state served by get-system-status-new: Home disarmed, Garage armed, all zones calm.
export const systemStatus = {
  newType: true, areas: { 1: '15', 2: '00' },
  zones: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [i + 1, { enabled: true, alarm: false, failure: false, bypass: false }])),
  pgms: { 1: { enabled: true, on: false }, 2: { enabled: true, on: false }, 3: { enabled: true, on: true }, 4: { enabled: true, on: false }, 5: { enabled: true, on: true } },
  sensors: {}, signal: '', troubles: null, error: '',
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  fs.writeFileSync(path.join(dir, 'sp5.json'), JSON.stringify({ _comment: 'Generated by sp5.build.mjs; edit that file, not this one.', ...data, _users: users, _systemStatus: systemStatus }) + '\n');
  console.log('wrote sp5.json');
}
