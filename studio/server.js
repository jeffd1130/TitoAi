// Tito AI Studio — local dashboard that runs the tito-* agents through Claude Code (your plan, no API key),
// streams their work live, and lets Jeff chat, approve, render videos and send Telegram updates.
// Zero dependencies: Node built-ins only. Binds to 127.0.0.1.
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {spawn} = require('child_process');

const PORT = Number(process.env.STUDIO_PORT || 4545);
const ROOT = path.resolve(__dirname, '..');               // TItoAi project
const PUBLIC = path.join(__dirname, 'public');
const DATA = path.join(__dirname, 'data');
const RUNS_FILE = path.join(DATA, 'runs.json');
const STATUS_FILE = path.join(DATA, 'status.json');
const REMOTION = path.join(ROOT, 'w44-friday-motion-sample');
fs.mkdirSync(path.join(DATA, 'strips'), {recursive: true});

// ---------- stages + agents ----------
const SCHEDULING_OFF = true;   // Jeff, Nov 5: stop scheduling. Set to false to turn Kuya Iskedyul back on.
const STAGES = [
  {id: 'research', label: 'Research', agent: 'tito-researcher'},
  {id: 'script', label: 'Script', agent: 'tito-scriptwriter'},
  {id: 'create', label: 'Create', agent: 'tito-content-creator'},
  {id: 'video', label: 'Video', agent: 'video-producer'},
  {id: 'qa', label: 'QA', agent: 'tito-qa'},
  {id: 'publish', label: 'Schedule', agent: 'tito-publisher'},
  {id: 'insights', label: 'Insights', agent: 'tito-analyst'},
];

// Tito AI family names shown in the studio (agent file IDs stay the same for Claude Code).
const PERSONAS = {
  'tito-researcher': {display: 'Tita Saliksik', emoji: '🔎', role: 'Researcher'},
  'tito-scriptwriter': {display: 'Kuya Sulat', emoji: '✍️', role: 'Scriptwriter'},
  'tito-content-creator': {display: 'Ate Disenyo', emoji: '🎨', role: 'Content creator'},
  'video-producer': {display: 'Kuya Kamera', emoji: '🎬', role: 'Video producer'},
  'tito-qa': {display: 'Lola Suri', emoji: '🧐', role: 'QA reviewer'},
  'tito-publisher': {display: 'Kuya Iskedyul', emoji: '📅', role: 'Scheduler — Meta + TikTok calendars'},
  'tito-analyst': {display: 'Tito Numero', emoji: '📊', role: 'Analyst'},
  'general': {display: 'Tito Helper', emoji: '🤖', role: 'General helper'},
  'tito-main': {display: 'Tito AI', emoji: '🎙️', role: 'Chief of Staff — plans the post and runs the team'},
  'carousel-render': {display: 'Ate Disenyo', emoji: '🖼️', role: 'Carousel render'},
};

// The main producer agent: plans with Jeff, then starts the team by writing studio-action blocks.
const MAIN_PROMPT = `You are **Tito AI**, Jeff's chief of staff and main producer agent inside Tito AI Studio (a local dashboard Jeff uses). You chat with Jeff in Taglish/English, plan the content, and run the team. Read CLAUDE.md for the brand rules (Taglish, free tools only, no fabrication, approved chibi host, five hashtags, Jeff approves every post; only Jeff's Schedule button in Approve & Post puts a post on the Meta/TikTok calendars — you never start Kuya Iskedyul).

Do not write the content yourself; delegate to the team by writing an action block, which the studio runs immediately:

\`\`\`studio-action
{"action": "start_run", "stage": "research|script|create|qa|insights", "agent": "<agent id>", "title": "short card title", "prompt": "complete instructions incl. exact file paths"}
\`\`\`

Team (agent ids):
- tito-researcher (Tita Saliksik): plans weeks, writes content/<YYYY-W##>/<slot>/brief.md
- tito-scriptwriter (Kuya Sulat): writes drafts/script.md and drafts/captions.md from the brief
- tito-content-creator (Ate Disenyo): slide content. For a carousel, she writes drafts/carousel.json following studio/carousel-schema.md (read it), plus captions.md if missing
- tito-qa (Lola Suri): read-only review, gives a VERDICT
- tito-analyst (Tito Numero): metrics and reports
- general (Tito Helper): small housekeeping edits, e.g. adding the post to docs/schedule.json as a draft

You can read files but not edit them. Every change goes through a team member.

Other actions:
- {"action": "render_carousel", "spec": "content/.../drafts/carousel.json"}: the studio renders branded PNG slides and adds the post to Approve & Post.
- {"action": "render_video", "composition": "<Remotion id>"}: only when the Flow/Gemini clip already exists.
- {"action": "place_file", "from": "handoff/chatgpt/<file>", "to": "w44-friday-motion-sample/public/<file>" or "docs/media/<folder>/<file>"}: copies a handed-off video or image into place (the team can't copy binary files).

ChatGPT → Claude handoff: ChatGPT (Codex) may generate a video in Flow/Gemini and drop it in handoff/chatgpt/ with a same-name .md note. When you get a "[Handoff from ChatGPT]" message, you own the finish: Read the frame strip image it gives you and check the chibi against the rules (same clean-shaven chibi, soft 2D style, rounded elbows, no puppet/3D look, screen facing the viewer, nothing cut off). If it fails, tell Jeff exactly what to regenerate. If it passes, place_file it, have the team write or update captions and docs, render if a Remotion composition uses it, then send it to Lola Suri.

Video vs carousel: Reels need chibi motion clips that Jeff generates by hand in Google Flow (Veo 3.1 Lite, about 50 free credits a day, 10 per 8s clip) first, then Gemini. If Jeff says there are no credits, there's no time, or video isn't possible, **switch to the carousel fallback**: Kuya Sulat (script + captions) → Ate Disenyo (carousel.json) → render_carousel → Lola Suri QA.

How to work:
- Start with one short plan (week, slot, topic, format, growth job). Ask at most one question, and only if you truly need it; otherwise pick sensible defaults and go.
- Start one stage at a time. You will receive "[Studio update]" messages when an agent finishes. Read its files, then start the next stage or tell Jeff what needs him.
- Put full file paths in every prompt you hand off. Keep your messages to Jeff short and clear, and say which agent you started.
- **Whenever you say you are starting or rendering something, include its studio-action block in that same message.** Nothing happens without the block.
- Jeff approves only the final content: the finished post in Approve & Post and the final rendered video. Don't ask him to approve research, scripts or other in-between steps; move straight on to the next agent.
- Tita Saliksik returns only a short summary of tasks. Use it to start the next agents.
- Stop and hand over to Jeff when QA passes (or only minor polish is left). Summarize in 3–5 bullets what's ready and what he needs to check, and point him to the Approve & Post tab.
- Never post, schedule, boost, or send messages; Jeff approves in the Approve & Post tab.`;

