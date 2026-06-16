# REVIEW-QUEUE.md Format

`REVIEW-QUEUE.md` is the spacing engine. It is what makes spacing a thing the workspace *does*, not a principle it merely believes in. It holds retrieval items scheduled for re-testing at expanding intervals, implementing **distributed practice** and **successive relearning** (the two highest-utility techniques; see [SKILL.md](./SKILL.md) → The Evidence Hierarchy).

Create it lazily — the first time a lesson produces something worth retaining.

## What an item is

One item = one thing to retrieve. Not a lesson, not a topic — a single cue the learner must answer from memory. A lesson usually spawns one or a few items.

Each item carries:

- **Prompt** — the retrieval cue shown to the learner. The recall target must **not** appear in it (see Assessment Design).
- **Answer / pointer** — the target, or a link to the lesson/reference that holds it.
- **Introduced** — date first added (absolute, e.g. `2026-06-16`).
- **Due** — date it should next be retrieved.
- **Box** — the current interval stage (see scheduling).
- **Last result** — `pass` / `fail` and date, so you can see history at a glance.

## Structure

A markdown table is fine for a small queue; group under topic subheadings as it grows.

```md
# {Topic} Review Queue

| Prompt | Answer / pointer | Introduced | Due | Box | Last result |
|---|---|---|---|---|---|
| State the universal property of a product object. | → lesson 0007 | 2026-06-16 | 2026-06-19 | 2 | pass 2026-06-16 |
| What does `Application.ScreenUpdating = False` buy you, and what must you never forget? | Speed; must reset to True. → lesson 0003 | 2026-06-10 | 2026-06-26 | 4 | pass 2026-06-12 |
```

## Scheduling — expanding intervals (Leitner-style)

Items move through boxes; each box is a longer interval. On a successful retrieval, the item advances to the next box (longer wait). On a failure, it drops back to Box 1 (retest soon). This concentrates effort on what's weak and lets mastered items recede.

A simple, well-supported interval ladder:

| Box | Next interval after a pass |
|---|---|
| 1 | 1 day |
| 2 | 3 days |
| 3 | 7 days |
| 4 | 16 days |
| 5 | 35 days |
| 6 | graduate (see below) |

On **pass**: advance one box, set `Due = today + new box's interval`.
On **fail**: reset to Box 1, set `Due = today + 1 day`, and consider re-teaching — a failure is a signal the lesson didn't land, not just that time passed.

The exact numbers matter less than the principle: **intervals expand, failures reset.** Adjust the ladder to the learner and topic.

## Successive relearning

The strongest pattern is spaced retrieval **to a criterion**. Two layers:

- **Within a session**: when an item is due, retrieve it until the learner gets it right *once* before counting the session's result. (For harder material, a criterion of two consecutive correct recalls is reasonable.)
- **Across sessions**: space those criterion retrievals using the box ladder above.

This combines retrieval practice and spacing, which is why it outperforms either alone (Rawson & Dunlosky).

## How sessions use the queue

- **At session start**, pull every item where `Due <= today` and retrieve those *before* teaching anything new. This is the spacing in action — it is not optional.
- **Interleave** when several items are due across different topics: mix them rather than blocking by topic, so the learner practices choosing the right approach, not just executing a known one.
- **Update** each item's Box, Due, and Last result as you go.

## Feeding the queue, and pruning it

- **Add** an item whenever a lesson establishes something durable enough to be worth retaining, and whenever a [[learning-records|learning record]] records genuine understanding.
- **Graduate** items that pass through the last box — they're durable; retesting them is low-value. Move them out (delete, or keep an archived list if you like the record).
- **Prune** items that have gone off-mission or stale. A failing item that keeps resetting may need re-teaching rather than more retrieval — fix the lesson, don't just keep testing.

Keep the queue lean. A tight queue of live items the learner actually retrieves beats a sprawling one they avoid.
