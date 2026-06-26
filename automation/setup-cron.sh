#!/bin/bash
# Tito AI Automation — install cron jobs
# Mac is PST (UTC-8). PHT (UTC+8) = PST + 16 hours.
#
# Schedule:
#   Daily summary:        8:00 AM PHT = 4:00 PM PST (day before)  → 0 16 * * *
#   Mon drop reminder:    7:00 PM PHT = 3:00 AM PST Monday        → 0 3 * * 1
#   Wed drop reminder:    6:00 PM PHT = 2:00 AM PST Wednesday     → 0 2 * * 3
#   Fri drop reminder:    6:00 PM PHT = 2:00 AM PST Friday        → 0 2 * * 5
#   Weekly prep check:    9:00 AM PHT = 5:00 PM PST Friday        → 0 17 * * 5
#
# NOTE: Mac must be awake for cron to run.
# The daily summary (4 PM PST) runs while Mac is awake — most reliable.
# Drop reminders fire overnight PST — run `setup-wake.sh` to schedule wake events.

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PYTHON=$(which python3)
LOG="/tmp/titoai-cron.log"

echo "Tito AI — installing cron jobs"
echo "Script dir: $SCRIPT_DIR"
echo "Python: $PYTHON"

MARKER_START="# --- Tito AI Automation ---"
MARKER_END="# --- End Tito AI Automation ---"

NEW_BLOCK="$MARKER_START
# Daily summary at 8:00 AM PHT (4:00 PM PST — Mac awake)
0 16 * * * $PYTHON $SCRIPT_DIR/tito-summary.py >> $LOG 2>&1
# Monday drop reminder at 7:00 PM PHT (3:00 AM PST)
0 3 * * 1 $PYTHON $SCRIPT_DIR/tito-remind.py >> $LOG 2>&1
# Wednesday drop reminder at 6:00 PM PHT (2:00 AM PST)
0 2 * * 3 $PYTHON $SCRIPT_DIR/tito-remind.py >> $LOG 2>&1
# Friday drop reminder at 6:00 PM PHT (2:00 AM PST)
0 2 * * 5 $PYTHON $SCRIPT_DIR/tito-remind.py >> $LOG 2>&1
# Weekly production check at 9:00 AM PHT Saturday (5:00 PM PST Friday)
0 17 * * 5 $PYTHON $SCRIPT_DIR/tito-weekly.py >> $LOG 2>&1
$MARKER_END"

# Remove old Tito AI block if present, then append new block
(crontab -l 2>/dev/null | awk "/$MARKER_START/{found=1} !found{print} /$MARKER_END/{found=0}"; echo "$NEW_BLOCK") | crontab -

echo ""
echo "✅ Cron jobs installed. Current crontab:"
crontab -l

echo ""
echo "IMPORTANT — Mac sleep note:"
echo "Drop reminders fire at 2–3 AM PST while Mac may be sleeping."
echo "Run setup-wake.sh to add pmset wake events, or verify manually."
echo ""
echo "Test scripts immediately:"
echo "  python3 $SCRIPT_DIR/tito-summary.py"
echo "  python3 $SCRIPT_DIR/tito-remind.py"
echo "  python3 $SCRIPT_DIR/tito-weekly.py"
