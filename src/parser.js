export function parseLine(line) {
  if (!line || !line.trim()) {
    return {
      valid: false,
      reason: "Blank line"
    };
  }

  line = line.trim();

  if (line.startsWith("{")) {
    try {
      const obj = JSON.parse(line);

      return {
        valid: true,
        data: {
          timestamp: normalizeTimestamp(obj.timestamp),
          ip: obj.ip || "unknown",
          method: obj.method || "UNKNOWN",
          path: obj.path || "/",
          status: normalizeStatus(obj.status),
          responseTime: normalizeResponseTime(obj.responseTime)
        }
      };
    } catch {
      return {
        valid: false,
        reason: "Invalid JSON log"
      };
    }
  }

  const parts = line.split(/\s+/);

  if (parts.length < 5) {
    return {
      valid: false,
      reason: "Too few fields"
    };
  }

  try {
    let timestamp = parts[0];
    let ip;
    let method;
    let path;
    let status;
    let responseTime;

    if (parts[1]?.includes(":")) {
      timestamp += " " + parts[1];

      ip = parts[2];
      method = parts[3];
      path = parts[4];
      status = parts[5];
      responseTime = parts[6];
    } else {
      ip = parts[1];
      method = parts[2];
      path = parts[3];
      status = parts[4];
      responseTime = parts[5];
    }

    return {
      valid: true,
      data: {
        timestamp: normalizeTimestamp(timestamp),
        ip,
        method,
        path,
        status: normalizeStatus(status),
        responseTime: normalizeResponseTime(responseTime)
      }
    };
  } catch {
    return {
      valid: false,
      reason: "Parse failure"
    };
  }
}

function normalizeStatus(status) {
  if (!status || status === "-") {
    return null;
  }

  const num = Number(status);

  return Number.isNaN(num) ? null : num;
}

function normalizeResponseTime(value) {
  if (!value) return null;

  if (value.endsWith("ms")) {
    return Number(value.replace("ms", ""));
  }

  if (value.endsWith("s")) {
    return Number(value.replace("s", "")) * 1000;
  }

  return Number(value);
}

function normalizeTimestamp(value) {
  if (!value) return null;

  if (/^\d{10}$/.test(value)) {
    return new Date(Number(value) * 1000).toISOString();
  }

  const date = new Date(value);

  if (isNaN(date)) {
    return null;
  }

  return date.toISOString();
}   