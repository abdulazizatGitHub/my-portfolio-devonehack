// src/app/api/joke/route.ts
export async function GET() {
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
    if (!res.ok) {
      return Response.json({ error: "Failed to fetch joke" }, { status: res.status });
    }
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Joke API unreachable" }, { status: 500 });
  }
}
