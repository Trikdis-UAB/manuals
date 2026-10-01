// Invented sample data. Nothing here belongs to a real account, company, customer or device.
// Identifiers are deliberately recognisable as samples (IMEI 123456789012345, ids 9001xx).

export const SAMPLE = {
  userId: 900001,
  systemId: 900101,
  imei: '123456789012345',
  mpass: '123456',
  adminCode: '123456',
  installerCode: '654321',
};

// Hardware models served by the shared g16 configurator. Firmware and hardware revision change
// which fields the app shows (e.g. account number per CMS channel from fw 1.31, Bands/Generation
// from fw 1.17 on revision M15), so they must match a current real device. The values below are
// PLACEHOLDERS until confirmed; override per run with --fw and --revision.
export const G16_MODELS = {
  'GET':   { hwId: '4E', deviceId: 0x4e, hwType: 'GET',  name: 'GET',  firmware: '1.12', revision: null, bt: '0103' },
  'GT':    { hwId: '53', deviceId: 0x53, hwType: 'GT',   name: 'GT',   firmware: '1.30', revision: null, bt: '0103' },
  'GT+':   { hwId: '52', deviceId: 0x52, hwType: 'GT+',  name: 'GT+',  firmware: '1.30', revision: null, bt: '0103' },
  'G16':   { hwId: '42', deviceId: 0x42, hwType: 'G16',  name: 'G16',  firmware: '1.12', revision: null, bt: '0103' },
  'G16T':  { hwId: '45', deviceId: 0x45, hwType: 'G16T', name: 'G16T', firmware: '1.12', revision: null, bt: '0103' },
  'E16':   { hwId: '3A', deviceId: 0x3a, hwType: 'E16',  name: 'E16',  firmware: '1.12', revision: null, bt: '0103' },
  'E16T':  { hwId: '3C', deviceId: 0x3c, hwType: 'E16T', name: 'E16T', firmware: '1.12', revision: null, bt: '0103' },
};

export function setFirmware(model, { firmware, revision }) {
  if (firmware) G16_MODELS[model].firmware = firmware;
  if (revision) G16_MODELS[model].revision = revision;
}

export function sampleFirmware(model) {
  const m = G16_MODELS[model];
  return { firmware: m.firmware, revision: m.revision };
}

// How the device reports itself in config/info: "<name>[_<revision>]_<fw x100>". The app shows
// the last part as firmware (0112 -> 1.12) and takes the revision from the second part.
function deviceVersion(m) {
  const fw = String(Math.round(parseFloat(m.firmware) * 100)).padStart(4, '0');
  return m.revision ? `${m.name}_${m.revision}_${fw}` : `${m.name}_${fw}`;
}

const PERMISSION_AREAS = [
  'company_settings', 'ipcom_settings', 'reactions', 'roles', 'systems', 'events', 'tags', 'users',
  'support_tickets', 'global_settings', 'panic_settings', 'regions', 'impersonation', 'transfer_company',
  'transfer_device', 'sys_advanced_settings', 'sys_information', 'sys_areas', 'sys_zones', 'sys_outputs',
  'sys_sensors', 'sys_thermostats', 'sys_users', 'sys_receiver', 'sys_synchronisation', 'sys_transfer',
  'sys_device_transfer', 'sys_reset_sensors', 'sys_assistance', 'sys_personal_permissions',
  'sys_transfer_to_company', 'sys_notifications', 'sys_cameras', 'sys_events', 'system',
  'dev_setup_templates', 'unassigned_devices', 'pending_systems', 'company_payments', 'system_notes',
  'monitoring_stations',
];

// An installer: full rights on the systems they work on, nothing company-wide.
const INSTALLER_GRANTS = new Set([
  'systems', 'events', 'unassigned_devices', 'dev_setup_templates', 'system_notes',
  ...PERMISSION_AREAS.filter((a) => a.startsWith('sys_')), 'system',
]);
const NO_GRANT = new Set(['sys_transfer_to_company', 'sys_device_transfer', 'sys_assistance']);

function permissionGrid() {
  const grid = {};
  for (const a of PERMISSION_AREAS) {
    const on = INSTALLER_GRANTS.has(a) && !NO_GRANT.has(a);
    grid[a] = { view: on, create: on, edit: on, delete: on, execute: on };
  }
  return grid;
}

export function installerRule() {
  return {
    id: 3, name: 'Installer', description: '', role: 3, company_id: 0, parent_id: null,
    default: true, companyName: null, tags: [], permissions: permissionGrid(),
  };
}

