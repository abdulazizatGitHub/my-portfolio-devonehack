import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine, LiveMetrics, PageId } from '@/types';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  history: TerminalLine[];
  onExecuteCommand: (command: string) => any;
  onClearHistory: () => void;
  onNavigate: (page: PageId) => void;
  onToggleMatrix: () => void;
  onOpenPlayground: () => void;
  liveMetrics: LiveMetrics;
}

export const Terminal: React.FC<TerminalProps> = ({
  isOpen,
  onClose,
  history,
  onExecuteCommand,
  onClearHistory,
  onNavigate,
  onToggleMatrix,
  onOpenPlayground,
  liveMetrics
}) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    // Handle special commands
    if (trimmedCommand.startsWith('navigate ')) {
      const page = trimmedCommand.replace('navigate ', '') as PageId;
      if (['home', 'about', 'projects', 'skills', 'contact'].includes(page)) {
        onNavigate(page);
        onClose();
        return;
      }
    }

    if (trimmedCommand === 'matrix') {
      onToggleMatrix();
    }

    if (trimmedCommand === 'playground') {
      onOpenPlayground();
    }

    if (trimmedCommand === 'clear') {
      onClearHistory();
      setInput('');
      return;
    }

    if (trimmedCommand === 'metrics') {
      // Handle metrics command with live data
      const metricsOutput = [
        `CPU Usage: ${liveMetrics.cpuUsage.toFixed(1)}%`,
        `Memory: ${liveMetrics.memoryUsage.toFixed(1)}%`,
        `Neural Activity: ${liveMetrics.neuralActivity.toFixed(1)}%`,
        `Task Queue: ${liveMetrics.taskQueue} pending`
      ];
      
      // Manually add metrics to history
      const newHistory = [...history];
      newHistory.push({
        type: 'input',
        content: `> ${trimmedCommand}`,
        timestamp: new Date().toLocaleTimeString()
      });
      
      metricsOutput.forEach(line => {
        newHistory.push({
          type: 'output',
          content: line,
          timestamp: new Date().toLocaleTimeString()
        });
      });
    } else {
      onExecuteCommand(trimmedCommand);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl h-96 bg-black/90 border border-green-400 rounded-lg overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-3 bg-gray-900 border-b border-green-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="ml-4 text-green-400 font-mono">neural-terminal</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span>CPU: {liveMetrics.cpuUsage.toFixed(1)}%</span>
            <span>MEM: {liveMetrics.memoryUsage.toFixed(1)}%</span>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white ml-4"
            >
              ×
            </button>
          </div>
        </div>
        
        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm"
        >
          {history.map((line, index) => (
            <div key={index} className={`mb-1 ${
              line.type === 'input' ? 'text-green-400' : 
              line.type === 'system' ? 'text-cyan-400' :
              line.type === 'error' ? 'text-red-400' : 'text-gray-300'
            }`}>
              <span className="text-gray-500 text-xs mr-3">{line.timestamp}</span>
              {line.content}
            </div>
          ))}
          
          {/* Input Line */}
          <div className="flex items-center mt-2">
            <span className="text-green-400 mr-2">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-green-400"
              placeholder="Enter command... (type 'help' for commands)"
            />
            <span className="text-green-400 animate-pulse">█</span>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2 bg-gray-900 border-t border-green-400/30 text-xs text-gray-400">
          <div className="flex items-center justify-between">
            <span>Neural Terminal v2.0 | Commands: help, navigate, matrix, playground, metrics</span>
            <span>Queue: {liveMetrics.taskQueue} tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};