# Login

**Purpose:** Authenticate to IPCom Control Web before accessing monitoring and administration tabs.

## When to use

- At the start of each administration or monitoring session.
- After token/session expiration or explicit logout.

## Sections and why they matter

### Login form

Collects `Username` and `Password` and starts a session when `Login` is selected.

### Build indicator

The build value on this screen helps operators verify they are accessing the expected deployment before applying changes.


## Key fields to watch {#login-key-fields}

- `Username`: principal used for authentication and audit correlation. Alert cue: repeated login failures for valid users.
- `Password`: credential secret for account access. Alert cue: lockouts or frequent reset requests.
- `Login`: submits authentication request. Alert cue: no response or repeated rejection despite valid network connectivity.
- `IPCCw Build`: deployment/build identifier shown on login screen. Alert cue: unexpected build value after maintenance.
