import { Command } from "@/types";

export const interactiveCommands: Record<string, Command> = {
  navigate: {
    description: "Navigate to a portfolio page (home, about, projects, skills, contact).",
    run: (args: string[] = [], { onNavigate }: any) => {
      const page = args[0];
      if (["home", "about", "projects", "skills", "contact"].includes(page)) {
        onNavigate?.(page);
        return { type: "output", content: `Navigated to ${page}` };
      }
      return { type: "error", content: `Page "${page}" not found` };
    },
  },

  matrix: {
    description: "Toggle matrix rain background.",
    run: (_args: string[] = [], { onToggleMatrix }: any) => {
      onToggleMatrix?.();
      return { type: "output", content: "Matrix mode toggled. Welcome to the neural reality." };
    },
  },

  playground: {
    description: "Opens the interactive code playground.",
    run: (_args: string[] = [], { onOpenPlayground }: any) => {
      onOpenPlayground?.();
      return { type: "output", content: "Code playground activated!" };
    },
  },
};
