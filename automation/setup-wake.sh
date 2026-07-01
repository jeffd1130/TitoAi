#!/bin/bash
# DEPRECATED — no longer needed.
#
# This script was built on the incorrect assumption that Jeff's Mac runs on
# Pacific time (PST/UTC-7), requiring overnight wake events to catch
# PHT-evening drop reminders. Jeff's Mac actually runs on local PHT (UTC+8)
# time, so all reminders in setup-cron.sh now fire during normal daytime/
# evening hours (9 AM, 6-7 PM) and the Mac does not need to be woken from
# sleep overnight. Kept in the repo for reference only — do not run.
#
# Original purpose (obsolete): Uses pmset to wake the Mac just before each
# drop reminder fires, back when reminders were believed to fire at 1-3 AM
# Mac local time.
#
# Requires sudo — you will be prompted for your password.

echo "Tito AI — scheduling Mac wake events for next week's drops"

# Get upcoming Mon, Wed, Fri dates
NEXT_MON=$(date -v+Mon "+%m/%d/%y 02:55:00")
NEXT_WED=$(date -v+Wed "+%m/%d/%y 01:55:00")
NEXT_FRI=$(date -v+Fri "+%m/%d/%y 01:55:00")

echo "Scheduling wake events:"
echo "  Mon 2:55 AM PST: $NEXT_MON"
echo "  Wed 1:55 AM PST: $NEXT_WED"
echo "  Fri 1:55 AM PST: $NEXT_FRI"

sudo pmset schedule wake "$NEXT_MON"
sudo pmset schedule wake "$NEXT_WED"
sudo pmset schedule wake "$NEXT_FRI"

echo ""
echo "✅ Wake events scheduled. Check with: pmset -g sched"
pmset -g sched
