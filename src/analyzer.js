export function analyzeLogs(logs, AbnormalLines) {
  const statusCounts = {};
  const endpointCounts = {};
  const endpointTimes = {};
  const ipCounts = {};

  for (const log of logs) {
    if (log.status) {
      statusCounts[log.status] =
        (statusCounts[log.status] || 0) + 1;
    }

    endpointCounts[log.path] =
      (endpointCounts[log.path] || 0) + 1;

    if (!endpointTimes[log.path]) {
      endpointTimes[log.path] = [];
    }

    endpointTimes[log.path].push(log.responseTime || 0);

    ipCounts[log.ip] =
      (ipCounts[log.ip] || 0) + 1;
  }

  const slowEndpoints = Object.entries(endpointTimes)
    .map(([path, times]) => ({
      path,
      avgResponse:
        times.reduce((a, b) => a + b, 0) / times.length
    }))
    .sort((a, b) => b.avgResponse - a.avgResponse)
    .slice(0, 10);

  return {
    totalValidLogs: logs.length,
    AbnormalCount: AbnormalLines.length,
    AbnormalExamples: AbnormalLines.slice(0, 5),
    statusCounts,
    topEndpoints: sortObject(endpointCounts),
    topIPs: sortObject(ipCounts),
    slowEndpoints
  };
}

function sortObject(obj) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}