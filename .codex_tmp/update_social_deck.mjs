import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "/Users/jeff/Documents/Claude/FB-Pages-Stats/Social Media Deck.xlsx";
const outputDir = "/Users/jeff/Documents/Claude/TItoAi/outputs/social-media-deck-2026-08-13";
const outputPath = `${outputDir}/Social Media Deck - Updated 2026-08-13.xlsx`;
const previewDir = `${outputDir}/previews`;
await fs.mkdir(previewDir, { recursive: true });

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(inputPath));

const updates = {
  "Cobrinha PR": {
    oldEnd: "Y", newCols: ["Z", "AA"],
    fb: { 7:[466,354], 9:[16,5], 11:[10,7], 12:[0,1] },
    ig: { 15:[6738,4480], 17:[124,100], 19:[5,5], 20:[10,7] },
  },
  "Clark": {
    oldEnd: "X", newCols: ["Y", "Z"],
    fb: { 7:[620,352], 9:[12,6], 11:[29,20], 12:[1,0] },
    ig: { 15:[1592,1298], 17:[41,28], 19:[135,330], 20:[2,2] },
  },
  "Pares": {
    oldEnd: "N", newCols: ["O", "P"],
    fb: { 7:[205,226], 9:[1,2], 11:[29,30], 12:[1,1] },
    ig: { 16:[500,435], 18:[8,7], 20:[12,35], 21:[1,2] },
  },
};

