# Notes

## Toggles
embedded-tutor: on

## House rules (non-negotiable)
- **Composition is LEFT-TO-RIGHT by juxtaposition:** `fg` read "f then g" — for `A \xrightarrow{f} B`, `B \xrightarrow{g} C` the composite is `A \xrightarrow{fg} C`. NO semicolon, NEVER `g ∘ f`. Unit law: `id_A f = f = f id_B`. Associativity: `(fg)h = f(gh)`. Translate cited sources (reverse their `g∘f`).
- **Morphisms declared in labeled-arrow style:** `A \xrightarrow{f} B` (LaTeX source-of-truth), not `f : A → B`. MathML: `<mover><mo>⟶</mo><mi>f</mi></mover>`. EXCEPTION — **named maps use colon style:** when a map has a name written before it or a complex/subscripted label (e.g. induced hom-map `F_{A,B} : 𝒞(A,B) → 𝒟(F(A),F(B))`, hom-functor `𝒞(A,−) : 𝒞 → Set`), use `name : dom → cod` with a plain arrow, not an overarrow (a wide overscript renders badly).
- **Functor-image composites get a thin space:** keep parens on application; separate composed image factors with `<mspace width="0.2em"/>`, e.g. `F(f) F(g)`, `π₁(f) π₁(g)`. Single applications unchanged. No semicolon / no explicit operator — composition is still juxtaposition; the space is only for legibility.
- **All math rendered as native MathML** (`<math>…</math>`) — zero-dependency, offline, accessible, prints well. No Unicode-only math, no MathJax/KaTeX, **no code/monospace styling for math**. **Commutative diagrams use inline SVG** (MathML can't do them).
- **No mid-expression line breaks:** `math { white-space: nowrap; }` so a morphism expression never wraps (no orphaned codomain).
- **Lessons contain ONLY subject content** — never discuss pedagogical tools/motivations (fluency vs storage, testing effect, spacing, calibration) inside a lesson. Keep the exercise; cut the narration about why it's there. Method-talk happens in chat.
- **Fully define every load-bearing term at introduction** — no informal/hand-wavy glosses. (Caught: "collection" used undefined.) Watch the deceptively simple words CT leans on: collection, class, universe, family.

## Learner preferences
- Mathematically mature; treats early material (definition of a category, basic examples) as review. Pitch accordingly — don't over-explain foundations, do press on precision and recall.
- Learning largely for fun / intellectual pleasure; no time pressure (see MISSION.md).
- Likes to generalize from fields already known (calculus, group theory, number theory, geometry, statistics, probability) — lean on these for examples and analogies.

## Working notes
- API mode is ON. Key lives in `config.local.js` at workspace root (gitignored). Lessons load it via `<script src="../config.local.js"></script>` and call the Messages API directly with `claude-opus-4-8` for proof/concept grading.
- Every embedded-grader lesson must keep the self-graded fallback path.
- **Grading credits named concepts:** the learner is fluent — correctly naming a standard concept earns full marks (no need to restate its definition, e.g. "associative" suffices for the associativity axiom). But vague non-naming ("the usual axioms hold") earns nothing. Build both halves into every grader prompt and mirror in the self-grade rubric.
