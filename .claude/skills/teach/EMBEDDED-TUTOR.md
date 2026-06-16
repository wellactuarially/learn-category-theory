# Embedded Tutor

Some assessments cannot be graded by a static answer key — scoring a free-recall answer against a rubric, giving Socratic feedback on a wrong turn, or evaluating a **proof outline written in English**, where many forms are valid and a regex would be useless. The embedded tutor lets a lesson call Claude directly to grade and respond, turning a static HTML artifact into an interactive tutor.

This is the **API mode** of the skill. It is optional and toggleable. When it is off (or no key is configured), lessons must degrade gracefully to self-grading — see [SKILL.md](./SKILL.md) → The Embedded Tutor.

## The toggle

Record the state in `NOTES.md`:

```
embedded-tutor: on    # or: off
```

When `on`, build embedded-grader lessons. When `off`, build self-graded lessons only. Either way, **every embedded-grader lesson must also contain the self-graded fallback path** so it still works for someone without a key.

## The API key — `config.local.js`

The key lives in **one** local file at the workspace root, loaded by every lesson. This means the user pastes their key **once** and never again; it persists across sessions because it lives in a file, not in browser storage.

`config.local.js`:

```js
// Anthropic API key for embedded-tutor lessons. LOCAL ONLY — never commit or share.
window.ANTHROPIC_API_KEY = "sk-ant-...";
```

Rules, non-negotiable:

- **Gitignore it.** Add `config.local.js` to `.gitignore` in the workspace (create the file if absent). Never let the key travel with a shared lesson.
- **Never inline the key into a lesson's HTML.** Lessons reference the external file only. A lesson with a key baked in is a leaked key the moment it's shared.
- **Each lesson loads it with a script tag** before its own logic:
  ```html
  <script src="../config.local.js"></script>
  ```
  (Path relative to `./lessons/`. The file is at the workspace root, hence `../`.)

When you first set up an embedded-tutor workspace, tell the user plainly: they need an Anthropic API key from the Console (this is separate from any Claude Code subscription and is billed per token against that key), and they must paste it into `config.local.js`. You cannot do this step for them — surface it clearly.

## The API call

Lessons call the Messages API directly from the browser. This requires the `anthropic-dangerous-direct-browser-access` header, which opts into cross-origin browser calls.

```js
async function gradeWithClaude(systemPrompt, userContent) {
  if (!window.ANTHROPIC_API_KEY) return null; // → caller shows the self-graded fallback

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": window.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!res.ok) return null; // network/auth error → fall back to self-grading, don't break
  const data = await res.json();
  return data.content.map((b) => (b.type === "text" ? b.text : "")).join("");
}
```

Notes:

- **Model.** Default `claude-opus-4-8` for reasoning-heavy judging (proof outlines, conceptual explanations, "where does this argument break?"). A lighter model is fine for simple matching or short factual checks — choose per task, not by reflex.
- **Cost & latency.** Each graded interaction is one API call: a second or two, and a small fraction of a cent to a few cents depending on model and length. Fine for learning; just be aware lessons that grade have a per-use cost on the user's key.
- **Always handle the null return.** A missing key, a network failure, or an API error must route to the self-graded fallback. The lesson never dead-ends.

## Designing the grader prompt

The embedded grader is an **LLM-as-judge**, and a judge is only as good as its rubric. Treat it like one:

- **Give it an explicit rubric and a model answer.** Pass the learner's answer, the criteria, and a reference solution. Ask for a score *plus* targeted feedback — for a proof outline, *where* the logic first breaks, not just pass/fail.
- **Instruct it to grade strictly, not kindly.** LLMs drift sycophantic. Tell it to judge against the rubric and name gaps directly; encouragement is the lesson's job, not the grader's.
- **Keep the recall target out of anything shown to the learner before they answer.** The rubric and model answer are for the grader and the post-answer reveal — never rendered into the prompt the learner sees first. (See [SKILL.md](./SKILL.md) → Assessment Design.)
- **Ask for structured output** when the lesson needs to react programmatically (e.g. a JSON `{ "correct": bool, "feedback": "..." }`), so the lesson can branch on the result.

## Graceful degradation (required)

Every embedded-grader lesson includes a self-graded path for when `window.ANTHROPIC_API_KEY` is absent or the call fails:

1. The learner writes their answer into a textarea (the retrieval event happens regardless).
2. On submit, attempt `gradeWithClaude(...)`.
3. If it returns text → show the grade and feedback.
4. If it returns `null` → reveal the **model answer and a self-scoring rubric**, and ask the learner to grade themselves honestly.

The retrieval event — the learner producing an answer from memory — must happen in *both* paths. The grader enriches the feedback; it is not what makes the lesson work.

## If local scripts won't load

Opening lessons as bare `file://` pages works in most browsers, including the `<script src="../config.local.js">` load. If a browser blocks local subresource loading (Chrome occasionally does), the fix is a one-line static server from the workspace root:

```
python -m http.server
```

Then open lessons at `http://localhost:8000/lessons/...`. This is **not** a proxy — it only serves files; the key still lives in `config.local.js` and lessons still call Anthropic directly. Mention this only if the user hits the problem.
