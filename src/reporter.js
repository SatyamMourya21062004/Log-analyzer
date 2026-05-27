import fs from "fs";

export function generateReport(data) {
  console.log("\n== Log analysis report ==\n");

  console.log("Valid Logs:", data.totalValidLogs);
  console.log("Abnormal Lines:", data.AbnormalCount);

  console.log("\nTop Endpoints:");
  console.table(data.topEndpoints);

  console.log("\nTop IPs:");
  console.table(data.topIPs);

  console.log("\nStatus Codes:");
  console.table(data.statusCounts);

  console.log("\nSlowest Endpoints:");
  console.table(data.slowEndpoints);

  fs.mkdirSync("output", { recursive: true });

  fs.writeFileSync(
    "output/report.json",
    JSON.stringify(data, null, 2)
  );

  console.log("\nSaved report to output/report.json");
}