for (const [sheetName, cfg] of Object.entries(updates)) {
  const sheet = workbook.worksheets.getItem(sheetName);
  const [c1,c2] = cfg.newCols;
  const fbDateRow = 6;
  const igDateRow = sheetName === "Pares" ? 15 : 14;
  const maxMetricRow = sheetName === "Pares" ? 21 : 20;
  sheet.getRange(`${cfg.oldEnd}1:${cfg.oldEnd}${maxMetricRow}`).copyTo(sheet.getRange(`${c1}1:${c1}${maxMetricRow}`), "all");
  sheet.getRange(`${cfg.oldEnd}1:${cfg.oldEnd}${maxMetricRow}`).copyTo(sheet.getRange(`${c2}1:${c2}${maxMetricRow}`), "all");
  sheet.getRange(`${c1}${fbDateRow}:${c2}${fbDateRow}`).values = [[new Date("2026-08-10T00:00:00+08:00"),new Date("2026-08-11T00:00:00+08:00")]];
  sheet.getRange(`${c1}${igDateRow}:${c2}${igDateRow}`).values = [[new Date("2026-08-10T00:00:00+08:00"),new Date("2026-08-11T00:00:00+08:00")]];
  sheet.getRange(`${c1}${fbDateRow}:${c2}${fbDateRow}`).format.numberFormat = "yyyy-mm-dd";
  sheet.getRange(`${c1}${igDateRow}:${c2}${igDateRow}`).format.numberFormat = "yyyy-mm-dd";
  for (const [row, vals] of Object.entries(cfg.fb)) sheet.getRange(`${c1}${row}:${c2}${row}`).values = [vals];
  for (const [row, vals] of Object.entries(cfg.ig)) sheet.getRange(`${c1}${row}:${c2}${row}`).values = [vals];
  // Metrics unavailable as daily series in the current Meta overview remain blank.
  const fbBlankRows = [8,10];
  const igBlankRows = sheetName === "Pares" ? [17,19] : [16,18];
  for (const row of [...fbBlankRows,...igBlankRows]) sheet.getRange(`${c1}${row}:${c2}${row}`).clear({applyTo:"contents"});
  const fbEnd = c2;
  const igEnd = c2;
  for (let row=7; row<=12; row++) {
    sheet.getRange(`B${row}`).formulas = [[`=SUM(E${row}:${fbEnd}${row})`]];
    sheet.getRange(`C${row}`).formulas = [[`=SUMPRODUCT(($E$6:${fbEnd}$6>=DATE(YEAR($B$3),MONTH($B$3),1))*($E$6:${fbEnd}$6<DATE(YEAR($B$3),MONTH($B$3)+1,1))*E${row}:${fbEnd}${row})`]];
    sheet.getRange(`D${row}`).formulas = [[`=SUMPRODUCT(($E$6:${fbEnd}$6>=IFERROR(DATEVALUE($D$3),$D$3))*($E$6:${fbEnd}$6<=IFERROR(DATEVALUE($D$3),$D$3)+6)*E${row}:${fbEnd}${row})`]];
  }
  const igStart = sheetName === "Pares" ? 16 : 15;
  const igLast = sheetName === "Pares" ? 21 : 20;
  for (let row=igStart; row<=igLast; row++) {
    sheet.getRange(`B${row}`).formulas = [[`=SUM(E${row}:${igEnd}${row})`]];
    sheet.getRange(`C${row}`).formulas = [[`=SUMPRODUCT(($E$${igDateRow}:${igEnd}$${igDateRow}>=DATE(YEAR($B$3),MONTH($B$3),1))*($E$${igDateRow}:${igEnd}$${igDateRow}<DATE(YEAR($B$3),MONTH($B$3)+1,1))*E${row}:${igEnd}${row})`]];
    sheet.getRange(`D${row}`).formulas = [[`=SUMPRODUCT(($E$${igDateRow}:${igEnd}$${igDateRow}>=IFERROR(DATEVALUE($D$3),$D$3))*($E$${igDateRow}:${igEnd}$${igDateRow}<=IFERROR(DATEVALUE($D$3),$D$3)+6)*E${row}:${igEnd}${row})`]];
  }
  sheet.getRange("D3").values = [[new Date("2026-08-10T00:00:00+08:00")]];
  sheet.getRange("D3").format.numberFormat = "yyyy-mm-dd";
  sheet.getRange("B3").values = [[new Date("2026-08-01T00:00:00+08:00")]];
  sheet.getRange("A5").values = [[sheet.getRange("A5").values[0][0].replace(/2026-\d{2}-\d{2}\)/,"2026-08-11)")]];
  const igTitleCell = sheetName === "Pares" ? "A14" : "A13";
  sheet.getRange(igTitleCell).values = [[sheet.getRange(igTitleCell).values[0][0].replace(/2026-\d{2}-\d{2}\)/,"2026-08-11)")]];

  // Extend the established raw-data visual system through the newly added dates.
  const bandEnd = c2;
  const igSectionRow = sheetName === "Pares" ? 14 : 13;
  for (const row of [1,5,igSectionRow]) {
    sheet.getRange(`A${row}:${bandEnd}${row}`).unmerge();
    sheet.getRange(`A${row}:${bandEnd}${row}`).merge();
    sheet.getRange(`A${row}:${bandEnd}${row}`).format = {
      fill: "#45689B",
      font: { bold: true, color: "#FFFFFF" },
      verticalAlignment: "center",
    };
  }
  for (const row of [fbDateRow,igDateRow]) {
    sheet.getRange(`${c1}${row}:${c2}${row}`).format = {
      fill: "#45689B",
      font: { bold: true, color: "#FFFFFF" },
      horizontalAlignment: "center",
      verticalAlignment: "center",
      wrapText: true,
      numberFormat: "yyyy-mm-dd",
      borders: { preset: "all", style: "thin", color: "#1F2937" },
    };
  }
  const fbData = sheet.getRange(`${c1}7:${c2}12`);
  fbData.format = { horizontalAlignment:"right", numberFormat:"#,##0", borders:{preset:"all",style:"thin",color:"#6B7280"} };
  const igData = sheet.getRange(`${c1}${igStart}:${c2}${igLast}`);
  igData.format = { horizontalAlignment:"right", numberFormat:"#,##0", borders:{preset:"all",style:"thin",color:"#6B7280"} };
  sheet.getRange(`${c1}1:${c2}${maxMetricRow}`).format.columnWidth = 12;
  sheet.getRange(`${c1}${fbDateRow}:${c2}${fbDateRow}`).format.rowHeight = 48;
  sheet.getRange(`${c1}${igDateRow}:${c2}${igDateRow}`).format.rowHeight = 48;
}

