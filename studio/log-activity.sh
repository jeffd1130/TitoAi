#!/bin/bash
# Log work done outside the Studio (e.g. Claude Code in Google Flow) to the board's activity feed.
#   bash studio/log-activity.sh <node> "<emoji>" "<who>" "<title>" [file]
#   node: flow | claude | video-producer | tito-content-creator | ...
python3 - "$@" <<'PY'
import json, sys, urllib.request
a = sys.argv[1:] + [''] * 5
body = {"node": a[0], "emoji": a[1], "who": a[2], "title": a[3], "files": [a[4]] if a[4] else []}
req = urllib.request.Request("http://localhost:4545/api/activity", json.dumps(body).encode(), {"Content-Type": "application/json"})
print(urllib.request.urlopen(req, timeout=5).read().decode())
PY