export function sampleSystem(modelName) {
  const m = G16_MODELS[modelName];
  return {
    id: SAMPLE.systemId,
    name: 'Sample system',
    hwType: m.hwType,
    supported_commands: '',
    supported_wireless: '',
    address: 'Sample street 1',
    amIMaster: false,
    online: true,
    canEditUsers: true,
    imei: SAMPLE.imei,
    mpass: SAMPLE.mpass,
    timeZone: 'Europe/Vilnius',
    pgms: [],
    events: { events: [] },
    direct: 0,
    areas: [],
    noSleepStay: false,
    hasRealSensors: false,
    centralPanel: 0,
    coordinates: '',
    theme: { background_start: '#0070A7', background_end: '#00A2E8', full_background: '' },
    notifications: null,
    sensors: [],
    signalLevel: 8,
    zones: [],
    canBypassZone: false,
    canUnbypassZone: false,
    protegus_users: [],
    device_users: [],
    maxDeviceUsers: 0,
    eventConfiguration: '[]',
    cameras: [],
    thermostats: [],
    installer_id: SAMPLE.userId,
    installerEmail: 'installer@example.com',
    installerName: 'Sample Installer',
    company_id: 0,
    logo: null,
    logo_url: null,
    supportsFireReset: false,
    amIWorking: true,
    device_id: m.deviceId,
    privacyOfOwners: [],
    owners: [],
    created_at: 1767225600,
    related_permissions: [],
    tags: [],
    installerAccess: null,
    showSosButton: false,
    status: {
      id: 1, system_id: SAMPLE.systemId, system_status: 'online', subscription_status: '', signal_level: 8,
      cellular: null, operator: null, lte_band: null, frequency: null, registration_id: null, person: null,
      activated_at: 1767225600, com_type: 2, discovering_cameras: false, cam_discovery_started_at: null,
    },
    stabilityScore: 0,
    stabilityScoreDate: null,
    stabilityScoreTier: 'unavailable',
    showStabilityScore: false,
    canUpgradeFirmware: false,
    fw_version: deviceVersion(m),
    sos_type: 0,
    troubles: [],
    devices: [],
    orders: [],
    features: [],
    canUsePayments: false,
    subscriptionEnforcementEnabled: false,
    parent_system_id: null,
    rereads: [],
    config_read: 1,
  };
}

export function sampleMe({ regions, modelName, withSystem }) {
  const me = {
    success: true,
    id: SAMPLE.userId,
    name: 'Sample Installer',
    email: 'installer@example.com',
    phone: '',
    token: null, // filled by the mock with the fake token
    socket_token: 'screenshot-mode',
    socket_port: 0,
    date_format: 0,
    time_format: '0',
    language: 'en',
    is_social_account: false,
    isPasswordSet: true,
    twoFactorEnabled: false,
    active: 1,
    country: 'LT',
    eula_accepted: true,
    appVersion: { major: 0, minor: 0, build: 0, date: '' },
    homeConfigurations: [],
    ownedCompanies: [],
    belongsToCompany: null,
    logo: null,
    logo_url: null,
    settings: { textual: [], togglable: [] },
    company_id: 0,
    access_permission_id: 3,
    permission_rules: [],
    page_limit: { permissions: 50, companies: 50, events: 50, systems: 50, users: 50, tags: 50, video: 50 },
    user_tags: [],
    tags: [],
    monas_installation: false,
    stripeCustomers: [],
    permissions: installerRule(),
    limits: { default_system_count: true, system_count: 0, default_camera_count: true, camera_count: 0 },
    notifications: [],
    historySystems: [],
    regions,
  };
  if (withSystem) {
    me.lastSystem = sampleSystem(modelName);
    me.lastSystemStatus = false;
    me.relatedSystems = [];
  }
  return me;
}

// Row in the installer's systems list (GET /systems-with-devices).
export function sampleListRow(modelName) {
  const m = G16_MODELS[modelName];
  return {
    id: SAMPLE.systemId, imei: SAMPLE.imei, name: 'Sample system', last_ip_com: 1,
    created_at: '2026-01-01 00:00:00', object_id: '1234', installer_id: SAMPLE.userId,
    installerName: 'Sample Installer', supported_commands: '', company_id: 0, hw_type: m.hwType,
    device_id: m.deviceId, address: 'Sample street 1', companyName: null,
    installerEmail: 'installer@example.com', owner: '', connectionStatus: 'online',
    system_id: SAMPLE.systemId, enable_direct_control: 0, ns: 0, tags: [], areas: [],
    assistedById: null, assistedByEmail: null, registration_id: null, hasNotes: null,
    system_status: null, record_type: 'system',
  };
}

export function sampleConfigInfo(modelName) {
  const m = G16_MODELS[modelName];
  return {
    success: true,
    data: {
      zones: 0, outputs: 0, version: deviceVersion(m), hwId: m.hwId, fireReset: false,
      supports_custom_outputs: false, supported_commands: '', ns: false, central_panel: 0,
      uid: SAMPLE.imei, sn: '000123', bt: m.bt, dr: '', areas: 0, supported_wireless: null,
      ipcom: 1, objectId: 'sample', signalLevel: 80, isInForeignRegion: false, foreignRegion: '',
    },
    foreignSystem: null,
    ownRegion: null,
    srv: 1,
    systemName: 'Sample system',
  };
}
