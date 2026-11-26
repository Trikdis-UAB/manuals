// Sample answers for the calls a configurator makes besides config/read. Invented data only.

import { SAMPLE, sampleFirmware, wizardDeviceInfo, wizardDeviceStatus, wizardCreatedSystem } from './sample.mjs';

export function configuratorMocks(configurator, { on, readJson, FIX, model, state, fixture, configPatch, scenario = {} }) {
  if (configurator === 'sp5') sp5(on, { readJson, FIX, model, fixture, configPatch });
  if (configurator === 'g16') addSystemWizard(on, { model, state, offline: Boolean(scenario.deviceOffline) });
  if (configurator === 'sp3') sp3(on);
}

// FLEXi SP3: the calls its configurator makes only when a button is pressed. Nothing is sent.
function sp3(on) {
  // Events log → Read log. Each record is the panel's hex form: area, -, CID (LE), zone/user (LE), event code, -,
  // packed time (LE); checked against the app's decoder. Oldest first; the app lists the newest on top.
  on('POST', '/config/eventlog/read', () => ({ success: true, data: [
    '01000104020021004C7B8C2A', // 2026-10-06 07:45:12 System 1 disarmed, user 2
    '000001030000160028E38C2A', // 14:12:40 AC fault
    '000001030000150003E58C2A', // 14:20:03 AC restore
    '0100010401002000DE638D2A', // 22:15:30 System 1 armed, user 1
    '010030010300010008338E2A', // 2026-10-07 03:12:08 Alarm in input IN3
    '010030010300020029338E2A', // 03:12:41 Input restore IN3
    '0000020600001B0000608E2A', // 06:00:00 Periodic test
    '0100010401002100377A8E2A', // 07:40:55 System 1 disarmed, user 1
  ] }));
  on('POST', '/config/eventlog/clear', () => ({ success: true }));
  // Modules → RS485 modules → Update, and Wireless → Update: signal and battery of each module and device.
  on('GET', '/config/update-rs485-sensors', () => ({ success: true, data: { rssi: [92, 78, 0, 0, 0, 0, 0, 0], voltage: [12.1, 12.0, 12.0, 0, 0, 0, 0, 0] } }));
  on('POST', '/config/update-sensors', () => ({ success: true, data: 'V:3.05,L:86|V:3.10,L:72|V:3.00,L:64|V:2.95,L:78' }));
}

// The add-new-system wizard for a g16-family communicator: online, not directly controlled, so the
// app asks for areas and offers output (PGM) control. Calls in the order the wizard makes them.
// offline: the device is not connected, so the wizard stops at its "Check device" page.
function addSystemWizard(on, { model, state, offline }) {
  on('GET', '/online', () => ({ success: true, online: !offline, errorType: '', srv: 1, own_region: true, local_version: 1 }));
  on('POST', '/get-system-info-new', () => wizardDeviceInfo(model));
  on('POST', '/get-system-status-new', () => wizardDeviceStatus(model));
  on('POST', '/create-system', ({ body }) => {
    state.system = wizardCreatedSystem(model, body);
    return { success: true, system: state.system };
  });
  // Saving the area: store it, and bind the chosen output to it as the app does.
  on('POST', '/area', ({ body }) => {
    const id = 900201;
    if (state.system) {
      const a = body?.area ?? {};
      state.system.areas = [{
        id, system_id: state.system.id, name: a.name ?? 'Home', queue_no: a.queue_no ?? 1, status: 1, alarm_in_memory: false,
        status_time: null, last_person_name: '', alarm_time: null, alarm_type: 0, monas_id: null, autoarm_with_area_id: null,
        disarm_when_autoarmed: false, showKeypad: false, canBypass: false, zones: [],
      }];
      const p = body?.pgm && state.system.pgms.find((x) => x.id === body.pgm.id);
      if (p) Object.assign(p, { pgm_as_area_ck: 1, area_to_arm: id, type: body.pgm.type ?? 'pulse', pulse_time_in_seconds: body.pgm.pulseTime ?? 3 });
    }
    return { success: true, area_id: id };
  });
  on('POST', '/add/zone', () => ({ success: true, id: 900401 }));
}

// Fixed sample moment, so captures are repeatable.
export const SAMPLE_TIME = '2026-10-07 12:00:00';

