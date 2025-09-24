// src/app/api/system/route.ts
import os from "os";
import { NextRequest } from "next/server";

const USE_UPSTASH = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

async function getUpstashClient() {
  if (!USE_UPSTASH) return null;
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

export async function GET(req: NextRequest) {
  // CPU usage: approximate via loadavg (1 minute)
  const loadAvg = os.loadavg()[0]; // 1-minute
  const cpus = os.cpus().length || 1;
  const cpuPercent = Math.min(100, Math.round((loadAvg / cpus) * 100 * 10) / 10); // normalized

  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMemPercent = Math.round(((totalMem - freeMem) / totalMem) * 1000) / 10; // one decimal

  // neuralActivity: if you track real tasks, compute ratio; otherwise simulate smooth value
  // Try to read a queue length from Redis (if available)
  let taskQueue = 0;
  if (USE_UPSTASH) {
    try {
      const client = await getUpstashClient();
      const q = await client!.get("task_queue_len");
      taskQueue = Number(q ?? 0);
    } catch (e) {
      taskQueue = 0;
    }
  } else {
    // fallback: small random-ish number to show activity
    taskQueue = Math.floor(Math.random() * 5);
  }

  // neuralActivity: combine CPU percent and queue length into a single metric
  const neuralActivity = Math.min(100, Math.round((cpuPercent * 0.6 + taskQueue * 8) * 10) / 10);

  const payload = {
    cpuUsage: cpuPercent,
    memoryUsage: usedMemPercent,
    neuralActivity,
    taskQueue,
    timestamp: Date.now(),
  };

  return new Response(JSON.stringify(payload), { status: 200 });
}
