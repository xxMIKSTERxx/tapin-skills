# TapIn — Design System

> One-line mission: TapIn designs metal-printable golf putters through a single in-house **computational engineering platform** that unifies physics, materials, and geometry.

## What TapIn is

Putter design today is dominated by craft, tradition, and incremental CAD iteration. LEAP 71 has shown that for rocket engines, a **computational engineering model (CEM)** coupled to a **programmable geometry kernel** can replace human CAD work and produce parts that are simultaneously novel, manufacturable, and physically validated.

TapIn applies the same architecture to golf putters. The output is not just a shape — it is a putter whose **mass distribution, moment of inertia, modal response, and impact behavior** have all been computed and tuned before a single gram of metal is printed.

## Products represented in this system

The TapIn brand spans two surfaces (interpreted from the brand brief — no codebase or Figma was attached):

1. **The Engine** — an internal/operator computational platform where designers/engineers specify constraints (player profile, stroke biomechanics, head-style family, target MOI) and the CEM generates, validates, and exports print-ready putter geometries. UI kit lives in `ui_kits/engine/`.
2. **tapin.golf** — the marketing surface: how TapIn explains itself to elite golfers, OEM partners, and the technical press. UI kit lives in `ui_kits/marketing/`.

## Sources & inputs

| Source | Location | Status |
|---|---|---|
| Brand description | provided in chat (mission statement, LEAP 71 reference) | ✅ used |
| Codebase | — | ❌ not provided |
| Figma | — | ❌ not provided |
| Slide decks | — | ❌ not provided |
| Logo / brand marks | — | ❌ not provided — placeholders generated and flagged |
| Photography | — | ❌ not provided — placeholders only |

Because no codebase, Figma, or visual assets were attached, this system is **interpretive**: it commits to a strong direction inferred from the brand brief and from adjacent reference brands (LEAP 71, Hadrian, Scotty Cameron, modern engineering-software UI). Treat every visual decision here as a draft for the team to confirm or override. See **"Caveats & substitutions"** at the bottom.

---

## CONTENT FUNDAMENTALS

How TapIn writes copy.

### Voice in one line
**A precise engineer who happens to love golf.** Declarative, numbers-led, never breathless. Never markety. Confidence comes from the math, not the adjectives.

### Tone dials
- **Formality**: high but not stiff. Closer to a NASA mission briefing than a tech-bro launch.
- **Warmth**: low-to-medium. The product is the warmth — the writing stays cool.
- **Humor**: dry, sparing. Never punny. Never golf-dad humor.
- **Hype**: zero. No "revolutionary", "game-changing", "unleash".

### Person & address
- **First person plural ("we")** is used rarely, only in signed founder communications.
- **Third person** is the default for product descriptions: *"The engine resolves a mass distribution…"*, *"TapIn computes…"*.
- **Second person ("you")** is used in onboarding flows inside the platform and in player-facing collateral: *"You'll define the stroke, the engine does the rest."*
- Never "us vs. them" framing against incumbents — the math speaks.

### Casing
- **Sentence case everywhere**: headlines, buttons, navigation, section titles. Never Title Case. Never ALL CAPS except for short labels (≤4 chars) and numeric units.
- **Eyebrows / kickers**: small caps via `font-feature-settings: 'smcp'` or `font-variant-caps: all-small-caps`, never CSS `text-transform: uppercase`.
- **Product names** are capitalized when they refer to internal capitalized objects: *the Engine*, *the Kernel*, *a Tap* (one generated putter instance). Lowercase when generic.

### Numbers, units, measurements
- **Always use real units**. `354 g`, `5,820 g·cm²`, `Rₐ 1.2 µm`, `Ti-6Al-4V`.
- Numbers always set in **IBM Plex Mono** to set them visually apart from prose.
- **Tabular figures** (`font-variant-numeric: tabular-nums`) whenever numbers stack or change.
- Thousands separator: comma. Decimal: period.
- Tolerances written as `± 0.05 mm`, never `+/-`.

### Sentence shape
- Short. Then a long one that earns its length by carrying a clause the short sentence couldn't. Then short again.
- Em dashes — used to insert engineering precision — not for drama.
- Lists are common. Lists of three are the rhythm.

### Forbidden words
*revolutionary, game-changing, unleash, supercharge, magical, beautifully, simply, just, AI-powered, next-gen, cutting-edge, world-class, premium, luxury*. The brand earns these without saying them.

### Emoji
**Never.** Not in product, not in marketing, not in social. Iconography is glyph-based.

### Example copy

**Marketing hero:**
> A putter, computed.
> TapIn resolves head geometry, mass distribution, and modal response against your stroke — then prints it in titanium.

**Engine empty state:**
> No design loaded.
> Define a stroke profile, set the MOI target, and the kernel will propose a head family within ~40 s.

**Engine success toast:**
> Geometry validated. 354 g, MOI 5,820 g·cm², modal 1f at 4.1 kHz. Ready to slice.

**Error:**
> Constraint set is over-determined. Relax one of: face loft, hosel offset, total mass.

