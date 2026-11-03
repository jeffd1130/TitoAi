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
const STAGES = [
  {id: 'research', label: 'Research', agent: 'tito-researcher'},
  {id: 'script', label: 'Script', agent: 'tito-scriptwriter'},
  {id: 'create', label: 'Create', agent: 'tito-content-creator'},
  {id: 'video', label: 'Video', agent: 'video-producer'},
  {id: 'qa', label: 'QA', agent: 'tito-qa'},
  {id: 'insights', label: 'Insights', agent: 'tito-analyst'},
];

// Tito AI family names shown in the studio (agent file IDs stay the same for Claude Code).
const PERSONAS = {
  'tito-researcher': {display: 'Tita Saliksik', emoji: '🔎', role: 'Researcher'},
  'tito-scriptwriter': {display: 'Kuya Sulat', emoji: '✍️', role: 'Scriptwriter'},
  'tito-content-creator': {display: 'Ate Disenyo', emoji: '🎨', role: 'Content creator'},
  'video-producer': {display: 'Kuya Kamera', emoji: '🎬', role: 'Video producer'},
  'tito-qa': {display: 'Lola Suri', emoji: '🧐', role: 'QA reviewer'},
  'tito-analyst': {display: 'Tito Numero', emoji: '📊', role: 'Analyst'},
  'general': {display: 'Tito AI', emoji: '🤖', role: 'General helper'},
};

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
  return agents.map((a) => ({...a, ...(PERSONAS[a.name] || {display: a.name, emoji: '🤖', role: ''})}));
}

// ---------- persistence ----------
const loadJSON = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const runs = loadJSON(RUNS_FILE, {});
let status = loadJSON(STATUS_FILE, {flowCredits: null, flowNote: '50 free credits/day · Veo 3.1 Lite = 10 per clip', geminiNote: 'Gemini Videos: ~4–5/day'});
for (const r of Object.values(runs)) if (r.status === 'running') r.status = 'stopped';   // server restarted mid-run
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

function startClaude(run, text) {
  const agent = readAgents().find((a) => a.name === run.agent);
  const args = ['-p', text, '--output-format', 'stream-json', '--verbose', '--permission-mode', 'acceptEdits'];
  if (run.agent !== 'general') args.push('--agent', run.agent);
  if (agent && agent.tools.length) args.push('--allowedTools', agent.tools.join(','));
  if (run.sessionId) args.push('--resume', run.sessionId);
  run.status = 'running';
  addEvent(run, 'you', text);
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
    if (run.status === 'running') run.status = code === 0 ? 'review' : 'failed';
    if (code !== 0 && run.status === 'failed') addEvent(run, 'error', `Agent exited with code ${code}`);
    pushRun(run);
  });
}

function handleStreamLine(run, line) {
  let o;
  try { o = JSON.parse(line); } catch { return; }
  if (o.session_id && !run.sessionId) run.sessionId = o.session_id;
  if (o.type === 'assistant' && o.message && Array.isArray(o.message.content)) {
    for (const c of o.message.content) {
      if (c.type === 'text' && c.text.trim()) addEvent(run, 'text', c.text);
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
      if (code !== 0) { run.status = 'failed'; addEvent(run, 'error', `${cmd} exited with code ${code}`); return; }
      next(i + 1);
    });
  };
  next(0);
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
  const st = STAGES.find((s) => s.id === stage) || STAGES[0];
  const run = {id: crypto.randomUUID().slice(0, 8), stage: st.id, agent: agent || st.agent, title: (title || prompt || 'Untitled').slice(0, 90),
    prompt, status: 'queued', sessionId: null, events: [], files: [], result: '', createdAt: Date.now(), updatedAt: Date.now()};
  runs[run.id] = run;
  return run;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.pathname;
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
        else startClaude(run, b.prompt);
        return json(res, 200, run);
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

server.listen(PORT, '127.0.0.1', () => console.log(`Tito AI Studio → http://localhost:${PORT}`));
