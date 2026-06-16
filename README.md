# Learn Category Theory

A personal, long-running study workspace for **category theory** — built as a sequence of self-contained, interactive lessons that work toward sketching the **Yoneda lemma** and learning to spot universal properties in the wild.

## What's here

| Path | What it holds |
|---|---|
| `lessons/*.html` | Self-contained, printable lessons. Each teaches one tightly-scoped idea and ends in a from-memory retrieval exercise. |
| `reference/GLOSSARY.html` | The canonical vocabulary of the workspace — terms are added only once demonstrably understood. |
| `MISSION.md` | Why this is being learned; grounds what gets taught next. |
| `RESOURCES.md` | Curated, high-trust sources (Mac Lane, Riehl, Leinster, nLab) and communities. |
| `REVIEW-QUEUE.md` | The spacing engine — retrieval items scheduled at expanding intervals. |
| `learning-records/*.md` | What has been demonstrably learned, and what that unlocks next. |
| `NOTES.md` | Working notes and the house style conventions (see below). |

## House conventions

- **Composition is left-to-right by juxtaposition:** `fg` means "`f` then `g`".
- **Morphisms** are declared in labeled-arrow style `A ⟶f B`; **named maps** use `name : dom → cod`.
- **All mathematics is rendered as native MathML** (zero-dependency, offline, accessible, prints well).
- **Lessons contain only subject content** — the learning method is discussed outside them.

## Interactive grading (optional)

Lessons can grade free-form answers using the Anthropic API. This is optional and **degrades gracefully** to a self-scoring rubric when no key is present.

To enable it, create `config.local.js` at the repository root:

```js
window.ANTHROPIC_API_KEY = "sk-ant-...";
```

This file is **gitignored and never committed** — it holds a secret and stays on your machine. Without it, every lesson still works; you just self-grade.

## Credits

The lessons and structure were produced with a **`/teach` skill adapted from [Matt Pocock](https://github.com/mattpocock)**, whose original work this learning workflow is based on. The pedagogy draws on the cognitive science of learning — retrieval practice, spacing, and successive relearning.
