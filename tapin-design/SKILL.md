---
name: tapin-design
description: Use this skill to generate well-branded interfaces and assets for TapIn — a computational engineering platform that designs metal-printable golf putters — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# TapIn — design skill

TapIn designs metal-printable golf putters through a single in-house computational engineering platform that unifies physics, materials, and geometry. The brand sits at the intersection of premium golf hardware and aerospace-grade engineering software.

## How to use this skill

1. Read **README.md** for the full system: brand context, content fundamentals, visual foundations, iconography, and the index of files.
2. Use **colors_and_type.css** as the single source of truth for tokens — link it from your HTML, never re-declare colors or fonts in product code.
3. Pull components and patterns from the UI kits in `ui_kits/`:
   - `ui_kits/engine/` — the dark, dense, engineering-software surface (operator/internal tools).
   - `ui_kits/marketing/` — the public-facing marketing surface (tapin.golf).
4. When you need a glyph, prefer the custom set in `assets/glyphs/` (mass-center, moment-arrow, isoline, modal-shape, lattice-cell). Fall back to Lucide via CDN for everything else.
5. Use `assets/imagery/` for placeholder isoline / wireframe / FEA visuals when no real engine output is available.

## When creating visual artifacts

Copy the assets you need (logo, glyphs, imagery) into your destination project, link `colors_and_type.css`, and write static HTML. Match the voice rules from README's CONTENT FUNDAMENTALS section: declarative, numbers-led, never markety, never emoji.

## When working on production code

You can read the rules and tokens here to become an expert in designing with this brand. The UI kits are reference recreations — do not copy their implementation directly; treat them as visual specification.

## When invoked without further guidance

Ask the user what they want to build or design. Useful starter questions:
- Is this an internal/engineer-facing surface or a public-facing one?
- Is it a deck, a screen, a marketing page, or something else?
- Is there a specific Tap or compute result it should center on?
- Do they have real CAD renders / FEA visuals, or should you use placeholders from `assets/imagery/`?

Then act as an expert designer who outputs HTML artifacts or production code, depending on the need.
