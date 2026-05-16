---
name: tapin-vision
description: TapIn's company mission, strategic goals, operating principles, and definition of done for the MVP. Read this skill on first heartbeat and any time you need context for why TapIn exists, what is in scope, what is locked, what "feeling" means in TapIn's domain, or how TapIn governs itself. Reference this skill when proposing strategy, breaking down goals, drafting Issues, writing Director briefings, deciding scope, judging fit of a hire, or when an Issue lacks context. Do NOT use this skill for technical how-to (those live in domain-specific skills) or for daily heartbeat protocol (that lives in the Paperclip core skill).
---

# TapIn — Company Vision

**One-line mission:** TapIn designs metal-printable golf putters through a single in-house computational engineering platform that unifies physics, materials, and geometry.

**The Director:** Mike. Sole human in the company. In Paperclip terms, the Director operates the **Board** role — every governance gate in this document is enforced by Paperclip's built-in approval system, not by convention.

## Why TapIn exists

Putter design today is dominated by craft, tradition, and incremental CAD iteration. LEAP 71 has shown that for rocket engines, a *computational engineering model* (CEM) coupled to a programmable geometry kernel can replace human CAD work and produce parts that are simultaneously novel, manufacturable, and physically validated.

TapIn applies the same architecture to golf putters. The output is not just a shape — it is a putter whose mass distribution, moment of inertia, modal response, and impact behavior have been computed and tuned before a single gram of metal is printed.

## What TapIn builds

A single software platform — **Putter Forge Studio** — with three coupled layers:

1. **CEM core** (TapIn's proprietary equivalent of LEAP 71's Noyron). Encodes putter physics, material science, USGA conformance, and design intent. Owns all decisions about *what* the putter should be.
2. **Geometry engine** built on **PicoGK** (open source, used as a library — never forked unless absolutely necessary). Owns *how* the CEM's intent is realized as a 3D body.
3. **Director Studio UI** — web interface where the Director sets parameters, reviews simulations, and exports manufacturing files (STL first, STEP later).

## The two systems on one VPS

Two distinct apps run on the Hostinger KVM:

- **Paperclip** — the company operating system. Its dashboard is TapIn's intranet. Org chart, issues, budgets, audit trail, agent activity all live here. **TapIn does not build a second intranet.**
- **Putter Forge Studio** — the product TapIn builds. A separate web app, the only thing TapIn's engineers ever ship code into. Repository: https://github.com/xxMIKSTERxx/putter-forge-studio (private).

## Manufacturing target

Metal additive manufacturing — DMLS or binder jet — in stainless (316L, 17-4PH), titanium (Ti6Al4V), or with tungsten inserts for weighting. Every design the Studio outputs must be printable on these processes. Design-rule checking is part of the CEM, not an afterthought.

## What "feeling" means at TapIn

Feel is not vague. TapIn decomposes it into four measurable components, and the CEM must address all four:

- **Balance** — center of mass location relative to the face and shaft axis.
- **Forgiveness** — moment of inertia about the vertical and horizontal axes.
- **Sound** — modal frequencies and damping of the head at impact.
- **Impact response** — contact dynamics between face and ball, including any insert.

A putter that scores well on all four is what TapIn calls a "tuned" design.

## Operating principles

- **One platform, one source of truth.** No spreadsheets, no side-channel CAD files. If it isn't in the Studio, it doesn't exist.
- **Computational, not manual.** Agents do not hand-model geometry. Every shape is generated from CEM parameters.
- **Open source where possible, proprietary where it matters.** PicoGK is a dependency. The CEM is TapIn's IP.
- **Reviewed before merged.** Every code-bearing Issue passes through `in_review` and requires Code Reviewer + Director approval before reaching `done` on the `main` branch.
- **Plain English to the Director.** All status, all decisions, all escalations come to the Director in language a non-coder can act on.
- **Decisions are logged automatically.** Paperclip's activity audit trail is the company's decision history. Significant rationale is captured in Issue comments so it survives in the trail.
- **Visual design is owned by the Director, produced in Claude Design, and handed to engineering as packaged bundles.** Agents implement; they do not redesign.
- **Issues are project briefs.** Every Issue created in TapIn — by the Director, the CEO, or any direct report — must include: goal it serves, the customer or downstream consumer of the output, the required output format, definition of done, and the suggested next step on completion. Vague Issues are returned to the author, not worked.

## Strategic goals (in priority order)

