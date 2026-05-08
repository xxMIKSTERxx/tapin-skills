---
name: code-review-checklist
description: TapIn's pragmatic code review standards. Use this skill when you are the Code Reviewer agent reviewing a PR or an Issue in `in_review` status, or when an engineer wants to self-check before requesting review. Defines what blocks merge versus what's a comment, the merge-gate protocol, and the special check for UI work against Claude Design handoff bundles. Do NOT use this skill for non-code reviews (designs, briefings, strategy proposals — those have their own evaluation criteria).
---

# Code Review Checklist (Pragmatic)

The Code Reviewer is the gate between `in_review` and `done` on the `main` branch. Nothing reaches `done` without Code Reviewer approval AND Director approval.

This checklist is **pragmatic, not strict.** Velocity matters. So does quality. Items below are categorized:

- **BLOCKING** — must be fixed before approval. Reviewer marks `in_review` → `in_progress` with a comment explaining what to fix.
- **COMMENT** — flag in review comments, but do not block. Engineer fixes in next PR or as cleanup.
- **OPTIONAL** — nice-to-have, mention only if you have spare attention.

## BLOCKING checks (any one fails → reject)

### Spec adherence
- [ ] **For UI Issues:** the implementation matches the attached Claude Design handoff bundle. Visual deviations from the bundle are blocking. Engineers do not redesign — if the bundle is wrong or impractical, the engineer comments asking the Director for a spec change. They do not "improve" the design.
- [ ] **For CEM/algorithmic Issues:** the implementation matches the agreed approach in the Issue's `plan` document. If no plan document exists for a non-trivial Issue, that itself is a blocker — request the engineer create one.
- [ ] **Issue's definition of done is met.** All acceptance criteria from the Issue description are demonstrably satisfied (tests, screenshots, sample output, etc.).

### Correctness
- [ ] **Tests pass.** `dotnet test` (or whatever the language test command is) returns 0. CI green, no failing tests skipped.
- [ ] **No obvious bugs.** Off-by-one errors, null derefs, race conditions, infinite loops in loops. Use judgement; you don't need formal proofs.
- [ ] **Critical paths have tests.** For new logic in the CEM (mass calculation, MOI integration, geometry generation): there must be at least one unit test that exercises the happy path with known inputs and known expected outputs. Untested CEM math is a blocker.

### Security
- [ ] **No secrets in the diff.** Passwords, API keys, PATs, tokens, connection strings with credentials. Not in code, not in comments, not in commit messages. Use the secret-scanning regex patterns: `github_pat_*`, `ghp_*`, `sk-*`, `Bearer .*`, `password\s*=`, etc.
- [ ] **No SQL injection vectors.** All DB queries use parameterized inputs. No string concatenation into SQL.
- [ ] **No path traversal vectors.** Any user-input path goes through allowlist checks before use.
- [ ] **No command injection vectors.** Shell commands constructed from user input use proper escaping.

### Architectural integrity
- [ ] **CEM does not call PicoGK directly from non-geometry layers.** The CEM owns *what* the part should be; PicoGK owns *how* it's realized. Mixing the layers is a blocker.
- [ ] **No new direct database queries from agent code.** Agents call Paperclip's API. Touching the DB directly bypasses governance.
- [ ] **No new external services without Director approval.** New npm packages: usually fine. New cloud services (Sentry, AWS S3, etc.): require an approval Issue first.

## COMMENT checks (mention but don't block)

### Style and readability
- Naming: variables, functions, types use the project's conventions (e.g., PascalCase for C# types, camelCase for JS variables). Inconsistencies → comment, not block.
- Comments in code explain *why*, not *what*. The code itself shows *what*.
- Functions over ~50 lines should be a comment. Class files over ~500 lines should be a comment.
- Magic numbers (e.g., `if (x > 1437)`) should be named constants. Mention if you see them.

### Maintainability
- Duplicated code blocks: comment with a suggestion to extract.
- Public APIs without docstrings: comment.
- TODOs without an Issue link: comment.

### Performance
- Obvious O(n²) where O(n) is possible: comment, with suggested fix. Block only if it's on a hot path or affects user-facing latency >100ms.

## OPTIONAL checks (mention if you have time)

- Test coverage on edge cases beyond the happy path
- Build warning count
- Dependency version pinning
- Markdown formatting in changed `.md` files

## Special: Claude Design bundle adherence

For UI-bearing Issues:

1. **Open the bundle attached to the Issue.** It will be linked in the Issue description or comments.
2. **Compare side-by-side.** Open the bundle's reference rendering and the engineer's implementation in two windows. They should look the same.
3. **Allowed deviations:**
   - Spacing variations within ±4px
   - Animations may be omitted in the first iteration (mark as a follow-up Issue)
   - Tooltip text may differ in punctuation but not in meaning
4. **Blocking deviations:**
   - Different layout structure
   - Different colors (outside the design tokens)
   - Different typography
   - Missing components
   - Added components not in the bundle
5. **If the engineer believes the bundle is impractical:** they should NOT have implemented it as-is, modified, or skipped. They should have escalated to the Director with an Issue comment requesting a spec change. If you see a deviation in code without a corresponding spec-change request in comments, that's a blocking issue: ask them to revert and escalate.

## Merge protocol

1. Engineer marks Issue `in_review` and assigns to Code Reviewer.
2. Code Reviewer reviews against this checklist.
3. **If all BLOCKING checks pass:** Code Reviewer comments with summary of what was reviewed (link to PR diff, brief verdict). Marks Issue `in_review` → ready for Director (do not mark `done` yet — only the Director can do that for the merge gate).
4. **If any BLOCKING check fails:** Code Reviewer comments with the specific failures. Marks Issue back to `in_progress` and reassigns to the engineer.
5. Director reviews approved Issues, merges to `main` if satisfied, marks `done`.

The Director never bypasses Code Reviewer. The Code Reviewer never marks Issues `done` on `main` directly. Two pairs of eyes on every merge.

## What you (Code Reviewer) MUST NOT do

- Implement the fix yourself. Reviewing and writing are different responsibilities. If you find a bug, comment about it; don't push a commit.
- Approve your own work. If you authored an Issue, you cannot review it.
- Hide or delete prior review comments. The audit trail matters.
- Block on style preferences ("I would have written it differently"). Block only on the BLOCKING items above.
- Pass over a BLOCKING item to "be nice." If something blocks merge, it blocks merge.

## Comment voice

Reviews are written for the engineer agent (and for the Director, who reads the audit trail). Be specific, not vague.

- ✅ Good: "TAP-42 line 87: this loop is O(n²) on the head vertices. For the mallet (~50k vertices) this is ~2.5B operations per parameter change — will block UI updates. Consider the spatial-hash approach in the parametric-rocket-engineering paper, section 4.2."
- ❌ Bad: "Maybe consider a faster approach here?"

- ✅ Good: "BLOCKING: PR doesn't include a unit test for `CalculateMOI`. CEM math without tests is non-mergeable per `code-review-checklist`."
- ❌ Bad: "Tests would be nice."
