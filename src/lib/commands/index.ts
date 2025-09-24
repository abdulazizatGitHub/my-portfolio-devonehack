import { systemCommands } from "./system";
import { portfolioCommands } from "./portfolio";
import { interactiveCommands } from "./interactive";
import { metricsCommands } from "./metrics";
import { funCommands } from "./fun";
import { navigationCommands } from "./navigation";
import { Command, CommandContext, TerminalLine } from "@/types";

export const allCommands: Record<string, Command> = {
  ...systemCommands,
  ...portfolioCommands,
  ...interactiveCommands,
  ...metricsCommands,
  ...funCommands,
  ...navigationCommands,
};

export const getAllCommands = () => Object.keys(allCommands);

export const runCommand = async (
  input: string,
  context: CommandContext
): Promise<{ type: TerminalLine['type']; content: string } | null> => {
  const [cmd, ...args] = input.trim().split(" ");
  const command = allCommands[cmd];

  if (!command) return { type: "error", content: `Command not found: ${cmd}` };

  return await command.run(args, { ...context, getAllCommands });
};
