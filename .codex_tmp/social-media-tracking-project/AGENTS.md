# Social Media Tracking — Codex Project

This project is separate from TitoAI. Its purpose is to maintain social-media performance data, analyze trends, and produce clear progress reports for business accounts.

## Scope

Track and report on:

- Cobrinha PR
- Clark
- Pares
- SGS

Primary workbook:

- [Social Media Deck.xlsx](https://docs.google.com/spreadsheets/d/1LEJWE7fU0Oef41_CgweK2teSqzBALInN/edit)

## Core responsibilities

1. Refresh raw Facebook and Instagram data through the latest complete reporting date.
2. Keep raw-data layouts, formulas, dashboards, charts, and executive summaries consistent.
3. Produce weekly and monthly progress reports with evidence-based insights.
4. Flag missing access, stale accounts, incomplete dates, formula errors, and unusual metric changes.
5. Keep TitoAI content production and files outside this project.

## Reporting rules

- Use Asia/Manila dates and explicitly state the reporting period.
- Compare like-for-like periods; never mix reporting windows in one ranking.
- Treat unavailable metrics as blank, not zero.
- Do not fabricate results, causes, campaign details, or recommendations.
- Distinguish organic results from boosted/paid results whenever the source allows it.
- Preserve source data and existing formulas before changing workbook structure.
- Verify all updated totals, formulas, date headers, and chart sources before reporting completion.
- Clearly label stale data. SGS must not be included in fresh cross-account comparisons until its access is restored and its data is refreshed.

## Standard metrics

- Views / reach
- Content interactions / engagement
- Follows / follower growth
- Engagement rate when the inputs are available
- Platform contribution: Facebook versus Instagram
- Week-over-week and month-over-month movement
- Best and weakest account/platform combinations

## Standard workflow

1. Inspect the current workbook and determine the latest complete date per account.
2. Add new daily raw data without replacing the workbook.
3. Extend YTD, MTD, and WTD formulas and chart-source ranges.
4. Validate totals and scan for spreadsheet errors.
5. Update the Executive Summary using one consistent reporting window.
6. Create or update the appropriate report in `reports/weekly/` or `reports/monthly/`.
7. Record access issues and data-quality concerns in `reports/data-quality-log.md`.

## Executive Summary format

For each account, provide:

- Reporting-period performance
- Strongest platform and its share of combined results
- Important change or risk
- One practical next action

End with cross-account takeaways and clearly separate facts from interpretations.

## Project structure

- `data/raw/` — downloaded or exported source data; do not overwrite original exports
- `data/processed/` — cleaned datasets and calculated tables
- `dashboards/` — dashboard files, chart specifications, and screenshots
- `reports/weekly/` — weekly performance and progress reports
- `reports/monthly/` — month-end performance reports
- `reports/data-quality-log.md` — access gaps, stale sources, and validation issues
- `templates/` — reusable reporting templates
- `scripts/` — repeatable data-cleaning and reporting utilities
- `outputs/` — generated deliverables ready for review

## Working style

- Lead with outcomes and key movements.
- Keep recommendations specific and tied to observed data.
- Use concise business English unless the user requests another voice.
- Never post, publish, share, or change file permissions without explicit approval.

