# Networking and Firewall Guide

This page summarizes network boundaries for IPCom from an IT operations perspective.

## Traffic directions {#network-traffic-directions}

- Inbound to IPCom: device traffic reaches configured receiver listeners (`TCP`/`UDP`/`COM`/modem paths).
- Outbound from IPCom: events and status traffic are sent to CMS/automation outputs.

## Firewall planning {#network-firewall-planning}

- Allow inbound receiver listener ports only from trusted device/source networks.
- Allow outbound traffic only to approved CMS/automation destination IPs and ports.
- Keep management UI access limited to admin networks, jump hosts, or VPN.
- Review NAT and port-forwarding rules before changing listener ports in `Receivers`.

## IP allowlist notes {#network-ip-allowlist}

- `IP Whitelist` fields appear in both `General` and `Outputs` contexts.
- Direction and enforcement behavior must be validated in your deployment before relying on it for segmentation. [REVIEW]

## Change checklist {#network-change-checklist}

1. Apply firewall and NAT changes before modifying production receiver/output settings.
2. Validate connectivity with controlled test events.
3. Monitor `Status` buffers and `Logs` for rejects or connection failures.
4. Keep a rollback rule set for quick recovery.