function readAgents() {
  const dir = path.join(ROOT, '.claude', 'agents');
  const agents = [];
  for (const f of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
    if (!f.endsWith('.md')) continue;
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = (text.match(/^---\n([\s\S]*?)\n---/) || [])[1] || '';
    const get = (k) => ((fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm')) || [])[1] || '').trim();
    agents.push({name: get('name') || f.replace('.md', ''), description: get('description'),
      tools: get('tools').split(',').map((t) => t.trim()).filter(Boolean), kind: 'claude'});
  }
  agents.push({name: 'video-producer', description: 'Renders a Remotion composition and levels the audio (ffmpeg loudnorm -14 LUFS).', tools: [], kind: 'render'});
  agents.push({name: 'general', description: 'Plain Claude Code in the TitoAi project (reads CLAUDE.md).', tools: ['Read', 'Glob', 'Grep', 'Write', 'Edit', 'WebSearch', 'WebFetch'], kind: 'claude'});
  agents.push({name: 'tito-main', description: 'Main producer: chats with Jeff, plans the post, and starts the team.', tools: ['Read', 'Glob', 'Grep'], kind: 'main'});
  agents.push({name: 'carousel-render', description: 'Renders a carousel.json spec into branded PNG slides.', tools: [], kind: 'render'});
  return agents.map((a) => ({...a, ...(PERSONAS[a.name] || {display: a.name, emoji: '🤖', role: ''})}));
}

// ---------- persistence ----------
const loadJSON = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const runs = loadJSON(RUNS_FILE, {});
let status = loadJSON(STATUS_FILE, {flowCredits: null, flowNote: '50 free credits/day · Veo 3.1 Lite = 10 per clip', geminiNote: 'Gemini Videos: ~4–5/day'});
for (const r of Object.values(runs)) {
  if (r.status === 'running') r.status = 'stopped';                                       // server restarted mid-run
  if (r.status === 'review' && r.agent !== 'video-producer') r.status = 'done';           // only final videos wait for approval
}
let saveTimer = null;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fs.writeFileSync(RUNS_FILE, JSON.stringify(runs, null, 1));
    fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 1));
  }, 400);
}

// ---------- live updates (SSE) ----------
const clients = new Set();
function broadcast(msg) {
  const line = `data: ${JSON.stringify(msg)}\n\n`;
  for (const res of clients) res.write(line);
}
const pending = new Map();
function pushRun(run) {                                     // throttle full-run broadcasts per card
  if (pending.has(run.id)) return;
  pending.set(run.id, setTimeout(() => { pending.delete(run.id); broadcast({type: 'run', run}); }, 250));
  run.updatedAt = Date.now();
  save();
}
function addEvent(run, kind, text) {
  run.events.push({t: Date.now(), kind, text: String(text).slice(0, 4000)});
  if (run.events.length > 400) run.events.splice(0, run.events.length - 400);
  pushRun(run);
}

// ---------- running Claude agents ----------
const procs = new Map();
function relFile(p) {
  if (!p) return null;
  const abs = path.isAbsolute(p) ? p : path.join(ROOT, p);
  const rel = path.relative(ROOT, abs);
  return rel.startsWith('..') ? null : rel;
}

function startClaude(run, text, {fromJeff = true} = {}) {
  const agent = readAgents().find((a) => a.name === run.agent);
  const args = ['-p', text, '--output-format', 'stream-json', '--verbose', '--permission-mode', 'acceptEdits'];
  if (run.agent === 'tito-main') {
    args.push('--append-system-prompt', MAIN_PROMPT, '--allowedTools', 'Read,Glob,Grep', '--disallowedTools', 'Write,Edit,NotebookEdit,Bash');
    if (fromJeff) run.autoSteps = 0;
    run.actionsDone = [];                                     // duplicate guard is per reply, so a repeated render still runs
  } else if (run.agent !== 'general') args.push('--agent', run.agent);
  if (agent && agent.tools.length && run.agent !== 'tito-main') args.push('--allowedTools', agent.tools.join(','));
  if (run.agent === 'tito-publisher') args.push('--chrome');           // drives Chrome to reach the schedulers
  if (run.sessionId) args.push('--resume', run.sessionId);
  run.status = 'running';
  addEvent(run, fromJeff ? 'you' : 'update', text);
  const child = spawn('claude', args, {cwd: ROOT, env: process.env, stdio: ['ignore', 'pipe', 'pipe']});
  procs.set(run.id, child);
  let buf = '';
  child.stdout.on('data', (d) => {
    buf += d;
    let i;
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i); buf = buf.slice(i + 1);
      if (line.trim()) handleStreamLine(run, line);
    }
  });
  child.stderr.on('data', (d) => {
    const s = String(d).trim();
    if (s && !/has not been trusted|Ignoring \d+ permissions/.test(s)) addEvent(run, 'error', s);
  });
  child.on('close', (code) => {
    procs.delete(run.id);
    if (run.status === 'running') run.status = code === 0 ? 'done' : 'failed';   // steps flow on; Jeff approves only the final video/post
    if (code !== 0 && run.status === 'failed') addEvent(run, 'error', `Agent exited with code ${code}`);
    pushRun(run);
    onRunFinished(run);
  });
}

