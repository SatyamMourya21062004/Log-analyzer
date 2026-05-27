 1. How to run
 Requirements
Install:
- Node.js 
- npm

---

## Install dependencies
npm install

---

## Generate sample logs

npm run generate

This will create a log file as shown below:

sample-data/generated.log

---

## Running the analyzer

node src/index.js sample-data/generated.log

---

 2. Stack choice

I chose Node.js because it is very good for handling file operations and streams efficiently.

Using Node.js streams and readline, the application can process large log files line-by-line instead of loading the entire file into memory at once. This keeps memory usage low and makes the tool faster and more scalable for large files.

Node.js is also a good choice for building command-line tools and handling asynchronous operations easily.

A worse approach would be reading the entire file into memory using methods like fs.readFileSync. That could slow down the application or cause memory issues when processing very large log files.

---

# 3. One real edge case

The parser correctly handles timestamps that contain spaces, such as:

15-Mar-2024 14:23:01 192.168.1.42 GET /api/users 200 142ms

Handled in:

src/parser.js

---

# 4. AI usage

I used ChatGPT and Gemini during development for the following tasks:

## Architecture planning

Prompt:
"Design a Node.js log analyzer that can handle abnormal and mixed-format logs."

Used output:
Project structure and modular architecture ideas.

---


# 5. Honest gap

One thing that could be improved is memory usage for very large log files.

Right now, all parsed logs are stored in an array before analysis:

```js
parsedLogs.push(parsed.data);