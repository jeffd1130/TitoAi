export const meta = {
  name: 'weekly-pipeline',
  description: 'Full Tito AI weekly content pipeline — scripts, Canva, GitHub Pages, Telegram',
  whenToUse: 'Run at production start each week. Args: {week, iso_week, slots[], bot_token, canva_base_design_id?}',
  phases: [
    { title: 'Content', detail: 'Scripts + captions for Mon/Wed/Fri in parallel' },
    { title: 'Canva',   detail: 'Carousel designs + URL validation' },
    { title: 'Preflight', detail: '50 MB gate · cache bump · git push · URL check' },
    { title: 'Notify',  detail: 'Telegram approval summary' },
  ],
}

// args shape — pass all of these when invoking:
// {
//   week:                 "W28"
//   iso_week:             "2026-W28"
//   bot_token:            "<tito_ai_bot_token>"       -- REQUIRED, do not hardcode
//   canva_base_design_id: "DAHL_MRwD8o"              -- optional
//   slots: [
//     { id:"mon", dir:"01-mon-ai-tip", topic:"...", format:"tip",   badge:"teal",  drop_pht:"...", drop_pst:"...", length:"50-60s",  has_carousel:false },
//     { id:"wed", dir:"02-wed-demo",   topic:"...", format:"demo",  badge:"blue",  drop_pht:"...", drop_pst:"...", length:"85-90s",  has_carousel:false },
//     { id:"fri", dir:"03-fri-inspiration", topic:"...", format:"story", badge:"coral", drop_pht:"...", drop_pst:"...", length:"80-90s", has_carousel:false },
//   ]
// }

const BASE       = '/Users/jeff/Documents/Claude/TItoAi'
const GH_BASE    = 'https://jeffd1130.github.io/TitoAi'
const CHAT_ID    = '8325608814'

const week       = (args && args.week)      || 'W28'
const iso        = (args && args.iso_week)  || '2026-W28'
const slots      = (args && args.slots)     || []
const botToken   = (args && args.bot_token) || ''
const canvaBaseId = (args && args.canva_base_design_id) || 'DAHL_MRwD8o'

// ── Schemas ───────────────────────────────────────────────────────────────────

const CONTENT_SCHEMA = {
  type: 'object', required: ['slot', 'status'],
  properties: {
    slot:               { type: 'string' },
    topic:              { type: 'string' },
    script_html_path:   { type: 'string' },
    captions_html_path: { type: 'string' },
    script_url:         { type: 'string' },
    captions_url:       { type: 'string' },
    status:             { type: 'string', enum: ['ok', 'skipped', 'error'] },
    error:              { type: 'string' },
  },
}

const CANVA_SCHEMA = {
  type: 'object', required: ['slot', 'status'],
  properties: {
    slot:           { type: 'string' },
    design_id:      { type: 'string' },
    canva_edit_url: { type: 'string' },
    url_http_200:   { type: 'boolean' },
    slide_paths:    { type: 'array', items: { type: 'string' } },
    status:         { type: 'string', enum: ['ok', 'skipped', 'error'] },
    error:          { type: 'string' },
  },
}

const PREFLIGHT_SCHEMA = {
  type: 'object', required: ['status'],
  properties: {
    status:        { type: 'string', enum: ['ok', 'blocked', 'error'] },
    blocked_files: { type: 'array', items: { type: 'string' } },
    cache_bumped:  { type: 'boolean' },
    commit_sha:    { type: 'string' },
    pushed:        { type: 'boolean' },
    page_urls:     { type: 'array', items: { type: 'object', properties: { url: { type: 'string' }, http_200: { type: 'boolean' } } } },
    error:         { type: 'string' },
  },
}

const NOTIFY_SCHEMA = {
  type: 'object', required: ['status'],
  properties: {
    status:     { type: 'string', enum: ['ok', 'skipped', 'error'] },
    message_id: { type: 'number' },
    error:      { type: 'string' },
  },
}

// ── FORMAT LOOKUP ─────────────────────────────────────────────────────────────

const FMT = {
  tip:   { label: 'AI Tip',          len: '50-60s',  scenes: 'Hook(0-5s) Tip1(5-25s) Tip2(25-45s) CTA(45-60s)',           colors: 'Hook=coral Tip1=blue Tip2=teal CTA=green' },
  demo:  { label: 'Demo / Tutorial', len: '85-90s',  scenes: 'Hook(0-5s) Setup(5-30s) Demo(30-65s) Result(65-80s) CTA(80-90s)', colors: 'Hook=coral Setup=blue Demo=purple Result=teal CTA=green' },
  story: { label: 'Story / Inspo',   len: '80-90s',  scenes: 'Hook(0-5s) Story(5-40s) Point(40-65s) Promise(65-80s) CTA(80-90s)', colors: 'Hook=coral Story=purple Point=gold Promise=teal CTA=green' },
}

