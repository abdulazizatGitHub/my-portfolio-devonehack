import { Command } from "@/types";

export const systemCommands: Record<string, Command> = {
  clear: {
    description: "Clears the terminal screen.",
    run: (_args: string[] = [], { setHistory }: any) => {
      setHistory?.([]);
      localStorage.removeItem("terminalHistory");
      return { type: "system", content: "Terminal cleared" };
    },
  },

  exit: {
    description: "Closes the terminal.",
    run: (_args: string[] = [], { onClose }: any) => {
      onClose?.();
      return { type: "system", content: "Terminal closed" };
    },
  },

  help: {
    description: "Lists all available commands.",
    run: (_args: string[] = [], { getAllCommands }: any) => {
      const commands = getAllCommands?.() || [];
      return {
        type: "output",
        content: (commands as string[]).map((c: string) => `- ${c}`).join("\n"),
      };
    },
  },
};