1. **Director Visibility.** From the Paperclip dashboard, the Director sees company status, agent activity, budgets, and Studio progress.
2. **Studio MVP — Parametric Putter.** Generate a parametric mallet or blade head, compute mass and MOI, export printable STL.
3. **Physics Depth.** Add modal analysis (sound), impact simulation (feel), and a real material database. *Locked until Board opens it.*
4. **Print Readiness.** DMLS design-rule checker, support preview, STEP export, print-house handoff package. *Locked.*
5. **Design Library.** Catalog of tuned designs, each traceable from parameters → simulation results → manufacturing file. *Locked.*

Goals 1 and 2 are the only ones in scope until the Director explicitly opens Goal 3. Each goal will be broken into Projects, and Projects into Issues, with every Issue traceable to its parent Goal.

## How TapIn uses Paperclip's structure

TapIn uses Paperclip's primitives as they were designed:

**Goals** are the *why*. `TapIn Mission` is the company-level root. Five team-level goals sit beneath it — `Director Visibility`, `Studio MVP: Parametric Putter`, `Physics Depth`, `Print Readiness`, `Design Library`. Two are currently active; three are locked until MVP ships. One task-level goal sits beneath Mission too: `Operations Hygiene`, for the operational work that keeps the company running but isn't itself a strategic deliverable.

Don't create new Goals without Director approval — strategic direction is the Director's call, not the agents'.

**Projects** are deliverables — concrete things that ship together, each tied to one or more Goals:

- **Director Visibility** — operator-facing surfaces (dashboards, weekly briefings, Live Studio URL pin, Discord integration). Linked to the Director Visibility goal.
- **Studio Infrastructure** — the CI/CD chain that makes Studio deployable: scaffold, deploy.yml, GHA secrets, VPS runtime, Traefik routing. Linked to Studio MVP goal.
- **Studio MVP** — Putter Forge Studio itself: the parametric mallet/blade head selector, parameter panel, 3D preview, mass/MOI compute, STL export. The actual product. Linked to Studio MVP goal.
- **Operations** — operational hygiene: Paperclip upgrades, secret rotations, skill repo maintenance, stale wakeup cleanup, agent budgets, hardening followups. Linked to Operations Hygiene goal.

Don't create new Projects without Director approval — these are strategic commitments.

**Issues** are work items. Each Issue attaches to a Project, optionally to a Goal, and parents up to another Issue when there's a clear hierarchy. Cross-Project parenting is allowed (a child Issue can live in a different Project from its parent) — useful when one piece of work spawns followups in a different domain.

**Routines** are recurring scheduled work — fresh Issues spawned automatically on a cadence. TapIn currently runs two:

- **Sunday Director Briefing** — CEO-assigned, fires Sundays 17:00 Europe/Berlin. Spawns a child Issue in the Director Visibility project. The CEO writes that Issue's body per the `director-briefing-format` skill.
- **Studio Weekly Progress** — CEO-assigned, fires Sundays 17:00 Europe/Berlin. Spawns a child Issue in the Studio Infrastructure project summarizing what shipped, what's in flight, and what's blocked.

When opening new work, choose the right primitive:

- A *deliverable that ships* → file an Issue, attach to the relevant Project, parent it to a related Issue if there's a clear hierarchy
- A *recurring scheduled task* → propose a Routine, not a sequence of manual Issues
- A *new strategic objective* → propose a new Goal at the right level (task, team, or company), get Director approval, then create the Project that delivers it

Some actions are Director-only and cannot be performed by agents: writing GitHub repository secrets, executing infrastructure runbooks requiring sudoer access on the VPS, approving merge of PRs the agent itself authored (GitHub self-approval block), accepting `request_confirmation` thread interactions, and renaming Tailscale devices or tailnets. When an agent needs one of these, the agent comments with `@Mike` on the relevant Issue (or files a thread interaction) and waits.

The audit trail this produces — Goal → Project → Issue → child Issue, with Routines spawning Issues on their cadence — is how the Director reads what the company is doing without having to ask.

## Out of scope (for now)

Shafts, grips, full clubs, retail, marketing, e-commerce, regulatory filings, anything customer-facing. TapIn is an engineering company first.

## Definition of done for the MVP

The Director can open the Studio in a browser, choose "mallet" or "blade," adjust a small set of parameters, see a 3D preview update in real time, read computed mass and MOI, and download an STL file that a metal print house would accept. When that works end-to-end, the MVP is done and Goal 3 opens.
