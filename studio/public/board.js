// Tito AI Studio main board: a Figma-style canvas with the chief-of-staff chat, the live workflow,
// the ChatGPT → Claude handoff inbox, the final-approval queue, the content calendar and sticky notes.
// Uses globals from app.js (state, api, esc, who, toast, openFile, openNewRun, switchTab, copyText, STATUS_LABEL, ago).
(() => {
  const B = {view: {x: 40, y: 70, z: 0.62}, tool: 'move', notes: [], handoffs: [], schedule: [], chat: null, newChat: false,
    month: null, selected: null, ready: false};
  const vp = () => $('#fgViewport');
  const world = () => $('#fgWorld');

  // ---------- frames (world coordinates) ----------
  const FRAMES = [
    {id: 'cos', name: 'Chief of Staff · Tito AI', x: 0, y: 0, w: 700, h: 1740},
    {id: 'flow', name: 'Workflow · live', x: 760, y: 0, w: 1720, h: 540},
    {id: 'handoff', name: 'ChatGPT → Claude handoff', x: 760, y: 600, w: 840, h: 280},
    {id: 'approve', name: 'Your approvals · final only', x: 1640, y: 600, w: 840, h: 280},
    {id: 'cal', name: 'Content calendar', x: 760, y: 940, w: 1720, h: 800},
  ];

  // ---------- workflow nodes (inside the Workflow frame) ----------
  const NODES = [
    {id: 'jeff', x: 30, y: 210, emoji: '💡', name: 'Jeff', role: 'Idea / request', color: 'gray'},
    {id: 'tito-main', x: 240, y: 210, emoji: '🎙️', name: 'Tito AI', role: 'Chief of Staff · plans + runs team', color: 'navy', agent: 'tito-main'},
    {id: 'tito-researcher', x: 450, y: 210, emoji: '🔎', name: 'Tita Saliksik', role: 'Research · task summary only', color: 'teal', agent: 'tito-researcher', stage: 'research'},
    {id: 'tito-scriptwriter', x: 660, y: 210, emoji: '✍️', name: 'Kuya Sulat', role: 'Script + captions', color: 'teal', agent: 'tito-scriptwriter', stage: 'script'},
    {id: 'chatgpt', x: 870, y: 50, emoji: '🟢', name: 'ChatGPT', role: 'Makes video · Flow → Gemini', color: 'green'},
    {id: 'claude', x: 1080, y: 50, emoji: '🤝', name: 'Claude Code', role: 'Handoff review + finish', color: 'coral'},
    {id: 'video-producer', x: 1080, y: 210, emoji: '🎬', name: 'Kuya Kamera', role: 'Render + audio level', color: 'teal', agent: 'video-producer', stage: 'video'},
    {id: 'tito-content-creator', x: 870, y: 370, emoji: '🎨', name: 'Ate Disenyo', role: 'carousel.json (fallback)', color: 'teal', agent: 'tito-content-creator', stage: 'create'},
    {id: 'carousel-render', x: 1080, y: 370, emoji: '🖼️', name: 'Slide render', role: 'Branded PNG slides', color: 'teal', agent: 'carousel-render'},
    {id: 'tito-qa', x: 1290, y: 210, emoji: '🧐', name: 'Lola Suri', role: 'QA · verdict', color: 'teal', agent: 'tito-qa', stage: 'qa'},
    {id: 'final', x: 1500, y: 210, emoji: '✅', name: 'Your approval', role: 'Final video + post only', color: 'gold'},
  ];
  const NW = 180, NH = 100;
  const EDGES = [
    ['jeff', 'tito-main'], ['tito-main', 'tito-researcher'], ['tito-researcher', 'tito-scriptwriter'],
    ['tito-scriptwriter', 'chatgpt', 'script + Flow prompt'], ['chatgpt', 'claude'], ['claude', 'video-producer'],
    ['tito-scriptwriter', 'tito-content-creator', 'no credits → carousel'], ['tito-content-creator', 'carousel-render'],
    ['video-producer', 'tito-qa'], ['carousel-render', 'tito-qa'], ['tito-qa', 'final'],
  ];

  // ---------- helpers ----------
  const runsOf = (agent) => Object.values(state.runs).filter((r) => r.agent === agent).sort((a, b) => b.updatedAt - a.updatedAt);
  const mains = () => runsOf('tito-main').sort((a, b) => b.createdAt - a.createdAt);
  const md = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
  const pendingPosts = () => state.posts.filter((p) => !p.state.approved);
  const pendingVideos = () => runsOf('video-producer').filter((r) => r.status === 'review');
  const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const load = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };

  // ---------- skeleton ----------
  function build() {
    world().innerHTML = FRAMES.map((f) => `<div class="fg-frame" id="fr-${f.id}" style="left:${f.x}px;top:${f.y}px;width:${f.w}px;height:${f.h}px">
      <div class="fg-label" data-frame="${f.id}">${esc(f.name)}</div><div class="fg-body" id="fb-${f.id}"></div></div>`).join('') +
      '<div id="fgNotes"></div><div id="fgCursors"></div>';
    $('#fgLayers').innerHTML = '<div class="fg-ph">Layers</div>' + FRAMES.map((f) => `<div class="fg-layer" data-zoom="${f.id}"><span class="fg-hash">#</span>${esc(f.name)}</div>`).join('') +
      '<div class="fg-ph mt">Sticky notes</div><div id="fgNoteLayers"></div>' +
      '<div class="fg-ph mt">Shortcuts</div><div class="fg-keys">Drag or scroll to move<br>⌘ + scroll or pinch to zoom<br>Double-click to add a sticky<br>Press 1 to fit</div>';
    // Chief of staff frame
    $('#fb-cos').innerHTML = `<div class="cos">
      <div class="cos-list"><button class="fg-btn primary" id="cosNew">+ New conversation</button><div id="cosChats"></div></div>
      <div class="cos-main"><div class="cos-head" id="cosHead"></div><div class="cos-thread fg-scroll" id="cosThread"></div>
        <div class="cos-chips" id="cosChips"></div>
        <div class="cos-composer"><textarea id="cosInput" rows="2" placeholder="Message your chief of staff…"></textarea><button class="fg-btn primary" id="cosSend">Send</button></div></div></div>`;
    $('#cosChips').innerHTML = MAIN_CHIPS.slice(0, 3).map((c) => `<button class="fg-chip">${esc(c)}</button>`).join('');
    // Workflow frame
    $('#fb-flow').innerHTML = `<svg class="fg-edges" id="fgEdges" width="1720" height="500"></svg>
      <div class="lane-label" style="left:870px;top:18px">VIDEO LANE · Flow first, Gemini after credits</div>
      <div class="lane-label" style="left:870px;top:478px">CAROUSEL FALLBACK · no video credits</div>
      <div id="fgNodes"></div>`;
    $('#fb-handoff').innerHTML = '<div class="fg-scroll hand-list" id="handList"></div>';
    $('#fb-approve').innerHTML = '<div class="fg-scroll appr-list" id="apprList"></div>';
    $('#fb-cal').innerHTML = `<div class="cal-head"><button class="fg-btn" id="calPrev">‹</button><h3 id="calTitle"></h3><button class="fg-btn" id="calNext">›</button>
      <button class="fg-btn" id="calToday">Today</button><span class="cal-legend"><i class="st-posted"></i>Posted <i class="st-ready"></i>Ready <i class="st-draft"></i>Draft <i class="st-planned"></i>Planned</span></div>
      <div class="cal-grid" id="calGrid"></div>`;
    drawEdges();
  }

  // ---------- chief of staff ----------
  function currentChat() { if (B.newChat) return null; return (B.chat && state.runs[B.chat]) || mains()[0] || null; }
  function renderCos() {
    const list = mains();
    const cur = currentChat();
    $('#cosChats').innerHTML = list.map((r) => {
      const last = [...r.events].reverse().find((e) => e.kind === 'text' || e.kind === 'you');
      return `<div class="cos-chat ${cur && cur.id === r.id ? 'on' : ''} ${r.status}" data-chat-id="${r.id}"><b>${esc(r.title.replace(/^\[[^\]]*\]\s*/, ''))}</b>
        <span>${r.status === 'running' ? '● typing…' : esc((last ? last.text : '').slice(0, 60))}</span><em>${ago(r.updatedAt)}</em></div>`;
    }).join('') || '<p class="fg-muted">No conversations yet.</p>';
    $('#cosHead').innerHTML = `<b>🎙️ Tito AI</b> <span class="fg-muted">· your chief of staff. ${cur ? esc(cur.title) : 'New conversation'}</span>`;
    const th = $('#cosThread');
    const atBottom = th.scrollHeight - th.scrollTop - th.clientHeight < 60;
    th.innerHTML = cur ? cur.events.map((e) => {
      if (e.kind === 'you') return `<div class="cb me">${md(e.text)}</div>`;
      if (e.kind === 'text') return `<div class="cb tito">${md(e.text)}</div>`;
      if (e.kind === 'action') return `<div class="cn act">${md(e.text)}</div>`;
      if (e.kind === 'update') return e.text.startsWith('[Studio update]') ? '' : e.text.startsWith('[Handoff') ? `<div class="cn hand">🤝 ChatGPT handoff sent to Claude</div>` : `<div class="cn">${md(e.text)}</div>`;
      if (e.kind === 'error') return `<div class="cn err">${md(e.text)}</div>`;
      return '';
    }).join('') + (cur.status === 'running' ? '<div class="cb tito typing">Tito AI is thinking…</div>' : '')
      : '<div class="cos-empty">🎙️<b>Kumusta, Jeff!</b><span>Tell me what to make. I plan it, run the team, and only bring you the final video or post to approve.</span></div>';
    if (atBottom || !B.ready) th.scrollTop = th.scrollHeight;
    const busy = cur && cur.status === 'running';
    $('#cosSend').disabled = !!busy; $('#cosSend').textContent = busy ? '…' : 'Send';
  }
  async function sendCos() {
    const text = $('#cosInput').value.trim();
    if (!text) return;
    const cur = currentChat();
    try {
      const run = await api('/api/main', {text, newChat: B.newChat, chatId: cur && cur.id});
      B.newChat = false; B.chat = run.id; state.runs[run.id] = run; $('#cosInput').value = ''; renderCos(); renderMain();
    } catch (e) { toast(e.message); }
  }

  // ---------- workflow ----------
  const nodeById = (id) => NODES.find((n) => n.id === id);
  function drawEdges() {
    const svg = $('#fgEdges');
    svg.innerHTML = `<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#8C8C8C"/></marker></defs>` +
      EDGES.map(([a, b, label]) => {
        const A = nodeById(a), C = nodeById(b);
        let x1, y1, x2, y2;
        if (A.x === C.x) { x1 = x2 = A.x + NW / 2; y1 = A.y + NH; y2 = C.y; if (C.y < A.y) { y1 = A.y; y2 = C.y + NH; } }
        else { x1 = A.x + NW; y1 = A.y + NH / 2; x2 = C.x; y2 = C.y + NH / 2; }
        const mx = (x1 + x2) / 2;
        const d = A.x === C.x ? `M${x1},${y1} L${x2},${y2}` : `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
        const lx = A.x === C.x ? x1 + 8 : mx, ly = A.x === C.x ? (y1 + y2) / 2 : (y1 + y2) / 2 - 8;
        return `<path d="${d}" class="edge" data-edge="${a}-${b}" marker-end="url(#arr)"/>${label ? `<text x="${lx}" y="${ly}" class="edge-label" text-anchor="${A.x === C.x ? 'start' : 'middle'}">${esc(label)}</text>` : ''}`;
      }).join('');
  }
  function nodeState(n) {
    if (n.id === 'jeff') return {live: false, line: 'Send a message to start'};
    if (n.id === 'chatgpt') { const k = B.handoffs.filter((h) => h.state.status === 'new').length; return {live: false, badge: k, line: k ? `${k} waiting in handoff` : 'Drops clips in handoff/chatgpt/'}; }
    if (n.id === 'claude') { const k = B.handoffs.filter((h) => h.state.status === 'with-claude').length; return {live: k > 0, badge: k, line: k ? `${k} being finished` : 'Ready for the next handoff'}; }
    if (n.id === 'final') { const k = pendingPosts().length + pendingVideos().length; return {live: false, badge: k, line: k ? `${k} waiting on you` : 'Nothing to approve', warn: k > 0}; }
    const rs = runsOf(n.agent);
    const running = rs.filter((r) => r.status === 'running');
    const last = rs[0];
    return {live: running.length > 0, badge: running.length, line: running.length ? `Working: ${running[0].title}` : last ? `${STATUS_LABEL[last.status] || last.status} · ${last.title}` : 'Idle'};
  }
  function renderNodes() {
    $('#fgNodes').innerHTML = NODES.map((n) => {
      const s = nodeState(n);
      return `<div class="node c-${n.color} ${s.live ? 'live' : ''} ${s.warn ? 'warn' : ''} ${B.selected === 'node:' + n.id ? 'sel' : ''}" data-node="${n.id}" style="left:${n.x}px;top:${n.y}px;width:${NW}px;height:${NH}px">
        <div class="nh"><span>${n.emoji}</span><b>${esc(n.name)}</b>${s.badge ? `<em>${s.badge}</em>` : ''}</div>
        <div class="nr">${esc(n.role)}</div><div class="nl">${esc(s.line)}</div></div>`;
    }).join('');
    // live edges: light the path into a working node
    document.querySelectorAll('#fgEdges .edge').forEach((p) => {
      const to = p.dataset.edge.split('-').slice(-1)[0];
      p.classList.toggle('on', !!(nodeById(to) && nodeState(nodeById(to)).live));
    });
    renderCursors();
  }
  // Figma-style multiplayer cursors for agents that are working right now.
  function renderCursors() {
    const fl = FRAMES.find((f) => f.id === 'flow');
    const COLORS = ['#0D99FF', '#F24E1E', '#14AE5C', '#9747FF', '#FFA629'];
    const live = NODES.filter((n) => n.agent && nodeState(n).live);
    $('#fgCursors').innerHTML = live.map((n, i) => {
      const r = runsOf(n.agent).find((x) => x.status === 'running');
      const c = COLORS[i % COLORS.length];
      return `<div class="fg-cursor" style="left:${fl.x + n.x + NW - 30}px;top:${fl.y + 44 + n.y + NH - 20}px;--c:${c};animation-delay:${i * 0.7}s">
        <svg width="18" height="20" viewBox="0 0 18 20"><path d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z" fill="${c}" stroke="#fff" stroke-width="1.5"/></svg>
        <span>${esc(persona(n.agent).display || n.name)}${r ? ' · ' + esc(r.title.slice(0, 28)) : ''}</span></div>`;
    }).join('');
  }

  // ---------- handoff ----------
  async function loadHandoffs() { B.handoffs = await api('/api/handoffs'); renderHandoffs(); renderNodes(); }
  function renderHandoffs() {
    const LBL = {new: 'New from ChatGPT', 'with-claude': 'With Claude', done: 'Done'};
    $('#handList').innerHTML = B.handoffs.map((h) => {
      const st = h.state.status || 'new';
      const thumb = !h.media ? '<div class="thumb doc">📝</div>' : /\.(mp4|mov)$/i.test(h.media)
        ? `<video class="thumb" src="${fileUrl(h.media)}#t=1" preload="metadata" muted></video>` : `<img class="thumb" src="${fileUrl(h.media)}">`;
      return `<div class="hand ${st}">${thumb}<div class="hb"><b>${esc(h.id)}</b><span class="pill st-${st}">${LBL[st]}</span>
        <p>${esc((h.noteText || 'No note from ChatGPT.').replace(/^#.*\n/, '').slice(0, 160))}</p>
        <div class="row">${h.media ? `<button class="fg-btn" data-open-file="${esc(h.media)}">Preview</button>` : ''}
        ${st === 'new' ? `<button class="fg-btn primary" data-hand="${esc(h.id)}">Hand to Claude</button>` : ''}
        ${st === 'with-claude' ? `<button class="fg-btn" data-chat-id="${h.state.chatId}">Open conversation</button><button class="fg-btn" data-hand-done="${esc(h.id)}">Mark done</button>` : ''}
        ${st === 'done' ? `<button class="fg-btn" data-hand-reopen="${esc(h.id)}">Reopen</button>` : ''}</div></div></div>`;
    }).join('') || `<div class="hand-empty"><b>No handoffs yet.</b> ChatGPT saves a video plus a same-name <code>.md</code> note in <code>handoff/chatgpt/</code> (rules in its README). It shows up here, and <b>Hand to Claude</b> sends it to your chief of staff to review frames for chibi consistency, then finish it.</div>`;
  }

  // ---------- approvals (final only) ----------
  const link = (f) => `${location.origin}${fileUrl(f)}`;
  const linkBox = (f) => `<a class="thumb vid" href="${esc(link(f))}" target="_blank" rel="noopener" title="Open video">🔗</a>`;
  const linkRow = (f) => `<p class="appr-link"><a href="${esc(link(f))}" target="_blank" rel="noopener">${esc(f.split('/').pop())}</a></p>`;
  function renderApprovals() {
    const posts = pendingPosts(), vids = pendingVideos();
    $('#apprList').innerHTML = [
      ...vids.map((r) => `<div class="appr">${r.files[0] ? linkBox(r.files[0]) : '<div class="thumb vid">🎬</div>'}<div class="hb"><b>${esc(r.title)}</b><span class="pill st-draft">Final video</span>
        ${r.files[0] ? linkRow(r.files[0]) : ''}<div class="row">${r.files[0] ? `<button class="fg-btn" data-copy-link="${esc(link(r.files[0]))}">Copy link</button>` : ''}
        <button class="fg-btn primary" data-approve-run="${r.id}">Approve video</button></div></div></div>`),
      ...posts.map((p) => `<div class="appr">${p.type === 'video' ? linkBox(p.media[0] || '') : `<img class="thumb" src="${fileUrl(p.media[0] || '')}">`}
        <div class="hb"><b>${esc(p.title)}</b><span class="pill st-draft">${esc(p.type)} · ${esc(p.series || '')}</span>
        ${p.type === 'video' && p.media[0] ? linkRow(p.media[0]) : ''}
        <div class="row">${p.type === 'video' && p.media[0] ? `<button class="fg-btn" data-copy-link="${esc(link(p.media[0]))}">Copy link</button>` : ''}<button class="fg-btn primary" data-goto-post="${esc(p.id)}">Review captions &amp; approve</button></div></div></div>`),
    ].join('') || '<div class="hand-empty">Nothing waiting. Research, scripts and other steps flow on their own; only final videos and posts land here.</div>';
  }

  // ---------- calendar ----------
  async function loadSchedule() { B.schedule = await api('/api/schedule'); renderCal(); }
  function renderCal() {
    const now = new Date();
    if (!B.month) B.month = {y: now.getFullYear(), m: now.getMonth()};
    const {y, m} = B.month;
    $('#calTitle').textContent = new Date(y, m, 1).toLocaleString('en', {month: 'long', year: 'numeric'});
    const first = new Date(y, m, 1), start = new Date(y, m, 1 - first.getDay());
    const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const today = iso(now);
    let html = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => `<div class="cal-dow">${d}</div>`).join('');
    for (let i = 0; i < 42; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      const k = iso(d);
      const items = B.schedule.filter((p) => p.date === k);
      html += `<div class="cal-day ${d.getMonth() !== m ? 'out' : ''} ${k === today ? 'today' : ''}"><span class="dn">${d.getDate()}</span>
        ${items.map((p) => `<div class="cal-post st-${esc(p.status || 'planned')} ${B.selected === 'post:' + p.week + p.day ? 'sel' : ''}" data-cal-post="${esc(p.week + '|' + p.day + '|' + p.date)}" title="${esc(p.title)}">
          <b>${esc(p.week)} ${esc(p.day)}</b> ${esc(p.title)}</div>`).join('')}</div>`;
    }
    $('#calGrid').innerHTML = html;
  }

  // ---------- inspector ----------
  function inspect(kind, id) {
    B.selected = kind && `${kind}:${id}`;
    const el = $('#fgInspector');
    let html = '';
    if (kind === 'node') {
      const n = nodeById(id), s = nodeState(n);
      html = `<div class="fg-ph">${n.emoji} ${esc(n.name)}</div><p class="fg-muted">${esc(n.role)}</p><p>${esc(s.line)}</p>`;
      if (n.agent && n.agent !== 'tito-main') {
        const rs = runsOf(n.agent).slice(0, 6);
        html += `<div class="fg-ph mt">Recent runs</div>` + (rs.map((r) => `<div class="ins-run ${r.status}" data-goto="${r.id}"><b>${esc(r.title)}</b><span>${STATUS_LABEL[r.status] || r.status} · ${ago(r.updatedAt)}</span></div>`).join('') || '<p class="fg-muted">No runs yet.</p>');
        if (n.stage) html += `<button class="fg-btn primary mt" data-new-run="${n.stage}">+ New run</button>`;
      }
      if (id === 'tito-main') html += '<button class="fg-btn primary mt" data-zoom="cos">Open conversations</button>';
      if (id === 'chatgpt') html += `<div class="fg-ph mt">How ChatGPT hands off</div><ol class="ins-ol"><li>Make the clip in Google Flow (Veo 3.1 Lite, 9:16, x1, silent ON). Use Gemini only after Flow credits run out.</li><li>Save it to <code>handoff/chatgpt/</code> with a same-name <code>.md</code> note (what it's for, the prompt).</li><li>Press <b>Hand to Claude</b> in the handoff frame.</li></ol><button class="fg-btn mt" data-copy-flow>Copy Flow prompt</button>`;
      if (id === 'claude') html += '<p class="fg-muted">Claude Code owns the finish: checks the chibi frames, places the file, writes captions, renders and sends it to Lola Suri.</p><button class="fg-btn primary mt" data-zoom="handoff">Open handoff inbox</button>';
      if (id === 'final') html += '<p class="fg-muted">You approve only finished videos and posts. Everything before that flows on automatically.</p><button class="fg-btn primary mt" data-zoom="approve">Open approvals</button>';
      if (id === 'tito-researcher') html += '<p class="fg-muted">Returns a short task summary, not a long report. No approval needed.</p>';
    } else if (kind === 'post') {
      const [wk, day, date] = id.split('|');
      const p = B.schedule.find((x) => x.week === wk && x.day === day && x.date === date);
      if (p) html = `<div class="fg-ph">${esc(p.week)} ${esc(p.day)} · ${esc(p.date)}</div><h4 class="ins-title">${esc(p.title)}</h4>
        <span class="pill st-${esc(p.status)}">${esc(p.status)}</span><p class="fg-muted">${esc(p.tag || '')}</p><p class="ins-note">${esc(p.note || '')}</p>
        ${p.url ? `<a class="fg-btn" href="${/^https?:/.test(p.url) ? esc(p.url) : PAGES + esc(p.url)}" target="_blank">Open link</a>` : ''}
        <button class="fg-btn primary mt" data-ask-cos="${esc(`Let's work on ${p.week} ${p.day} (${p.date}): "${p.title}". What's the status and what's next?`)}">Ask chief of staff</button>`;
    } else if (kind === 'note') {
      html = '<div class="fg-ph">Sticky note</div><div class="note-colors">' + ['yellow', 'pink', 'green', 'blue', 'purple'].map((c) => `<button class="sw n-${c}" data-note-color="${c}"></button>`).join('') +
        `</div><button class="fg-btn mt" data-note-del="${id}">Delete note</button>`;
    }
    el.innerHTML = html || `<div class="fg-ph">Main board</div><p class="fg-muted">Click a workflow step, a calendar post or a sticky note to see details here.</p>
      <div class="fg-ph mt">Shortcuts</div><ul class="ins-ol"><li>Scroll or drag the background to move</li><li>⌘/Ctrl + scroll or pinch to zoom</li><li>Double-click the background to add a sticky</li><li>V move · H hand · S sticky · 1 fit</li></ul>`;
    document.body.classList.toggle('fg-has-sel', !!kind);
    renderNodes(); renderCal(); renderNotes();
  }

  // ---------- sticky notes ----------
  let noteTimer = null;
  function saveNotes() { clearTimeout(noteTimer); noteTimer = setTimeout(() => api('/api/board', {notes: B.notes}).catch((e) => toast(e.message)), 500); }
  function renderNotes() {
    const editing = document.activeElement && document.activeElement.closest('.sticky');
    if (editing) return;
    $('#fgNotes').innerHTML = B.notes.map((n) => `<div class="sticky n-${esc(n.color)} ${B.selected === 'note:' + n.id ? 'sel' : ''}" data-note="${n.id}" style="left:${n.x}px;top:${n.y}px">
      <div class="sticky-grip" data-note-grip="${n.id}"></div><div class="sticky-text" contenteditable="true" data-note-text="${n.id}">${esc(n.text)}</div></div>`).join('');
    $('#fgNoteLayers').innerHTML = B.notes.map((n) => `<div class="fg-layer" data-note-go="${n.id}"><span class="fg-hash">▢</span>${esc((n.text || 'Empty note').slice(0, 26))}</div>`).join('') || '<p class="fg-muted small">Double-click the canvas.</p>';
  }
  function addNote(x, y) {
    const n = {id: Math.random().toString(36).slice(2, 9), x: Math.round(x - 100), y: Math.round(y - 20), text: '', color: 'yellow'};
    B.notes.push(n); renderNotes(); saveNotes();
    setTimeout(() => { const t = document.querySelector(`[data-note-text="${n.id}"]`); if (t) t.focus(); }, 30);
    setTool('move');
  }

  // ---------- pan / zoom ----------
  function apply() {
    world().style.transform = `translate(${B.view.x}px, ${B.view.y}px) scale(${B.view.z})`;
    vp().style.backgroundSize = `${20 * B.view.z}px ${20 * B.view.z}px`;
    vp().style.backgroundPosition = `${B.view.x}px ${B.view.y}px`;
    $('#fgZoom').textContent = `${Math.round(B.view.z * 100)}%`;
    store('fg-view2', B.view);
  }
  function zoomAt(z, cx, cy) {
    z = Math.min(3, Math.max(0.15, z));
    const wx = (cx - B.view.x) / B.view.z, wy = (cy - B.view.y) / B.view.z;
    B.view = {x: cx - wx * z, y: cy - wy * z, z};
    apply();
  }
  function fit(ids) {
    const fs = FRAMES.filter((f) => !ids || ids.includes(f.id));
    const x0 = Math.min(...fs.map((f) => f.x)), y0 = Math.min(...fs.map((f) => f.y)) - 30;
    const x1 = Math.max(...fs.map((f) => f.x + f.w)), y1 = Math.max(...fs.map((f) => f.y + f.h));
    const r = vp().getBoundingClientRect(), pad = 40;
    const z = Math.min(2, Math.min((r.width - pad * 2) / (x1 - x0), (r.height - pad * 2) / (y1 - y0)));
    B.view = {z, x: (r.width - (x1 - x0) * z) / 2 - x0 * z, y: (r.height - (y1 - y0) * z) / 2 - y0 * z};
    world().classList.add('anim'); apply(); setTimeout(() => world().classList.remove('anim'), 400);
  }
  const toWorld = (cx, cy) => { const r = vp().getBoundingClientRect(); return {x: (cx - r.left - B.view.x) / B.view.z, y: (cy - r.top - B.view.y) / B.view.z}; };
  function setTool(t) { B.tool = t; document.querySelectorAll('[data-tool]').forEach((b) => b.classList.toggle('on', b.dataset.tool === t)); vp().dataset.mode = t; }

  function canScroll(el, dx, dy) {
    for (let n = el; n && n !== vp(); n = n.parentElement) {
      if (n.classList && n.classList.contains('fg-scroll')) {
        if (dy && n.scrollHeight > n.clientHeight && !((dy < 0 && n.scrollTop <= 0) || (dy > 0 && n.scrollTop + n.clientHeight >= n.scrollHeight - 1))) return true;
        if (dx && n.scrollWidth > n.clientWidth) return true;
      }
    }
    return false;
  }
  function wire() {
    const v = vp();
    v.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) { e.preventDefault(); const r = v.getBoundingClientRect(); zoomAt(B.view.z * Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top); return; }
      if (canScroll(e.target, e.deltaX, e.deltaY)) return;
      e.preventDefault(); B.view.x -= e.deltaX; B.view.y -= e.deltaY; apply();
    }, {passive: false});

    const ptrs = new Map();
    let pan = null, pinch = null, drag = null, space = false;
    const isBg = (t) => t === v || t === world() || t.id === 'fgNotes' || t.classList.contains('fg-label') || t.classList.contains('fg-body') || !!t.closest('svg.fg-edges') || t.classList.contains('lane-label');
    // Anything that isn't a control, text field or scroll list can be dragged to pan (needed on phones).
    const canPan = (t) => !t.closest('button,input,textarea,select,a,video,[contenteditable="true"],.hand,.appr,.cos-thread,.cos-list,.cos-composer');
    let swallowClick = false;
    v.addEventListener('click', (e) => { if (swallowClick) { e.stopPropagation(); e.preventDefault(); swallowClick = false; } }, true);
    v.addEventListener('pointerdown', (e) => {
      ptrs.set(e.pointerId, {x: e.clientX, y: e.clientY});
      const grip = e.target.closest('[data-note-grip]');
      if (grip && ptrs.size === 1) {
        const n = B.notes.find((x) => x.id === grip.dataset.noteGrip);
        drag = {n, sx: e.clientX, sy: e.clientY, ox: n.x, oy: n.y}; v.setPointerCapture(e.pointerId); inspect('note', n.id); return;
      }
      if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        pinch = {d: Math.hypot(a.x - b.x, a.y - b.y), z: B.view.z}; pan = null; return;
      }
      if (B.tool === 'sticky' && isBg(e.target)) { const w = toWorld(e.clientX, e.clientY); addNote(w.x, w.y); return; }
      if (B.tool === 'hand' || space || e.button === 1 || canPan(e.target)) {
        pan = {sx: e.clientX, sy: e.clientY, ox: B.view.x, oy: B.view.y, moved: false, id: e.pointerId, bg: isBg(e.target)};
        e.preventDefault();                                     // no text selection while dragging the canvas
      }
    });
    v.addEventListener('pointermove', (e) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, {x: e.clientX, y: e.clientY});
      if (drag) { drag.n.x = Math.round(drag.ox + (e.clientX - drag.sx) / B.view.z); drag.n.y = Math.round(drag.oy + (e.clientY - drag.sy) / B.view.z); const el = document.querySelector(`[data-note="${drag.n.id}"]`); if (el) { el.style.left = drag.n.x + 'px'; el.style.top = drag.n.y + 'px'; } return; }
      if (pinch && ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        const r = v.getBoundingClientRect();
        zoomAt(pinch.z * Math.hypot(a.x - b.x, a.y - b.y) / pinch.d, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top); return;
      }
      if (pan) {
        if (!pan.moved && Math.abs(e.clientX - pan.sx) + Math.abs(e.clientY - pan.sy) > 4) { pan.moved = true; v.setPointerCapture(pan.id); v.classList.add('grabbing'); }
        if (pan.moved) { B.view.x = pan.ox + e.clientX - pan.sx; B.view.y = pan.oy + e.clientY - pan.sy; apply(); }
      }
    });
    const end = (e) => {
      ptrs.delete(e.pointerId);
      if (drag) { saveNotes(); drag = null; }
      if (pan && pan.moved) swallowClick = true;
      else if (pan && pan.bg && B.selected) inspect(null);
      if (ptrs.size < 2) pinch = null;
      if (!ptrs.size) { pan = null; v.classList.remove('grabbing'); }
    };
    v.addEventListener('pointerup', end); v.addEventListener('pointercancel', end);
    v.addEventListener('dblclick', (e) => { if (isBg(e.target)) { const w = toWorld(e.clientX, e.clientY); addNote(w.x, w.y); } });

    document.addEventListener('keydown', (e) => {
      if (!$('#canvas').classList.contains('active') || e.target.closest('input,textarea,[contenteditable="true"],select')) return;
      if (e.code === 'Space') { space = true; v.dataset.mode = 'hand'; e.preventDefault(); }
      if (e.key === 'v' || e.key === 'V') setTool('move');
      if (e.key === 'h' || e.key === 'H') setTool('hand');
      if (e.key === 's' || e.key === 'S') setTool('sticky');
      if (e.key === '1' && !e.shiftKey) fit();
      if ((e.key === '=' || e.key === '+')) zoomAt(B.view.z * 1.2, v.clientWidth / 2, v.clientHeight / 2);
      if (e.key === '-') zoomAt(B.view.z / 1.2, v.clientWidth / 2, v.clientHeight / 2);
      if ((e.key === 'Backspace' || e.key === 'Delete') && B.selected && B.selected.startsWith('note:')) { delNote(B.selected.slice(5)); }
      if (e.key === 'Escape') inspect(null);
    });
    document.addEventListener('keyup', (e) => { if (e.code === 'Space') { space = false; v.dataset.mode = B.tool; } });

    // clicks inside the board
    $('#canvas').addEventListener('click', async (e) => {
      const t = e.target, g = (s) => t.closest(s);
      let el;
      if ((el = g('[data-tool]'))) return setTool(el.dataset.tool);
      if (g('#fgFit')) return fit();
      if (g('#fgZoomIn')) return zoomAt(B.view.z * 1.25, v.clientWidth / 2, v.clientHeight / 2);
      if (g('#fgZoomOut')) return zoomAt(B.view.z / 1.25, v.clientWidth / 2, v.clientHeight / 2);
      if (g('#fgInsClose')) return inspect(null);
      if ((el = g('[data-zoom]'))) { fit([el.dataset.zoom]); if (window.innerWidth <= 760) inspect(null); return; }
      if ((el = g('[data-node]'))) return inspect('node', el.dataset.node);
      if ((el = g('[data-cal-post]'))) return inspect('post', el.dataset.calPost);
      if ((el = g('[data-note]')) && !g('[data-note-grip]')) { if (B.selected !== 'note:' + el.dataset.note) inspect('note', el.dataset.note); return; }
      if ((el = g('[data-note-go]'))) { const n = B.notes.find((x) => x.id === el.dataset.noteGo); const r = v.getBoundingClientRect(); B.view.x = r.width / 2 - (n.x + 100) * B.view.z; B.view.y = r.height / 2 - (n.y + 80) * B.view.z; apply(); return inspect('note', n.id); }
      if ((el = g('[data-note-color]'))) { const n = B.notes.find((x) => 'note:' + x.id === B.selected); if (n) { n.color = el.dataset.noteColor; renderNotes(); saveNotes(); } return; }
      if ((el = g('[data-note-del]'))) return delNote(el.dataset.noteDel);
      if ((el = g('[data-chat-id]'))) { B.chat = el.dataset.chatId; B.newChat = false; renderCos(); if (!g('#fb-cos')) fit(['cos']); return; }
      if (g('#cosNew')) { B.newChat = true; renderCos(); $('#cosInput').focus(); return; }
      if (g('#cosSend')) return sendCos();
      if ((el = g('.fg-chip'))) { $('#cosInput').value = el.textContent; $('#cosInput').focus(); return; }
      if ((el = g('[data-ask-cos]'))) { $('#cosInput').value = el.dataset.askCos; fit(['cos']); setTimeout(() => $('#cosInput').focus(), 450); return; }
      if ((el = g('[data-copy-link]'))) return copyText(el.dataset.copyLink);
      if ((el = g('[data-open-file]'))) return el.dataset.openFile && openFile(el.dataset.openFile);
      if ((el = g('[data-hand]'))) { el.disabled = true; el.textContent = 'Sending…'; try { const run = await api(`/api/handoffs/${el.dataset.hand}/claude`, {}); B.chat = run.id; B.newChat = false; toast('Handed to Claude. Tito AI is reviewing it.'); loadHandoffs(); } catch (err) { toast(err.message); el.disabled = false; el.textContent = 'Hand to Claude'; } return; }
      if ((el = g('[data-hand-done]'))) { await api(`/api/handoffs/${el.dataset.handDone}/done`, {}); return loadHandoffs(); }
      if ((el = g('[data-hand-reopen]'))) { await api(`/api/handoffs/${el.dataset.handReopen}/reopen`, {}); return loadHandoffs(); }
      if ((el = g('[data-approve-run]'))) { try { await api(`/api/runs/${el.dataset.approveRun}/approve`, {}); toast('Video approved'); } catch (err) { toast(err.message); } return; }
      if ((el = g('[data-goto-post]'))) { switchTab('posting'); setTimeout(() => { const c = document.querySelector(`[data-post-id="${el.dataset.gotoPost}"]`) || document.querySelector('#posts'); c.scrollIntoView({behavior: 'smooth'}); }, 60); return; }
      if ((el = g('[data-new-run]'))) return openNewRun(el.dataset.newRun);
      if (g('[data-copy-flow]')) return copyText(DEFAULT_PROMPT);
      if (g('#calPrev')) { B.month.m--; if (B.month.m < 0) { B.month.m = 11; B.month.y--; } return renderCal(); }
      if (g('#calNext')) { B.month.m++; if (B.month.m > 11) { B.month.m = 0; B.month.y++; } return renderCal(); }
      if (g('#calToday')) { B.month = null; return renderCal(); }
    });
    $('#canvas').addEventListener('input', (e) => {
      const id = e.target.dataset && e.target.dataset.noteText;
      if (!id) return;
      const n = B.notes.find((x) => x.id === id); n.text = e.target.innerText; saveNotes();
      const l = document.querySelector(`[data-note-go="${id}"]`); if (l) l.lastChild.textContent = (n.text || 'Empty note').slice(0, 26);
    });
    $('#canvas').addEventListener('focusout', (e) => { if (e.target.dataset && e.target.dataset.noteText) setTimeout(renderNotes, 0); });
    $('#cosInput').addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 760) { e.preventDefault(); sendCos(); } });
  }
  function delNote(id) { B.notes = B.notes.filter((n) => n.id !== id); inspect(null); saveNotes(); }

  function renderAll() { if (!B.ready) return; renderCos(); renderNodes(); renderHandoffs(); renderApprovals(); }

  // ---------- hooks from app.js ----------
  window.boardInit = async () => {
    const size = () => { $('#canvas').style.height = `${window.innerHeight - $('.top').offsetHeight}px`; };
    size(); window.addEventListener('resize', size);
    build(); wire(); setTool('move');
    const saved = load('fg-view2');
    B.ready = true;
    renderAll(); inspect(null);
    if (saved && saved.z) { B.view = saved; apply(); } else setTimeout(() => fit(), 120);
    try { B.notes = (await api('/api/board')).notes || []; renderNotes(); } catch {}
    loadHandoffs(); loadSchedule();
    setInterval(loadSchedule, 60000);
    const firstShow = !saved;
    document.querySelector('.tab[data-tab="canvas"]').addEventListener('click', () => { if (firstShow) requestAnimationFrame(() => fit()); });
  };
  let t = null;
  window.boardUpdate = (msg) => {
    if (msg.type === 'handoffs') return loadHandoffs();
    if (msg.type === 'board') { if (!document.activeElement || !document.activeElement.closest('.sticky')) { B.notes = msg.board.notes; renderNotes(); } return; }
    clearTimeout(t); t = setTimeout(renderAll, 120);
  };
  const origRenderPosts = renderPosts;
  renderPosts = function () { origRenderPosts(); renderStatus(); if (B.ready) { renderApprovals(); renderNodes(); } };   // eslint-disable-line no-global-assign
})();
