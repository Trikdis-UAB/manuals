# HA, Cluster, and Backup Notes

This page captures operations guidance for high availability and recoverability planning.

## Cluster expectations {#ha-cluster-expectations}

- `Enable cluster` and `Add node` controls indicate multi-node capability in the UI.
- Exact failover behavior, state sharing, and node quorum rules must be confirmed for your deployment. [REVIEW]
- Document node roles and expected failover sequence before production changes.

## Backup scope {#ha-backup-scope}

- Configuration: receiver definitions, output definitions, user/permission settings.
- Operational data: database contents used for event history and tracking.
- Secrets: integration credentials and keys stored in secure admin vaults (not in repo files).

## Recovery planning {#ha-recovery-planning}

1. Define RPO/RTO targets for monitoring continuity.
2. Test restore procedure on non-production environment.
3. Validate post-restore event flow to CMS outputs.
4. Keep a versioned rollback plan for config and schema changes.

## Upgrade operations {#ha-upgrade-operations}

- Perform upgrades in maintenance windows with pre/post checks.
- Verify `Status`, `Logs`, and critical output delivery after restart.
- Keep a documented downgrade path if regression appears.
