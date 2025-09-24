import { PageId } from ".";

export interface TerminalLine {
  type: "system" | "input" | "output" | "error";
  content: string;
  timestamp: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
  usage?: string;
  output: string[];
}

export interface TerminalState {
  history: TerminalLine[];
  currentInput: string;
  isOpen: boolean;
}

export interface CommandHandler {
  [key: string]: (args?: string[]) => string[] | void;
}

export interface CommandContext {
  setHistory?: (lines: TerminalLine[]) => void;
  onClose?: () => void;
  onNavigate?: (page: PageId) => void;
  onToggleMatrix?: () => void;
  onOpenPlayground?: () => void;
  liveMetrics?: {
    cpuUsage: number;
    memoryUsage: number;
    neuralActivity: number;
    taskQueue: number;
  };
  getAllCommands?: () => string[];
}

export interface Command {
  description: string;
  run: (args?: string[], context?: CommandContext) => Promise<{ type: TerminalLine['type']; content: string }> | { type: TerminalLine['type']; content: string };
}
