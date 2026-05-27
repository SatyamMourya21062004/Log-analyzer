import fs from "fs";


const methods = ["GET", "POST", "PUT", "DELETE"];
const paths = [
  "/api/users",
  "/api/login",
  "/api/orders",
  "/health"
];

const statuses = [200, 201, 400, 401, 404, 500];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const lines = [];

for (let i = 0; i < 5000; i++) {
  const timestamp = new Date(
    Date.now() - Math.random() * 100000000
  ).toISOString();

  const ip = `192.168.1.${Math.floor(Math.random() * 255)}`;

  const method = random(methods);
  const path = random(paths);
  const status = random(statuses);

  const responseTime = `${Math.floor(Math.random() * 1000)}ms`;

  // normal log
  lines.push(
    `${timestamp} ${ip} ${method} ${path} ${status} ${responseTime}`
  );

  // abnormal logs
  if (Math.random() < 0.08) {
    lines.push("abnormal line ");
  }

  // json logs
  if (Math.random() < 0.05) {
    lines.push(
      JSON.stringify({
        timestamp,
        ip,
        method,
        path,
        status,
        responseTime
      })
    );
  }

  // missing status
  if (Math.random() < 0.05) {
    lines.push(
      `${timestamp} ${ip} ${method} ${path} - ${responseTime}`
    );
  }
}

fs.mkdirSync("sample-data", { recursive: true });

fs.writeFileSync(
  "sample-data/generated.log",
  lines.join("\n")
);

console.log("Generated sample-data/generated.log");