function sp5(on, { readJson, FIX, model, fixture: file, configPatch }) {
  const fixture = () => readJson(FIX, 'config', file);

  // Firmware the server offers for the device (beta, from 2026-11): only the version the sample runs,
  // so the app says it is up to date and never offers an update.
  on('GET', '/firmware', () => ({ success: true, data: [{ fw_version: sampleFirmware(model).firmware, fw_date: Date.UTC(2026, 8, 1) / 1000 }] }));
  // The SIM card's operator list (beta, from 2026-11; the released app reads it from mcc-mnc.com, see the guard).
  on('GET', '/mobile-networks', () => ({ success: true, data: [{ mcc: '246', mnc: '01', network: 'Sample Mobile' }] }));

  // The dashboard's System information card and the "recent devices" list.
  on('GET', '/system-lite', () => ({
    success: true,
    data: {
      id: SAMPLE.systemId, imei: SAMPLE.imei, name: 'Sample system', address: 'Sample street 1',
      owners: [{ id: 900002, name: 'Sample Owner', email: 'owner@example.com', phone_number: '+44 7700 900000' }],
    },
  }));

  // Live connection state of each path (Dashboard, Connection). Codes: ST act/back/dis, DH ok/stat.
  on('GET', '/config/get-connection-status', () => ({
    success: true,
    data: {
      LAN: { ST: 'act', IP: '192.168.1.50', DH: 'ok', GW: '192.168.1.1', OP: 'N/A', SQ: 'N/A', FL: '' },
      SIM: { ST: 'back', IP: '10.64.12.7', DH: 'N/A', GW: 'N/A', ICCID: '', OP: 'Sample Mobile', SQ: '80', FL: '' },
      WIF: { ST: 'dis', IP: '', DH: '', GW: '', OP: 'N/A', SQ: 'N/A', FL: '' },
    },
  }));

  // Area, zone and output state (Areas, Terminals): Home disarmed, Garage armed, all zones calm.
  on('POST', '/get-system-status-new', () => ({ success: true, data: fixture()._systemStatus }));

  // The panel's user list (Users, Groups); it is not part of config/read. A screen's config patch can
  // change single users: "_users": [{ "queueNo": 2, ...fields }].
  on('GET', '/config/users/read', () => {
    const u = fixture()._users;
    for (const p of configPatch?._users ?? []) Object.assign(u.find((x) => x.queueNo === p.queueNo) ?? {}, p);
    return { success: true, data: u, total: u.length };
  });

  // "Scan for new devices": the first check finds one new HEYI door/window sensor in free slot 5; later checks
  // find nothing more. The app polls without pause on the cloud path until the scan is stopped.
  let checks = 0;
  on('POST', '/config/learn-sensors', ({ body }) => (body?.action === 'check'
    ? { success: true, data: checks++ === 0 ? [SCAN_FOUND] : [] }
    : { success: true }));

  // Panel clock (System options).
  on('*', '/config/time/read', () => ({ success: true, time: SAMPLE_TIME }));

  // Live status of keypads (K), expanders (E), wireless (W), sensors (S), thermostats (T).
  // Keys are the 1-based slot number.
  const zonesOk = Object.fromEntries([1, 2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16].map((n) => [n, st(1, null, null, null)]));
  const status = {
    Z: zonesOk,
    K: { 1: st(1, null, null, 13.6), 2: st(1, null, null, 13.5) },
    E: { 1: st(1, null, null, 13.7), 2: st(1, null, null, 13.6) },
    W: { 1: st(1, null, 86, 3.1), 2: st(1, null, 72, 3.05), 3: st(1, null, 64, 3.2), 4: st(1, null, 78, 2.9) },
    S: { 1: st(1, 21.5, null, null) },
    T: { 1: st(1, 21.5, null, null) },
  };
  on('GET', '/config/get-device-status', ({ query }) => {
    const letters = [...query.entries()].filter(([k]) => k.startsWith('deviceTypes')).map(([, v]) => v);
    return { success: true, data: Object.fromEntries(letters.map((l) => [l, status[l] ?? {}])) };
  });
}

// A HEYI Smart Door/Window sensor, as the panel reports a newly learned device (serial 0xA1B2C41E).
const SCAN_FOUND = { group: 9, type: 3, name: '', model: '', isNew: true, sn: '2712847390', queueNo: 5, registered: false, failed: false, rssi: '82', voltage: '3.1' };

function st(status, temperature, rssi, voltage) {
  return { status, temperature, rssi, voltage };
}
