#!/bin/bash
# Tito AI — schedule Mac wake events for drop reminders
# Uses pmset to wake the Mac just before each drop reminder fires.
#
# Drop reminders fire at:
#   Mon 3:00 AM PST → wake at 2:55 AM PST
#   Wed 2:00 AM PST → wake at 1:55 AM PST
#   Fri 2:00 AM PST → wake at 1:55 AM PST
#
# pmset only accepts the NEXT single occurrence. Re-run this script weekly
# (e.g., add it to the weekly cron) to schedule the next week's wake events.
# The tito-weekly.py reminder fires while Mac is awake (Fri 5 PM PST) so no wake needed for it.
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
