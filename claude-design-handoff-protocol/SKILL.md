---
name: claude-design-handoff-protocol
description: How TapIn's engineers consume Claude Design handoff bundles produced by the Director (Mike). Use this skill when you are the Full-Stack Engineer (or any UI-touching agent) and an Issue includes a design bundle attachment. Defines what's in a bundle, how to extract it, what counts as a deviation, and how to escalate when the bundle and reality conflict. Do NOT use this skill for non-UI work or for designing UI yourself (engineers do not design — only implement).
---

# Claude Design Handoff Protocol

The Director designs TapIn's UI in Claude Design. Engineers implement. Engineers do not redesign.

## What a Claude Design handoff bundle contains

When the Director attaches a handoff bundle to an Issue, expect the following files (some may be absent depending on the bundle's scope):

| File | Contents |
|---|---|
| `manifest.json` | Component inventory, design tokens, version, target framework |
| `tokens.css` (or `tokens.json`) | Design tokens: colors, typography, spacing, radii, shadows |
| `index.html` | Reference rendering — what it should look like in a browser |
| `components/<name>/` | Per-component spec — props, states, semantics |
| `assets/` | Icons, images, illustrations referenced by the bundle |
| `README.md` | Director's notes on intent, acceptable deviations, follow-ups |

The bundle is exported by Claude Design directly — the Director does not hand-author these files. The format is stable and machine-readable.

## Your job as the engineer

### Step 1: Read the bundle BEFORE writing any code

- [ ] Read `README.md` for the Director's intent and any constraints
- [ ] Inspect `manifest.json` for the component list and target framework
- [ ] Open `index.html` in a browser to see what the rendered output should look like
- [ ] Examine `tokens.css` and verify these tokens are committed to the Studio repo (or commit them as part of your PR)

### Step 2: Implement to match

- [ ] Use the design tokens. **Do not hardcode colors, fonts, spacing, or radii.** Reference the tokens by name.
- [ ] Match the layout from `index.html`. Same components in the same positions, same proportions.
- [ ] Match the per-component states (hover, active, disabled, loading, error) from `components/<name>/`.
- [ ] Implement on the framework the manifest specifies. If the manifest says React + Tailwind and the Studio is React + Tailwind, use that. If the manifest says React but the Studio is Vue, **escalate** (don't translate).

### Step 3: Self-check before requesting review

- [ ] Open the bundle's `index.html` and your implementation side-by-side.
- [ ] Click through every state for every component.
- [ ] Run a screenshot diff if tooling allows.
- [ ] Verify no design tokens were hardcoded (grep your diff for hex codes, px values that should be spacing-token references).

### Step 4: Mark `in_review`, link the bundle in your comment

When you mark the Issue `in_review`, your comment must include:
- Link to the design bundle (already attached on the Issue)
- Link to a deployable preview URL of your implementation (Paperclip's workspace runtime can serve this)
- A one-line confirmation: "Implementation matches the bundle. Self-check complete."
- A list of any **acceptable deviations** with rationale (see below).

## What counts as a deviation

### Allowed without escalation
- Spacing within ±4px of the bundle's value
- Cursor styles (the bundle doesn't always specify these)
- Loading spinner choice if the bundle doesn't show one
- Animation easing curves if not specified
- Aria-labels, alt text, accessibility metadata (these you may add — they're improvements, not deviations)

### Requires Director approval BEFORE implementation
Anything that is a blocking deviation by the code-review-checklist:
- Different layout structure
- Different color outside the token set
- Different typography
- Missing components
- Added components not in the bundle
- Different component behavior or interaction model

### What to do when you encounter an impractical bundle requirement

You may be tempted to "fix" the bundle while implementing. **Do not.** This is the most important rule of this protocol.

If the bundle requires something that's impossible, prohibitively expensive, or genuinely wrong:

1. **Stop implementing.**
2. **Comment on the Issue.** State exactly:
   - The specific element or behavior that's a problem
   - Why it's a problem (technical reason, not opinion)
   - Two or three options for what could be done instead
   - Your recommendation, with rationale
3. **Mark the Issue `blocked`.** Reassign to the CEO (who routes to the Director).
4. **Wait for Director response.** The Director either:
   - Updates the bundle in Claude Design, exports a new version, attaches it to the Issue. You unblock and implement against the new bundle.
   - Approves a deviation in writing. The Issue's comment thread becomes the authoritative spec.

You may not implement-then-flag. You may not implement-with-modifications. The Director's design intent is authoritative.

## Storing the bundle in the Studio repo

Each bundle the Director attaches gets committed:

Naming: `YYYY-wWW-<short-description>/`. The bundle becomes part of the Studio's history. The current implementation's source of truth is "the most recent bundle for this component."

## What the Code Reviewer checks

The Code Reviewer's checklist (skill: `code-review-checklist`) explicitly checks:
- Implementation matches the attached bundle (BLOCKING for UI Issues)
- No hardcoded colors/typography/spacing — tokens are used
- Bundle is committed to the design/ folder

If you skip these, your Issue gets sent back to `in_progress`.

## When NOT to use this skill

- For backend-only Issues: the bundle protocol does not apply.
- For internal CLI tools: the Director cares about output correctness, not visuals.
- For automated scripts that produce no visible UI: skip.
