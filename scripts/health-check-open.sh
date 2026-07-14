#!/bin/bash
# Opens all Tito AI analytics tabs in Chrome for the weekly health check.
# Run manually after receiving the Monday 8 AM reminder.

open -a "Google Chrome" "https://www.instagram.com/tito.aiph/"
sleep 1
open -a "Google Chrome" "https://www.instagram.com/insights/"
sleep 1
open -a "Google Chrome" "https://www.tiktok.com/tiktokstudio/analytics"

echo "Health check tabs opened in Chrome."
