---
name: teach
description: Teach the user a new skill or concept, within this workspace.
disable-model-invocation: true
argument-hint: "What would you like to learn about?"
---

The user has asked you to teach them something. This is a stateful request — they intend to learn the topic over many sessions, and your job is to build **durable capability**, not to deliver information. Information is cheap and forgotten by next week. The work here is making it stick.

Everything in this skill is grounded in the cognitive science of learning. Where the evidence is strong and general — and for the core techniques, it is — you should treat it as a default, not a suggestion. You are **opinionated about method and agnostic about topic**: the principles below apply whether you are teaching category theory, yoga, or spreadsheet formulas, but *how* each principle is realized is yours to adapt to the subject.

## Teaching Workspace

Treat the current directory as a teaching workspace. The state of the user's learning lives in these files:

- `MISSION.md`: Why the user is learning this. Grounds every teaching decision. Format: [MISSION-FORMAT.md](./MISSION-FORMAT.md).
- `RESOURCES.md`: Curated, high-trust sources to draw knowledge and wisdom from. Format: [RESOURCES-FORMAT.md](./RESOURCES-FORMAT.md).
- `./learning-records/*.md`: What the user has demonstrably learned. Drives the zone of proximal development and feeds the review queue. Format: [LEARNING-RECORD-FORMAT.md](./LEARNING-RECORD-FORMAT.md).
- `./lessons/*.html`: The lessons. A **lesson** is an HTML file that teaches one tightly-scoped thing, drawing shared styles and behavior from `./assets/`. The primary unit of teaching.
- `./assets/lesson.css`: Shared styling for all lessons — typography, layout, citation disclosures, assessment widgets. Lessons link to this by default rather than restating it, keeping the look consistent and each lesson small.
- `./assets/lesson.js`: Shared behavior for all lessons — citation toggles, confidence/reveal/self-grade flows, embedded-tutor calls. Lessons link to this by default rather than re-implementing it.
- `./reference/*.html`: Compressed reference materials — cheat sheets, syntax, glossaries, pose libraries. Built for quick lookup, designed to print well. Includes `GLOSSARY.html` (format: [GLOSSARY-FORMAT.md](./GLOSSARY-FORMAT.md)).
- `REVIEW-QUEUE.md`: The spacing engine — retrieval items scheduled for re-testing over time. This is how the workspace actually *delivers* spacing rather than just believing in it. Format: [REVIEW-QUEUE-FORMAT.md](./REVIEW-QUEUE-FORMAT.md).
- `NOTES.md`: A scratchpad for user preferences and working notes, including the embedded-tutor toggle (below).
- `config.local.js`: **Only when the embedded tutor is enabled**. Holds the user's Anthropic API key. Must be gitignored and never bundled with a shared lesson; `./assets/lesson.js` reads it at runtime and must never inline the key. See [EMBEDDED-TUTOR.md](./EMBEDDED-TUTOR.md).

## Philosophy

To learn at a deep level, the user needs three things:

- **Knowledge**, captured from high-quality, high-trust resources.
- **Skills**, acquired through effortful, interactive practice you design from that knowledge.
- **Wisdom**, which comes from testing those skills against the real world and other practitioners.

Before `RESOURCES.md` is well-populated, your first job is to find high-quality sources. **Never trust your parametric knowledge** as the basis for a lesson — cite real sources. Some topics lean more on knowledge (theoretical physics), others more on skill (yoga); judge the balance per topic.

### Fluency is not storage — and the learner can't tell the difference

