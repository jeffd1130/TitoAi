// Tito AI Studio front end: live agent board, chat/approve, video panel, Telegram.
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const PAGES = 'https://jeffd1130.github.io/TitoAi/';
const state = {stages: [], agents: [], runs: {}, status: {}, compositions: [], media: [], posts: []};
const STATUS_LABEL = {queued: 'Queued', running: 'Working…', review: 'Needs your review', approved: 'Approved', done: 'Done', failed: 'Failed', stopped: 'Stopped'};

// Quick-start prompts per stage (Jeff can edit before starting).
const TEMPLATES = {
  research: ['Plan next week (W46): write brief.md for Mon, Wed and Fri slots.', 'Write the brief for <week> <slot> on: <topic>.'],
  script: ['Write script.md and captions.md from content/<week>/<slot>/brief.md.'],
  create: ['Make the ChatGPT slide pack from content/<week>/<slot>/drafts/script.md.'],
  video: [],
  qa: ['Review content/<week>/<slot>/drafts/ (script, captions, slide pack) and give a VERDICT.', 'Review content/2026-W45/bonus-origin-recut/captions.md for Parts 1–2.'],
  insights: ['Here are this week\'s numbers: <paste metrics>. Write the weekly check & balance.'],
};
const DEFAULT_PROMPT = `Create an 8-second vertical 9:16 animated video that starts exactly from this frame and keeps the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room. <ACTION FOR THIS SHOT>. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet's bright FRONT SCREEN must face the viewer in every frame; do not reveal or flip to its back. Preserve his clean-shaven face, hair, white shirt, jeans, shoes, watch and bracelet. Real articulated movement of shoulders, arm, hand, eyebrows and mouth, not a floating or zooming still. Keep one tablet and anatomically correct hands. No new voice, dialogue, text, logos or music; silent motion clip for later editing with my original voice.`;

function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2200); }
async function api(path, body) {
  const r = await fetch(path, body ? {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)} : {});
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || r.statusText);
  return j;
}
const persona = (name) => state.agents.find((a) => a.name === name) || {display: name, emoji: '🤖', role: ''};
const who = (name) => { const a = persona(name); return `${a.emoji} ${a.display}`; };
const fileUrl = (p) => `/file?path=${encodeURIComponent(p)}`;
const ago = (t) => { const s = Math.round((Date.now() - t) / 1000); return s < 60 ? `${s}s ago` : s < 3600 ? `${Math.round(s / 60)}m ago` : `${Math.round(s / 3600)}h ago`; };

// ---------- board ----------
const OPEN = new Set(), SHOW_ALL = new Set();   // expanded cards, columns showing all runs
function renderBoard() {
  const cols = $('#columns');
  cols.innerHTML = state.stages.map((st) => {
    const runs = Object.values(state.runs).filter((r) => r.stage === st.id && r.agent !== 'tito-main').sort((a, b) => b.updatedAt - a.updatedAt);
    return `<div class="col" data-stage="${st.id}">
      <div class="col-head"><div><h2>${esc(st.label)}<span class="count">${runs.length || ''}</span></h2><div class="muted">${esc(who(st.agent))}</div></div>
        <button class="btn small" data-new="${st.id}">+ Run</button></div>
      <div class="col-body">${(SHOW_ALL.has(st.id) ? runs : runs.slice(0, 5)).map(runCard).join('')}${runs.length > 5 ? `<button class="more" data-more="${st.id}">${SHOW_ALL.has(st.id) ? 'Show fewer' : `Show ${runs.length - 5} older`}</button>` : ''}${runs.length ? '' : `<div class="empty">No runs yet.<br>${esc(who(st.agent))} is ready<br><span class="muted">${esc(persona(st.agent).role)}</span></div>`}</div>
    </div>`;
  }).join('');
  cols.querySelectorAll('.log').forEach((l) => (l.scrollTop = l.scrollHeight));
}