// ---------- main producer: actions + auto-continue ----------
const MAX_AUTO_STEPS = 8;                                     // per message from Jeff, so the team can't loop forever
function personaName(id) { const p = PERSONAS[id]; return p ? `${p.emoji} ${p.display}` : id; }

function runActions(main, text) {
  main.actionsDone = main.actionsDone || [];
  for (const m of text.matchAll(/```studio-action\s*\n([\s\S]*?)```/g)) {
    const key = crypto.createHash('md5').update(m[1]).digest('hex');
    if (main.actionsDone.includes(key)) continue;
    main.actionsDone.push(key);
    let a;
    try { a = JSON.parse(m[1]); } catch { addEvent(main, 'error', 'Could not read an action block (bad JSON)'); continue; }
    try {
      if (a.action === 'start_run') {
        if (!a.prompt || !a.agent) throw new Error('start_run needs agent and prompt');
        if (a.agent === 'tito-publisher' || a.stage === 'publish') throw new Error('Scheduling starts only from Jeff\'s Schedule button in Approve & Post');
        const child = newRun({stage: a.stage, agent: a.agent, title: a.title, prompt: a.prompt});
        child.parent = main.id;
        addEvent(main, 'action', `▶ Started ${personaName(child.agent)}: ${child.title}`);
        startClaude(child, a.prompt);
      } else if (a.action === 'render_carousel') {
        const child = newRun({stage: 'create', agent: 'carousel-render', title: `Render carousel · ${path.basename(path.dirname(path.dirname(a.spec)))}`, prompt: a.spec});
        child.parent = main.id;
        addEvent(main, 'action', `▶ Rendering carousel slides from ${a.spec}`);
        startCarousel(child, a.spec);
      } else if (a.action === 'render_video') {
        const child = newRun({stage: 'video', agent: 'video-producer', title: `Render ${a.composition}`, prompt: a.composition});
        child.parent = main.id;
        addEvent(main, 'action', `▶ Rendering video ${a.composition}`);
        startRender(child, a.composition);
      } else if (a.action === 'place_file') {
        const from = safePath(a.from), to = path.resolve(ROOT, a.to || '');
        if (!from || !/^handoff\//.test(path.relative(ROOT, from))) throw new Error('place_file: "from" must be an existing file in handoff/');
        if (!/^(w44-friday-motion-sample\/public|docs\/media)\//.test(path.relative(ROOT, to)) || to.includes('..')) throw new Error('place_file: "to" must be in w44-friday-motion-sample/public/ or docs/media/');
        fs.mkdirSync(path.dirname(to), {recursive: true});
        fs.copyFileSync(from, to);
        addEvent(main, 'action', `▶ Placed ${a.from} → ${a.to}`);
      } else throw new Error(`Unknown action ${a.action}`);
    } catch (err) { addEvent(main, 'error', err.message); }
  }
}

function onRunFinished(run) {
  if (run.agent === 'tito-publisher' && run.postId) {         // record what the scheduler confirmed
    const st = postState[run.postId];
    const m = (run.result || '').match(/SCHEDULED:\s*(\{[^\n]*\})/);
    if (st && st.schedule) {
      st.schedule.status = run.status === 'done' ? 'done' : 'failed';
      if (m) try { st.schedule.result = JSON.parse(m[1]); } catch {}
      savePostState();
    }
  }
  if (run.agent === 'tito-main') {                           // flush updates that arrived while it was busy
    if (run.pendingUpdates && run.pendingUpdates.length) {
      const text = run.pendingUpdates.join('\n\n'); run.pendingUpdates = [];
      continueMain(run, text);
    }
    return;
  }
  const main = run.parent && runs[run.parent];
  if (!main) return;
  const summary = `[Studio update] ${personaName(run.agent)} finished "${run.title}" (${run.status}). Files: ${run.files.join(', ') || 'none'}.\nResult: ${(run.result || '').slice(0, 6000)}`;
  addEvent(main, 'update', `${run.status === 'failed' ? '✗' : '✓'} ${personaName(run.agent)} finished: ${run.title}`);
  if (procs.has(main.id)) { (main.pendingUpdates = main.pendingUpdates || []).push(summary); return; }
  continueMain(main, summary);
}

function continueMain(main, text) {
  main.autoSteps = (main.autoSteps || 0) + 1;
  if (main.autoSteps > MAX_AUTO_STEPS) { addEvent(main, 'error', 'Paused after 8 automatic steps. Send a message to continue.'); main.status = 'done'; pushRun(main); return; }
  startClaude(main, `${text}\n\nDecide the next step: start the next agent with a studio-action block, or tell Jeff what needs his input.`, {fromJeff: false});
}

function handleStreamLine(run, line) {
  let o;
  try { o = JSON.parse(line); } catch { return; }
  if (o.session_id && !run.sessionId) run.sessionId = o.session_id;
  if (o.type === 'assistant' && o.message && Array.isArray(o.message.content)) {
    for (const c of o.message.content) {
      if (c.type === 'text' && c.text.trim()) {
        const shown = c.text.replace(/```studio-action[\s\S]*?```/g, '').trim();
        if (shown) addEvent(run, 'text', shown);
        if (run.agent === 'tito-main') runActions(run, c.text);
      }
      if (c.type === 'tool_use') {
        const inp = c.input || {};
        const target = inp.file_path || inp.path || inp.pattern || inp.query || inp.url || inp.command || '';
        addEvent(run, 'tool', `${c.name} ${String(target).slice(0, 160)}`);
        if (['Write', 'Edit', 'NotebookEdit'].includes(c.name)) {
          const rel = relFile(inp.file_path);
          if (rel && !run.files.includes(rel)) run.files.push(rel);
        }
      }
    }
  }
  if (o.type === 'result') {
    if (o.result) run.result = o.result;
    if (o.is_error) addEvent(run, 'error', o.result || 'Agent reported an error');
  }
}

// ---------- video-producer (render) ----------
function startRender(run, composition) {
  const outRaw = path.join(REMOTION, 'out', 'studio', `${composition}-raw.mp4`);
  const outFinal = path.join(ROOT, 'docs', 'media', 'studio', `${composition}.mp4`);
  fs.mkdirSync(path.dirname(outRaw), {recursive: true});
  fs.mkdirSync(path.dirname(outFinal), {recursive: true});
  run.status = 'running';
  addEvent(run, 'you', `Render ${composition}`);
  const steps = [
    ['npx', ['remotion', 'render', composition, outRaw, '--codec', 'h264', '--log=error'], REMOTION],
    ['ffmpeg', ['-loglevel', 'error', '-y', '-i', outRaw, '-c:v', 'copy', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', outFinal], ROOT],
  ];
  const next = (i) => {
    if (i >= steps.length) {
      const rel = path.relative(ROOT, outFinal);
      if (!run.files.includes(rel)) run.files.push(rel);
      run.status = 'review';
      run.result = `Rendered ${rel}`;
      addEvent(run, 'text', `Done: ${rel} (audio leveled to about -14 LUFS)`);
      onRunFinished(run);
      return;
    }
    const [cmd, args, cwd] = steps[i];
    addEvent(run, 'tool', `${cmd} ${args.slice(0, 3).join(' ')}…`);
    const child = spawn(cmd, args, {cwd, env: process.env});
    procs.set(run.id, child);
    const log = (d) => { const s = String(d).trim(); if (s) addEvent(run, 'log', s); };
    child.stdout.on('data', log);
    child.stderr.on('data', log);
    child.on('close', (code) => {
      procs.delete(run.id);
      if (run.status !== 'running') return;
      if (code !== 0) { run.status = 'failed'; addEvent(run, 'error', `${cmd} exited with code ${code}`); onRunFinished(run); return; }
      next(i + 1);
    });
  };
  next(0);
}

// ---------- carousel render (fallback when video isn't possible) ----------
function startCarousel(run, specRel) {
  run.status = 'running';
  addEvent(run, 'you', `Render carousel ${specRel}`);
  const abs = safePath(specRel);
  let spec;
  try { spec = JSON.parse(fs.readFileSync(abs, 'utf8')); } catch (e) {
    run.status = 'failed'; addEvent(run, 'error', `Can't read ${specRel}: ${abs ? e.message : 'file not found'}`); onRunFinished(run); return;
  }
  const n = Math.min((spec.slides || []).length, 10);
  if (!n) { run.status = 'failed'; addEvent(run, 'error', 'The spec has no slides'); onRunFinished(run); return; }
  const outDir = path.join(path.dirname(abs), 'slides');
  fs.mkdirSync(outDir, {recursive: true});
  const shot = (i) => {
    if (i >= n) {
      const media = Array.from({length: n}, (_, k) => path.relative(ROOT, path.join(outDir, `slide-${k + 1}.png`)));
      run.files = media;
      run.status = 'done';
      run.result = `Rendered ${n} slides into ${path.relative(ROOT, outDir)}/ and added the post to Approve & Post.`;
      addEvent(run, 'text', run.result);
      upsertPost(specRel, spec, media);
      onRunFinished(run);
      return;
    }
    addEvent(run, 'tool', `Slide ${i + 1}/${n}`);
    const child = spawn('npx', ['remotion', 'still', 'TitoCarousel', path.join(outDir, `slide-${i + 1}.png`), `--frame=${i}`, `--props=${abs}`, '--log=error'], {cwd: REMOTION, env: process.env});
    procs.set(run.id, child);
    child.stderr.on('data', (d) => { const s = String(d).trim(); if (s) addEvent(run, 'log', s); });
    child.on('close', (code) => {
      procs.delete(run.id);
      if (run.status !== 'running') return;
      if (code !== 0) { run.status = 'failed'; addEvent(run, 'error', `Slide ${i + 1} failed (code ${code})`); onRunFinished(run); return; }
      shot(i + 1);
    });
  };
  shot(0);
}

function upsertPost(specRel, spec, media) {
  const posts = loadJSON(POSTS_FILE, []);
  const id = path.dirname(path.dirname(specRel)).split(path.sep).slice(-2).join('-').toLowerCase().replace(/[^a-z0-9-]/g, '');
  const entry = {id, title: spec.title || id, series: spec.series || '', type: 'carousel', media,
    captions: {file: spec.captions || path.join(path.dirname(specRel), 'captions.md')}};
  const i = posts.findIndex((p) => p.id === id);
  if (i >= 0) posts[i] = {...posts[i], ...entry}; else posts.unshift(entry);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n');
  broadcast({type: 'posts'});
}

function listCarouselSpecs() {
  const out = [];
  const walk = (dir, depth) => {
    if (depth > 4 || !fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) walk(p, depth + 1);
      else if (f === 'carousel.json') out.push(path.relative(ROOT, p));
    }
  };
  walk(path.join(ROOT, 'content'), 0);
  return out.sort().reverse();
}

function listCompositions() {
  const src = path.join(REMOTION, 'src');
  const ids = new Set();
  for (const f of fs.existsSync(src) ? fs.readdirSync(src) : []) {
    const t = fs.readFileSync(path.join(src, f), 'utf8');
    for (const m of t.matchAll(/id="([A-Za-z0-9-]+)"/g)) ids.add(m[1]);
    if (/OriginChibiGeminiP\$\{p\.n\}/.test(t)) for (let n = 1; n <= 5; n++) ids.add(`OriginChibiGeminiP${n}`);
  }
  return [...ids].sort();
}

// ---------- media + frame strips ----------
function listMedia() {
  const out = [];
  const walk = (dir, depth) => {
    if (depth > 3 || !fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p, depth + 1);
      else if (/\.mp4$/i.test(f)) out.push({path: path.relative(ROOT, p), size: st.size, mtime: st.mtimeMs});
    }
  };
  walk(path.join(ROOT, 'docs', 'media'), 0);
  return out.sort((a, b) => b.mtime - a.mtime).slice(0, 40);
}

function frameStrip(rel, cb) {
  const abs = safePath(rel);
  if (!abs) return cb(new Error('bad path'));
  const name = crypto.createHash('md5').update(rel + fs.statSync(abs).mtimeMs).digest('hex').slice(0, 12) + '.png';
  const out = path.join(DATA, 'strips', name);
  if (fs.existsSync(out)) return cb(null, `/strips/${name}`);
  const p = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-i', abs, '-vf', 'fps=1/2,scale=160:-1,tile=8x2', '-frames:v', '1', out]);
  p.on('close', (code) => cb(code === 0 ? null : new Error('ffmpeg failed'), `/strips/${name}`));
}

// ---------- chief of staff (main chat) ----------
function talkToMain(text, {newChat = false, chatId = null} = {}) {
  if (!text) return {code: 400, error: 'Say something to Tito AI'};
  const mains = Object.values(runs).filter((r) => r.agent === 'tito-main').sort((x, y) => y.createdAt - x.createdAt);
  let main = newChat ? null : (chatId ? runs[chatId] : mains[0]);
  if (main && procs.has(main.id)) return {code: 409, error: 'Tito AI is still replying — wait a moment or press Stop'};
  if (!main) main = newRun({stage: 'main', agent: 'tito-main', title: text.replace(/^\[[^\]]*\]\s*/, '').slice(0, 60), prompt: text});
  startClaude(main, text);
  return {run: main};
}

// ---------- main board: calendar, ChatGPT handoff inbox, sticky notes ----------
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Latest analyst results for the board: newest metrics pull + top line of the newest report.
function listInsights() {
  const newest = (dir, re) => { try { return fs.readdirSync(dir).filter((f) => re.test(f)).sort().pop() || null; } catch { return null; } };
  const dataFile = newest(path.join(ROOT, 'reports', 'data'), /^\d{4}-\d{2}-\d{2}-metrics\.json$/);
  const repFile = newest(path.join(ROOT, 'reports'), /^\d{4}-\d{2}-\d{2}-weekly-checkbalance\.md$/);
  let metrics = null, topline = [], boost = '';
  if (dataFile) try { metrics = JSON.parse(fs.readFileSync(path.join(ROOT, 'reports', 'data', dataFile), 'utf8')); } catch {}
  if (repFile) {
    const md = fs.readFileSync(path.join(ROOT, 'reports', repFile), 'utf8');
    const sec = (h) => { const m = md.match(new RegExp(`## ${h}[^\\n]*\\n([\\s\\S]*?)(?=\\n## |$)`)); return m ? m[1].trim() : ''; };
    topline = sec('1\\.').split('\n').filter((l) => l.startsWith('- ')).map((l) => l.slice(2));
    boost = sec('4\\.').split('\n\n')[0];
  }
  return {dataFile: dataFile && `reports/data/${dataFile}`, report: repFile && `reports/${repFile}`, date: dataFile && dataFile.slice(0, 10), metrics, topline, boost};
}

function listSchedule() {
  const sched = loadJSON(path.join(ROOT, 'docs', 'schedule.json'), {weeks: []});
  const out = [];
  for (const w of sched.weeks || []) {
    for (const p of w.posts || []) {
      const m = String(p.date || '').match(/([A-Z][a-z]{2})\w*\.?\s+(\d{1,2})/);
      const mi = m ? MONTHS.indexOf(m[1]) : -1;
      const year = 2026 + (mi === 0 && +String(w.id).replace(/\D/g, '') > 45 ? 1 : 0);
      out.push({week: w.id, range: w.range, theme: w.theme, day: p.day, title: p.title, tag: p.tag, note: p.note, status: p.status, url: p.url,
        date: mi >= 0 ? `${year}-${String(mi + 1).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}` : null});
    }
  }
  return out;
}

const HANDOFF_DIR = path.join(ROOT, 'handoff', 'chatgpt');
const HANDOFF_STATE_FILE = path.join(DATA, 'handoffs-state.json');
const handoffState = loadJSON(HANDOFF_STATE_FILE, {});
fs.mkdirSync(HANDOFF_DIR, {recursive: true});
function saveHandoffs() { fs.writeFileSync(HANDOFF_STATE_FILE, JSON.stringify(handoffState, null, 1)); broadcast({type: 'handoffs'}); }
function listHandoffs() {
  const files = fs.readdirSync(HANDOFF_DIR).filter((f) => !f.startsWith('.') && f !== 'README.md');
  const ids = new Map();
  for (const f of files) {
    const id = f.replace(/\.[^.]+$/, '');
    const e = ids.get(id) || {id, media: null, note: null, mtime: 0};
    const rel = path.relative(ROOT, path.join(HANDOFF_DIR, f));
    if (/\.md$/i.test(f)) e.note = rel; else if (/\.(mp4|mov|png|jpe?g|webp)$/i.test(f)) e.media = rel; else continue;
    e.mtime = Math.max(e.mtime, fs.statSync(path.join(HANDOFF_DIR, f)).mtimeMs);
    ids.set(id, e);
  }
  return [...ids.values()].map((e) => ({...e, noteText: e.note ? fs.readFileSync(path.join(ROOT, e.note), 'utf8').slice(0, 3000) : '',
    state: handoffState[e.id] || {status: 'new'}})).sort((a, b) => b.mtime - a.mtime);
}
let handoffTimer = null;
fs.watch(HANDOFF_DIR, () => { clearTimeout(handoffTimer); handoffTimer = setTimeout(() => broadcast({type: 'handoffs'}), 500); });

function handToClaude(h, cb) {
  const send = (stripAbs) => {
    const text = `[Handoff from ChatGPT] ChatGPT made ${h.media ? `\`${h.media}\`` : 'a draft'} and handed it to Claude Code for the finish.` +
      (h.note ? `\nChatGPT's note (\`${h.note}\`):\n${h.noteText}` : '\nNo note was left; ask Jeff what it is for if unclear.') +
      (stripAbs ? `\nFrame strip (one frame every 2s): ${stripAbs} . Read it to check the chibi.` : '') +
      '\nReview it, then finish it with the team or tell Jeff what to regenerate.';
    const r = talkToMain(text, {});
    if (r.error) return cb(r.error);
    cb(null, r.run);
  };
  if (h.media && /\.(mp4|mov)$/i.test(h.media)) return frameStrip(h.media, (err, u) => send(err ? null : path.join(DATA, 'strips', path.basename(u))));
  send(h.media ? path.join(ROOT, h.media) : null);
}

