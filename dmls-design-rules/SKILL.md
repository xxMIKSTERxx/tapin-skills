---
name: dmls-design-rules
description: Design rules for metal additive manufacturing (DMLS, SLM, binder jet) printing of TapIn's putter heads. Use this skill when designing or reviewing geometry that will be metal-printed, evaluating printability of a CEM output, or building the design-rule checker module. Skeleton skill — TapIn's Researcher will fill in vendor-specific specifics as Goal 4 (Print Readiness) opens. Do NOT use this skill for plastic FDM/SLA printing or for casting/machining design rules — those are different worlds.
---

# DMLS / Metal AM Design Rules

This skill is currently a **skeleton with TODOs**. The Researcher agent fills it in as the company moves toward Goal 4 (Print Readiness). For now, it captures known-good general rules and flags the open questions.

## Status: skeleton

Goal 2 (Studio MVP) only requires STL output. STEP export, conformance to specific print-house tolerances, and detailed support strategy are Goal 4 work.

## What DMLS / SLM is

DMLS (Direct Metal Laser Sintering) and SLM (Selective Laser Melting) are powder-bed fusion processes:
1. A bed of fine metal powder (~30–50 μm grain) is laid down.
2. A laser fuses powder where the part should exist for that layer.
3. The bed lowers, more powder is laid, the next layer is fused.
4. Repeat for thousands of layers (typical layer thickness 30–60 μm).
5. Excess powder is removed, the part is cut from the build plate, surface treated.

Binder jet is similar but uses a binding fluid + a sintering oven step instead of laser fusion.

## Materials TapIn targets

| Material | Density (g/cc) | Notes |
|---|---|---|
| 316L stainless steel | 8.0 | Good corrosion resistance, common, moderate cost |
| 17-4PH stainless | 7.8 | Higher strength, ages-hardenable |
| Ti6Al4V (titanium) | 4.4 | Light, strong; ~3× the cost of stainless |
| Tungsten (inserts only) | 19.3 | For weight ports — extreme density tuning |

## Generally-applicable design rules

These hold across most DMLS print houses. Specific vendors may tighten or relax — TODO: collect vendor-specific tolerances when we choose a print house.

### Wall thickness
- **Minimum:** 0.4 mm (Ti6Al4V), 0.5 mm (stainless)
- **Recommended minimum:** 0.8 mm for structural surfaces
- **Practical for putters:** 1.5+ mm everywhere except face thin sections

### Overhangs and supports
- Self-supporting angle: typically ≥45° from horizontal
- Below 45°: requires support structures (added by the print house, removed in post)
- **Putter implication:** orient the build with the sole down, supports under any toe/heel cantilevers

### Internal channels
- **Minimum diameter:** 1.0 mm (powder removal limit — smaller channels trap unfused powder)
- **Recommended:** 2.0 mm if the channel is closed (no powder-removal hole)
- **Putter implication:** weight cavities for tungsten inserts must have a powder-removal pathway

### Surface finish
- **As-printed:** Ra ~6–12 μm (rough, granular)
- **Polished:** Ra ~0.8–1.6 μm (achievable on accessible surfaces)
- **Putter implication:** the face must be polished to be playable. Internal cavities likely stay as-printed.

### Tolerances
- **Linear:** ±0.1 mm or ±0.1% of dimension, whichever is larger
- **Angular:** ±0.5°
- **Putter implication:** loft and lie are within tolerance directly. Face flatness is post-process work.

### Warpage and residual stress
- Long thin sections warp during cooling. Mass concentration helps.
- Orient the build to minimize stress accumulation along the longest axis.
- **Putter implication:** putter heads are compact enough that warpage is rarely critical.

## TapIn-specific rules (TODOs)

- [ ] **TODO (Researcher):** Choose a primary print house. Candidates: Shapeways, Sculpteo, Protolabs, i.materialise. Compare on: putter-relevant materials, minimum wall thickness, post-processing options, lead time, cost per kg, MOQ.
- [ ] **TODO (Researcher):** Get the chosen vendor's published design guide. Translate to a machine-readable rule set (JSON or YAML) the design-rule checker can validate against.
- [ ] **TODO (Researcher):** Source physical samples — print at least one putter head to validate the rule set against reality. Document any deltas between the published rules and what actually printed cleanly.
- [ ] **TODO (CEM Engineer):** Build the design-rule checker module. Inputs: PicoGK voxel field. Outputs: list of rule violations with locations, severity, and suggested fixes. Run as part of the export pipeline before STL generation.
- [ ] **TODO (Researcher):** Document support-removal access points. Any geometry that can't be reached for support removal post-print is a fail.

## Putter-specific gotchas (anticipated)

These are educated guesses; validate empirically when print samples come back.

- **Hosel attachment** is a long thin cantilever. Likely needs supports unless oriented vertically. May warp.
- **Weight-port cavities** if hollow with tungsten inserts: powder-removal pathway is critical. Either an open back or a removal hole.
- **Cavity-back geometry** (mallets often have a cavity behind the face): self-supporting if angled correctly, otherwise needs internal supports that are unreachable to remove.
- **Sight lines as raised geometry**: minimum feature width is below the typical 0.4 mm wall minimum — sight lines should be engraved (recessed), not raised.
- **Face flatness**: as-printed surface roughness will require post-process face milling. Account for ~0.5 mm of material to remove on the face.

## When to use this skill

- Reviewing any putter geometry for printability.
- Building or extending the design-rule checker.
- Choosing print orientation in the export pipeline.
- Estimating print cost (rough rule: cost ≈ mass × material rate × 1.5–2.0 to cover post-processing).
- Investigating why a specific design failed to print.

## When NOT to use this skill

- For non-AM processes (machining, casting, forging — completely different rules).
- For plastic prototyping (FDM, SLA — different rules, different audience).
- For finished-product surface specs after polishing (those are a separate concern).