function runCard(r) {
  const busy = r.status === 'running', open = OPEN.has(r.id) || busy;
  const last = [...r.events].reverse().find((e) => e.kind === 'text' || e.kind === 'error');
  const summary = (r.result || (last && last.text) || '').replace(/[#*`>|]/g, '').replace(/\s+/g, ' ').trim();
  const head = `<div class="run-head" data-toggle="${r.id}"><span class="dot"></span><span class="run-title">${esc(r.title)}</span><span class="caret">${open ? '▾' : '▸'}</span></div>
    <div class="meta"><span>${STATUS_LABEL[r.status] || r.status}</span><span>· ${ago(r.updatedAt)}</span>${r.files.length ? `<span>· ${r.files.length} file${r.files.length > 1 ? 's' : ''}</span>` : ''}</div>`;
  const mainBtns = `${r.status === 'review' ? `<button class="btn small green" data-act="approve" data-id="${r.id}">Approve</button>` : ''}
      ${busy ? `<button class="btn small danger" data-act="stop" data-id="${r.id}">Stop</button>` : ''}`;
  if (!open) {
    return `<div class="card run compact ${r.status}" data-id="${r.id}">${head}
      ${summary ? `<p class="summary">${esc(summary.slice(0, 140))}${summary.length > 140 ? '…' : ''}</p>` : ''}
      ${mainBtns.trim() ? `<div class="actions">${mainBtns}</div>` : ''}</div>`;
  }
  const events = r.events.slice(-60).map((e) => `<div class="ev ${e.kind}">${e.kind === 'you' ? '▸ ' : ''}${esc(e.text)}</div>`).join('');
  const files = r.files.map((f) => `<a data-open="${esc(f)}">📄 ${esc(f.split('/').slice(-2).join('/'))}</a>`).join('');
  return `<div class="card run ${r.status}" data-id="${r.id}">${head}
    <div class="log">${events || '<div class="ev log">Starting…</div>'}</div>
    ${files ? `<div class="files">${files}</div>` : ''}
    ${!['video-producer', 'carousel-render'].includes(r.agent) ? `<div class="chat"><input placeholder="${busy ? 'Working… you can Stop' : 'Tell this agent what to change'}" ${busy ? 'disabled' : ''} data-chat="${r.id}"><button class="btn small" data-send="${r.id}" ${busy ? 'disabled' : ''}>Send</button></div>` : ''}
    <div class="actions">${mainBtns}
      ${r.status === 'approved' || r.status === 'done' ? nextButton(r) : ''}
      ${r.status === 'approved' ? `<button class="btn small" data-act="reopen" data-id="${r.id}">Reopen</button>` : ''}
      <button class="btn small ghost-danger" data-act="delete" data-id="${r.id}">Delete</button>
    </div>
  </div>`;
}

function nextButton(r) {
  const i = state.stages.findIndex((s) => s.id === r.stage);
  const next = state.stages[i + 1];
  if (!next || next.id === 'insights' || next.id === 'publish') return '';   // scheduling starts only from Approve & Post
  return `<button class="btn small gold" data-next="${r.id}">→ ${esc(next.label)}</button>`;
}

function openNewRun(stageId, presetPrompt = '', presetTitle = '') {
  if (stageId === 'publish') { switchTab('posting'); return toast('Approve a post, then press Schedule on it'); }
  const st = state.stages.find((s) => s.id === stageId);
  $('#nrStage').textContent = st.label;
  const sel = $('#nrAgent');
  sel.innerHTML = state.agents.filter((a) => a.name !== 'video-producer').map((a) => `<option value="${esc(a.name)}" ${a.name === st.agent ? 'selected' : ''}>${esc(a.emoji + ' ' + a.display + (a.role ? ' — ' + a.role : ''))}</option>`).join('');
  if (st.agent === 'video-producer') { switchTab('video'); return; }
  const desc = () => ($('#nrDesc').textContent = (state.agents.find((a) => a.name === sel.value) || {}).description || '');
  sel.onchange = desc; desc();
  $('#nrTitle').value = presetTitle;
  $('#nrPrompt').value = presetPrompt;
  $('#nrChips').innerHTML = (TEMPLATES[stageId] || []).map((t) => `<button type="button" class="chip">${esc(t)}</button>`).join('');
  $('#nrChips').querySelectorAll('.chip').forEach((c) => (c.onclick = () => ($('#nrPrompt').value = c.textContent)));
  const dlg = $('#newRun');
  dlg.dataset.stage = stageId;
  dlg.showModal();
}

$('#newRun').addEventListener('close', async () => {
  const dlg = $('#newRun');
  if (dlg.returnValue !== 'go') return;
  const prompt = $('#nrPrompt').value.trim();
  if (!prompt) return toast('Write what the agent should do');
  try {
    const run = await api('/api/runs', {stage: dlg.dataset.stage, agent: $('#nrAgent').value, title: $('#nrTitle').value.trim() || prompt.slice(0, 60), prompt});
    state.runs[run.id] = run; renderBoard(); toast(`${who($('#nrAgent').value)} started`);
  } catch (e) { toast(e.message); }
});

document.addEventListener('click', async (e) => {
  const t = e.target;
  const tg = t.closest('[data-toggle]');
  if (tg) { const id = tg.dataset.toggle; OPEN.has(id) ? OPEN.delete(id) : OPEN.add(id); return renderBoard(); }
  if (t.dataset.more) { const id = t.dataset.more; SHOW_ALL.has(id) ? SHOW_ALL.delete(id) : SHOW_ALL.add(id); return renderBoard(); }
  if (t.dataset.new) return openNewRun(t.dataset.new);
  if (t.dataset.open) return openFile(t.dataset.open);
  if (t.dataset.send) return sendChat(t.dataset.send);
  if (t.dataset.next) {
    const r = state.runs[t.dataset.next];
    const i = state.stages.findIndex((s) => s.id === r.stage);
    const next = state.stages[i + 1];
    const files = r.files.length ? r.files.join(', ') : '(see the previous step)';
    return openNewRun(next.id, `Continue from the approved ${r.stage} step. Use these files: ${files}.`, `${r.title} → ${next.label}`);
  }
  if (t.dataset.act) {
    const {act, id} = t.dataset;
    if (act === 'delete' && !confirm('Delete this card? (Files the agent wrote stay on disk.)')) return;
    try { await api(`/api/runs/${id}/${act}`, {}); if (act === 'delete') { delete state.runs[id]; renderBoard(); } } catch (err) { toast(err.message); }
  }
  if (t.classList.contains('tab')) switchTab(t.dataset.tab);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.dataset.chat) sendChat(e.target.dataset.chat); });

async function sendChat(id) {
  const input = document.querySelector(`[data-chat="${id}"]`);
  const text = input.value.trim();
  if (!text) return;
  try { await api(`/api/runs/${id}/message`, {text}); input.value = ''; } catch (e) { toast(e.message); }
}

async function openFile(p) {
  $('#vTitle').textContent = p;
  const body = $('#vBody');
  if (/\.(mp4|mov)$/i.test(p)) body.innerHTML = `<video src="${fileUrl(p)}" controls style="max-height:70vh;width:100%"></video>`;
  else if (/\.(png|jpe?g|webp)$/i.test(p)) body.innerHTML = `<img src="${fileUrl(p)}" style="max-width:100%;max-height:70vh">`;
  else body.innerHTML = `<pre class="md">${esc(await (await fetch(fileUrl(p))).text())}</pre>`;
  $('#viewer').showModal();
}

function switchTab(id) {
  document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b.dataset.tab === id));
  document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('active', p.id === id));
}