// ── Phase 1: Content (parallel) ───────────────────────────────────────────────

phase('Content')

const contentResults = await parallel(slots.map(s => () => {
  const f = FMT[s.format] || FMT.tip
  const wk = week.toLowerCase()
  return agent(
    [
      'TITO AI CONTENT AGENT',
      'Creator: Jeff de las Armas. Channel: @TitoAIPH.',
      'Audience: Mga Pamangkin — guro, freelancer, nanay, BPO, negosyante. Never OFW.',
      'NO FABRICATION — no invented quotes, metrics, audience reactions, or events.',
      '',
      'SLOT: ' + s.id.toUpperCase() + ' / ' + (f.label) + ' / ' + week,
      'Topic: ' + s.topic,
      'Drop: ' + s.drop_pht + ' PHT / ' + s.drop_pst + ' PST',
      'Length: ' + (s.length || f.len),
      'Scenes: ' + f.scenes,
      '',
      'TASK 1 — Brief',
      'Path: ' + BASE + '/content/' + iso + '/' + s.dir + '/brief.md',
      'mkdir -p the dir first. Create if missing.',
      '',
      'TASK 2 — Script MD',
      'Path: ' + BASE + '/content/' + iso + '/' + s.dir + '/drafts/script.md',
      'Voice: Taglish, warm tito. No greeting in hook. Hook lands in <5s.',
      'Closer: "Ingat lagi, mga Pamangkin. Tito AI — AI Para Sa Ating Lahat."',
      'Colors: ' + f.colors,
      '',
      'TASK 3 — Script HTML',
      'Path: ' + BASE + '/docs/scripts/' + wk + '-' + s.id + '-script.html',
      'Copy structure from: ' + BASE + '/docs/scripts/w27-' + (s.id === 'fri' ? 'fri' : s.id === 'wed' ? 'wed' : 'mon') + '-script.html',
      'Update: title, badges (badge-gold week, badge-' + (s.badge||'gold') + ' format, badge-navy date), h1, drop-bar, scenes.',
      '',
      'TASK 4 — Captions HTML',
      'Path: ' + BASE + '/docs/' + week + '-' + s.id + '-captions.html',
      'Copy structure from: ' + BASE + '/docs/W27-' + s.id + '-captions.html',
      'TikTok: 8 tags. Instagram: 15 tags + binary CTA. Facebook: story opener + 6 tags.',
      'Always: #TitoAIPH #MgaPamangkin #AIParaSaAtin',
      'Script link href: scripts/' + wk + '-' + s.id + '-script.html',
      '',
      'Return: slot, topic, script_html_path, captions_html_path,',
      'script_url (' + GH_BASE + '/scripts/' + wk + '-' + s.id + '-script.html),',
      'captions_url (' + GH_BASE + '/' + week + '-' + s.id + '-captions.html), status.',
    ].join('\n'),
    { label: 'content:' + s.id, phase: 'Content', schema: CONTENT_SCHEMA }
  ).then(r => r ? Object.assign({}, r, { slot: s.id, topic: s.topic }) : { slot: s.id, topic: s.topic, status: 'error', error: 'null' })
}))

const contentOk = contentResults.filter(r => r && r.status === 'ok')
log('Content: ' + contentOk.length + '/' + slots.length + ' ok')

// ── Phase 2: Canva (carousel only, pipeline) ──────────────────────────────────

phase('Canva')

const carouselSlots = slots.filter(s => s.has_carousel)

