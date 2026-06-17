async function gradeWithClaude(systemPrompt, userContent) {
  if (!window.ANTHROPIC_API_KEY || window.ANTHROPIC_API_KEY === "PASTE-YOUR-KEY-HERE") return null;
  try {
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
    if (!res.ok) return null;
    const data = await res.json();
    return data.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  } catch (e) {
    return null;
  }
}

function typesetMath(node, tries){
  if (!window.MathJax) return;
  // MathJax loads async; until startup.promise exists, retry briefly so early keystrokes still render.
  if (!MathJax.startup || !MathJax.startup.promise) {
    if ((tries || 0) < 50) setTimeout(function(){ typesetMath(node, (tries || 0) + 1); }, 200);
    return;
  }
  MathJax.startup.promise = MathJax.startup.promise.then(function(){
    if (MathJax.typesetClear) { try { MathJax.typesetClear([node]); } catch (e) {} }
    return MathJax.typesetPromise([node]);
  }).catch(function(){});
}

/* ---- In-place "render-on-close" math for .answer contenteditable boxes ---- */
function mjChip(tex){
  var span = document.createElement("span");
  span.className = "math-chip";
  span.setAttribute("contenteditable", "false");
  span.dataset.tex = tex;
  span.textContent = tex;            // shows the source until MathJax fills it in (the accepted flash)
  typesetMath(span);
  return span;
}
function chipFindClose(text, caret){
  // Did a delimiter pair just close exactly at the caret? Return the run to chip-ify, or null.
  if (text.charAt(caret - 1) === "$"){
    var i = text.lastIndexOf("$", caret - 2);
    if (i >= 0){
      var inner = text.slice(i + 1, caret - 1);
      if (inner.length && inner.indexOf("$") === -1) return { start: i, end: caret, tex: text.slice(i, caret) };
    }
  }
  if (text.charAt(caret - 1) === ")" && text.charAt(caret - 2) === "\\"){
    var j = text.lastIndexOf("\\(", caret - 2);
    if (j >= 0 && text.slice(j + 2, caret - 2).length) return { start: j, end: caret, tex: text.slice(j, caret) };
  }
  return null;
}
function renderOnClose(answer){
  var sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  var rng = sel.getRangeAt(0);
  if (!rng.collapsed) return;
  var node = rng.startContainer;
  if (node.nodeType !== 3 || !answer.contains(node)) return;
  var hit = chipFindClose(node.textContent, rng.startOffset);
  if (!hit) return;
  var full = node.textContent;
  var chip = mjChip(hit.tex);
  var frag = document.createDocumentFragment();
  if (hit.start > 0) frag.appendChild(document.createTextNode(full.slice(0, hit.start)));
  frag.appendChild(chip);
  var tail = document.createTextNode(full.slice(hit.end));
  frag.appendChild(tail);
  node.parentNode.replaceChild(frag, node);
  var r = document.createRange();
  r.setStartAfter(chip); r.collapse(true);          // caret lands right after the new chip
  sel.removeAllRanges(); sel.addRange(r);
}
function expandChipEl(chip){
  // Replace a rendered chip with its editable $…$ source; caret at the end of the source.
  var tex = chip.dataset.tex || chip.textContent;
  var tn = document.createTextNode(tex);
  chip.parentNode.replaceChild(tn, chip);
  var r = document.createRange();
  r.setStart(tn, tex.length); r.collapse(true);
  var sel = window.getSelection();
  sel.removeAllRanges(); sel.addRange(r);
}
function expandChip(e, answer){
  // Click a rendered chip to turn it back into editable source.
  var chip = e.target.closest ? e.target.closest(".math-chip") : null;
  if (chip && answer.contains(chip)) expandChipEl(chip);
}
function backspaceExpand(e, answer){
  // Backspacing onto a rendered chip un-renders it (to source) instead of deleting it whole.
  if (e.key !== "Backspace") return;
  var sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  var rng = sel.getRangeAt(0);
  if (!rng.collapsed) return;
  var node = rng.startContainer, off = rng.startOffset, chip = null;
  if (node.nodeType === 3 && off === 0){
    var prev = node.previousSibling;
    if (prev && prev.nodeType === 1 && prev.classList && prev.classList.contains("math-chip")) chip = prev;
  } else if (node.nodeType === 1 && off > 0){
    var before = node.childNodes[off - 1];
    if (before && before.nodeType === 1 && before.classList && before.classList.contains("math-chip")) chip = before;
  }
  if (!chip || !answer.contains(chip)) return;
  e.preventDefault();
  expandChipEl(chip);          // re-renders on blur (renderAllIn) or when you re-close the delimiter
}
function renderAllIn(answer){
  // Blur cleanup: chip-ify any complete pairs left in loose text (e.g. expanded-then-edited, or pasted).
  var walker = document.createTreeWalker(answer, NodeFilter.SHOW_TEXT, {
    acceptNode: function(n){ return (n.parentNode && n.parentNode.closest && n.parentNode.closest(".math-chip")) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }
  });
  var texts = [], cur;
  while ((cur = walker.nextNode())) texts.push(cur);
  texts.forEach(function(tn){
    var s = tn.textContent;
    var re = /\$([^$]+)\$|\\\(([\s\S]+?)\\\)/g;
    if (!re.test(s)) return;
    re.lastIndex = 0;
    var frag = document.createDocumentFragment(), last = 0, m;
    while ((m = re.exec(s)) !== null){
      if (m.index > last) frag.appendChild(document.createTextNode(s.slice(last, m.index)));
      frag.appendChild(mjChip(m[0]));
      last = re.lastIndex;
    }
    if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
    tn.parentNode.replaceChild(frag, tn);
  });
}
function serializeAnswer(node){
  // Reconstruct the LaTeX source for grading: text verbatim, chips → their stored $…$ source.
  var out = "";
  node.childNodes.forEach(function(n){
    if (n.nodeType === 3) out += n.textContent;
    else if (n.nodeType === 1){
      if (n.classList && n.classList.contains("math-chip")) out += (n.dataset.tex || "");
      else if (n.tagName === "BR") out += "\n";
      else { if (n.tagName === "DIV" || n.tagName === "P") out += "\n"; out += serializeAnswer(n); }
    }
  });
  return out;
}
function copyToClipboard(text){
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(function(){ legacyCopy(text); });
  else legacyCopy(text);
}
function legacyCopy(text){
  var ta = document.createElement("textarea");
  ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.focus(); ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta);
}