// ---------- status bar ----------
function renderStatus() {
  const running = Object.values(state.runs).filter((r) => r.status === 'running').length;
  const vids = Object.values(state.runs).filter((r) => r.status === 'review').length, posts = state.posts.filter((p) => !p.state.approved).length;
  const review = vids + posts;
  const parts = [posts && `${posts} post${posts > 1 ? 's' : ''}`, vids && `${vids} video${vids > 1 ? 's' : ''}`].filter(Boolean).join(' + ');
  const s = state.status;
  $('#status').innerHTML = `
    ${running ? `<span class="pill live">🤖 ${running} working</span>` : ''}
    <button class="pill pill-btn ${review ? 'hot' : ''}" id="toApprove" title="${review ? esc(parts) + ' · click to open Approve & Post' : 'Nothing waiting'}">${review ? `${review} to approve` : 'All approved'}</button>
    <span class="pill" title="Flow first, Gemini after. ${esc(s.flowNote || '')}">Flow <input id="flowCredits" type="number" min="0" max="50" placeholder="–" value="${s.flowCredits ?? ''}">/50</span>`;
  $('#toApprove').onclick = () => switchTab('posting');
  $('#flowCredits').onchange = (e) => api('/api/status', {flowCredits: e.target.value === '' ? null : Number(e.target.value)});
}

