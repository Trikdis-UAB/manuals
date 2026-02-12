# Access and login

![Access and login page full-screen view](./assets/screens/login.webp)

**Purpose:** Explain how operators access IPCom5 Control and sign in using the supported deployment methods.

## Access methods

- `Web access` is available for all deployment variants through browser URL/domain and management port.
- `Windows .exe access` is available in Windows installations and opens the same IPCom Control environment through the Windows client path.

## Web access flow

1. Open the IPCom Control URL in a browser (`http(s)://<host>:<port>`).
2. Confirm the target instance/build on the login page before entering credentials.
3. Sign in with your user account.
4. After login, verify environment and health on `Status`.

## Windows `.exe` access flow

1. Start the IPCom Control `.exe` from the Windows installation.
2. Select or enter the target receiver instance (host/domain and port).
3. Authenticate with your IPCom account credentials.
4. Verify you are on the intended instance using `Status` header/footer context.

## Security baseline for access

- Use HTTPS for management access whenever possible.
- Restrict management UI reachability to trusted networks (VPN/allowlist/firewall policy).
- Keep `administrator` for break-glass use and use named accounts for daily operations.
- Rotate credentials and integration secrets regularly.

## Quick troubleshooting

- `Cannot login`: verify correct host/port, account credentials, and account status in `Users`.
- `Wrong instance opened`: confirm header instance label and `Status` footer host/user context.
- `Session expires too quickly`: review token settings and role policy in `Users`.
- `Unexpected build/version`: stop changes and confirm deployment target before proceeding.

## Related pages

- Account operations: [Users tab](./screens/users.md)
- First post-login verification: [Status tab](./screens/status.md)
