// src/lib/rag/config.ts
export const HF_API = "https://api-inference.huggingface.co";
export const EMBED_MODEL = process.env.HF_EMBED_MODEL || "sentence-transformers/all-MiniLM-L6-v2";
export const GEN_MODEL = process.env.HF_GEN_MODEL || "google/flan-t5-small";
export const HF_KEY = process.env.HUGGINGFACE_API_KEY || "";
export const TOP_K = Number(process.env.TOP_K || "4");
export const MAX_TOKENS = Number(process.env.MAX_TOKENS || "500");
export const TEMPERATURE = Number(process.env.TEMPERATURE || "0.7");
export const CHUNK_SIZE = Number(process.env.CHUNK_SIZE || "1000");
export const CHUNK_OVERLAP = Number(process.env.CHUNK_OVERLAP || "200");
export const VECTOR_STORE_PATH = process.env.VECTOR_STORE_PATH || "vector_store.json";