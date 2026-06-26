#!/bin/bash
# Tito AI Automation — install cron jobs
# Mac is PST (UTC-8). PHT (UTC+8) = PST + 16 hours.
#
# All times shown in Manila (PHT, UTC+8). Cron runs on Mac local time (UTC-8).
# PHT → Mac local: subtract 16 hours (crosses midnight, so day shifts back).
#
# Schedule (Manila time):
#   Daily summary:          10:00 AM daily
#   D-3 Recording reminder:  9:00 AM — Fri (for Mon), Sun (for Wed), Tue (for Fri)
#   D-2 Content creation:    9:00 AM — Sat (for Mon), Mon (for Wed), Wed (for Fri)
#   Weekly overview:         9:00 AM Saturday
#   Drop reminders:          7:00 PM Mon / 7:00 PM Wed / 7:00 PM Fri
#
# NOTE: Mac must be awake for cron to run.
# Drop reminders fire 7 PM Manila = 3 AM Mac local — run setup-wake.sh for overnight reminders.

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
# Daily summary at 10:00 AM PHT (6:00 PM PST)
0 18 * * * $PYTHON $SCRIPT_DIR/tito-summary.py >> $LOG 2>&1
# D-3 recording reminders at 9:00 AM PHT (5:00 PM PST day before)
0 17 * * 4 $PYTHON $SCRIPT_DIR/tito-record.py >> $LOG 2>&1
0 17 * * 6 $PYTHON $SCRIPT_DIR/tito-record.py >> $LOG 2>&1
0 17 * * 1 $PYTHON $SCRIPT_DIR/tito-record.py >> $LOG 2>&1
# D-2 content creation reminders at 9:00 AM PHT (5:00 PM PST day before)
0 17 * * 5 $PYTHON $SCRIPT_DIR/tito-create.py >> $LOG 2>&1
0 17 * * 0 $PYTHON $SCRIPT_DIR/tito-create.py >> $LOG 2>&1
0 17 * * 2 $PYTHON $SCRIPT_DIR/tito-create.py >> $LOG 2>&1
# Weekly production overview at 9:00 AM PHT Saturday (5:00 PM PST Friday)
0 17 * * 5 $PYTHON $SCRIPT_DIR/tito-weekly.py >> $LOG 2>&1
# Drop reminders 1hr before each post (overnight PST — needs Mac awake)
0 3 * * 1 $PYTHON $SCRIPT_DIR/tito-remind.py >> $LOG 2>&1
0 2 * * 3 $PYTHON $SCRIPT_DIR/tito-remind.py >> $LOG 2>&1
0 2 * * 5 $PYTHON $SCRIPT_DIR/tito-remind.py >> $LOG 2>&1
$MARKER_END"

# Remove old Tito AI block if present, then append new block
(crontab -l 2>/dev/null | awk "/$MARKER_START/{found=1} !found{print} /$MARKER_END/{found=0}"; echo "$NEW_BLOCK") | crontab -

echo ""
echo "✅ Cron jobs installed. Current crontab:"
crontab -l

echo ""
echo "IMPORTANT — Mac sleep note:"
echo "Drop reminders fire at 7 PM Manila, which is 3 AM Mac local — Mac may be sleeping."
echo "Run setup-wake.sh to add pmset wake events, or verify manually."
echo ""
echo "Test scripts:"
echo "  python3 $SCRIPT_DIR/tito-summary.py"
echo "  python3 $SCRIPT_DIR/tito-record.py"
echo "  python3 $SCRIPT_DIR/tito-create.py"
echo "  python3 $SCRIPT_DIR/tito-remind.py"
echo "  python3 $SCRIPT_DIR/tito-weekly.py"