const BOARD_FILE = path.join(DATA, 'board.json');
const board = loadJSON(BOARD_FILE, {notes: []});

// ---------- posts: approval + posting ----------
// Post list lives in studio/posts.json (committed); captions are read live from the content .md files;
// approval/posted state is local (studio/data/posts-state.json).
const POSTS_FILE = path.join(__dirname, 'posts.json');
const POST_STATE_FILE = path.join(DATA, 'posts-state.json');
const postState = loadJSON(POST_STATE_FILE, {});
for (const st of Object.values(postState)) if (st.schedule && st.schedule.status === 'running') st.schedule.status = 'stopped';   // server restarted mid-run
const PLATFORMS = [['tiktok', 'TikTok'], ['instagram', 'Instagram'], ['facebook', 'Facebook'], ['seed', 'Seed comment']];

function parseCaptions(rel, section) {
  const abs = safePath(rel);
  if (!abs) return {};
  let text = fs.readFileSync(abs, 'utf8');
  if (section) {
    const i = text.indexOf(`## ${section}`);
    if (i < 0) return {};
    const rest = text.slice(i + 3);
    const j = rest.search(/\n## /);
    text = j >= 0 ? rest.slice(0, j) : rest;
  }
  // Blocks start at "**TikTok**" or "## TikTok" style headings.
  const re = /^(?:\*\*|##\s+)(TikTok|Instagram|Facebook|Seed comment[^*\n]*|Production note[^*\n]*)\**\s*$/gim;
  const marks = [...text.matchAll(re)];
  const out = {};
  marks.forEach((m, k) => {
    const end = k + 1 < marks.length ? marks[k + 1].index : text.length;
    const body = text.slice(m.index + m[0].length, end).replace(/\n## [\s\S]*$/, '').trim();
    const name = m[1].toLowerCase();
    const key = name.startsWith('seed') ? 'seed' : name.startsWith('production') ? null : name;
    if (key) out[key] = body;
  });
  return out;
}

function listPosts() {
  const posts = loadJSON(POSTS_FILE, []);
  const sched = listSchedule();
  const slotOf = (p) => {
    const m = String(p.series || '').match(/^(W\d+)\s*·\s*(\w{3})\w*\s+(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return null;
    const e = sched.find((x) => x.week === m[1].toUpperCase() && x.day === m[2].toUpperCase());
    if (!e || !e.date) return null;
    const h = (+m[3] % 12) + (/PM/i.test(m[5]) ? 12 : 0);
    return `${e.date}T${String(h).padStart(2, '0')}:${m[4]}`;
  };
  return posts.map((p) => ({...p, slot: slotOf(p), captionsText: parseCaptions(p.captions.file, p.captions.section),
    media: p.media.filter((m) => safePath(m)), state: postState[p.id] || {approved: false, posted: {}, notes: ''}}));
}
function savePostState() { fs.writeFileSync(POST_STATE_FILE, JSON.stringify(postState, null, 1)); broadcast({type: 'posts'}); }

// ---------- Telegram (button press only) ----------
function telegramToken() {
  if (process.env.TITO_TELEGRAM_TOKEN) return process.env.TITO_TELEGRAM_TOKEN;
  const m = fs.readFileSync(path.join(ROOT, 'CLAUDE.md'), 'utf8').match(/Token: `(\d+:[\w-]+)`/);
  return m && m[1];
}
function sendTelegram(text, cb) {
  const token = telegramToken();
  if (!token) return cb(new Error('No Telegram token (set TITO_TELEGRAM_TOKEN)'));
  const body = new URLSearchParams({chat_id: '8325608814', text, parse_mode: 'HTML', disable_web_page_preview: 'true'}).toString();
  const req = require('https').request({hostname: 'api.telegram.org', path: `/bot${token}/sendMessage`, method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body)}}, (res) => {
    let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => { try { const j = JSON.parse(d); cb(j.ok ? null : new Error(j.description), j); } catch (e) { cb(e); } });
  });
  req.on('error', cb);
  req.end(body);
}

// ---------- HTTP ----------
function safePath(rel) {
  if (!rel) return null;
  const abs = path.resolve(ROOT, rel);
  if (!abs.startsWith(ROOT + path.sep) || abs.includes(`${path.sep}.git${path.sep}`) || !fs.existsSync(abs)) return null;
  return abs;
}
const TYPES = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4', '.md': 'text/plain; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.m4a': 'audio/mp4', '.svg': 'image/svg+xml'};
function sendFile(req, res, abs) {
  const type = TYPES[path.extname(abs).toLowerCase()] || 'application/octet-stream';
  const size = fs.statSync(abs).size;
  const range = req.headers.range && req.headers.range.match(/bytes=(\d*)-(\d*)/);
  if (range) {                                              // video seeking
    const start = range[1] ? +range[1] : 0, end = range[2] ? +range[2] : size - 1;
    res.writeHead(206, {'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1});
    return fs.createReadStream(abs, {start, end}).pipe(res);
  }
  res.writeHead(200, {'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes'});
  fs.createReadStream(abs).pipe(res);
}
const json = (res, code, obj) => { res.writeHead(code, {'Content-Type': 'application/json'}); res.end(JSON.stringify(obj)); };
function readBody(req, cb) {
  let d = ''; req.on('data', (c) => { d += c; if (d.length > 1e6) req.destroy(); });
  req.on('end', () => { try { cb(d ? JSON.parse(d) : {}); } catch { cb({}); } });
}
function newRun({stage, agent, title, prompt}) {
  const st = stage === 'main' ? {id: 'main', agent: 'tito-main'} : STAGES.find((s) => s.id === stage) || STAGES.find((s) => s.agent === agent) || STAGES[0];
  const run = {id: crypto.randomUUID().slice(0, 8), stage: st.id, agent: agent || st.agent, title: (title || prompt || 'Untitled').slice(0, 90),
    prompt, status: 'queued', sessionId: null, events: [], files: [], result: '', createdAt: Date.now(), updatedAt: Date.now()};
  runs[run.id] = run;
  return run;
}

// Phone mode (STUDIO_LAN=1): listen on the home Wi-Fi, but every request needs the private key
// (from the ?key= link once, then a cookie). Desktop mode listens on 127.0.0.1 only.
const LAN = process.env.STUDIO_LAN === '1';
const KEY_FILE = path.join(DATA, 'access-key');
const ACCESS_KEY = fs.existsSync(KEY_FILE) ? fs.readFileSync(KEY_FILE, 'utf8').trim()
  : (() => { const k = crypto.randomBytes(12).toString('hex'); fs.writeFileSync(KEY_FILE, k, {mode: 0o600}); return k; })();
function authorized(req, url, res) {
  if (!LAN) return true;
  const cookie = (req.headers.cookie || '').match(/studio_key=(\w+)/);
  const given = url.searchParams.get('key');
  if (given && given === ACCESS_KEY) {
    res.setHeader('Set-Cookie', `studio_key=${ACCESS_KEY}; Path=/; Max-Age=2592000; SameSite=Strict; HttpOnly`);
    return true;
  }
  return !!(cookie && cookie[1] === ACCESS_KEY);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.pathname;
  if (!authorized(req, url, res)) {
    res.writeHead(401, {'Content-Type': 'text/html'});
    return res.end('<meta name="viewport" content="width=device-width"><body style="font-family:system-ui;background:#0A0F1E;color:#E2E8F0;padding:24px">Tito AI Studio: open the private link from your Mac’s terminal (it includes <code>?key=</code>).</body>');
  }
  if (req.method === 'GET' && p === '/api/events') {
    res.writeHead(200, {'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive'});
    res.write(': hi\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }
  if (req.method === 'GET' && p === '/api/bootstrap') {
    return json(res, 200, {stages: STAGES, agents: readAgents(), runs: Object.values(runs), status, compositions: listCompositions(), media: listMedia()});
  }
  if (req.method === 'GET' && p === '/api/media') return json(res, 200, listMedia());
  if (req.method === 'GET' && p === '/api/insights') return json(res, 200, listInsights());
  if (req.method === 'GET' && p === '/api/schedule') return json(res, 200, listSchedule());
  if (req.method === 'GET' && p === '/api/handoffs') return json(res, 200, listHandoffs());
  if (req.method === 'GET' && p === '/api/board') return json(res, 200, board);
  if (req.method === 'GET' && p === '/api/posts') return json(res, 200, listPosts());
  if (req.method === 'GET' && p === '/api/carousel-specs') return json(res, 200, listCarouselSpecs());
  if (req.method === 'GET' && p === '/file') {
    const abs = safePath(url.searchParams.get('path'));
    return abs ? sendFile(req, res, abs) : json(res, 404, {error: 'not found'});
  }
  if (req.method === 'GET' && p.startsWith('/strips/')) {
    const abs = path.join(DATA, 'strips', path.basename(p));
    return fs.existsSync(abs) ? sendFile(req, res, abs) : json(res, 404, {error: 'not found'});
  }
  if (req.method === 'POST') {
    return readBody(req, (b) => {
      let m;
      if (p === '/api/runs') {
        if (!b.prompt && b.agent !== 'video-producer') return json(res, 400, {error: 'prompt required'});
        const run = newRun(b);
        if (run.agent === 'video-producer') startRender(run, b.composition || b.prompt);
        else if (run.agent === 'carousel-render') startCarousel(run, b.prompt);
        else startClaude(run, b.prompt);
        return json(res, 200, run);
      }
      if (p === '/api/main') {                                // talk to the chief of staff
        const r = talkToMain(String(b.text || '').trim(), {newChat: b.newChat, chatId: b.chatId});
        return r.error ? json(res, r.code, {error: r.error}) : json(res, 200, r.run);
      }
      if ((m = p.match(/^\/api\/handoffs\/([\w.-]+)\/(claude|done|reopen)$/))) {
        const h = listHandoffs().find((x) => x.id === m[1]);
        if (!h) return json(res, 404, {error: 'no handoff'});
        const st = handoffState[h.id] = handoffState[h.id] || {};
        if (m[2] === 'done') st.status = 'done';
        if (m[2] === 'reopen') st.status = 'new';
        if (m[2] !== 'claude') { saveHandoffs(); return json(res, 200, st); }
        return handToClaude(h, (err, run) => {
          if (err) return json(res, 409, {error: err});
          Object.assign(st, {status: 'with-claude', chatId: run.id, at: Date.now()}); saveHandoffs();
          json(res, 200, run);
        });
      }
      if (p === '/api/board') {
        board.notes = (Array.isArray(b.notes) ? b.notes : []).slice(0, 200).map((n) => ({id: String(n.id).slice(0, 20), x: +n.x || 0, y: +n.y || 0,
          text: String(n.text || '').slice(0, 1000), color: String(n.color || 'yellow').slice(0, 12)}));
        fs.writeFileSync(BOARD_FILE, JSON.stringify(board, null, 1)); broadcast({type: 'board', board});
        return json(res, 200, board);
      }
      if ((m = p.match(/^\/api\/runs\/(\w+)\/(message|approve|stop|delete|reopen)$/))) {
        const run = runs[m[1]];
        if (!run) return json(res, 404, {error: 'no run'});
        if (m[2] === 'message') {
          if (procs.has(run.id)) return json(res, 409, {error: 'Agent is still working — wait or Stop first'});
          if (run.agent === 'video-producer') return json(res, 400, {error: 'Render cards take no chat; start a new render'});
          startClaude(run, b.text || '');
        } else if (m[2] === 'approve') { run.status = 'approved'; addEvent(run, 'approve', 'Approved by Jeff'); }
        else if (m[2] === 'reopen') { run.status = 'review'; pushRun(run); }
        else if (m[2] === 'stop') { const c = procs.get(run.id); if (c) c.kill('SIGTERM'); run.status = 'stopped'; addEvent(run, 'error', 'Stopped'); }
        else if (m[2] === 'delete') { const c = procs.get(run.id); if (c) c.kill('SIGTERM'); delete runs[run.id]; save(); broadcast({type: 'deleted', id: run.id}); }
        return json(res, 200, {ok: true});
      }
      if ((m = p.match(/^\/api\/posts\/([\w-]+)\/schedule$/))) {   // Jeff's Schedule button: one approved post, one time
        if (SCHEDULING_OFF) return json(res, 403, {error: 'Scheduling is turned off'});
        const post = loadJSON(POSTS_FILE, []).find((x) => x.id === m[1]);
        const st = postState[m[1]];
        if (!post || !st || !st.approved) return json(res, 400, {error: 'Approve the post first'});
        const when = String(b.when || '');
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(when) || new Date(when + ':00+08:00') < Date.now() + 15 * 60000) return json(res, 400, {error: 'Pick a time at least 15 minutes from now (PHT)'});
        const platforms = (Array.isArray(b.platforms) ? b.platforms : []).filter((x) => ['facebook', 'instagram', 'tiktok'].includes(x));
        if (!platforms.length) return json(res, 400, {error: 'Pick at least one platform'});
        if (st.schedule && st.schedule.status === 'running') return json(res, 409, {error: 'Already scheduling this post'});
        const pretty = new Date(when + ':00+08:00').toLocaleString('en-US', {timeZone: 'Asia/Manila', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'});
        const prompt = `Schedule this approved post. Jeff pressed Schedule in Tito AI Studio for this post and time only.
Post id: ${post.id} (${post.title})
Type: ${post.type}
Media, in order (absolute paths):
${post.media.map((f, i) => `${i + 1}. ${path.join(ROOT, f)}`).join('\n')}
Captions file: ${path.join(ROOT, post.captions.file)}${post.captions.section ? ` (section: "${post.captions.section}")` : ''}
Platforms: ${platforms.join(', ')}
Date and time: ${pretty} PHT (${when} +08:00)
Follow .claude/skills/schedule-post/SKILL.md. Schedule only; never post now or boost.`;
        const run = newRun({stage: 'publish', agent: 'tito-publisher', title: `Schedule · ${post.title}`.slice(0, 90), prompt});
        run.postId = post.id;
        st.schedule = {when, platforms, runId: run.id, at: Date.now(), status: 'running'};
        savePostState();
        startClaude(run, prompt);
        return json(res, 200, run);
      }
      if ((m = p.match(/^\/api\/posts\/([\w-]+)\/(approve|unapprove|posted|unposted|notes)$/))) {
        const st = postState[m[1]] || (postState[m[1]] = {approved: false, posted: {}, notes: ''});
        if (m[2] === 'approve') { st.approved = true; st.approvedAt = Date.now(); }
        if (m[2] === 'unapprove') st.approved = false;
        if (m[2] === 'posted') st.posted[b.platform] = {at: Date.now(), link: (b.link || '').slice(0, 300)};
        if (m[2] === 'unposted') delete st.posted[b.platform];
        if (m[2] === 'notes') st.notes = String(b.notes || '').slice(0, 2000);
        savePostState();
        return json(res, 200, st);
      }
      if (p === '/api/status') { Object.assign(status, b); save(); broadcast({type: 'status', status}); return json(res, 200, status); }
      if (p === '/api/framestrip') return frameStrip(b.path, (err, u) => (err ? json(res, 400, {error: err.message}) : json(res, 200, {url: u})));
      if (p === '/api/telegram') return sendTelegram(b.text || '', (err) => (err ? json(res, 400, {error: err.message}) : json(res, 200, {ok: true})));
      return json(res, 404, {error: 'unknown'});
    });
  }
  const file = p === '/' ? path.join(PUBLIC, 'index.html') : path.join(PUBLIC, path.normalize(p).replace(/^(\.\.[/\\])+/, ''));
  if (file.startsWith(PUBLIC) && fs.existsSync(file) && fs.statSync(file).isFile()) return sendFile(req, res, file);
  json(res, 404, {error: 'not found'});
});

server.listen(PORT, LAN ? '0.0.0.0' : '127.0.0.1', () => {
  console.log(`Tito AI Studio → http://localhost:${PORT}`);
  if (LAN) {
    const ips = Object.values(require('os').networkInterfaces()).flat().filter((i) => i && i.family === 'IPv4' && !i.internal).map((i) => i.address);
    for (const ip of ips) console.log(`Phone link (same Wi-Fi): http://${ip}:${PORT}/?key=${ACCESS_KEY}`);
  }
});
