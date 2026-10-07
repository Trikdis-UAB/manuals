// Sample answers for the calls a configurator makes besides config/read. Invented data only.

import { SAMPLE } from './sample.mjs';

export function configuratorMocks(configurator, { on, readJson, FIX, model }) {
  if (configurator === 'sp5') sp5(on, { readJson, FIX, model });
}

// Fixed sample moment, so captures are repeatable.
export const SAMPLE_TIME = '2026-10-07 12:00:00';

function sp5(on, { readJson, FIX }) {
  const fixture = () => readJson(FIX, 'config', 'sp5.json');

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

  // The panel's user list (Users, Groups); it is not part of config/read.
  on('GET', '/config/users/read', () => { const u = fixture()._users; return { success: true, data: u, total: u.length }; });

  // Panel clock (System options).
  on('*', '/config/time/read', () => ({ success: true, time: SAMPLE_TIME }));

  // Live status of keypads (K), expanders (E), wireless (W), sensors (S), thermostats (T).
  // Keys are the 1-based slot number.
  const zonesOk = Object.fromEntries([1, 2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16].map((n) => [n, st(1, null, null, null)]));
  const status = {
    Z: zonesOk,
    K: { 1: st(1, null, null, 13.6), 2: st(1, null, null, 13.5) },
    E: { 1: st(1, null, null, 13.7), 2: st(1, null, null, 13.6) },
    W: { 1: st(1, null, 86, 3.1), 2: st(1, 22.0, 72, 3.05), 3: st(1, null, 64, 3.2), 4: st(1, null, 78, 2.9) },
    S: { 1: st(1, 21.5, null, null), 2: st(1, 22.0, 72, null) },
    T: { 1: st(1, 21.5, null, null) },
  };
  on('GET', '/config/get-device-status', ({ query }) => {
    const letters = [...query.entries()].filter(([k]) => k.startsWith('deviceTypes')).map(([, v]) => v);
    return { success: true, data: Object.fromEntries(letters.map((l) => [l, status[l] ?? {}])) };
  });
}

function st(status, temperature, rssi, voltage) {
  return { status, temperature, rssi, voltage };
}
