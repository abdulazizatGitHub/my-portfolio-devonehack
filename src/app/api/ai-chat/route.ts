// src/app/api/ai-chat/route.ts
import { NextResponse } from "next/server";
import { retrieveRelevantDocs } from "@/lib/rag/retriever";
import { buildPrompt } from "@/lib/rag/prompt";
import { HF_KEY, HF_API, GEN_MODEL } from "@/lib/rag/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, conversation = [] } = body;
    if (!message) return NextResponse.json({ error: "No message provided" }, { status: 400 });

    // 1. retrieve docs
    const retrieved = await retrieveRelevantDocs(message);

    // 2. build prompt
    const prompt = buildPrompt({ retrieved, conversation, userMessage: message });

    // 3. generate via HF (or fallback)
    if (!HF_KEY) {
      // fallback simple echo + include retrieved docs summary
      const summary = retrieved.map((r: any, i: number) => `Doc${i + 1}(${r.source}): ${r.text.slice(0, 200)}...`).join("\n");
      const fallback = `I don't have an embeddings API key configured. Retrieved docs:\n${summary}\n\nUser asked: ${message}\n\nI recommend contacting Abdul at abdulazizk1430@gmail.com for a full answer.`;
      return NextResponse.json({ reply: fallback });
    }

    const genUrl = `${HF_API}/models/${encodeURIComponent(GEN_MODEL)}`;
    const genRes = await fetch(genUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.2,
          top_p: 0.9,
        },
      }),
    });

    if (!genRes.ok) {
      const txt = await genRes.text();
      console.error("HF gen error:", genRes.status, txt);
      return NextResponse.json({ error: "Generation error", details: txt }, { status: 500 });
    }

    const genJson = await genRes.json();
    // HF returns different shapes; often an array of {generated_text}
    const reply = Array.isArray(genJson) ? (genJson[0].generated_text || genJson[0].generated_text) : genJson.generated_text || genJson;
    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("ai-chat error", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
