---
name: director-briefing-format
description: How to write the weekly Director Briefing for TapIn — a one-page Sunday-evening status report Mike (the Director) reads before the new week starts. Use this skill when you are the Reporter agent producing the weekly briefing, or when you are the CEO and need to write an ad-hoc out-of-cycle update to the Director. The briefing is the Director's primary reading touchpoint — get it right. Do NOT use this skill for technical documentation, internal-to-company comments, or daily standup posts in Discord (those use a different format).
---

# Director Briefing Format

The Director Briefing is the most important document the company produces every week. It is the only deliverable in TapIn that is **written for the Director, not for agents.**

## Audience and constraints

- **Reader:** Mike. Director of TapIn. Has some coding background but does not read code. Reads the briefing on Sunday evening to plan his week.
- **Length:** One page. ≤500 words. Hard limit.
- **Tone:** Plain English. No jargon without a one-line explanation. No code. No JSON. No acronyms unless defined on first use.
- **Format:** Markdown. Saved to `docs/briefings/YYYY-WW.md` in the Studio repo where the calendar week number is the WW.

## Structure

Use exactly these five sections, in this order, with these exact headings:

### 1. Headline (1 sentence)

The single most important thing the Director should know this week. If reading nothing else, what's the takeaway?

Examples:
- "Studio shell shipped to staging — the parameter panel is the next major milestone."
- "Goal 1 is at risk: dashboard heartbeat-monitoring stalled on Postgres connection pool issue, ETA recovery 3 days."
- "Quiet week. Three small Issues completed. Engineer is unblocked and waiting on the design bundle for parameter panel."

### 2. Shipped (bullets)

What was completed this week. Each bullet:
- Names the deliverable in plain language
- Links to the Issue identifier (use the company-prefix link form, e.g., `[TAP-42](/TAP/issues/TAP-42)`)
- Says one sentence about why it matters

Three to seven bullets. If more, group by area. If none, write "Nothing shipped this week. Reasons in section 4."

### 3. In Progress (bullets)

What's actively being worked on right now, with current status. Each bullet:
- Names the work item
- Names the agent owning it
- Links to the Issue
- Gives a status verb: investigating / building / reviewing / blocked

Keep this list short. If everything is "in progress," nothing is. Cap at five items.

### 4. Blocked or At-Risk (bullets — may be empty)

Anything that is genuinely stuck or trending bad. Each bullet:
- Names what's blocked
- Names the blocker (waiting on whom, on what)
- Says what action would unblock it
- Says whether the action requires the Director or not

If nothing is blocked, write "Nothing blocked this week."

### 5. Decisions Needed from the Director (bullets — may be empty)

The most important section for the Director. Things that require Mike's input this week. Each bullet:
- States the decision needed in one clear sentence
- Lists the options
- Recommends one option, with a one-sentence rationale
- Says when the decision is needed by

If nothing requires the Director, write "No decisions needed this week. Continue current course."

## What NOT to include

- **No raw token/cost numbers** unless they are notably high or low. The Director sees costs in the dashboard live.
- **No agent process metadata** (heartbeat counts, run IDs, internal task statuses).
- **No code snippets, error stacktraces, or log excerpts.** If something failed, summarize it in plain English.
- **No optimism padding.** "Great progress" is meaningless. Be specific.
- **No defensive hedging.** "We tried our best" is not useful. State facts.

## Voice rules

- **Active voice.** "The CTO assigned three Issues" not "Three Issues were assigned by the CTO."
- **Past tense for shipped, present for in-progress, future for decisions.** Tense signals state.
- **Short sentences.** If a sentence has more than one comma, split it.
- **Numbers in numerals.** "3 Issues" not "three Issues" — easier to scan.
- **Names of agents capitalized** (CEO, CTO, Geometry Engineer) — they're proper nouns to the Director.

## Workflow

1. Wake up on the scheduled routine (Sunday 19:00 CET).
2. Pull data:
   - Activity log for the past 7 days
   - All Issues that changed status or had comments this week
   - All approvals that fired this week
   - All current `in_progress`, `blocked` Issues
   - All open approvals waiting on the Director
3. Write the briefing in the format above. Save to `docs/briefings/YYYY-WW.md` in the Studio repo.
4. Commit and push.
5. Post a short summary to the `#director-briefing` channel in Discord, with a link to the full briefing in GitHub.
6. Mark the briefing Issue as `done`.

## Example briefing (for reference)

> ## Headline
> Studio shell shipped — parameter panel design is the next gate.
> 
> ## Shipped
> - Studio shell deployed to localhost preview ([TAP-12](/TAP/issues/TAP-12)). Mike can now see "Hello Studio" at http://100.124.155.122:5173. First end-to-end working surface.
> - PicoGK hello-world cube exported as STL ([TAP-15](/TAP/issues/TAP-15)). Confirms the geometry kernel runs in our .NET 8 container.
> - DevOps fixed Postgres connection pool exhaustion ([TAP-19](/TAP/issues/TAP-19)). Caused 4 dashboard outages last week; resolved.
> 
> ## In Progress
> - Parameter panel scaffolding (Full-Stack Engineer, [TAP-21](/TAP/issues/TAP-21)) — building.
> - Mass calculation for parametric mallet head (CEM Engineer, [TAP-22](/TAP/issues/TAP-22)) — investigating PicoGK voxel integration.
> - Code Reviewer reviewing TAP-21 — reviewing.
> 
> ## Blocked or At-Risk
> - Parameter panel UI is blocked on Mike's Claude Design handoff bundle. Action: produce design bundle for parameter panel and attach to TAP-21. Requires Director.
> 
> ## Decisions Needed from the Director
> - **Parameter panel layout.** Two options: (a) sliders left, 3D viewer center; (b) form fields top, 3D viewer below. Recommend (a) — better fits laptop screens. Needed by Wednesday so Engineer can implement.