// ---------- video panel ----------
function renderVideo() {
  $('#compSel').innerHTML = state.compositions.map((c) => `<option>${esc(c)}</option>`).join('');
  if (!$('#promptHelper').value) $('#promptHelper').value = DEFAULT_PROMPT;
  $('#media').innerHTML = state.media.map((m) => `<div class="media-item">
      <video src="${fileUrl(m.path)}" controls preload="metadata"></video>
      <span>${esc(m.path.replace('docs/media/', ''))} · ${(m.size / 1e6).toFixed(1)} MB</span>
      <div class="row"><button class="btn small" data-strip="${esc(m.path)}">Frame strip</button></div>
      <div data-strip-out="${esc(m.path)}"></div>
    </div>`).join('') || '<div class="empty">No videos in docs/media yet.</div>';
}
document.addEventListener('click', async (e) => {
  const p = e.target.dataset.strip;
  if (!p) return;
  e.target.textContent = 'Making…';
  try {
    const {url} = await api('/api/framestrip', {path: p});
    document.querySelector(`[data-strip-out="${CSS.escape(p)}"]`).innerHTML = `<img class="strip" src="${url}" title="One frame every 2s — check the chibi matches">`;
  } catch (err) { toast(err.message); }
  e.target.textContent = 'Frame strip';
});
$('#renderBtn').onclick = async () => {
  const comp = $('#compSel').value;
  if (!confirm(`Render ${comp}? This takes a minute or two.`)) return;
  try { const run = await api('/api/runs', {stage: 'video', agent: 'video-producer', title: `Render ${comp}`, composition: comp, prompt: comp}); state.runs[run.id] = run; renderBoard(); switchTab('board'); toast('Render started'); } catch (err) { toast(err.message); }
};
$('#copyPrompt').onclick = () => copyText($('#promptHelper').value);
$('#refreshMedia').onclick = async () => { state.media = await api('/api/media'); renderVideo(); };

// ---------- Telegram ----------
$('#tgBtn').onclick = () => {
  const approved = Object.values(state.runs).filter((r) => r.status === 'approved' || r.status === 'review').slice(0, 6);
  const lines = approved.map((r) => {
    const links = r.files.filter((f) => f.startsWith('docs/')).map((f) => `<a href="${PAGES}${f.replace(/^docs\//, '')}">${esc(f.split('/').pop())}</a>`).join(' · ');
    return `• <b>${esc(r.title)}</b> (${r.status === 'approved' ? 'approved' : 'ready for review'})${links ? `\n  ${links}` : ''}`;
  });
  $('#tgText').value = `<b>Tito AI Studio update</b>\n\n${lines.join('\n') || '• (add items here)'}\n\n📋 <a href="${PAGES}W45-origin-recut-review.html">Review page</a>\nNot posted or scheduled — approval needed.`;
  $('#tg').showModal();
};
$('#tg').addEventListener('close', async () => {
  if ($('#tg').returnValue !== 'send') return;
  try { await api('/api/telegram', {text: $('#tgText').value}); toast('Sent to Telegram'); } catch (e) { toast(e.message); }
});


