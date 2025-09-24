// src/app/api/visitors/route.ts
import { NextRequest } from "next/server";

const USE_UPSTASH =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

let inMemoryCounter = 0; // fallback only

// lazy import Upstash client to avoid runtime errors when not installed
async function getUpstashClient() {
  if (!USE_UPSTASH) return null;
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

export async function GET() {
  if (USE_UPSTASH) {
    const client = await getUpstashClient();
    const res = await client!.get("visitors_count"); // res is string | null
    const count = res ? parseInt(res as string, 10) : 0;
    return new Response(JSON.stringify({ count }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ count: inMemoryCounter }), {
      status: 200,
    });
  }
}

export async function POST(req: NextRequest) {
  // Increment and return new count
  if (USE_UPSTASH) {
    const client = await getUpstashClient();
    // Uses atomic INCR on Redis to persist counts
    const res = await client!.incr("visitors_count"); // returns number
    return new Response(JSON.stringify({ count: res }), { status: 200 });
  } else {
    inMemoryCounter += 1;
    return new Response(JSON.stringify({ count: inMemoryCounter }), {
      status: 200,
    });
  }
}
