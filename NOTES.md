# Notes

## Toggles
embedded-tutor: on

## House rules (non-negotiable)
- **Composition is LEFT-TO-RIGHT by juxtaposition:** `fg` read "f then g" — for `A \xrightarrow{f} B`, `B \xrightarrow{g} C` the composite is `A \xrightarrow{fg} C`. NO semicolon, NEVER `g ∘ f`. Unit law: `id_A f = f = f id_B`. Associativity: `(fg)h = f(gh)`. Translate cited sources (reverse their `g∘f`).
- **Morphisms declared in labeled-arrow style:** `$A \xrightarrow{f} B$`, not `f : A → B`. EXCEPTION — **named maps use colon style:** when a map has a name written before it or a complex/subscripted label (e.g. induced hom-map `$F_{A,B} : \mathcal{C}(A,B) \to \mathcal{D}(F(A),F(B))$`, hom-functor `$\mathcal{C}(A,-) : \mathcal{C} \to \mathbf{Set}$`), use `name : dom \to cod` with a plain arrow `\to`, not `\xrightarrow` (a wide overscript renders badly).
- **Functor-image composites get a thin space:** keep parens on application; separate composed image factors with `\,`, e.g. `$F(f)\,F(g)$`, `$\pi_1(f)\,\pi_1(g)$`. Single applications unchanged. Composition is still juxtaposition; the space is only for legibility.
- **All math written as LaTeX, rendered by MathJax 3** — `$…$` inline, `\[…\]` display; lessons + reference docs load MathJax with `startup.typeset: true`. House LaTeX: `\mathcal{C}` (categories), `\mathbf{Set}`/`\mathbf{Grp}` (named categories), `\mathrm{id}`, `\mathcal{C}^{\mathrm{op}}`. **Switched from native MathML on 2026-06-16** — MathML was far too verbose to author; tradeoff accepted: math now depends on the MathJax CDN (won't render offline / when the CDN is blocked). **Commutative diagrams still use inline SVG.** See [[notation-use-latex-mathjax]].
- **No mid-expression line breaks:** `mjx-container { white-space: nowrap; }` (in `lessons/lesson.css`) so an inline formula never wraps mid-expression.
- **Fully define every load-bearing term at introduction** — no informal/hand-wavy glosses. (Caught: "collection" used undefined.) Watch the deceptively simple words CT leans on: collection, class, universe, family.

## Learner preferences
- Mathematically mature; treats early material (definition of a category, basic examples) as review. Pitch accordingly — don't over-explain foundations, do press on precision and recall.
- Learning largely for fun / intellectual pleasure; no time pressure (see MISSION.md).
- Likes to generalize from fields already known (calculus, group theory, number theory, geometry, statistics, probability) — lean on these for examples and analogies.

## Working notes
- API mode is ON. Key lives in `config.local.js` at workspace root (gitignored). Lessons load it via `<script src="../config.local.js"></script>` and call the Messages API directly with `claude-opus-4-8` for proof/concept grading.
- Every embedded-grader lesson must keep the self-graded fallback path.
- **Grading credits named concepts:** the learner is fluent — correctly naming a standard concept earns full marks (no need to restate its definition, e.g. "associative" suffices for the associativity axiom). But vague non-naming ("the usual axioms hold") earns nothing. Build both halves into every grader prompt and mirror in the self-grade rubric.
- **MathJax in the tutor UI:** lessons load MathJax (`startup.typeset=false`) ONLY for the live LaTeX answer-preview and for rendering the tutor's MathML feedback. Authored content stays native MathML. Grader is told to emit MathML.
- **Pedagogy: go slower, motivate, use history.** Make each definition feel inevitable (motivate it, give significance beyond one theorem, appeal to history). NOT a relaxation of "no teaching-method talk in lessons" — this is subject motivation.
- **Practice from Riehl, cited.** Draw exercises from Riehl's _Category Theory in Context_; verify exact numbers via the PDF (`pypdf` installed); cite precisely. Riehl §1.2 = Duality/opposite, §1.3 = Functoriality.
- **Theorem toolkit:** `reference/THEOREMS.html` is a growing, cited catalogue (established / to-prove / target=Yoneda). Add results as lessons establish/rely on them.
- **Assessment layout (every lesson):** (1) dropdown quick-recall (no API, per-option misconception feedback); (2) separate recall boxes — one per distinct concept — with **table rubrics** (partial credit) and AI + self grading; (3) Riehl practice as graded blocks too. One generalized class-based script (`.grader` + `PROMPTS` map, `.quiz-q`). See memory `lesson-assessment-architecture`.
- **NOTE:** the "two grading buttons" and "lessons are subject-only" rules now live in the `/teach` SKILL.md itself (moved there), not in this file.
