---
name: putter-domain
description: Putter terminology, anatomy, families, and physics primer for TapIn's engineers and researchers. Use this skill any time you are working on a CEM or geometry Issue, reviewing putter-related work, or writing Issues that reference putter parts. Includes the "feeling" decomposition (balance, forgiveness, sound, impact response), face geometry conventions, USGA conformance basics, and units. Do NOT use this skill for general golf terminology, marketing/sales topics, or for shafts/grips (out of scope for TapIn).
---

# Putter Domain Reference

This skill is the shared vocabulary for TapIn engineers, researchers, and the CEO. It does not duplicate authoritative texts (Pelz, Search for the Perfect Putter, USGA rules); it gives the operational subset TapIn uses.

## Putter anatomy

Top view (looking down at address):
crown / top line
                      |
                      v
    +------------------------------+
    |  heel ----- face ----- toe   |
    +------------------------------+

Face-on view (looking at the face from in front):
shaft
axis
|       top
|       ^
+---hosel
|
v
--- face ---
bottom / sole

### Glossary

| Term | Meaning |
|---|---|
| **Face** | The front surface that contacts the ball. Almost flat, with a small loft angle (typically 2°–4°). |
| **Heel** | The end of the head closest to the shaft. |
| **Toe** | The end of the head farthest from the shaft. |
| **Sole** | The bottom of the head, contacts the ground. |
| **Crown / top line** | The top surface of the head, visible at address. |
| **Hosel** | The neck connecting the head to the shaft. Defines the offset and shaft attachment angle. |
| **Offset** | Lateral distance between the leading edge of the face and the leading edge of the shaft. Positive offset = face is behind the shaft (helps square up the face at impact). |
| **Lie angle** | Angle between the shaft axis and the ground when the sole sits flat. Typically 70°. |
| **Loft** | Angle of the face from vertical. Putters have small loft (2°–4°) to lift the ball out of any surface depression. |
| **Sweet spot** | The point on the face where impact produces minimum twisting (i.e., where moment of inertia is highest about the perpendicular axes). |
| **Insert** | A separate material in the face (e.g., elastomer, copper, lighter metal) to tune sound and feel. |
| **Sight line** | A visual aid on the crown (line, dot, T) that helps alignment at address. Functional but not load-bearing. |

## Putter families

TapIn distinguishes two families. Almost all modern putters fit one. The CEM treats them as different parametric models.

### Blade

- Thin, narrow head
- Mass concentrated near the face
- Low MOI — less forgiving but more "feel" feedback
- Traditional aesthetic
- Examples: Anser-style, Newport-style

### Mallet

- Large, deep head extending behind the face
- Mass distributed toward the back and outer edges
- High MOI — more forgiving on off-center hits
- More room for alignment aids and weight ports
- Examples: Spider, Phantom, 2-Ball

For TapIn's MVP, support **both families** but have the Director pick one to ship first. Suggested first: **mallet** (more dramatic geometry → easier to demonstrate computational design value; more weight-port flexibility → showcases CEM's customization capability).

## The "feeling" decomposition

TapIn's CEM addresses feel as four measurable physical quantities. This is restated from the company vision but is foundational and worth repeating in this domain context:

### 1. Balance

- **What:** Center of mass (CoM) location relative to the face plane and the shaft axis.
- **Why it matters:** Affects how the putter feels at address and during the stroke. Toe-heavy = wants to release; heel-heavy = wants to stay open; balanced = neutral.
- **CEM output:** A 3D point (x, y, z) for the CoM, in head coordinates (origin at the geometric center of the face).
- **Tunable via:** Mass distribution along heel-toe axis, weight ports, head depth.

### 2. Forgiveness

- **What:** Moment of inertia (MOI) about three principal axes — vertical (yaw), horizontal heel-toe (roll), horizontal face-back (pitch).
- **Why it matters:** Higher MOI = less twisting on off-center impact = ball goes closer to the intended line.
- **CEM output:** A 3x3 inertia tensor, or three principal MOIs in g·cm².
- **Tunable via:** Mass distribution, head size, weight placement at the perimeter, density tuning (e.g., tungsten inserts at the toe).

### 3. Sound

- **What:** Modal frequencies of the head when struck. Each putter has a characteristic "ping" or "thud" determined by its first few normal modes.
- **Why it matters:** Players strongly associate sound with feel and confidence. Hollow, dull, sharp, ringing — all preferences.
- **CEM output:** First 5–10 modal frequencies (Hz) and their modal damping ratios. Phase 3 — not in MVP.
- **Tunable via:** Head shape, material, internal cavities, inserts (especially face inserts and back-cavity foams).

### 4. Impact response

- **What:** Contact dynamics between face and ball. Includes restitution, contact time, vibration transmitted to the hands.
- **Why it matters:** "Soft," "firm," "clicky" feel descriptions all map to impact mechanics.
- **CEM output:** COR (coefficient of restitution), contact duration (μs), peak force (N), face-deflection peak. Phase 3 — not in MVP.
- **Tunable via:** Face material, insert material and thickness, cavity backing.

For Goal 2 (MVP), only **Balance** and **Forgiveness** are in scope. Sound and Impact response are Goal 3.

## USGA conformance (basic)

The USGA Equipment Standards govern competition putters. A putter must:

- Have a single shaft attachment to the head (no double-shafted chippers, etc.)
- Have a face that is not concave (cannot be a true scoop)
- Have dimensions within published limits (head length, width, height)
- Not have moving parts in the head (excludes some adjustable-weight designs unless the weights lock)
- Use materials within published categories

For TapIn's MVP, the conformance check is a **bounds check**: head dimensions, shaft attachment count, face flatness. The exhaustive list lives in `dmls-design-rules` once we develop it. **Conformance failures are blocking** for any export — agents do not produce non-conforming designs.

## Coordinate system and units

TapIn standardizes on:

- **Origin:** Geometric center of the face, at the face plane.
- **X axis:** Heel-to-toe direction (positive = toe).
- **Y axis:** Face-to-back direction (positive = back of head).
- **Z axis:** Sole-to-crown direction (positive = up).
- **Units:** Millimeters for length, grams for mass, g·cm² for moment of inertia.
- **Angles:** Degrees, never radians, in user-facing UI. Internal CEM math may use radians but converts at boundaries.

This coordinate system is right-handed and matches PicoGK's default.

## Reference dimensions (for sanity checks)

| Quantity | Typical range | Notes |
|---|---|---|
| Head mass | 340–380 g | Below ~330 = unlikely playable; above ~390 = unusual |
| MOI (yaw, mallet) | 4500–6500 g·cm² | High MOI mallets reach 7000+ |
| MOI (yaw, blade) | 2500–4500 g·cm² | Lower than mallets by design |
| Loft | 2°–4° | Beyond 5° = unusual |
| Lie angle | 68°–72° | Standard is 70° |
| Length (heel-to-toe) | 90–145 mm | Blades 100–115; mallets 115–145 |

If the CEM produces a putter outside these ranges, that's an alert (not necessarily an error — could be a deliberate design exploration). Flag it in the Issue comment.

## Out of scope for TapIn (do not work on)

- Shafts (length, flex, kick point, material). The Studio assumes a standard 34" steel shaft.
- Grips (size, shape, material). The Studio assumes a standard pistol grip.
- Putter covers, accessories, packaging.
- Marketing copy, brand identity, e-commerce.
- Fittings, customer measurements, posture analysis.

If an Issue mentions any of these, it's outside TapIn's current scope. Decline politely with a comment noting the scope boundary.
