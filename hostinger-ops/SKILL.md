---
name: hostinger-ops
description: How TapIn's infrastructure is laid out on the Hostinger VPS — paths, container names, services, and common operations. Use this skill when you need to: locate a file or directory on the VPS, run a docker command against the right container, modify configuration, restart a service, debug an outage, or write Issues that involve infrastructure changes. Especially useful for the DevOps Engineer agent. Do NOT use this skill for application-level coding (Studio internals) or for Paperclip-internal coordination (use the paperclip core skill).
---

# Hostinger Operations Reference

TapIn runs on a single Hostinger KVM VPS. Tailscale provides private network access. Two systems live on this VPS: Paperclip (the company's operating platform) and Putter Forge Studio (the product TapIn builds).

## VPS facts

- **Provider:** Hostinger KVM (2 vCPU, 8 GB RAM, 100 GB disk at MVP scale)
- **OS:** Ubuntu (Linux)
- **Tailscale IP:** 100.124.155.122
- **Hostname:** srv1620385
- **Access:** SSH via Tailscale only (no public ports for management)
- **Timezone (host):** UTC (will migrate to Europe/Berlin — see tech debt)
- **Timezone (Paperclip container):** Europe/Berlin (correct)

## Filesystem layout

| Path | Contents |
|---|---|
| `/opt/paperclip/` | Paperclip source code (cloned from `paperclipai/paperclip`). Contains `cli/`, `server/`, `ui/`, `packages/`, `docker/`, etc. **Do not edit Paperclip source.** |
| `/opt/paperclip/docker/` | Compose files for the Paperclip stack |
| `/opt/paperclip/docker/docker-compose.yml` | The active compose file |
| `/opt/paperclip/.env` | Paperclip environment variables (contains BETTER_AUTH_SECRET, etc.) |
| `/opt/paperclip/docker/.env` | Symlink to `/opt/paperclip/.env` |
| `/opt/tapin-skills/` | Local clone of TapIn's skill library (public GitHub repo) |
| `/var/lib/docker/volumes/docker_paperclip-data/_data/` | Paperclip's persistent data (Postgres data, instance config, secrets master key, skills, run logs) |
| `~/.git-credentials` | Stored GitHub PAT credentials (mode 0600, root only) |

The Studio repo (`putter-forge-studio`) is not yet cloned locally — DevOps Engineer will set this up under `/opt/putter-forge-studio/` when needed.

## Docker containers

Three containers run on this VPS:

| Container | Image | Purpose | Port (host:container) |
|---|---|---|---|
| `docker-server-1` | `docker-server` (built locally) | Paperclip server (Node.js + UI) | 3100:3100 |
| `docker-db-1` | `postgres:17-alpine` | Paperclip's Postgres database | 5432:5432 (TODO: remove external exposure) |
| `traefik-traefik-1` | `traefik:latest` | Reverse proxy (currently unused for TapIn, reserved for Studio later) | varies |

## Common operations

### Restart Paperclip server only

```bash
cd /opt/paperclip/docker
docker compose up -d server
```

The `up -d server` flag recreates only the `server` service; Postgres keeps running. ~10s downtime.

### View live logs

```bash
docker logs -f docker-server-1
```

Filter by topic:

```bash
docker logs -f docker-server-1 2>&1 | grep -iE "discord|plugin|error"
```

### Recent log slice

```bash
docker logs docker-server-1 --tail 100
docker logs docker-server-1 --since 10m
```

### Inspect container env

```bash
docker exec docker-server-1 env | sort
```

### Read a file inside the container

```bash
docker exec docker-server-1 cat /paperclip/instances/default/config.json
```

### Postgres queries (read-only is safe)

```bash
docker exec docker-db-1 psql -U paperclip -d paperclip -c "SELECT id, name FROM companies;"
```

### Health check

```bash
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://100.124.155.122:3100/api/health
```

## Re-materializing GitHub-sourced skills (Workaround A)

**Why this exists.** Paperclip's skills layer materializes `source_type='paperclip_meta'` skills to `/app/skills/<slug>/SKILL.md` inside `docker-server-1` automatically, but it does **not** handle `source_type='github'` skills. The 9 TapIn skills imported from `MN-Creation/tapin-skills` live only in the `company_skills.markdown` Postgres column until they are written to disk by hand. `/app/skills/` is container-local — there is no bind mount — so any `docker compose` recreate of `server` (upgrade, reinstall, image rebuild) wipes them and agents fall back to bundled defaults + memory.

Diagnosed in [TAP-55](/TAP/issues/TAP-55). Durable upstream fix tracked in [TAP-57](/TAP/issues/TAP-57). Until [TAP-57](/TAP/issues/TAP-57) lands, re-apply this workaround after every rebuild.

### When to run

- After any `docker compose up -d server` (recreate) or full Paperclip image rebuild / upgrade
- After `docker compose down && docker compose up -d` of the stack
- Whenever a freshly woken agent's init-event `skills` array is missing the TapIn slugs (`hostinger-ops`, `tapin-vision`, `code-review-checklist`, `claude-design-handoff-protocol`, `putter-domain`, `dmls-design-rules`, `dotnet-on-linux`, `picogk-basics`, `director-briefing-format`)

### How to run

Parameterise by company id. For TapIn:

```bash
COMPANY_ID='ab67d0e2-22b6-4bf1-a740-fce4654a6d5d'

# 1. Enumerate the GitHub-sourced skill slugs for this company.
mapfile -t SLUGS < <(docker exec docker-db-1 psql -U paperclip -d paperclip -t -A \
  -c "SELECT slug FROM company_skills
        WHERE company_id = '${COMPANY_ID}'
          AND source_type = 'github'
      ORDER BY slug;")

echo "Materializing ${#SLUGS[@]} skills:"; printf '  %s\n' "${SLUGS[@]}"

# 2. For each slug, stream its markdown column to a host file, then copy into
#    /app/skills/<slug>/SKILL.md inside the server container.
for slug in "${SLUGS[@]}"; do
  tmp="/tmp/skill-${slug}.md"
  docker exec docker-db-1 psql -U paperclip -d paperclip -t -A \
    -c "SELECT markdown FROM company_skills
          WHERE company_id = '${COMPANY_ID}'
            AND source_type = 'github'
            AND slug = '${slug}';" \
    > "${tmp}"

  docker exec docker-server-1 mkdir -p "/app/skills/${slug}"
  docker cp "${tmp}" "docker-server-1:/app/skills/${slug}/SKILL.md"
  rm -f "${tmp}"
done

# 3. Sanity-check on disk.
docker exec docker-server-1 ls /app/skills/
```

Notes:

- `slug` is already sanitized at ingest (e.g., `hostinger-ops`, not the full key `mn-creation/tapin-skills/hostinger-ops`). Use it verbatim as the directory name.
- `psql -t -A` emits the raw column value with no row/column decoration, which preserves multi-line markdown bodies correctly.
- This script is idempotent. Running it again overwrites the same files in place.

### Verify

Trigger any TapIn agent (e.g. Code Reviewer) and confirm the init event lists every TapIn slug. From the VPS:

```bash
# Tail server logs while triggering a heartbeat from the UI, or watch any
# fresh init payload — every TapIn slug above should appear in `skills[]`.
docker logs -f docker-server-1 2>&1 | grep -iE 'init|skills'
```

If a slug is missing, re-run the loop for that slug only and re-trigger the heartbeat.

### Out of scope

- Fixing the upstream materialization gap → [TAP-57](/TAP/issues/TAP-57).
- Making `/app/skills/` persistent via a bind mount or volume → would require infra change; propose only via an ADR. Workaround re-application is intentionally interim.

## What NOT to do

- **Do not modify Paperclip source code** under `/opt/paperclip/` outside the `docker/` directory and `.env`. The platform is upstream code — patches break upgrades.
- **Do not run `docker compose down -v`.** The `-v` flag deletes volumes, including all Paperclip data. There is no undo.
- **Do not edit `config.json` under the data volume directly** without making a backup first (e.g., `config.json.bak.YYYYMMDD-HHMMSS`).
- **Do not commit secrets** (PATs, API keys, passwords) to any git repo. Especially not `tapin-skills` which is public.
- **Do not insert plaintext into encrypted columns** (`company_secret_versions.value_ciphertext`). Always use the API or the established encryption flow.
- **Do not change the host VPS timezone or container timezones casually.** Both are intentional for now.
- **Do not enable inbound network ports** beyond what's already open. Tailscale is the management network.

## Tech debt list (parked)

These are known issues not blocking forward progress:

- **T1**: Rotate `BETTER_AUTH_SECRET` (was visible in early screenshots)
- **T2**: Fix root-owned files in `/paperclip/.claude/` and `/paperclip/.npm/_logs/` (legacy from an early Claude Code session run as root)
- **T3**: Upgrade Node.js 18 → 20 LTS on host
- **T4**: Set host timezone to Europe/Berlin
- **T5**: Remove `5432:5432` Postgres host port mapping (defense-in-depth — not strictly needed and exposes the DB to any other process on the VPS)
- **T6**: Migrate `tapin-vision` skill content from in-volume copy to GitHub-pulled version
- **T7**: Document the `~/.git-credentials` refresh flow when the PAT rotates

When the Director or CTO opens an Issue covering one of these, address it carefully. Don't tackle them speculatively.

## Backup and recovery

There is **no automated backup yet.** Critical state lives in:

- `/var/lib/docker/volumes/docker_paperclip-data/_data/db/` — Postgres data
- `/var/lib/docker/volumes/docker_paperclip-data/_data/instances/default/secrets/master.key` — secrets encryption key (irreplaceable!)
- `/var/lib/docker/volumes/docker_paperclip-data/_data/instances/default/config.json` — instance config

If the master key is lost, all stored secrets become unrecoverable. **Setting up offsite backup** is a near-future task — flag it to the Director when DevOps capacity allows.
