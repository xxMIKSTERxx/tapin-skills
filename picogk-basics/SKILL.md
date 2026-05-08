---
name: picogk-basics
description: PicoGK fundamentals for TapIn's geometry work. PicoGK is the open-source computational geometry kernel TapIn uses (instead of building its own). Use this skill when you are the Geometry Engineer working on shape generation, when the CEM needs to instruct PicoGK to produce a body, or when reviewing PicoGK code. Skeleton skill — fills in as the team uses the kernel. Do NOT use this skill for traditional CAD operations (PicoGK is implicit/voxel, not BREP) or for non-geometry parts of the codebase.
---

# PicoGK Basics

This skill is currently a **skeleton with TODOs.** The Geometry Engineer fills it in with patterns that work in TapIn's specific environment as Goals 1 and 2 progress.

## Status: skeleton

PicoGK is officially supported on Windows. TapIn runs on Linux. We expect to build PicoGK from source in the .NET 8 container. The Geometry Engineer's first Issue will be: get PicoGK to produce a hello-world cube and export STL inside our container.

## What PicoGK is

PicoGK is a **computational geometry kernel** — an alternative to traditional BREP CAD systems. It uses **implicit / voxel-based representations:** instead of representing a shape as a boundary mesh (BREP), it represents the shape as a function from 3D space to "is this point inside?" The kernel uses OpenVDB under the hood for sparse voxel storage.

LEAP 71 uses PicoGK as the geometry engine for their Noyron CEM that designs rocket engines computationally. TapIn applies the same architecture to putters.

### Why PicoGK over traditional CAD

- **Boolean operations are robust.** No BREP topology bugs — voxel intersection is just point-set algebra.
- **Generative-friendly.** Easy to compose primitives, deform, blend, offset, fillet, lattice.
- **Implicit blending.** Smooth transitions between primitives, naturally.
- **Voxel integration is straightforward.** Mass, MOI, surface area — all integrals over the voxel field.

### Costs

- **STEP export is hard.** PicoGK exports STL natively; STEP requires post-processing (potentially via OpenCascade) to convert voxel boundary to BREP.
- **Memory scales with resolution.** High-res voxel fields can eat GB of RAM.
- **Fewer tools natively.** Most CAD tooling assumes BREP.

## Repository

- **Source:** github.com/leap71/PicoGK (open source, Apache 2.0)
- **Language:** C# / .NET
- **TapIn's intended approach:** use PicoGK as a library, never fork. If we need to extend, we wrap.

## Core concepts (TODO: Geometry Engineer to expand)

- [ ] **Voxel** — the fundamental unit. A 3D pixel with an SDF (signed distance) value: negative inside, positive outside, zero on the surface.
- [ ] **VoxelField** — a 3D grid of voxels. PicoGK uses OpenVDB for sparse storage.
- [ ] **Primitives** — sphere, box, cylinder, etc. Each defines an SDF.
- [ ] **Boolean ops** — union (min of SDFs), intersection (max of SDFs), difference (max of SDF and -SDF).
- [ ] **Transforms** — translate, rotate, scale, applied to the SDF input.
- [ ] **Offset / shell** — modify the surface to be a thin shell of given thickness.
- [ ] **Mesh extraction** — convert the voxel field to a triangle mesh (for STL export). Marching cubes typically.

## Setup steps (TODO)

- [ ] Document the .NET 8 setup that builds PicoGK on Linux
- [ ] Document the OpenVDB dependency installation in the container
- [ ] Resolve any platform-specific build issues
- [ ] Capture the working `Dockerfile` snippet for the Studio's geometry container

## Hello-world target

The first Geometry Engineer Issue produces this:

```csharp
// Pseudocode — actual API to be confirmed by Geometry Engineer
var box = new Box(width: 100, height: 50, depth: 50);  // millimeters
var voxelField = box.ToVoxels(resolution: 0.5);  // 0.5mm voxel size
var mesh = voxelField.ExtractMesh();
mesh.SaveStl("/tmp/hello-cube.stl");
```

If this runs, exits cleanly, and produces a valid STL file we can open in a viewer, the geometry stack is alive.

## Putter-specific patterns (TODO — fill in as Goal 2 develops)

Anticipated patterns the Geometry Engineer will document:

- [ ] How to construct a parametric blade head from heel-to-toe, height, width parameters
- [ ] How to construct a parametric mallet head from heel-to-toe, depth, height, weight-port array
- [ ] How to add a face with a specified loft angle
- [ ] How to add a hosel with specified offset and lie angle
- [ ] How to embed a tungsten weight port (a separate material region)
- [ ] How to engrave a sight line on the crown
- [ ] How to compute mass and MOI from the voxel field
- [ ] How to export to STL with proper triangle quality
- [ ] How to validate against the design-rule checker before export

## Performance heuristics (TODO)

Once the Geometry Engineer has runtime data:

- [ ] What voxel resolution is good enough for visual review?
- [ ] What resolution for export?
- [ ] How much memory does each resolution use?
- [ ] How long does mesh extraction take per parameter change?
- [ ] What's the maximum interactive frame rate we can achieve in the parameter panel?

## Failure modes the Geometry Engineer will encounter (anticipated)

- **OOM at high resolution.** Solution: use sparse storage features, or lower resolution.
- **Mesh extraction artifacts.** Solution: tweak resolution and isovalue; sometimes a slightly different threshold cleans up jagged boundaries.
- **Slow boolean ops on complex geometry.** Solution: simplify before combining; use bounding-volume hierarchies if available.

## When NOT to use this skill

- For .NET / C# language patterns (those are a separate concern).
- For BREP/STEP-related work (PicoGK is voxel; if we need BREP, we use OpenCascade or similar).
- For mesh repair, DMLS-specific orientation, or print-path generation (those are downstream).