const canvaResults = carouselSlots.length > 0
  ? await pipeline(carouselSlots, s => {
      const wk = week.toLowerCase()
      return agent(
        [
          'CANVA CAROUSEL AGENT — Tito AI',
          'Slot: ' + s.id + ' / ' + week + ' / Topic: ' + s.topic,
          'Slides dir: ' + BASE + '/docs/slides/' + week + '-' + s.id + '/',
          '',
          'CRITICAL RULES:',
          '- perform-editing-operations: ONE call per page. page_index is TOP-LEVEL param.',
          '  Do NOT put page_index inside operations array — causes InputValidationError.',
          '- After commit, call get-design to get edit_url. Never use design_id as URL.',
          '',
          'STEP 1: Check slides — ls ' + BASE + '/docs/slides/' + week + '-' + s.id + '/ 2>/dev/null',
          '  If 5 PNGs exist -> skip steps 2-3.',
          '',
          'STEP 2: Render HTML (if needed)',
          '  Create ' + BASE + '/docs/' + wk + '-' + s.id + '-slides-render.html',
          '  Copy from ' + BASE + '/docs/w26-fri-slides-render.html',
          '  Arc: 1=Cover 2=Context 3=Pivot 4=Action 5=CTA',
          '  Design: #0A0F1E bg, Bebas Neue 118px, gold=#F59E0B, teal=#0D9488',
          '  Logo: http://localhost:8765/assets/logo-horizontal.png height:68px',
          '',
          'STEP 3: Screenshots (if needed)',
          '  lsof -ti:8765 | xargs kill -9 2>/dev/null; true',
          '  cd ' + BASE + '/docs && python3 -m http.server 8765 &',
          '  sleep 2; browser_navigate http://localhost:8765/' + wk + '-' + s.id + '-slides-render.html',
          '  For slides 1-5: scrollIntoView + browser_resize 1080x1350 + browser_take_screenshot ~/tmp-s{N}.png',
          '  mkdir -p ' + BASE + '/docs/slides/' + week + '-' + s.id + '/',
          '  mv ~/tmp-s*.png there, rename slide-01-cover.png ... slide-05-cta.png',
          '',
          'STEP 4: Public URLs via catbox.moe',
          '  curl -s -F "reqtype=fileupload" -F "fileToUpload=@file.png" https://catbox.moe/user/api.php',
          '  Fallback: raw.githubusercontent.com after committing PNGs.',
          '',
          'STEP 5: Canva transaction',
          '  ToolSearch for: copy-design, upload-asset-from-url, get-design-content,',
          '    start-editing-transaction, perform-editing-operations, commit-editing-transaction, get-design',
          '  a. copy-design from ' + canvaBaseId,
          '  b. get-design-content -> element IDs',
          '  c. upload-asset-from-url each PNG -> asset_id',
          '  d. start-editing-transaction',
          '  e. For each page 0-4: ONE perform-editing-operations call with page_index at top level',
          '     {page_index:N, operations:[{type:"update_fill",element_id:"...",asset_type:"image",asset_id:"...",alt_text:"Slide N"}]}',
          '  f. commit-editing-transaction',
          '  g. get-design -> edit_url',
          '',
          'STEP 6: WebFetch edit_url, set url_http_200.',
          '',
          'Return: slot, design_id, canva_edit_url, url_http_200, slide_paths, status.',
        ].join('\n'),
        { label: 'canva:' + s.id, phase: 'Canva', schema: CANVA_SCHEMA }
      ).then(r => r ? Object.assign({}, r, { slot: s.id }) : { slot: s.id, status: 'error', error: 'null' })
    })
  : []

const canvaOk = canvaResults.filter(r => r && r.status === 'ok')
log('Canva: ' + canvaOk.length + '/' + carouselSlots.length + ' ok')

// ── Phase 3: Preflight + Deploy ───────────────────────────────────────────────

phase('Preflight')

const allUrls = [].concat(
  contentResults.filter(r => r && r.status === 'ok').reduce(function(a, r) {
    if (r.script_url)   a.push(r.script_url)
    if (r.captions_url) a.push(r.captions_url)
    return a
  }, []),
  canvaResults.filter(r => r && r.status === 'ok' && r.canva_edit_url).map(r => r.canva_edit_url),
  [GH_BASE + '/links.html']
)

const preflightResult = await agent(
  [
    'DEPLOY AGENT — Tito AI',
    'Week: ' + week + ' | Repo: jeffd1130/TitoAi main (docs/ = Pages root)',
    'Content ok: ' + JSON.stringify(contentResults.filter(r => r && r.status === 'ok')),
    'Canva ok:   ' + JSON.stringify(canvaResults.filter(r => r && r.status === 'ok')),
    '',
    'STEP 1 SIZE GATE (hard block):',
    '  find ' + BASE + '/docs -size +50M -not -path "*/.git/*" 2>/dev/null',
    '  If any found -> return {status:"blocked", blocked_files:[...], pushed:false} immediately.',
    '',
    'STEP 2 .gitignore:',
    '  Confirm scripts/*.log and *.log covered. Add if missing.',
    '',
    'STEP 3 sw.js cache bump:',
    '  If ' + BASE + '/docs/sw.js exists, increment CACHE_VERSION integer. cache_bumped:true.',
    '',
    'STEP 4 Update links.html:',
    '  Read ' + BASE + '/docs/links.html',
    '  Insert ' + week + ' section above current top week. Rows: mon/wed/fri captions+script.',
    '  Hrefs: ' + week + '-mon-captions.html, scripts/' + week.toLowerCase() + '-mon-script.html, etc.',
    '  Update footer date.',
    '',
    'STEP 5 Update index.html:',
    '  Read ' + BASE + '/docs/index.html',
    '  Add ' + week + ' spotlight cards matching W27 style.',
    '',
    'STEP 6 Git add + staged size check:',
    '  git -C ' + BASE + ' add -A',
    '  Abort if staged file >50MB.',
    '',
    'STEP 7 Commit + push:',
    '  git -C ' + BASE + ' commit -m "feat: ' + week + ' full week content drop"',
    '  git -C ' + BASE + ' push origin main',
    '  Capture 8-char commit SHA.',
    '',
    'STEP 8 Validate Pages URLs (sleep 35s after push):',
    '  WebFetch each: ' + JSON.stringify(allUrls),
    '  Return page_urls:[{url,http_200}]',
    '',
    'Return: status, blocked_files, cache_bumped, commit_sha, pushed, page_urls, error.',
  ].join('\n'),
  { label: 'preflight+deploy', phase: 'Preflight', schema: PREFLIGHT_SCHEMA }
)

