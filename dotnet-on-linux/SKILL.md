---
name: dotnet-on-linux
description: How TapIn runs .NET 8 (the Studio's runtime) on the Linux Hostinger VPS. Use this skill when you are the Geometry Engineer or DevOps Engineer setting up the Studio's build environment, when troubleshooting .NET runtime issues, or when packaging the Studio for deployment. Skeleton skill — DevOps fills in as the Studio gets containerized. Do NOT use this skill for Paperclip server (which is Node.js) or for general Linux administration.
---

# .NET 8 on Linux for TapIn's Studio

This skill is currently a **skeleton with TODOs**. DevOps Engineer fills in as the Studio is built and deployed.

## Status: skeleton

The Studio (Putter Forge Studio) backend is .NET 8 + PicoGK. The Studio runs as a Docker container on the same VPS as Paperclip, but in a separate container (Paperclip is Node.js; Studio is .NET).

## Why .NET 8

- **PicoGK is .NET-native.** Fewer boundary crossings.
- **One-language CEM + Geometry stack.** The CEM and the geometry layer are both C#. No interop overhead.
- **Cross-platform.** .NET 8 runs cleanly on Linux containers.
- **Strong numerical libraries.** Math.NET Numerics, ML.NET, etc. — useful for CEM math.
- **Static typing.** Reduces bug surface in numerical code.

## Setup (TODO: DevOps Engineer to validate)

### Container base

- [ ] Choose base image: `mcr.microsoft.com/dotnet/sdk:8.0` for build, `mcr.microsoft.com/dotnet/aspnet:8.0` for runtime
- [ ] Confirm OpenVDB / PicoGK native dependencies install cleanly on the chosen base
- [ ] Document the final `Dockerfile`

### Build commands

Anticipated:

```dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["PutterForge.sln", "./"]
COPY ["src/PutterForge.Studio/PutterForge.Studio.csproj", "src/PutterForge.Studio/"]
COPY ["src/PutterForge.CEM/PutterForge.CEM.csproj", "src/PutterForge.CEM/"]
COPY ["src/PutterForge.Geometry/PutterForge.Geometry.csproj", "src/PutterForge.Geometry/"]
RUN dotnet restore "src/PutterForge.Studio/PutterForge.Studio.csproj"
COPY . .
RUN dotnet publish "src/PutterForge.Studio/PutterForge.Studio.csproj" -c Release -o /app

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
EXPOSE 8080
ENTRYPOINT ["dotnet", "PutterForge.Studio.dll"]
```

(Names tentative — final structure to be decided by the Geometry Engineer.)

## Repo structure (proposed — confirm with Engineer)

putter-forge-studio/
├── src/
│   ├── PutterForge.CEM/        # Computational Engineering Model — physics, parameters, constraints
│   ├── PutterForge.Geometry/   # PicoGK wrapper, shape generation
│   ├── PutterForge.Studio/     # Web app (Blazor Server? Minimal API + React frontend? — to decide)
│   └── PutterForge.Tests/      # Unit + integration tests
├── design/                     # Claude Design handoff bundles (see claude-design-handoff-protocol)
├── docs/
│   ├── briefings/              # Director Briefings (see director-briefing-format)
│   └── adrs/                   # Architecture Decision Records
├── docker/
│   └── Dockerfile
├── PutterForge.sln
├── README.md
└── .github/
└── workflows/              # CI for lint/build/test

## Frontend choice (TODO: Director-input decision)

Open question: Blazor Server or React + .NET API?

- **Blazor Server**: Single language (C#) front to back. Simpler; works well for forms and dashboards. Real-time UI from server-rendered components. Smaller ecosystem.
- **React + .NET API**: Two languages but React is the dominant ecosystem for design-heavy UIs. Pairs with Claude Design's React export. Better off-the-shelf 3D components (three.js).

For a Studio with significant 3D rendering and design-driven UI, **React + .NET API is likely the right choice.** Confirm with Director when we get to that point.

## PicoGK + Linux gotchas (TODO)

PicoGK has native dependencies (OpenVDB). On Linux:

- [ ] Confirm OpenVDB installs cleanly (apt or build from source)
- [ ] Confirm PicoGK's PInvoke wrappers find the native libraries at runtime
- [ ] Set `LD_LIBRARY_PATH` if needed
- [ ] Verify large-allocation behavior — voxel fields can require multi-GB allocations; container memory limits must be set accordingly
- [ ] Profile startup time — first run with native deps is often slow; subsequent fast

## Development workflow (TODO)

- [ ] How does the Engineer iterate locally on the VPS? (Watch mode? Hot reload?)
- [ ] Is there a separate dev container vs production container?
- [ ] How do tests run in CI? (Where is CI hosted? GitHub Actions on the public Studio repo?)

## Networking

The Studio runs on the same VPS as Paperclip but in a separate container. Anticipated layout:

| Service | Container | Container port | Host port |
|---|---|---|---|
| Paperclip | docker-server-1 | 3100 | 3100 |
| Postgres (Paperclip) | docker-db-1 | 5432 | 5432 |
| Studio backend | TBD | 8080 | TBD |
| Studio frontend dev server | TBD | 5173 | TBD (Vite default) |

Tailscale serves all of these on `100.124.155.122`. The Director accesses each via different ports. Eventually Traefik (already running on the VPS) can route subdomains:
- `paperclip.tapin.local` → port 3100
- `studio.tapin.local` → studio backend
- etc.

## Performance and resource budget

- VPS: 2 vCPU, 8 GB RAM total
- Paperclip baseline: ~500 MB RAM, modest CPU
- Postgres: ~200 MB RAM
- Studio at MVP: ~1–2 GB RAM expected (voxel fields)
- Headroom: ~4 GB RAM for spikes, agent runtime, dev work

If we hit limits at Goal 2/3, upgrade to KMV4 (16 GB) or KVM8 (32 GB).

## When NOT to use this skill

- For Paperclip server work (Node.js, separate world)
- For frontend-only changes (those happen in the Studio's frontend stack)
- For general Linux ops (use `hostinger-ops` instead)
- For non-Studio .NET projects (this is Studio-specific)
