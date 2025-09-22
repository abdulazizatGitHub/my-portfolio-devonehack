export interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'error';
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