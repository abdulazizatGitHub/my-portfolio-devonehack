export interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'error';
  content: string;
  timestamp: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
  usage?: string;
  action: () => string[];
}