// Tito AI Studio front end: live agent board, chat/approve, video panel, Telegram.
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const PAGES = 'https://jeffd1130.github.io/TitoAi/';
const state = {stages: [], agents: [], runs: {}, status: {}, compositions: [], media: []};
const STATUS_LABEL = {queued: 'Queued', running: 'Working…', review: 'Needs your review', approved: 'Approved', failed: 'Failed', stopped: 'Stopped'};

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
function renderBoard() {
  const cols = $('#columns');
  cols.innerHTML = state.stages.map((st) => {
    const runs = Object.values(state.runs).filter((r) => r.stage === st.id).sort((a, b) => b.updatedAt - a.updatedAt);
    return `<div class="col" data-stage="${st.id}">
      <div class="col-head"><div><h2>${esc(st.label)}<span class="count">${runs.length || ''}</span></h2><div class="muted">${esc(who(st.agent))}</div></div>
        <button class="btn small" data-new="${st.id}">+ Run</button></div>
      <div class="col-body">${runs.map(runCard).join('') || `<div class="empty">No runs yet.<br>${esc(who(st.agent))} is ready<br><span class="muted">${esc(persona(st.agent).role)}</span></div>`}</div>
    </div>`;
  }).join('');
  cols.querySelectorAll('.log').forEach((l) => (l.scrollTop = l.scrollHeight));
}

function runCard(r) {
  const events = r.events.slice(-60).map((e) => `<div class="ev ${e.kind}">${e.kind === 'you' ? '▸ ' : ''}${esc(e.text)}</div>`).join('');
  const files = r.files.map((f) => `<a data-open="${esc(f)}">📄 ${esc(f)}</a>`).join('');
  const busy = r.status === 'running';
  return `<div class="card run ${r.status}" data-id="${r.id}">
    <div class="run-head"><span class="dot"></span><span class="run-title">${esc(r.title)}</span></div>
    <div class="meta"><span class="chip agent" title="${esc(r.agent)}">${esc(who(r.agent))}</span><span>${STATUS_LABEL[r.status] || r.status}</span><span>· ${ago(r.updatedAt)}</span></div>
    <div class="log">${events || '<div class="ev log">Starting…</div>'}</div>
    ${files ? `<div class="files">${files}</div>` : ''}
    ${r.agent !== 'video-producer' ? `<div class="chat"><input placeholder="${busy ? 'Working… you can Stop' : 'Tell this agent what to change'}" ${busy ? 'disabled' : ''} data-chat="${r.id}"><button class="btn small" data-send="${r.id}" ${busy ? 'disabled' : ''}>Send</button></div>` : ''}
    <div class="actions">
      ${r.status === 'review' ? `<button class="btn small green" data-act="approve" data-id="${r.id}">Approve</button>` : ''}
      ${r.status === 'approved' ? `<button class="btn small" data-act="reopen" data-id="${r.id}">Reopen</button>${nextButton(r)}` : ''}
      ${busy ? `<button class="btn small danger" data-act="stop" data-id="${r.id}">Stop</button>` : ''}
      <button class="btn small danger" data-act="delete" data-id="${r.id}">Delete</button>
    </div>
  </div>`;
}

function nextButton(r) {
  const i = state.stages.findIndex((s) => s.id === r.stage);
  const next = state.stages[i + 1];
  if (!next || next.id === 'insights') return '';
  return `<button class="btn small gold" data-next="${r.id}">→ ${esc(next.label)}</button>`;
}

function openNewRun(stageId, presetPrompt = '', presetTitle = '') {
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
  const review = Object.values(state.runs).filter((r) => r.status === 'review').length;
  const s = state.status;
  $('#status').innerHTML = `
    <span class="pill">🤖 ${running} working</span>
    <span class="pill">👀 ${review} waiting on you</span>
    <span class="pill">Flow credits today <input id="flowCredits" type="number" min="0" max="50" value="${s.flowCredits ?? ''}" title="Type what Flow shows in your profile menu"></span>
    <span class="pill" title="${esc(s.flowNote)}">Flow first → Gemini after</span>`;
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
$('#copyPrompt').onclick = () => { navigator.clipboard.writeText($('#promptHelper').value); toast('Prompt copied'); };
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

// ---------- live updates ----------
function connect() {
  const es = new EventSource('/api/events');
  es.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.type === 'run') {
      const typing = document.activeElement && document.activeElement.dataset.chat === msg.run.id ? document.activeElement.value : null;
      state.runs[msg.run.id] = msg.run; renderBoard(); renderStatus();
      if (typing !== null) { const i = document.querySelector(`[data-chat="${msg.run.id}"]`); if (i && !i.disabled) { i.value = typing; i.focus(); } }
      if (msg.run.agent === 'video-producer' && msg.run.status === 'review') api('/api/media').then((m2) => { state.media = m2; renderVideo(); });
    }
    if (msg.type === 'deleted') { delete state.runs[msg.id]; renderBoard(); renderStatus(); }
    if (msg.type === 'status') { state.status = msg.status; renderStatus(); }
  };
  es.onerror = () => { es.close(); setTimeout(connect, 2000); };
}

(async () => {
  const b = await api('/api/bootstrap');
  Object.assign(state, b, {runs: Object.fromEntries(b.runs.map((r) => [r.id, r]))});
  renderBoard(); renderStatus(); renderVideo(); connect();
  setInterval(renderStatus, 30000);
})();
