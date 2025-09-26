// src/lib/rag/prompt.ts
export function buildPrompt({ retrieved, conversation, userMessage }: { retrieved: any[]; conversation: { role: string; text: string }[]; userMessage: string; }) {
  const docsText = retrieved
    .map((r, i) => `--- Doc ${i + 1} (source: ${r.source})\n${r.text}`)
    .join("\n\n");

  const convoText = conversation
    .map((c) => (c.role === "user" ? `User: ${c.text}` : `Assistant: ${c.text}`))
    .join("\n");

  const systemPrompt = `You are "Sarah", an assistant for Abdul Aziz (AI/ML Engineer). Use the provided documents to answer user questions concisely and helpfully. If the documents do not contain the answer, be honest and offer to collect client details for follow-up.`;

  const prompt = `${systemPrompt}

Context documents:
${docsText}

Conversation history:
${convoText}

User question:
${userMessage}

Answer as a helpful assistant in plain language. Keep the answer <= 300 words. If user intent is to hire or request service, ask for name, email and short project description.`;

  return prompt;
}
