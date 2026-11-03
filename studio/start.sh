#!/bin/bash
# Start Tito AI Studio.
#   bash start.sh         → this Mac only (http://localhost:4545)
#   bash start.sh phone   → also on your home Wi-Fi; prints a private phone link with an access key
cd "$(dirname "$0")"
if [ "$1" = "phone" ]; then export STUDIO_LAN=1; fi
(sleep 1 && open http://localhost:4545/?key=$(cat data/access-key 2>/dev/null)) &
node server.js
