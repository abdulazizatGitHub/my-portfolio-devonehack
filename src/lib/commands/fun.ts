import { Command } from "@/types";

export const funCommands: Record<string, Command> = {
  joke: {
    description: "Tell a programming joke.",
    run: async () => {
      try {
        const res = await fetch("/api/joke");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return { type: "output", content: data.joke || "No jokes today 😅" };
      } catch (err) {
        return { type: "error", content: "Failed to fetch joke 😢" };
      }
    },
  },
  quote: {
    description: "Show inspirational quote.",
    run: async () => {
      try {
        const res = await fetch("/api/quote");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return { type: "output", content: `"${data.content}" — ${data.author}` };
      } catch (err) {
        return { type: "error", content: "Failed to fetch quote 😢" };
      }
    },
  },
  weather: {
    description: "Get weather for a city (usage: weather <city>).",
    run: async (args: string[] = []) => {
      if (!args[0]) return { type: "error", content: "Usage: weather <city>" };
      try {
        const res = await fetch(`/api/weather?city=${encodeURIComponent(args[0])}`);
        const text = await res.text();
        if (text.includes("error")) throw new Error(text);
        return { type: "output", content: text };
      } catch (err) {
        return { type: "error", content: "Failed to fetch weather 😢" };
      }
    },
  },
};