const dash = workbook.worksheets.getItem("Dashboard");
dash.getRange("A2").values = [["Data since Jan 1, 2026 (or each account's actual start date) through Aug 11, 2026 — latest complete Meta Insights date available on Aug 13"]];
dash.getRange("A22").values = [["Follower Growth = net new follows YTD (Meta's own total, not summed from daily rows). Daily Facebook and Instagram Insights were refreshed through 2026-08-11 for Cobrinha PR, Clark, and Pares using Meta Business Suite on 2026-08-13. Metrics not exposed as daily series in the current overview remain blank. SGS was not available in the connected Meta portfolio and remains at its prior refresh through 2026-08-09; Shopify figures remain from 2026-08-04."]];
const refs = {7:["AA","AA"],8:["Z","Z"],12:["P","P"]};
for (const [row,[fb,ig]] of Object.entries(refs)) {
  const sn = row==7 ? "Cobrinha PR" : row==8 ? "Clark" : "Pares";
  const igFollowRow = sn === "Pares" ? 21 : 20;
  const igViewsRow = sn === "Pares" ? 16 : 15;
  dash.getRange(`C${row}`).formulas = [[`='${sn}'!${fb}12`]];
  dash.getRange(`H${row}`).formulas = [[`='${sn}'!${ig}${igFollowRow}`]];
  dash.getRange(`M${row}`).formulas = [[`='${sn}'!${fb}7`]];
  dash.getRange(`Q${row}`).formulas = [[`='${sn}'!${ig}${igViewsRow}`]];
}

const exec = workbook.worksheets.getItem("Executive Summary");
exec.getRange("A1").values = [["Executive Summary — Reporting period: Aug 3–11, 2026 | Meta Insights refreshed Aug 13, 2026"]];
exec.getRange("A3:C7").values = [[
  "Account","Updated performance insight","Watch-outs / Recommendations"
],[
  "Cobrinha PR",
  "Aug 3–11: Instagram delivered 92,142 views, 3,422 interactions and 96 follows. Facebook contributed 7,215 views, 75 interactions and five follows. Instagram generated 92.7% of the account's combined views in this period.",
  "Instagram is the clear scale engine. Keep the Spanish/local storytelling and high-performing reels, then attach one consistent message or trial CTA. Facebook should support community proof and retargeting rather than carry the reach target."
],[
  "Clark",
  "Aug 3–11: Facebook produced 3,493 views and 49 interactions; Instagram produced 11,765 views and 388 interactions. Instagram accounted for 77.1% of combined views and added 12 follows during the period.",
  "Clark has balanced momentum but still depends on Instagram for scale. Improve profile conversion with a sharper beginner offer, a pinned trial post and one consistent enrollment CTA across bio, captions and replies."
],[
  "Pares",
  "Aug 3–11: Facebook generated 32,451 views, 396 interactions and 664 follows; Instagram generated 8,477 views, 89 interactions and seven follows. Facebook supplied 79.3% of combined views and nearly all follower growth.",
  "Facebook is the primary acquisition channel for Pares. Repeat the food/video formats behind the Aug 4–7 surge, while using Instagram for visual discovery. Tie each post to one action: visit, reserve, message or follow."
],[
  "SGS",
  "No new Meta refresh was available in the connected business portfolio. The workbook therefore retains the prior social snapshot through Aug 9 and Shopify figures from Aug 4.",
  "Resolve account access before interpreting trend changes. Until then, treat SGS comparisons as stale and avoid reallocating budget based on these figures."
]];
exec.getRange("A10:C10").merge();
exec.getRange("A10").values = [["Cross-account takeaways"]];
exec.getRange("A11:B14").values = [[
  "1","The summary uses one consistent nine-day reporting window: Aug 3 through Aug 11, 2026."
],[
  "2","Cobrinha PR is the portfolio's Instagram scale leader with 92,142 views; preserve the winning creative and improve inquiry conversion."
],[
  "3","Pares is the Facebook growth leader with 32,451 views and 664 follows; repeat the formats behind the mid-period spike."
],[
  "4","Clark is the most balanced active account, but the shared priority remains profile-to-follow/message conversion. SGS is excluded from fresh comparisons until access is restored."
]];
exec.getRange("A3:C14").format.wrapText = true;
exec.getRange("B4:C7").format.verticalAlignment = "top";
exec.getRange("B4:C7").format.rowHeight = 78;
exec.getRange("B11:B14").format.rowHeight = 30;

