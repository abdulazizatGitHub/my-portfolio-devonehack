// src/lib/rag/retriever.ts
import { getEmbeddingsForChunks, embedQuery } from "./embeddings";
import { TOP_K } from "./config";

function cosine(a: number[], b: number[]) {
  let dot = 0,
    na = 0,
    nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export async function retrieveRelevantDocs(query: string) {
  const { embeddings, chunks } = await getEmbeddingsForChunks();

  // If no embeddings (no API key), fallback to lexical search
  if (!embeddings || embeddings.length === 0) {
    // simple substring score
    const q = query.toLowerCase();
    const scored = chunks.map((c) => {
      const score =
        (c.text.toLowerCase().includes(q) ? 1 : 0) +
        (c.text.toLowerCase().split(q).length - 1) * 0.5;
      return { chunk: c, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, TOP_K).map((s) => ({ text: s.chunk.text, source: s.chunk.source }));
  }

  const qEmb = await embedQuery(query);
  if (!qEmb) {
    // fallback
    return chunks.slice(0, TOP_K).map((c) => ({ text: c.text, source: c.source }));
  }

  const sims = embeddings.map((emb, idx) => ({ idx, score: cosine(qEmb, emb) }));
  sims.sort((a, b) => b.score - a.score);
  const top = sims.slice(0, TOP_K);
  return top.map((t) => ({ text: chunks[t.idx].text, source: chunks[t.idx].source, score: t.score }));
}
