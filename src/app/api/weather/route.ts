// src/app/api/weather/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json({ error: "City is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://wttr.in/${city}?format=3`);
    if (!res.ok) {
      return Response.json({ error: "Failed to fetch weather" }, { status: res.status });
    }
    const text = await res.text();
    return new Response(text, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Weather API unreachable" }, { status: 500 });
  }
}
