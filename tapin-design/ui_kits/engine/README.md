# UI Kit — the Engine

The Engine is TapIn's internal computational platform: where designers and engineers specify constraints (player profile, stroke biomechanics, head-style family, target MOI) and the **CEM** generates, validates, and exports print-ready putter geometries.

This kit is **interpretive** — no codebase or Figma was provided. It commits to:

- Dense, engineering-software layout. The numbers carry the page.
- Dark surface (`turf-950`) primary, parchment available for documentation panels.
- Hairline borders everywhere. No drop shadows on at-rest UI.
- Fixed chrome: 40 px top bar, 56 px left rail (icons only, expandable), 180 px log dock when open.
- Three-column body: nav rail · canvas · inspector (320 px right panel).

## Components in this kit

| File | Purpose |
|---|---|
| `index.html` | Interactive demo — pick a Tap, change a constraint, run compute, view output. |
| `components/EngineShell.jsx` | App shell: top bar, left rail, body, bottom dock. |
| `components/TopBar.jsx` | Project breadcrumb, status, run / export controls. |
| `components/LeftRail.jsx` | Icon-only nav: designs, constraints, materials, library, logs. |
| `components/DesignList.jsx` | List of Tap instances in the current project, with summary stats. |
| `components/Canvas.jsx` | Main viewport — putter wireframe with overlays (isoline / FEA / clean). |
| `components/Inspector.jsx` | Right panel — constraints input + target/actual readout. |
| `components/LogDock.jsx` | Bottom compute log: streaming engineering output. |
| `components/Toast.jsx` | Status notifications. |
