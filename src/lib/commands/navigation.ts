import { Command, CommandContext, PageId } from "@/types";

export const navigationCommands: Record<string, Command> = {
  navigate: {
    description: "Navigate to a page (home, about, projects, skills, contact).",
    run: (args: string[] = [], { onNavigate }: CommandContext = {}) => {
      const page = args[0] as PageId | undefined;

      // Check if page is valid PageId
      if (page && ["home", "about", "projects", "skills", "contact"].includes(page)) {
        onNavigate?.(page as PageId); // TypeScript safe cast
        return { type: "output", content: `Navigated to ${page}` };
      }

      return { type: "error", content: `Page "${page ?? ''}" not found` };
    },
  },
};

