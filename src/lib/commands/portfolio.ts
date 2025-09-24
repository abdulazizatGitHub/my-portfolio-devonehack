import { Command } from "@/types";

export const portfolioCommands: Record<string, Command> = {
  about: {
    description: "About me section.",
    run: () => ({
      type: "output",
      content: "Abdul Aziz - AI/ML Engineer & Neural Architect. Passionate about GANs, CV, NLP.",
    }),
  },
  skills: {
    description: "List my skills.",
    run: () => ({
      type: "output",
      content: "AI/ML, GANs, Computer Vision, NLP, React, Next.js, Web3, Blockchain.",
    }),
  },
  projects: {
    description: "List key projects.",
    run: () => ({
      type: "output",
      content: "- Neural Portfolio\n- GAN Research\n- Web3 Wallet\n- Digital Playground",
    }),
  },
  research: {
    description: "Show research interests.",
    run: () => ({
      type: "output",
      content: "Mode collapse in GANs, data imbalance, TMG-GAN baseline improvements.",
    }),
  },
  navigate: {
    description: "Navigate to a page (usage: navigate <page>).",
    run: (args: string[] = [], { onNavigate }: any) => {
      if (!args[0]) return { type: "error", content: "Usage: navigate <page>" };
      onNavigate?.(args[0]);
      return { type: "output", content: `Navigating to ${args[0]}...` };
    },
  },
};