const deployed = !!(preflightResult && preflightResult.pushed)
log('Deploy: ' + (deployed ? 'pushed SHA:' + (preflightResult.commit_sha || '?') : 'BLOCKED/ERROR'))

// ── Phase 4: Notify ───────────────────────────────────────────────────────────

phase('Notify')

const notifyResult = (deployed && botToken)
  ? await agent(
      [
        'TELEGRAM NOTIFY — Tito AI',
        'Send via curl. parse_mode HTML (not Markdown).',
        'Chat: ' + CHAT_ID,
        'Week: ' + week,
        'Hub: ' + GH_BASE + '/links.html',
        'Content: ' + JSON.stringify(contentResults.filter(r => r && r.status === 'ok')),
        'Canva: ' + JSON.stringify(canvaResults.filter(r => r && r.status === 'ok')),
        '',
        'Message template:',
        '<b>Tito AI - ' + week + ' Content Drop</b>',
        '<i>Pong linggo, lahat naka-ready.</i>',
        '',
        '<b>MON</b> - [topic]',
        'Captions: [captions_url]  Script: [script_url]',
        '',
        '<b>WED</b> - [topic]',
        'Captions: [captions_url]  Script: [script_url]',
        '',
        '<b>FRI</b> - [topic]',
        'Captions: [captions_url]  Script: [script_url]',
        '',
        'Hub: ' + GH_BASE + '/links.html',
        '',
        'curl -s -X POST "https://api.telegram.org/bot[TOKEN]/sendMessage" -d chat_id=' + CHAT_ID + ' -d parse_mode=HTML -d "text=[MSG]"',
        'Replace [TOKEN] with the bot_token from args. Return message_id from response.',
      ].join('\n'),
      { label: 'telegram-notify', phase: 'Notify', schema: NOTIFY_SCHEMA }
    )
  : { status: 'skipped', error: deployed ? 'bot_token not provided in args' : 'deploy did not succeed' }

// ── Status Report ─────────────────────────────────────────────────────────────

const published = [].concat(
  contentResults.filter(r => r && r.status === 'ok').map(r => ({ type:'content', slot:r.slot, topic:r.topic, script_url:r.script_url, captions_url:r.captions_url })),
  canvaResults.filter(r => r && r.status === 'ok').map(r => ({ type:'canva', slot:r.slot, canva_url:r.canva_edit_url, url_valid:r.url_http_200 })),
  deployed ? [{ type:'deploy', commit:preflightResult.commit_sha, hub:GH_BASE+'/links.html' }] : [],
  (notifyResult && notifyResult.status === 'ok') ? [{ type:'telegram', message_id:notifyResult.message_id }] : []
)

const blocked = (preflightResult && preflightResult.blocked_files)
  ? preflightResult.blocked_files.map(f => ({ reason:'>50MB', file:f }))
  : []

const failedUrls = [].concat(
  (preflightResult && preflightResult.page_urls) ? preflightResult.page_urls.filter(u => !u.http_200).map(u => ({ url:u.url, reason:'not HTTP 200' })) : [],
  canvaResults.filter(r => r && r.url_http_200 === false).map(r => ({ url:r.canva_edit_url, slot:r.slot, reason:'Canva URL not 200' })),
  contentResults.filter(r => r && r.status === 'error').map(r => ({ slot:r.slot, reason:r.error || 'content agent failed' }))
)

return {
  week,
  published,
  blocked,
  failed_urls: failedUrls,
  summary: {
    content_ok:    contentOk.length,
    content_total: slots.length,
    canva_ok:      canvaOk.length,
    canva_total:   carouselSlots.length,
    deployed,
    notified:      !!(notifyResult && notifyResult.status === 'ok'),
    rerun_needed:  failedUrls.length > 0 || blocked.length > 0,
  },
}
