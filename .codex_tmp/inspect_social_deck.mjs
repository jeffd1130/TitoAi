import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "/Users/jeff/Documents/Claude/FB-Pages-Stats/Social Media Deck.xlsx";
const outDir = "/Users/jeff/Documents/Claude/TItoAi/.codex_tmp/social_deck_inspect";
await fs.mkdir(outDir, { recursive: true });
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(inputPath));
await fs.writeFile(`${outDir}/started.txt`, "imported\n");

const summary = await workbook.inspect({
  kind: "workbook,sheet,table,drawing,definedName",
  include: "id,name,values,formulas",
  maxChars: 18000,
  tableMaxRows: 12,
  tableMaxCols: 14,
  tableMaxCellChars: 120,
});
await fs.writeFile(`${outDir}/summary.ndjson`, summary.ndjson ?? "");

for (const sheet of workbook.worksheets.items) {
  const used = sheet.getUsedRange();
  await fs.appendFile(`${outDir}/details.ndjson`, `SHEET_USED ${sheet.name} ${used?.address ?? "none"}\n`);
  if (used) {
    const region = await workbook.inspect({
      kind: "region",
      sheetId: sheet.name,
      range: used.address,
      include: "values,formulas",
      maxChars: 12000,
      tableMaxRows: 80,
      tableMaxCols: 30,
      tableMaxCellChars: 160,
    });
    await fs.appendFile(`${outDir}/details.ndjson`, `${region.ndjson ?? ""}\n`);
  }
  const preview = await workbook.render({ sheetName: sheet.name, autoCrop: "all", scale: 1, format: "png" });
  const safe = sheet.name.replace(/[^a-z0-9]+/gi, "_");
  await fs.writeFile(`${outDir}/${safe}.png`, new Uint8Array(await preview.arrayBuffer()));
}
