#!/usr/bin/env bash
set -euo pipefail

source_video='/Users/jeff/Downloads/Tito AI 1.mp4'
repo_root='/Users/jeff/Documents/Claude/TItoAi'
output_dir="$repo_root/docs/media/tito-ai-origin-recut"
font_file="$repo_root/brand/fonts/BebasNeue-Regular.ttf"
avatar_dir="$repo_root/docs/assets/avatars"

mkdir -p "$output_dir"

starts=(7.4 38.0 71.5 100.0 133.5)
durations=(29.6 30.0 27.5 25.5 29.5)
hooks=(
  'TATAY, NASA SILICON VALLEY?'
  'WEBSITE? AI ANG TINANONG KO.'
  'WALA AKONG BACKGROUND.'
  'TRIAL AND ERROR? OO NAMAN.'
  'AI ANG TULONG, TAO ANG GALAW.'
)
nexts=(
  'NEXT: ANG WEBSITE QUESTION'
  'NEXT: FIRST OPPORTUNITY'
  'NEXT: TRIAL AND ERROR'
  'NEXT: NASAAN AKO NGAYON?'
  'FOLLOW TITO AI FOR MORE'
)
poses=(surprised teach surprised teach wave)

for index in 0 1 2 3 4; do
  part=$((index + 1))
  duration="${durations[$index]}"
  fade_out=$(awk -v d="$duration" 'BEGIN { printf "%.2f", d-0.18 }')
  next_start=$(awk -v d="$duration" 'BEGIN { printf "%.2f", d-2.70 }')
  filter="[0:v]scale=1080:1920,format=yuv420p,\
drawbox=x=24:y=245:w=832:h=112:color=0x0A0F1E@0.88:t=fill:enable='between(t,0,3.2)',\
drawtext=fontfile=$font_file:text='${hooks[$index]}':fontcolor=0xFFB800:fontsize=54:x=47:y=270:enable='between(t,0,3.2)',\
drawbox=x=24:y=1720:w=1032:h=96:color=0x0A0F1E@0.88:t=fill:enable='between(t,$next_start,$duration)',\
drawtext=fontfile=$font_file:text='${nexts[$index]}':fontcolor=white:fontsize=58:x=48:y=1733:enable='between(t,$next_start,$duration)'[base];\
[1:v]scale=190:-1,format=rgba[avatar];\
[base][avatar]overlay=x=W-w-22:y=232:format=auto:shortest=1[v]"

  ffmpeg -hide_banner -loglevel error -stats \
    -ss "${starts[$index]}" -t "$duration" -i "$source_video" \
    -loop 1 -i "$avatar_dir/tito-ai-chibi-${poses[$index]}.png" \
    -filter_complex "$filter" -map '[v]' -map '0:a:0' \
    -af "afade=t=in:st=0:d=0.08,afade=t=out:st=$fade_out:d=0.18" \
    -c:v libx264 -preset veryfast -crf 24 -pix_fmt yuv420p -r 30 \
    -c:a aac -b:a 128k -ar 48000 -movflags +faststart \
    -shortest -y "$output_dir/part-$part.mp4"
done