**Footer:**
> Designed in Zürich. Printed in titanium.

---

## VISUAL FOUNDATIONS

### Colors

The palette is built on a deep near-black ("turf") that lets engineering visualizations carry the page, with parchment as a counter-surface for documentation and print contexts. Two accents only: **putter green** (canonical TapIn color — used as the brand mark and for primary actions) and **heatmap orange** (reserved for data visualization: stress concentrations, alerts, hot regions). Neutrals are slightly cool to read as titanium rather than warm graphite.

See `colors_and_type.css` for the full token list.

| Role | Token | Hex |
|---|---|---|
| Primary surface | `--turf-950` | `#0B0F0D` |
| Secondary surface | `--turf-900` | `#121814` |
| Card surface | `--turf-850` | `#171E1A` |
| Parchment (light surface) | `--bone-50` | `#F4F1EA` |
| Brand accent | `--putter-500` | `#6BE095` |
| Data hot | `--heat-500` | `#FF6B35` |
| Data cool | `--cool-500` | `#4DA3FF` |

### Typography

| Role | Family | Notes |
|---|---|---|
| Display | **Inter** (700 / Bold) | Hero headlines, section openers, design names. **Tight tracking** (−0.035em to −0.04em) — matches the wordmark. |
| UI / body | **Inter** (400–600) | Body copy, navigation, buttons, forms. Slight negative tracking (−0.01em). |
| Data / mono | **IBM Plex Mono** | All numbers, measurements, units, code, axis labels, anything in a CAD context. |

Inter is the canonical TapIn typeface — the brand wordmark itself is set in Inter Bold with tight letter-spacing. Loaded from Google Fonts. IBM Plex Mono provides numerical / engineering contrast.

### Backgrounds & imagery

- **No gradients** as decoration. The one exception: a thin **protection gradient** from `turf-950 → transparent` over imagery to anchor light type.
- **Imagery is computational**: CAD renders of putter heads, isoline contour maps, FEA stress visualizations, vector fields, lattice structures, photomicrographs of printed metal surfaces. When a photograph is unavoidable (player on green), it is desaturated and cool.
- **Repeating patterns / textures**: a faint **dot grid** at 8 px or 16 px spacing, ~3% opacity, for engineering-drawing affect. Never wallpaper textures.
- **Full-bleed imagery** is reserved for marketing heroes and section dividers. UI rarely uses imagery in-frame; the geometry is the imagery.

### Animation

- **Easing**: `cubic-bezier(0.2, 0.8, 0.2, 1)` for entrances, `cubic-bezier(0.4, 0, 1, 1)` for exits. Variable name: `--ease-precise`.
- **Durations**: 120 ms for micro (hover, tap), 220 ms for state changes, 480 ms for scene transitions.
- **Motion vocabulary**: cross-fades, translate-in by 4–8 px, scale by 2–3%. **No bounces. No springs. No parallax.** The motion equivalent of a milled tool.
- **Loaders**: when the engine is computing, show a live **progress trace** (numeric % + log line stream), never a generic spinner.

### Hover & press

- **Hover**: brighten brand color by ~6% lightness; on neutrals, raise surface by one level (`turf-900 → turf-850`). Hairline border flips from `--line-soft` to `--line-strong`. **No shadow lifts.**
- **Press**: scale `0.985`, darken brand by ~10%. 80 ms ease-in.
- **Focus**: 1.5 px outline in `--putter-500` at 2 px offset. Never `outline: none` without a replacement.

### Borders & lines

- **Hairlines are the language.** 1 px solid `--line-soft` (`rgba(255,255,255,0.08)` on dark, `rgba(0,0,0,0.10)` on light) everywhere two regions meet.
- Stronger lines (`--line-strong`, `rgba(255,255,255,0.16)`) on active/selected states.
- **Never** double borders. **Never** dashed borders except for engineering drawings (e.g. construction lines on a CAD render).

### Shadow system

Shadows are minimal — this is a precision-engineering aesthetic, not a soft material UI.

- `--shadow-1`: `0 1px 0 rgba(0,0,0,0.4)` — separator emphasis only.
- `--shadow-2`: `0 8px 24px -8px rgba(0,0,0,0.5)` — floating panels (menu, toast).
- `--shadow-3`: `0 24px 64px -16px rgba(0,0,0,0.6)` — modals.
- **No glow shadows. No colored shadows.** Elevation is communicated by hairlines and surface lightness, not by drop shadow.

### Capsules vs. cards

- **Cards**: 4 px radius, hairline border, no shadow at rest, surface = `--turf-850`. Padding usually `24px`.
- **Capsules** (chips, status pills): 2 px radius (almost rectangular), used for tags, status, units. Never fully round — TapIn is rectilinear.
- **Buttons**: 2 px radius, height 36 px (default), 28 px (compact), 44 px (hero).

### Corner radii

A tight, near-sharp scale. The brand reads as machined, not friendly.

| Token | Value | Usage |
|---|---|---|
| `--radius-0` | `0` | engineering tables, axis frames |
| `--radius-1` | `2px` | buttons, chips, inputs |
| `--radius-2` | `4px` | cards, modals, panels |
| `--radius-3` | `8px` | hero media, full-bleed imagery |