/* Quick-recall dropdowns — immediate per-option feedback, no API */
document.querySelectorAll(".quiz-q").forEach(function(q){
  var sel = q.querySelector("select"), mark = q.querySelector(".quiz-mark"), fb = q.querySelector(".quiz-fb");
  sel.addEventListener("change", function(){
    if (!sel.value) { mark.textContent = ""; mark.className = "quiz-mark"; fb.className = "quiz-fb"; return; }
    var ok = (sel.value === q.getAttribute("data-answer"));
    var opt = sel.options[sel.selectedIndex];
    mark.textContent = ok ? "✓" : "✗";
    mark.className = "quiz-mark " + (ok ? "ok" : "no");
    fb.textContent = opt.getAttribute("data-fb") || (ok ? "Correct." : "Not quite.");
    fb.className = "quiz-fb show " + (ok ? "ok" : "no");
  });
});


/* Constructed-response graders — AI grade + self-grade, one per .grader block */
document.querySelectorAll(".grader").forEach(function(block){
  var key = block.getAttribute("data-block");
  var answer = block.querySelector(".answer");
  var gradeBtn = block.querySelector(".grade");
  var selfBtn = block.querySelector(".selfgrade");
  var statusEl = block.querySelector(".status");
  var fb = block.querySelector(".feedback");
  var fbBody = block.querySelector(".feedbackBody");
  var model = block.querySelector(".model");
  function rawOf(){ return answer ? serializeAnswer(answer) : ""; }
  if (answer) {
    // Copy button (below the box): copies the answer as LaTeX, keeping the $…$ delimiters.
    var wrap = document.createElement("div");
    wrap.className = "answer-wrap";
    answer.parentNode.insertBefore(wrap, answer);
    wrap.appendChild(answer);
    var copyBtn = document.createElement("button");
    copyBtn.type = "button"; copyBtn.className = "copy-btn"; copyBtn.textContent = "Copy";
    copyBtn.title = "Copy your answer as LaTeX (delimiters kept)";
    wrap.appendChild(copyBtn);
    copyBtn.addEventListener("click", function(){
      var text = serializeAnswer(answer).trim();
      copyToClipboard(text);
      copyBtn.textContent = "Copied"; setTimeout(function(){ copyBtn.textContent = "Copy"; }, 1200);
    });
    // In-place render-on-close: each completed $…$ becomes a rendered chip right where you typed it.
    answer.addEventListener("input", function(){ renderOnClose(answer); });
    answer.addEventListener("click", function(e){ expandChip(e, answer); });
    answer.addEventListener("keydown", function(e){ backspaceExpand(e, answer); });
    answer.addEventListener("blur", function(){ renderAllIn(answer); });
  }
  function conf(){ var r = block.querySelector('input[type="radio"]:checked'); return r ? r.value : "(not stated)"; }
  if (gradeBtn) gradeBtn.addEventListener("click", async function(){
    var ans = rawOf().trim();
    if (ans.length < 10) { statusEl.textContent = "Write your answer first — from memory."; return; }
    gradeBtn.disabled = true; statusEl.textContent = "Grading…";
    var userContent = "Learner's stated confidence: " + conf() + "\n\nLearner's answer:\n\"\"\"" + ans + "\"\"\"";
    var out = await gradeWithClaude(PROMPTS[key], userContent);
    if (out) {
      fbBody.innerHTML = out.replace(/\n/g, "<br>");
      fb.classList.add("show"); model.classList.add("show"); typesetMath(fbBody);
      statusEl.textContent = "Graded by your embedded tutor. Compare with the model answer & rubric below.";
    } else {
      model.classList.add("show");
      statusEl.textContent = "No API key (or the call failed) — grade yourself against the rubric below.";
    }
    gradeBtn.disabled = false;
  });
  if (selfBtn) selfBtn.addEventListener("click", function(){
    var ans = rawOf().trim();
    if (ans.length < 10) { statusEl.textContent = "Write your answer first — from memory."; return; }
    fb.classList.remove("show"); model.classList.add("show");
    statusEl.textContent = "Self-grade — no API call made. Score yourself against the rubric below.";
  });
});