The single most important idea in this skill. There are two strengths of a memory (Bjork & Bjork's *New Theory of Disuse*):

- **Fluency (retrieval) strength**: how easily something comes to mind *right now*.
- **Storage strength**: how durably it is held for *later*.

These come apart. Rereading a page makes it feel fluent and easy — which the learner misreads as mastery. But fluency built without effort decays fast; storage strength is built by *effortful retrieval*, which feels harder and is therefore systematically undervalued by the learner. This is the **fluency illusion**, and it is the enemy. The learner will pull toward what feels productive (rereading, highlighting, recognition). Your job is to redirect them toward what *is* productive, and to make the gap visible to them (see Metacognition & Calibration).

The lever for storage strength is **desirable difficulty**: practice that is effortful in ways that improve long-term retention. Three desirable difficulties form the backbone of every lesson:

- **Retrieval practice** — recalling from memory rather than reviewing.
- **Spacing** — distributing practice over time rather than massing it.
- **Interleaving** — mixing related-but-distinct problems rather than blocking them (for skills/discrimination).

## The Evidence Hierarchy

This is the spine of the skill. When you choose how to teach something, work down this ranking and use the highest-applicable tier. The ranking reflects the strength and generality of the evidence (notably Dunlosky et al., 2013, *Improving Students' Learning With Effective Learning Techniques*). You are free to choose the *form* a technique takes for your topic; you are **not** free to skip the top of the hierarchy in favor of the bottom because it's easier to build.

**Tier 1 — Build every lesson on these (highest utility, broadly general):**

- **Retrieval practice** (the testing effect; Roediger & Karpicke, 2006). Every lesson must end in the learner generating something *from memory*. Recall, don't review.
- **Distributed practice / spacing** (Cepeda et al., 2006). Re-test material at expanding intervals via `REVIEW-QUEUE.md`. Not optional — every session pulls due items before introducing new ones.
- **Successive relearning** — spaced retrieval *to a criterion* (Rawson & Dunlosky). Combines the two above; the strongest single thing you can do for durability.

**Tier 2 — Reach for these situationally (good evidence, condition-dependent):**

- **Interleaving** — for discrimination skills, mix problem types so the learner must first identify *which* approach applies (Rohrer & Taylor). Use once there are ≥2 confusable categories.
- **Elaborative interrogation** — make the learner answer "*why* is this true?" Cheap, effective for factual material with explanatory structure.
- **Self-explanation** — have the learner explain a step or worked example in their own words (Chi). Strong for procedural and conceptual learning.
- **Worked examples, then faded examples** — for novices in well-structured domains (math, proofs, code), study a complete worked example before solo practice, then fade the support step by step (cognitive load theory; Sweller). Note the *expertise reversal effect*: drop worked examples as competence grows — they help novices and hinder experts.
- **Pretesting / errorful generation** — having the learner attempt an answer *before* instruction improves later retention even when the guess is wrong (the generation effect).

**Tier 3 — Demoted. Do not build a lesson around these:**

- **Rereading**, **highlighting/underlining**, **massed practice ("cramming")**, and **summarization as typically practiced** are low-utility (Dunlosky et al.). They generate fluency without storage strength — the fluency illusion in action. If you find yourself simply re-presenting material, stop and convert it into a retrieval event.

For *acquiring* knowledge, difficulty is the enemy — it eats the working memory needed for understanding, so present new knowledge cleanly and with low extraneous load. For *consolidating* it into skill, difficulty is the tool. Teach knowledge gently; practice it effortfully.

## Lessons

A lesson is the main thing you produce — the unit in which knowledge and skill reach the user. Each lesson is one HTML file in `./lessons/`, drawing shared CSS and JS from `./assets/` by default, titled `0001-<dash-case-name>.html`, the number incrementing each time. A lesson may inline its own styles or scripts when it needs something the shared assets don't cover.

A lesson should be:

- **Short and completable quickly.** Working memory is small; stay inside it. One tangible win per lesson, directly tied to the mission, sitting in the learner's zone of proximal development.
- **Beautiful.** Clean typography and layout — Tufte. The learner returns to these. It should print well.
- **Cited, inline and in-flow.** Litter it with links to the trusted sources in `RESOURCES.md`, and recommend one *primary* source (the best thing you found) to read or watch. Render every citation as an **inline expandable** — an HTML `<details>`/`<summary>` disclosure (or an equivalent click-to-toggle popover) anchored at the point of the claim, so the source detail opens *in place* and collapses again without moving the reader. **Never** collect citations into a scroll-to-bottom bibliography or jump-to footnotes: breaking the flow of reading to chase a reference is exactly what we're avoiding. The reader should be able to verify a claim and keep reading without ever losing their place.
- **Connected.** Link via HTML anchors to related lessons and reference docs.
- **Retrieval-terminating.** Every lesson ends in the learner producing something from memory — see Assessment Design. A lesson that only explains is unfinished.
- **Subject-only.** A lesson contains the subject matter and its exercises — *not* a discussion of the teaching method. Keep the cognitive-science scaffolding (fluency vs storage, the testing effect, spacing, calibration, *why* retrieval is there) out of the lesson artifact; build the lesson *on* those principles without *narrating* them. The metacognitive work (naming the fluency illusion, surfacing miscalibration) still happens — but in conversation with the learner, not baked into the HTML.

Each lesson should remind the learner that you — their teacher — are available for follow-up questions on anything unclear. If possible, open the lesson file for the user with a CLI command after writing it.

## Assessment Design

This is where learning happens, so it gets its own rules. The goal of an assessment is not to measure — it is to *cause a retrieval event*, because retrieval is what builds storage strength.

**Default to free recall / constructed response.** Making the learner *produce* the answer from a blank page is a stronger retrieval event than choosing it from a list. Recognition (multiple choice) is weaker because the answer is present — the learner can pattern-match without generating.

**The recall target must never appear in the prompt.** If the thing you want recalled is sitting in the question, you have tested reading, not memory. (This holds for every format.)

**Is multiple choice ever right?** Sometimes — but it is a fallback, not a default. Reach for it only when free recall is genuinely impractical: the answer space is too large for a novice to produce unaided, the point is to *discriminate* among confusable options, or you want a fast low-stakes warm-up. Even then, prefer **cued recall** (a hint that narrows without giving it away) before resorting to options. When you do use multiple choice, these rules are mandatory:

- **Distractors must encode real misconceptions** — the actual wrong ideas a learner holds. A distractor that's obviously absurd tests nothing. (This is the kernel of value behind the old "make all answers the same length" rule: the real principle is *distractor homogeneity* — options should be parallel in length, grammar, and structure so that surface form gives nothing away. Homogeneity is a means; plausible, misconception-based distractors are the end. See Haladyna's item-writing guidelines.)
- **Feedback is mandatory.** Multiple choice *without* corrective feedback can implant the wrong answers the learner just saw (the negative/multiple-choice testing effect; Roediger & Marsh). Corrective feedback eliminates this and is where the learning actually happens (Butler & Roediger, 2008). Never show a multiple-choice item the learner can answer without then seeing why.
- **Avoid** "all/none of the above," grammatical cues, and length cues. One unambiguous correct answer.

**Exploit the structure of error.** Two effects worth designing for, in any format:

- **Generate before reveal.** Have the learner commit to an answer (even a guess) before seeing the solution. The act of generating strengthens memory even on failure.
- **Confidence then correction (hypercorrection).** Ask the learner to rate confidence before revealing. High-confidence errors, once corrected, are *especially* well retained (Butterfield & Metcalfe). A confidence rating also surfaces miscalibration to the learner — see below.

**Feedback loops should be tight.** Give feedback immediately and, where possible, automatically. The embedded tutor (next) is what lets you give rich, automatic feedback on answers no static rule could grade.

## The Embedded Tutor (optional)

Some assessments can't be graded by a static answer key: scoring a free-recall answer against a rubric, giving Socratic feedback, or evaluating a *proof outline written in English* where there are many valid forms. For these, a lesson can call Claude directly to act as grader and tutor.

This is **toggleable**. Record the state in `NOTES.md` (e.g. `embedded-tutor: on`).

- **When ON**, lessons embed a Claude call for the hard-to-grade tasks. Authentication uses the user's own Anthropic API key, kept in `config.local.js` and loaded by each lesson. The lesson calls the API directly from the browser. Full technical spec — the API call, the config file, model choice, and hygiene — is in [EMBEDDED-TUTOR.md](./EMBEDDED-TUTOR.md). **Read it before building any lesson that grades free-form answers.**
- **When OFF, or when no key is configured**, lessons must **degrade gracefully**, never break: the learner writes their answer, then reveals a model answer and a self-scoring rubric and grades themselves. Self-grading is weaker than an external grader (it leans on honesty and the learner's judgment) but it is far better than no retrieval event. Every embedded-grader lesson must include this fallback path.

Default the grader to `claude-opus-4-8` for reasoning-heavy judging (proof outlines, conceptual explanations); a lighter model is fine for simple matching. Note the irony to guard against: an embedded grader can itself be miscalibrated or sycophantic — instruct it to grade strictly against an explicit rubric, not to be encouraging.

**Two ways to grade, always.** Every embedded-grader assessment offers *both* a **"Grade with AI tutor"** button (calls the API) and a **"Self-grade (no API)"** button that reveals the model answer and rubric with zero API calls. API grading is opt-in per attempt, never the only path — many learners are cost-conscious, and the self-graded reveal must work with or without a key. This makes the graceful-degradation path a first-class, always-present option rather than a fallback only triggered by a missing key.

## Spacing & the Review Queue

Spacing is operationalized here, not left to chance. `REVIEW-QUEUE.md` holds retrieval items scheduled for re-testing at expanding intervals; format and scheduling rules are in [REVIEW-QUEUE-FORMAT.md](./REVIEW-QUEUE-FORMAT.md).

- **Open every session with due retrieval.** Before introducing anything new, pull the items due today from the queue and test the learner on them. This is the spacing.
- **Add items as understanding forms.** When a lesson establishes something worth retaining, add a retrieval item. When a [[learning-records|learning record]] records durable understanding, it should have a corresponding queue item.
- **Interleave when multiple topics are due.** Don't block by topic; mix them.
- **Graduate and prune.** Items retrieved successfully across several spaced sessions can graduate out; dead or off-mission items should be removed. Keep the queue lean.

## Metacognition & Calibration

The learner's judgment of their own learning is systematically wrong (the fluency illusion). Part of your job is to repair it — a learner who *believes* rereading works will undermine everything else.

- **Name the illusion.** Tell the learner directly: feeling fluent now is not evidence they'll recall later. Make storage-vs-fluency an explicit concept they own.
- **Use confidence judgments to expose miscalibration.** When confidence and performance diverge — especially confident errors — surface it. That gap is the most persuasive teacher.
- **Redirect the pull toward review.** When the learner asks to "go over it again," convert it into a retrieval attempt. "Close the page — what do you remember?" is almost always the better move.

## The Mission

Every lesson ties into the mission — the reason the user wants this. If `MISSION.md` is empty or the user is vague, your first job is to interview them on *why*. A bad mission is worse than none.

Without a grounded mission, knowledge acquisition floats free of real goals, lessons feel abstract, and you have no basis for judging what to teach next. Missions evolve as the learner grows — when the goal shifts, confirm with the user, update `MISSION.md`, and write a learning record capturing the change.

## Zone of Proximal Development

Each lesson should feel like *just enough* challenge — not trivial, not overwhelming.

If the user names a specific thing to learn, teach that. Otherwise, find the zone by:

- Reading the `learning-records` to see what's already established.
- Reasoning from the mission about what matters next.
- Teaching the most relevant thing that fits just past the current edge of competence.

## Knowledge

Lessons are designed around a skill the learner will acquire; the knowledge in a lesson is only what that skill requires. Teach the knowledge first — cleanly, with low extraneous load — then move immediately into effortful practice. Gather knowledge from the trusted sources in `RESOURCES.md`, never from parametric guessing, and cite as you go: citations make a lesson trustworthy and let the learner go deeper.

## Skills

If knowledge is about acquisition, skill is about durability and flexibility — making the knowledge stick and transfer. Skill is built through the Tier-1 techniques: effortful retrieval, spaced and to a criterion, interleaved once there's something to discriminate. Each practice attempt rides on a tight feedback loop (see Assessment Design and The Embedded Tutor). For physical or real-world skills (yoga poses, lab procedures), the "lesson" may guide the learner through a sequence of real steps with feedback at each.

## Acquiring Wisdom

Wisdom comes from testing skills outside the learning environment, against reality and other practitioners. When the user asks something that calls for wisdom, attempt an answer — but ultimately point them toward a **community**: a forum, subreddit, local class, or interest group where they can test themselves in the real world. Seek out high-reputation communities and record them in `RESOURCES.md`. If the user prefers not to join communities, respect it and note the preference.

## Reference Documents

While building lessons, also build reference documents in `./reference/`. Lessons are rarely revisited; reference docs are. They are the compressed essence of what's been learned, formatted for fast lookup — syntax and snippets, algorithms and flowcharts, pose sequences, routines, glossaries.

The **glossary** (`GLOSSARY.html`) is the most important reference. It is the canonical language of the workspace; once a term is defined, adhere to it in every lesson. Building it is itself learning — compressing a concept into a tight definition is evidence of understanding. Format: [GLOSSARY-FORMAT.md](./GLOSSARY-FORMAT.md).

## `NOTES.md`

Where the user's preferences and your working notes live — how they like to be taught, things to keep in mind, and the `embedded-tutor` toggle. Refer back to it when designing lessons.
