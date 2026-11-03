#!/bin/bash
# Start Tito AI Studio.
#   bash start.sh         → this Mac only (http://localhost:4545)
#   bash start.sh phone   → also on your home Wi-Fi; prints a private phone link with an access key
cd "$(dirname "$0")"
URL="http://localhost:4545/?key=$(cat data/access-key 2>/dev/null)"

if lsof -nP -iTCP:4545 -sTCP:LISTEN >/dev/null 2>&1; then
  if [ "$1" = "phone" ]; then
    echo "Tito AI Studio is already running (Mac-only mode). Restarting it in phone mode…"
    lsof -nP -t -iTCP:4545 -sTCP:LISTEN | xargs kill 2>/dev/null; sleep 1
  else
    echo "Tito AI Studio is already running — opening it."
    open "$URL"; exit 0
  fi
fi

if [ "$1" = "phone" ]; then export STUDIO_LAN=1; fi
(sleep 1 && open "$URL") &
node server.js
