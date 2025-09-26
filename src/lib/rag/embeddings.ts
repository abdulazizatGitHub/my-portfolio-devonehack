// src/lib/rag/embeddings.ts
import fs from "fs";
import path from "path";
import { HF_KEY, HF_API, EMBED_MODEL } from "./config";

type Chunk = { id: string; text: string; source: string };

let embeddingsCache: { embeddings: number[][]; chunks: Chunk[] } | null = null;

function chunkText(text: string, size = 400) {
  // naive chunk by characters (can be improved by sentence splitting)
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

export async function prepareChunksFromJSONFiles(): Promise<Chunk[]> {
  // load files in src/data
  const dataDir = path.join(process.cwd(), "src", "data");
  const files = ["personal.json", "projects.json", "skills.json", "about.json"];
  const chunks: Chunk[] = [];

  files.forEach((fname) => {
    const full = path.join(dataDir, fname);
    if (!fs.existsSync(full)) return;
    const raw = fs.readFileSync(full, "utf-8");
    let obj;
    try {
      obj = JSON.parse(raw);
    } catch {
      obj = { content: raw };
    }
    // derive source text — convert object to readable string
    const text = JSON.stringify(obj, null, 2);
    const cs = chunkText(text, 800);
    cs.forEach((t, i) =>
      chunks.push({
        id: `${fname}#${i}`,
        text: t,
        source: fname,
      })
    );
  });

  return chunks;
}

async function callEmbeddingsAPI(texts: string[]): Promise<number[][]> {
  if (!HF_KEY) throw new Error("HUGGINGFACE_API_KEY not set");
  const url = `${HF_API}/embeddings/${encodeURIComponent(EMBED_MODEL)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: texts }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Embeddings API error: ${res.status} ${body}`);
  }
  const json = await res.json();
  // HF returns an array of objects with 'embedding' sometimes or direct vectors depending model
  if (Array.isArray(json)) {
    return json.map((r: any) => r.embedding || r);
  }
  throw new Error("Unexpected embeddings API response");
}

export async function getEmbeddingsForChunks() {
  if (embeddingsCache) return embeddingsCache;

  const chunks = await prepareChunksFromJSONFiles();
  if (chunks.length === 0) {
    embeddingsCache = { embeddings: [], chunks: [] };
    return embeddingsCache;
  }

  if (!HF_KEY) {
    // no key: don't compute embeddings; return empty to signal fallback mode
    embeddingsCache = { embeddings: [], chunks };
    return embeddingsCache;
  }

  const texts = chunks.map((c) => c.text);
  // chunk requests if large
  const batchSize = 16;
  const allEmbs: number[][] = [];
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const emb = await callEmbeddingsAPI(batch);
    allEmbs.push(...emb);
  }

  embeddingsCache = { embeddings: allEmbs, chunks };
  return embeddingsCache;
}

export async function embedQuery(query: string): Promise<number[] | null> {
  if (!HF_KEY) {
    return null;
  }
  const url = `${HF_API}/embeddings/${encodeURIComponent(EMBED_MODEL)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: [query] }),
  });
  if (!res.ok) {
    console.error("Embedding error", await res.text());
    return null;
  }
  const json = await res.json();
  const vector = Array.isArray(json) ? json[0].embedding || json[0] : null;
  return vector || null;
}
