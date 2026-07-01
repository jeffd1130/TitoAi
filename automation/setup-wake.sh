#!/bin/bash
# DEPRECATED — no longer needed.
#
# This script was built on the incorrect assumption that the Mac uses a
# different timezone, requiring overnight wake events to catch PHT-evening
# drop reminders. The Mac runs on Manila time (PHT, UTC+8), so all reminders
# in setup-cron.sh now fire during normal daytime/evening hours (9 AM, 6-7 PM
# Manila) and the Mac does not need to be woken from sleep. Kept in the repo
# for reference only — do not run.
#
# Original purpose (obsolete): Uses pmset to wake the Mac just before each
# drop reminder fires.
#
# Requires sudo — you will be prompted for your password.

echo "Tito AI — scheduling Mac wake events for next week's drops"

# Get upcoming Mon, Wed, Fri dates
NEXT_MON=$(date -v+Mon "+%m/%d/%y 02:55:00")
NEXT_WED=$(date -v+Wed "+%m/%d/%y 01:55:00")
NEXT_FRI=$(date -v+Fri "+%m/%d/%y 01:55:00")

echo "Scheduling wake events:"
echo "  Mon 6:55 PM Manila: $NEXT_MON"
echo "  Wed 6:55 PM Manila: $NEXT_WED"
echo "  Fri 6:55 PM Manila: $NEXT_FRI"

sudo pmset schedule wake "$NEXT_MON"
sudo pmset schedule wake "$NEXT_WED"
sudo pmset schedule wake "$NEXT_FRI"

echo ""
echo "✅ Wake events scheduled. Check with: pmset -g sched"
pmset -g sched
