#!/bin/bash
# Tito AI Automation — install cron jobs
# Jeff's Mac runs on local PHT (UTC+8) time — cron times below are direct
# PHT wall-clock values, no offset conversion needed.
#
# Schedule (Manila/PHT time = Mac local time):
#   Daily summary:          10:00 AM daily
#   D-3 Recording reminder:  9:00 AM — Fri (for Mon), Sun (for Wed), Tue (for Fri)
#   D-2 Content creation:    9:00 AM — Sat (for Mon), Mon (for Wed), Wed (for Fri)
#   Weekly overview:         9:00 AM Saturday
#   Drop reminders:          7:00 PM Mon / 6:00 PM Wed / 6:00 PM Fri (1hr before each drop)
#
# NOTE: Mac must be awake for cron to run. Since Mac local time = PHT, all
# reminders fire during normal daytime/evening hours — no overnight wake
# scheduling is required (setup-wake.sh is deprecated).

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
# Daily summary at 10:00 AM PHT
0 10 * * * $PYTHON $SCRIPT_DIR/tito-summary.py >> $LOG 2>&1
# D-3 recording reminders at 9:00 AM PHT
0 9 * * 5 $PYTHON $SCRIPT_DIR/tito-record.py >> $LOG 2>&1
0 9 * * 0 $PYTHON $SCRIPT_DIR/tito-record.py >> $LOG 2>&1
0 9 * * 2 $PYTHON $SCRIPT_DIR/tito-record.py >> $LOG 2>&1
# D-2 content creation reminders at 9:00 AM PHT
0 9 * * 6 $PYTHON $SCRIPT_DIR/tito-create.py >> $LOG 2>&1
0 9 * * 1 $PYTHON $SCRIPT_DIR/tito-create.py >> $LOG 2>&1
0 9 * * 3 $PYTHON $SCRIPT_DIR/tito-create.py >> $LOG 2>&1
# Weekly production overview at 9:00 AM PHT Saturday
0 9 * * 6 $PYTHON $SCRIPT_DIR/tito-weekly.py >> $LOG 2>&1
# Drop reminders 1hr before each post (PHT local time)
0 19 * * 1 $PYTHON $SCRIPT_DIR/tito-remind.py >> $LOG 2>&1
0 18 * * 3 $PYTHON $SCRIPT_DIR/tito-remind.py >> $LOG 2>&1
0 18 * * 5 $PYTHON $SCRIPT_DIR/tito-remind.py >> $LOG 2>&1
$MARKER_END"

# Remove old Tito AI block if present, then append new block
(crontab -l 2>/dev/null | awk "/$MARKER_START/{found=1} !found{print} /$MARKER_END/{found=0}"; echo "$NEW_BLOCK") | crontab -

echo ""
echo "✅ Cron jobs installed. Current crontab:"
crontab -l

echo ""
echo "Test scripts:"
echo "  python3 $SCRIPT_DIR/tito-summary.py"
echo "  python3 $SCRIPT_DIR/tito-record.py"
echo "  python3 $SCRIPT_DIR/tito-create.py"
echo "  python3 $SCRIPT_DIR/tito-remind.py"
echo "  python3 $SCRIPT_DIR/tito-weekly.py"
