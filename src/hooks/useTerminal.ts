import { useState, useCallback } from 'react';
import { TerminalLine } from '@/types';
import terminalCommands from '@/data/terminalCommands.json';

export const useTerminal = () => {
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    {
      type: 'system',
      content: '🧠 Neural Interface v2.0 initialized...',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'system',
      content: '🚀 AI/ML Engineer portfolio loaded',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: 'Type "help" for available commands',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const executeCommand = useCallback((command: string) => {
    const newHistory = [...terminalHistory];
    newHistory.push({
      type: 'input',
      content: `> ${command}`,
      timestamp: new Date().toLocaleTimeString()
    });

    const cmd = command.toLowerCase().trim();
    
    if (cmd === 'clear') {
      setTerminalHistory([]);
      return null;
    }

    const commandData = terminalCommands[cmd as keyof typeof terminalCommands];
    const output = commandData?.output || ['Command not found. Type "help" for available commands.'];

    output.forEach(line => {
      newHistory.push({
        type: 'output',
        content: line,
        timestamp: new Date().toLocaleTimeString()
      });
    });

    setTerminalHistory(newHistory);
    return commandData;
  }, [terminalHistory]);

  const clearHistory = useCallback(() => {
    setTerminalHistory([]);
  }, []);

  return {
    terminalHistory,
    executeCommand,
    clearHistory
  };
};