Never above 8 px. Never fully rounded except for indicator dots.

### Transparency & blur

- **Blur is rare.** Used only on the engine's floating command palette (`backdrop-filter: blur(20px)` over `rgba(11,15,13,0.6)`) and on modal backdrops.
- **Transparency** is structural, not decorative: hairlines, dot grids, the protection gradient over imagery, and overlay scrims at `rgba(11,15,13,0.72)`.

### Layout

- **Grid**: 12-column desktop, 80 px outer gutter, 24 px inter-column. The grid is **visible** in the engine UI (faint dot grid background). In marketing, it's invisible but enforced.
- **Spacing scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. No values between.
- **Fixed elements**: the engine's top status bar (40 px), left rail (56 px collapsed, 240 px expanded), bottom log dock (180 px when open). Marketing pages have no fixed chrome — content scrolls clean.
- **Density**: high in the engine (it's a precision tool). Low/airy in marketing (it's a statement).

### Imagery color vibe

- **Cool, slightly desaturated, with engineering overlays.** Think technical photography under fluorescent light, not warm Augusta-green sunshine.
- Photographs of metal: high-contrast, slight cyan cast in shadows.
- Photographs of people: rare. When used, players are mid-stroke, head-down, face not central. Desaturated to about 40%, cool grade.
- Renders dominate over photos. The brand prefers showing the geometry to showing the golfer.

---

## ICONOGRAPHY

TapIn uses a single line-style icon set: **Lucide** (loaded from CDN as a substitution — the canonical TapIn set should be a custom titanium-thin engineering glyph family). All icons:

- **1.5 px stroke** weight, never filled.
- **20 px** default size in UI, **16 px** in dense rows, **24 px** in hero contexts.
- **Stroke color** inherits from text color via `currentColor`.
- **No background** behind icons. Never circle-wrapped.

Custom engineering glyphs (mass center, moment arrow, isoline contour, modal shape, lattice cell) live in `assets/glyphs/` and are inline SVG snippets. These are the **TapIn-original** glyphs — every other icon is Lucide.

**Emoji**: never used. Anywhere.

**Unicode as icon**: occasionally — `→`, `·`, `±`, `µ`, `Δ`, `∇`, `²`, `³` appear naturally in prose and labels. These are content, not icons.

### Loading icons
```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="circle-dot"></i>
<script>lucide.createIcons();</script>
```

---

## Caveats & substitutions

These are the places this system is making a guess. Confirm or replace.

1. **Logo is user-supplied** — combo lockup of a geometric putter-heel mark above the Inter Bold wordmark. The mark depicts a putter viewed from the heel: horizontal head bar + vertical shaft.
   - `assets/logo-tapin.svg` — combo lockup (mark + wordmark), `currentColor`. Use this in most contexts.
   - `assets/logo-tapin-mark.svg` — mark only, for compact / small contexts (app icon, favicon, social avatar).
   - `assets/logo-tapin-wordmark.svg` — wordmark only, for tight horizontal chrome (nav, topbar).
   - `assets/logo-tapin-combo.svg` and `assets/logo-tapin-original.svg` — preserved originals with literal `#0A0A0A` fills.
2. **No real product photos / CAD renders** — visualizations in cards and UI kits are SVG-generated approximations (isoline maps, wireframes). Replace with actual engine output.
3. **Fonts are open-source** — Inter and IBM Plex Mono load from Google Fonts. If the team has licensed display/UI fonts, drop them into `fonts/` and update the `@font-face` block in `colors_and_type.css`.
4. **Icon set is Lucide via CDN** — the canonical TapIn set could be tuned thinner. Custom engineering glyphs live in `assets/glyphs/`.
5. **Color accents are interpretive** — the green and orange are chosen to read "computational golf"; the exact brand hex is unconfirmed. The brand black `#0A0A0A` is taken from the supplied wordmark.
6. **Voice samples are inferred** — content fundamentals are extrapolated from the LEAP 71 reference and the mission tone.

---

## Index

```
README.md                    — this file
SKILL.md                     — Agent Skills entry point
colors_and_type.css          — design tokens (CSS variables) + font @font-face
fonts/                       — webfonts (Inter, IBM Plex Mono — Google Fonts)
assets/
  logo-tapin.svg             — combo lockup (mark + wordmark), currentColor
  logo-tapin-mark.svg        — putter-heel mark only
  logo-tapin-wordmark.svg    — Inter Bold wordmark only
  logo-tapin-combo.svg       — combo lockup, literal #0A0A0A
  logo-tapin-original.svg    — original supplied wordmark
  glyphs/                    — custom engineering glyphs (SVG)
  imagery/                   — placeholder CAD/isoline visuals
preview/                     — design-system cards (registered for the Design System tab)
ui_kits/
  engine/                    — the computational platform UI kit
    README.md, index.html, components/*.jsx
  marketing/                 — tapin.golf marketing UI kit
    README.md, index.html, components/*.jsx
```
