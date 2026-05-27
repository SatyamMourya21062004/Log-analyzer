import fs from "fs";
import readline from "readline";

import { parseLine } from "./parser.js";
import { analyzeLogs } from "./analyzer.js";
import { generateReport } from "./reporter.js";

const filePath = process.argv[2];

if (!filePath) {
  console.log("Usage: node src/index.js <log-file>");
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.log("File not found");
  process.exit(1);
}

const stream = fs.createReadStream(filePath);

const rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity
});

const parsedLogs = [];
const AbnormalLines = [];

for await (const line of rl) {
  const parsed = parseLine(line);

  if (parsed.valid) {
    parsedLogs.push(parsed.data);
  } else {
    AbnormalLines.push({
      line,
      reason: parsed.reason
    });
  }
}

const analysis = analyzeLogs(parsedLogs, AbnormalLines);

generateReport(analysis);