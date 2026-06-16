# Category Theory Review Queue

Spacing engine. At the start of each session, retrieve every item with `Due <= today` **before** teaching anything new. On pass: advance one box, push Due out. On fail: reset to Box 1, Due = tomorrow, and consider re-teaching. Interleave when multiple are due.

Box intervals: 1→1d, 2→3d, 3→7d, 4→16d, 5→35d, 6→graduate.

| Prompt | Answer / pointer | Introduced | Due | Box | Last result |
|---|---|---|---|---|---|
| From memory, state the full definition of a category — all data and all laws. | Objects; morphisms `A -f-> B` with dom/cod; composition (left-to-right juxtaposition `fg`); identities; associativity `(fg)h=f(gh)`; unit law `id_A f = f = f id_B`. → lesson 0001 | 2026-06-16 | 2026-06-17 | 1 | — |
| Which two parts of the category definition do people most often drop? | The unit/identity law, and explicitly naming domain & codomain of a morphism. → lesson 0001 | 2026-06-16 | 2026-06-17 | 1 | — |
| Distinguish *small*, *locally small*, and neither — and say why the distinction exists. | Locally small = each hom-collection is a set; small = objects also form a set; prevents Russell-style paradox (e.g. "category of all categories"). → lesson 0001 | 2026-06-16 | 2026-06-17 | 1 | — |
| What is a "collection" (vs a set), and what two foundations make it precise? | Neutral term covering sets and proper classes; a proper class (e.g. class of all sets) is too large to be a set. Made precise by (i) NBG class theory or (ii) a Grothendieck universe 𝒰 (member of 𝒰 = "small"). → lesson 0001 | 2026-06-16 | 2026-06-17 | 1 | — |
| From memory, define a functor `F : 𝒞 → 𝒟` — both data and both laws. | Object assignment; morphism assignment `F(A) -F(f)-> F(B)`; preserves composition `F(fg)=F(f)F(g)`; preserves identities `F(id_A)=id_{F(A)}`. → lesson 0002 | 2026-06-16 | 2026-06-17 | 1 | — |
| A monoid/group homomorphism is the same thing as a functor between *what* categories? | Functors `BM → BN` between the one-object (delooping) categories of the monoids/groups; the two functor laws = the two homomorphism laws. → lesson 0002 | 2026-06-16 | 2026-06-17 | 1 | — |
| What does the hom-functor `𝒞(A,−) : 𝒞 → Set` do on objects and on morphisms? | Object `X ↦ 𝒞(A,X)`; morphism `f:X→Y ↦ (h ↦ hf)`, post-composition. (Gateway to Yoneda.) → lesson 0002 | 2026-06-16 | 2026-06-17 | 1 | — |
| Define `𝒞ᵒᵖ`: objects, morphisms, composition, identities. | Same objects; `𝒞ᵒᵖ(A,B)=𝒞(B,A)` (arrows reversed); composition reversed (𝒞ᵒᵖ-composite "f then g" = 𝒞-composite `gf`); same identities. `(𝒞ᵒᵖ)ᵒᵖ=𝒞`. → lesson 0003 | 2026-06-16 | 2026-06-17 | 1 | — |
| What is a contravariant functor, and how does it relate to `𝒞ᵒᵖ`? | Sends `f:A→B` to `F(B)→F(A)`, preserves identities, reverses composition `F(fg)=F(g) F(f)`. Same data as a covariant functor `𝒞ᵒᵖ → 𝒟`. → lesson 0003 | 2026-06-16 | 2026-06-17 | 1 | — |
| What is a presheaf, and which one is the Yoneda protagonist? | A functor `𝒞ᵒᵖ → Set`. The representable contravariant hom-functor `𝒞(−,A)` (object `X ↦ 𝒞(X,A)`; morphism `f ↦ precompose`, `h ↦ fh`). → lesson 0003 | 2026-06-16 | 2026-06-17 | 1 | — |
| What 1945 paper founded category theory, who wrote it, and what three notions did it define — in what order and why? | Eilenberg & Mac Lane, "General Theory of Natural Equivalences"; defined category → functor → natural transformation, in that order, because the real goal was to make "natural" precise. → lesson 0001 | 2026-06-16 | 2026-06-17 | 1 | — |
