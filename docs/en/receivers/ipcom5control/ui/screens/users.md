# Users

**Purpose:** Manage user accounts, permissions, and receiver visibility.

## When to use

- When adding or removing operators.
- When updating access scopes or receiver visibility for security.

## Sections and why they matter

### Show passwords

Reveals masked passwords to verify credentials during account setup or troubleshooting. Enable only in controlled maintenance and disable immediately after use.

### Users table

Each row represents a user account.

- `ID`, `Name`, `Login`: identity fields used in audits and login.
- `Password`: masked by default.
- `Scopes`: permissions granted to the user (for example, settings, events, objects). Limit scopes to reduce risk.
- `Visible receivers`: which receiver instances the user can access.
- `Token time`: token validity period, which affects session lifetimes and security posture.

### Add User and removal

Use `Add User` to create a new account. The red `X` action removes a user and should be used with explicit approval.

### Confirmed scope values and limits (IPCom API reference)

The following values are confirmed by the local IPCom API documentation (`Configuration Reference` and `PUT /api/settings` validation sections):

- Allowed scopes: `users`, `settings`, `objects`, `device_control`, `events`, `omit_mpass`, `restart_services`, `turnoff_receiver`, `license`.
- `token_time` range: `1` to `5,256,000` minutes (up to 10 years).
- `id` must be unique and non-zero; `login` and `password` must be non-empty.
- If `visible_receivers.all = false`, the `custom` receiver list must not be empty.
- User count can be limited by license.

## Hardening checklist

- Keep `administrator` for emergency use only; use named accounts for daily operations.
- Assign least-privilege `Scopes` per role (monitoring, operations, integration admin).
- Restrict `Visible receivers` so users only see required instances.
- Set shorter `Token time` for high-privilege users and rotate credentials regularly.
- Remove stale accounts and verify owner/role at scheduled intervals.


## Key fields to watch {#users-key-fields}

- `Login`: principal used for authentication and audit tracing. Alert cue: repeated auth failures after account updates.
- `Scopes`: effective privilege surface for account actions. Alert cue: users can modify settings outside expected role.
- `Visible receivers`: limits instance-level visibility. Alert cue: operators see receivers outside assigned scope.
- `Token time`: session validity duration. Alert cue: excessive token lifetime for high-privilege accounts.
- `Show passwords`: temporary reveal for verification only. Alert cue: left enabled during routine operations.
