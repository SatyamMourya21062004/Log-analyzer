# Log Analyzer

A simple Node.js tool to analyze server log files.

It can handle:

- normal log lines
- different timestamp formats
- JSON logs
- missing fields
- malformed lines
- different response time formats

The tool shows useful information like:

- top endpoints
- status code counts
- slow APIs
- top IP addresses
- malformed log count

---

# Features

- Handles mixed log formats
- Skips bad lines safely
- Supports large files using streams
- Generates a JSON report
- Includes a sample log generator

---

# Project Structure

log-analyzer/
│
├── package.json
├── README.md
├── ANSWERS.md
│
├── src/
│   ├── index.js
│   ├── parser.js
│   ├── analyzer.js
│   └── reporter.js
│
├── scripts/
│   └── generateLogs.js
│
├── sample-data/
│   └── generated.log
│
└── output/
    └── report.json

---

# Requirements

Install:

- Node.js
- npm

---

# Installation

Go to project folder:

cd log-analyzer

Install dependencies:

npm install

---

# Generates sample log

Run:

npm run generate

This creates:

sample-data/generated.log


---

# Run the analyzer

Run:

node src/index.js sample-data/generated.log

---

# Example log 

2024-03-15T14:23:01Z 192.168.1.42 GET /api/users 200 142ms

---

# Example output

===== LOG REPORT =====

Valid Logs: 5231
Malformed Lines: 412

Top Endpoints:
┌─────────┬──────────────┬──────┐
│ /login  │ 1241         │
└─────────┴──────────────┴──────┘

---

# Output File

The tool also creates:

output/report.json


---

# Edge Cases Handled

- blank lines
- malformed logs
- invalid JSON logs
- missing status codes
- different timestamp formats
- different response time formats

---

# Future Improvements

- live log monitoring
- CSV export
- web dashboard
- better filtering options

---

# Scripts

Generate logs:

npm run generate

Run analyzer:

npm start sample-data/generated.log
