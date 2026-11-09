#!/bin/bash
# Opens Tito AI Studio. It runs in the background (launchd: com.titoai.studio), so this only
# wakes it if needed and opens the browser. Used by the Desktop shortcut.
cd "$(dirname "$0")"
# Optional first argument: a tab, e.g. "board" opens the Studio on the board.
URL="http://localhost:4545/?key=$(cat data/access-key 2>/dev/null)${1:+#$1}"
if ! curl -s -o /dev/null --max-time 2 http://localhost:4545/; then
  launchctl kickstart -k "gui/$(id -u)/com.titoai.studio" 2>/dev/null
  for i in $(seq 1 20); do curl -s -o /dev/null --max-time 1 http://localhost:4545/ && break; sleep 0.5; done
fi
open "$URL"