// Repair inherited SGS WTD formulas so the dashboard remains error-free.
const sgs = workbook.worksheets.getItem("SGS");
sgs.getRange("D3").values = [["2026-08-03"]];
for (let row=7; row<=12; row++) sgs.getRange(`D${row}`).formulas = [[`=SUMPRODUCT(($E$6:$AO$6>=IFERROR(DATEVALUE($D$3),$D$3))*($E$6:$AO$6<=IFERROR(DATEVALUE($D$3),$D$3)+6)*E${row}:AO${row})`]];
for (let row=15; row<=20; row++) sgs.getRange(`D${row}`).formulas = [[`=SUMPRODUCT(($E$14:$AO$14>=IFERROR(DATEVALUE($D$3),$D$3))*($E$14:$AO$14<=IFERROR(DATEVALUE($D$3),$D$3)+6)*E${row}:AO${row})`]];
dash.getRange("W2").formulas = [["=COLUMN('Pares'!P16)-COLUMN('Pares'!E16)+1"]];

// Extend the weekly chart source with the latest partial week (Mon–Tue).
const chartData = workbook.worksheets.getItem("Chart Data");
chartData.getRange("A10:I10").values = [["2026-08-10",820,11218,972,2890,431,935,null,null]];
chartData.getRange("A21:I21").values = [["2026-08-10",null,null,null,null,null,null,null,null]];
chartData.getRange("B21:I21").formulas = [[
  "=MAX(0,765-SUMIFS('Cobrinha PR'!$E$12:$AA$12,'Cobrinha PR'!$E$6:$AA$6,\">\"&(DATEVALUE($A21)+6)))",
  "=MAX(0,4165-SUMIFS('Cobrinha PR'!$E$20:$AA$20,'Cobrinha PR'!$E$14:$AA$14,\">\"&(DATEVALUE($A21)+6)))",
  "=MAX(0,553-SUMIFS('Clark'!$E$12:$Z$12,'Clark'!$E$6:$Z$6,\">\"&(DATEVALUE($A21)+6)))",
  "=MAX(0,877-SUMIFS('Clark'!$E$20:$Z$20,'Clark'!$E$14:$Z$14,\">\"&(DATEVALUE($A21)+6)))",
  "=MAX(0,769-SUMIFS('Pares'!$E$12:$P$12,'Pares'!$E$6:$P$6,\">\"&(DATEVALUE($A21)+6)))",
  "=MAX(0,94-SUMIFS('Pares'!$E$21:$P$21,'Pares'!$E$15:$P$15,\">\"&(DATEVALUE($A21)+6)))",
  "=13",
  "=155"
]];
const graphs = workbook.worksheets.getItem("Graphs");
for (let i=0; i<graphs.charts.items.length; i++) {
  const chart = graphs.charts.items[i];
  for (const series of chart.series.items) {
    if (i < 4) {
      if (series.categoryFormula) series.categoryFormula = series.categoryFormula.replace(/\$9/g,"$10");
      if (series.formula) series.formula = series.formula.replace(/\$9/g,"$10");
    } else {
      if (series.categoryFormula) series.categoryFormula = series.categoryFormula.replace(/\$20/g,"$21");
      if (series.formula) series.formula = series.formula.replace(/\$20/g,"$21");
    }
  }
}

await fs.mkdir(outputDir, { recursive: true });
const keyCheck = await workbook.inspect({kind:"table",range:"Dashboard!A1:U16",include:"values,formulas",tableMaxRows:20,tableMaxCols:24,maxChars:12000});
await fs.writeFile(`${outputDir}/verification.txt`, keyCheck.ndjson ?? "");
const errors = await workbook.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",options:{useRegex:true,maxResults:300},summary:"final formula error scan"});
await fs.appendFile(`${outputDir}/verification.txt`, `\nERROR_SCAN\n${errors.ndjson ?? ""}`);
for (const sheet of workbook.worksheets.items) {
  const preview = await workbook.render({sheetName:sheet.name,autoCrop:"all",scale:1,format:"png"});
  const safe = sheet.name.replace(/[^a-z0-9]+/gi,"_");
  await fs.writeFile(`${previewDir}/${safe}.png`,new Uint8Array(await preview.arrayBuffer()));
}
const out = await SpreadsheetFile.exportXlsx(workbook);
await out.save(outputPath);
console.log(outputPath);
