// src/app/api/quote/route.ts
export async function GET() {
  try {
    const res = await fetch("https://api.quotable.io/random");
    if (!res.ok) {
      return Response.json({ error: "Failed to fetch quote" }, { status: res.status });
    }
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Quote API unreachable" }, { status: 500 });
  }
}