// ---------- approve & post ----------
const PLATFORM_LIST = [['tiktok', 'TikTok'], ['instagram', 'Instagram'], ['facebook', 'Facebook']];
function copyText(text) {
  // Works on http phone links too (clipboard API needs https).
  const ta = document.createElement('textarea');
  ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
  let ok = false; try { ok = document.execCommand('copy'); } catch {}
  ta.remove();
  if (!ok && navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast('Copied'), () => toast('Long-press the text to copy'));
  else toast(ok ? 'Copied' : 'Long-press the text to copy');
}
function renderPosts() {
  const el = $('#posts');
  if (!el) return;
  el.innerHTML = state.posts.map((p) => {
    const st = p.state || {posted: {}};
    const postedCount = Object.keys(st.posted || {}).length;
    const badge = postedCount === 3 ? '<span class="badge green">Posted everywhere</span>'
      : postedCount ? `<span class="badge blue">Posted ${postedCount}/3</span>`
      : st.approved ? '<span class="badge green">Approved</span>' : '<span class="badge gold">Needs approval</span>';
    const media = p.type === 'video'
      ? p.media.map((m) => `<video src="${fileUrl(m)}" ${p.cover ? `poster="${fileUrl(p.cover)}"` : ''} controls playsinline preload="none"></video>`).join('')
      : `<div class="slides">${p.media.map((m, i) => `<img src="${fileUrl(m)}" loading="lazy" alt="Slide ${i + 1}" data-open="${esc(m)}">`).join('')}</div>`;
    const downloads = p.media.map((m, i) => `<a class="btn small" href="${fileUrl(m)}" download>⬇ ${p.type === 'video' ? 'Video' : 'Slide ' + (i + 1)}</a>`).join('');
    const caps = PLATFORM_LIST.map(([k, label]) => {
      const text = (p.captionsText || {})[k] || '';
      const done = (st.posted || {})[k];
      return `<div class="cap">
        <div class="cap-head"><b>${label}</b>
          ${done ? `<span class="badge green">Posted ${new Date(done.at).toLocaleDateString()}${done.link ? ` · <a href="${esc(done.link)}" target="_blank">link</a>` : ''}</span>` : ''}</div>
        <pre class="cap-text">${esc(text) || '<i>No caption found</i>'}</pre>
        <div class="row wrap">
          <button class="btn small" data-copy="${p.id}:${k}">Copy caption</button>
          ${done ? `<button class="btn small" data-unpost="${p.id}:${k}">Undo posted</button>` : `<button class="btn small gold" data-post="${p.id}:${k}" ${st.approved ? '' : 'disabled title="Approve first"'}>Mark posted</button>`}
        </div>
      </div>`;
    }).join('');
    const seed = (p.captionsText || {}).seed;
    const sc = st.schedule, scRun = sc && state.runs[sc.runId];
    const scLine = !sc ? '' : sc.status === 'running' ? `📅 Kuya Iskedyul is scheduling for ${esc(fmtPHT(sc.when))}…`
      : sc.status === 'done' ? `📅 Scheduled ${esc(fmtPHT(sc.when))}${sc.result ? ' · ' + Object.entries(sc.result).map(([k, v]) => `${k} ${v ? '✓' : '—'}`).join(' · ') : ''}`
      : `📅 Scheduling ${esc(sc.status)} · see the Schedule column on Agents`;
    const schedule = !st.approved ? '' : `<div class="cap sched">
        <div class="cap-head"><b>📅 Schedule on Meta + TikTok</b> <span class="muted">Kuya Iskedyul uploads it to the calendars. Schedule only, never posts now.</span></div>
        ${scLine ? `<p class="sched-line ${sc.status}" ${scRun ? `data-goto-run="${sc.runId}"` : ''}>${scLine}</p>` : ''}
        <div class="row wrap">
          <input type="datetime-local" data-sched-when="${p.id}" value="${esc((sc && sc.when) || p.slot || '')}"> <span class="muted">PHT</span>
          ${['facebook', 'instagram', 'tiktok'].map((k) => `<label class="chk"><input type="checkbox" data-sched-pf="${p.id}" value="${k}" ${!(st.posted || {})[k] ? 'checked' : ''}> ${k[0].toUpperCase() + k.slice(1)}</label>`).join('')}
          <button class="btn small gold" data-schedule="${p.id}" ${sc && sc.status === 'running' ? 'disabled' : ''}>${sc && sc.status === 'done' ? 'Schedule again' : 'Schedule'}</button>
        </div></div>`;
    return `<article class="card post" data-post-id="${p.id}">
      <div class="post-head"><div><div class="muted">${esc(p.series || '')}</div><h3>${esc(p.title)}</h3></div>${badge}</div>
      <div class="post-body">
        <div class="post-media">${media}<div class="row wrap">${downloads}</div></div>
        <div class="post-caps">
          <div class="row wrap">
            ${st.approved ? `<button class="btn small" data-unapprove="${p.id}">Undo approval</button>` : `<button class="btn green" data-approve-post="${p.id}">✓ Approve</button>`}
            <button class="btn small" data-change="${p.id}">✍️ Ask Kuya Sulat for changes</button>
            <a class="btn small" data-open="${esc(p.captions.file)}">Open captions file</a>
          </div>
          ${schedule}
          ${caps}
          ${seed ? `<div class="cap"><div class="cap-head"><b>Seed comment</b> <span class="muted">pin within 5 min</span></div><pre class="cap-text">${esc(seed)}</pre><button class="btn small" data-copy="${p.id}:seed">Copy</button></div>` : ''}
          <label>Notes<textarea rows="2" data-notes="${p.id}" placeholder="e.g. posted TikTok 7 PM, pinned">${esc(st.notes || '')}</textarea></label>
        </div>
      </div>
    </article>`;
  }).join('') || '<div class="empty">No posts yet. Add them to studio/posts.json.</div>';
}
const fmtPHT = (w) => new Date(w + ':00+08:00').toLocaleString('en-US', {timeZone: 'Asia/Manila', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'});
document.addEventListener('click', async (e) => {
  const s = e.target.closest('[data-schedule]');
  if (s) {
    const id = s.dataset.schedule, when = document.querySelector(`[data-sched-when="${id}"]`).value;
    const platforms = [...document.querySelectorAll(`[data-sched-pf="${id}"]:checked`)].map((c) => c.value);
    const post = state.posts.find((p) => p.id === id);
    if (!when || !platforms.length) return toast('Pick a time and at least one platform');
    if (!confirm(`Schedule "${post.title}" on ${platforms.join(', ')} for ${fmtPHT(when)} PHT?\n\nKuya Iskedyul will upload it in Chrome and set it to publish at that time.`)) return;
    try { const run = await api(`/api/posts/${id}/schedule`, {when, platforms}); state.runs[run.id] = run; toast('Kuya Iskedyul is on it'); loadPosts(); renderBoard(); } catch (err) { toast(err.message); }
    return;
  }
  const g = e.target.closest('[data-goto-run]');
  if (g) { switchTab('board'); OPEN.add(g.dataset.gotoRun); renderBoard(); return; }
  const t = e.target.closest('[data-copy],[data-post],[data-unpost],[data-approve-post],[data-unapprove],[data-change]');
  if (!t) return;
  const d = t.dataset;
  const [id, k] = (d.copy || d.post || d.unpost || '').split(':');
  const post = state.posts.find((p) => p.id === (id || d.approvePost || d.unapprove || d.change));
  try {
    if (d.copy) return copyText(post.captionsText[k] || '');
    if (d.post) { const link = prompt(`Paste the ${k} post link (optional):`, ''); if (link === null) return; await api(`/api/posts/${id}/posted`, {platform: k, link}); toast('Marked posted'); }
    if (d.unpost) await api(`/api/posts/${id}/unposted`, {platform: k});
    if (d.approvePost) { await api(`/api/posts/${d.approvePost}/approve`, {}); toast('Approved'); }
    if (d.unapprove) await api(`/api/posts/${d.unapprove}/unapprove`, {});
    if (d.change) {
      const stage = 'script';
      openNewRun(stage, `Update the captions for "${post.title}" in ${post.captions.file}${post.captions.section ? ` (section "${post.captions.section}")` : ''}. Change: <describe the change>. Keep 5 hashtags and one follow CTA.`, `Captions: ${post.title}`);
      $('#nrAgent').value = 'tito-scriptwriter';
    }
    await loadPosts();
  } catch (err) { toast(err.message); }
});
document.addEventListener('change', (e) => { const id = e.target.dataset.notes; if (id) api(`/api/posts/${id}/notes`, {notes: e.target.value}).then(() => toast('Notes saved')); });
async function loadPosts() { state.posts = await api('/api/posts'); renderPosts(); }


// ---------- Tito AI main chat ----------
const MAIN_CHIPS = [
  'Gawin natin ang susunod na post. Video kung may Flow credits ako ngayon.',
  'Walang video credits ngayon. Gawin nating carousel ang susunod na post.',
  'Plan W46 (Mon, Wed, Fri) at simulan ang Monday.',
  'Ano ang naghihintay sa approval ko?',
];
const currentMain = () => Object.values(state.runs).filter((r) => r.agent === 'tito-main').sort((a, b) => b.createdAt - a.createdAt)[0];
let freshChat = false;
function renderMain() {
  const main = freshChat ? null : currentMain();
  const thread = $('#thread');
  if (!thread) return;
  const md = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
  thread.innerHTML = main ? main.events.map((e) => {
    if (e.kind === 'you') return `<div class="bubble me">${md(e.text)}</div>`;
    if (e.kind === 'text') return `<div class="bubble tito">${md(e.text)}</div>`;
    if (e.kind === 'action') return `<div class="note action">${md(e.text)}</div>`;
    if (e.kind === 'update') return e.text.startsWith('[Studio update]') ? '' : `<div class="note update">${md(e.text)}</div>`;
    if (e.kind === 'error') return `<div class="note err">${md(e.text)}</div>`;
    if (e.kind === 'tool') return `<div class="note tool">🔍 ${md(e.text)}</div>`;
    return '';
  }).join('') + (main.status === 'running' ? '<div class="bubble tito typing">Tito AI is thinking…</div>' : '')
    : `<div class="welcome"><div class="big">🎙️</div><b>Kumusta, Jeff!</b><p class="muted">Tell me what post to make. I'll plan it, then Tita Saliksik, Kuya Sulat, Ate Disenyo and Lola Suri get to work. If there are no video credits, I'll make a carousel instead.</p></div>`;
  thread.scrollTop = thread.scrollHeight;
  const busy = main && main.status === 'running';
  $('#mainSend').disabled = !!busy;
  $('#mainSend').textContent = busy ? '…' : 'Send';
  // team list: runs started by this conversation (newest first)
  const kids = main ? Object.values(state.runs).filter((r) => r.parent === main.id).sort((a, b) => b.createdAt - a.createdAt) : [];
  $('#teamList').innerHTML = kids.map((r) => `<div class="team-item ${r.status}" data-goto="${r.id}">
      <span class="dot"></span><div><b>${esc(who(r.agent))}</b><div class="muted">${esc(r.title)}</div>
      <div class="muted">${STATUS_LABEL[r.status] || r.status}</div></div></div>`).join('') || '<p class="muted">No one is working yet. Start a chat and Tito AI will assign the team.</p>';
}
$('#mainChips').innerHTML = MAIN_CHIPS.map((c) => `<button type="button" class="chip">${esc(c)}</button>`).join('');
$('#mainChips').addEventListener('click', (e) => { if (e.target.classList.contains('chip')) { $('#mainInput').value = e.target.textContent; $('#mainInput').focus(); } });
async function sendMain() {
  const text = $('#mainInput').value.trim();
  if (!text) return;
  try {
    const run = await api('/api/main', {text, newChat: freshChat});
    freshChat = false; state.runs[run.id] = run; $('#mainInput').value = ''; renderMain();
  } catch (e) { toast(e.message); }
}
$('#mainSend').onclick = sendMain;
$('#mainInput').addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 760) { e.preventDefault(); sendMain(); } });
$('#newChat').onclick = () => { freshChat = true; renderMain(); toast('New chat. Your next message starts it.'); };
document.addEventListener('click', (e) => {
  const g = e.target.closest('[data-goto]');
  if (!g) return;
  switchTab('board');
  setTimeout(() => { const c = document.querySelector(`.run[data-id="${g.dataset.goto}"]`); if (c) { c.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'}); c.classList.add('flash'); setTimeout(() => c.classList.remove('flash'), 1600); } }, 50);
});

// ---------- carousel render ----------
async function loadSpecs() {
  const specs = await api('/api/carousel-specs');
  $('#specSel').innerHTML = specs.map((s) => `<option>${esc(s)}</option>`).join('') || '<option value="">No carousel.json yet</option>';
}
$('#carouselBtn').onclick = async () => {
  const spec = $('#specSel').value;
  if (!spec) return toast('No carousel.json found yet. Ask Tito AI to make one.');
  try { const run = await api('/api/runs', {stage: 'create', agent: 'carousel-render', title: `Render carousel · ${spec.split('/').slice(-4, -2).join(' ')}`, prompt: spec}); state.runs[run.id] = run; renderBoard(); switchTab('board'); toast('Rendering slides'); } catch (err) { toast(err.message); }
};

// ---------- live updates ----------
function connect() {
  const es = new EventSource('/api/events');
  es.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.type === 'run') {
      const typing = document.activeElement && document.activeElement.dataset.chat === msg.run.id ? document.activeElement.value : null;
      state.runs[msg.run.id] = msg.run; renderBoard(); renderStatus(); renderMain();
      if (typing !== null) { const i = document.querySelector(`[data-chat="${msg.run.id}"]`); if (i && !i.disabled) { i.value = typing; i.focus(); } }
      if (msg.run.agent === 'carousel-render' && msg.run.status === 'done') { loadPosts(); loadSpecs(); }
      if (msg.run.agent === 'video-producer' && msg.run.status === 'review') api('/api/media').then((m2) => { state.media = m2; renderVideo(); });
    }
    if (msg.type === 'deleted') { delete state.runs[msg.id]; renderBoard(); renderStatus(); renderMain(); }
    if (msg.type === 'status') { state.status = msg.status; renderStatus(); }
    if (msg.type === 'posts') loadPosts();
    if (window.boardUpdate) boardUpdate(msg);
  };
  es.onerror = () => { es.close(); setTimeout(connect, 2000); };
}

(async () => {
  const b = await api('/api/bootstrap');
  Object.assign(state, b, {runs: Object.fromEntries(b.runs.map((r) => [r.id, r]))});
  renderBoard(); renderStatus(); renderVideo(); loadPosts(); renderMain(); loadSpecs(); connect();
  if (window.boardInit) boardInit();
  setInterval(renderStatus, 30000);
})();
