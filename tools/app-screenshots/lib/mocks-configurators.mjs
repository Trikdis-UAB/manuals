// Sample answers for the calls a configurator makes besides config/read. Invented data only.

import { SAMPLE, wizardDeviceInfo, wizardDeviceStatus, wizardCreatedSystem, media, vhVisualEvents } from './sample.mjs';

export function configuratorMocks(configurator, { on, readJson, FIX, model, state, fixture, configPatch, scenario = {} }) {
  if (configurator === 'sp5') sp5(on, { readJson, FIX, model, fixture, configPatch });
  if (configurator === 'g16') addSystemWizard(on, { model, state, offline: Boolean(scenario.deviceOffline) });
  if (configurator === 'vh') vh(on, { readJson, FIX, fixture, scenario });
}

// VideoHub: area status, camera snapshots (served by the guard from fixtures/media/), detections.
function vh(on, { readJson, FIX, fixture: file, scenario }) {
  on('POST', '/get-system-status-new', () => ({ success: true, data: readJson(FIX, 'config', file)._systemStatus }));
  // A stored frame answers at once (requesting_fresh false), so the app does not wait for the realtime
  // channel, which the guard refuses.
  const live = (cameraId) => (Number(cameraId) % 2 === 1 ? 'backyard-live.jpg' : 'street-car-full.jpg');
  on('GET', '/camera/snapshot-for-configuration', ({ query }) => ({ success: true, snapshot: media(live(query.get('camera_id'))), requesting_fresh: false }));
  on('GET', '/camera/snapshot', ({ query }) => ({ success: true, snapshot: media(live(Number(query.get('camera_id')) - 900600)), requesting_fresh: false }));
  const company = scenario.company ? { companyId: scenario.company.id, companyName: scenario.company.name } : {};
  on('GET', '/visual-events', ({ query }) => ({ success: true, items: Number(query.get('offset_records') || 0) === 0 ? vhVisualEvents(company) : [] }));
  on('GET', '/event-visual-data', ({ query }) => {
    const e = vhVisualEvents(company).find((x) => String(x.id) === query.get('event_id')) ?? vhVisualEvents(company)[1];
    return { success: true, data: e, ...e };
  });
  // An operator's notes on an event: none yet.
  on('GET', '/event-notes', ({ query }) => ({ success: true, notes: [], event_id: Number(query.get('event_id') || 0), related_event_id: query.get('related_event_id') }));
  on('GET', '/request-visual-data', () => ({ success: true, already_present: true }));
  on('GET', '/firmware', () => ({ success: true, data: [{ fw_version: '1.04', fw_date: '2026-11-10' }] }));
  // Adding a VideoHub that has no network yet: the server knows its type (0x5D) but cannot reach it, so the
  // app goes straight to Bluetooth setup.
  if (scenario.deviceOffline) on('GET', '/online', () => ({ success: true, online: false, hwId: 0x5d, errorType: '', srv: 1, own_region: true, local_version: 1 }));
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

function sp5(on, { readJson, FIX, fixture: file, configPatch }) {
  const fixture = () => readJson(FIX, 'config', file);

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
