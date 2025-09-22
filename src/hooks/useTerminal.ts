import { useState, useCallback } from 'react';
import { TerminalLine, PageId, LiveMetrics } from '@/types';
import terminalCommands from '@/data/terminalCommands.json';

interface UseTerminalProps {
  onNavigate: (page: PageId) => void;
  onToggleMatrix: () => void;
  onOpenPlayground: () => void;
  liveMetrics: LiveMetrics;
}

export const useTerminal = ({ onNavigate, onToggleMatrix, onOpenPlayground, liveMetrics }: UseTerminalProps) => {
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
    
    // Handle special commands
    if (cmd === 'clear') {
      setTerminalHistory([]);
      return null;
    }

    if (cmd.startsWith('navigate ')) {
      const page = cmd.replace('navigate ', '') as PageId;
      if (['home', 'about', 'projects', 'skills', 'contact'].includes(page)) {
        onNavigate(page);
        newHistory.push({
          type: 'output',
          content: `Navigated to ${page} page`,
          timestamp: new Date().toLocaleTimeString()
        });
        setTerminalHistory(newHistory);
        return { success: true };
      } else {
        newHistory.push({
          type: 'error',
          content: `Page "${page}" not found`,
          timestamp: new Date().toLocaleTimeString()
        });
      }
    }

    if (cmd === 'matrix') {
      onToggleMatrix();
      newHistory.push({
        type: 'output',
        content: 'Matrix mode toggled. Welcome to the neural reality.',
        timestamp: new Date().toLocaleTimeString()
      });
      setTerminalHistory(newHistory);
      return { success: true };
    }

    if (cmd === 'playground') {
      onOpenPlayground();
      const output = terminalCommands.playground?.output || ['Code playground activated!'];
      output.forEach(line => {
        newHistory.push({
          type: 'output',
          content: line,
          timestamp: new Date().toLocaleTimeString()
        });
      });
      setTerminalHistory(newHistory);
      return { success: true };
    }

    if (cmd === 'metrics') {
      const metricsOutput = [
        `CPU Usage: ${liveMetrics.cpuUsage.toFixed(1)}%`,
        `Memory: ${liveMetrics.memoryUsage.toFixed(1)}%`,
        `Neural Activity: ${liveMetrics.neuralActivity.toFixed(1)}%`,
        `Task Queue: ${liveMetrics.taskQueue} pending`
      ];
      
      metricsOutput.forEach(line => {
        newHistory.push({
          type: 'output',
          content: line,
          timestamp: new Date().toLocaleTimeString()
        });
      });
      setTerminalHistory(newHistory);
      return { success: true };
    }

    // Handle regular commands from JSON
    const commandData = (terminalCommands as any)[cmd];
    const output = commandData?.output || ['Command not found. Type "help" for available commands.'];

    output.forEach((line: string) => {
      newHistory.push({
        type: 'output',
        content: line,
        timestamp: new Date().toLocaleTimeString()
      });
    });
    
    setTerminalHistory(newHistory);
    return commandData;
  }, [terminalHistory, onNavigate, onToggleMatrix, onOpenPlayground, liveMetrics]);

  const clearHistory = useCallback(() => {
    setTerminalHistory([]);
  }, []);

  return {
    terminalHistory,
    executeCommand,
    clearHistory
  };
};