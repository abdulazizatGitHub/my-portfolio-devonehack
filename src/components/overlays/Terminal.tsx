import React, { useRef, useEffect, useState } from "react";
import { TerminalLine, LiveMetrics, PageId } from "@/types";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  history: TerminalLine[];
  input: string;
  setInput: (val: string) => void;
  onSubmit: (command: string) => void;
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (i: number) => void;
  liveMetrics: LiveMetrics;
  onNavigate?: (page: PageId) => void;        // ✅ Add
  onToggleMatrix?: () => void;                // ✅ Add
  onOpenPlayground?: () => void; 
}

export const Terminal: React.FC<TerminalProps> = ({
  isOpen,
  onClose,
  history,
  input,
  setInput,
  onSubmit,
  commandHistory,
  historyIndex,
  setHistoryIndex,
  liveMetrics,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl h-96 bg-black/90 border border-green-400 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-gray-900 border-b border-green-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="ml-4 text-green-400 font-mono">
              neural-terminal
            </span>
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

        {/* Content */}
        <div
          ref={terminalRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm"
        >
          {history.map((line, index) => (
            <div
              key={index}
              className={`mb-1 ${
                line.type === "input"
                  ? "text-green-400"
                  : line.type === "system"
                  ? "text-cyan-400"
                  : line.type === "error"
                  ? "text-red-400"
                  : "text-gray-300"
              }`}
            >
              <span className="text-gray-500 text-xs mr-3">
                {line.timestamp}
              </span>
              {line.content}
            </div>
          ))}

          {/* Input */}
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

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-900 border-t border-green-400/30 text-xs text-gray-400">
          <div className="flex items-center justify-between">
            <span>
              Neural Terminal v2.0 | Commands: help, navigate, matrix, playground,
              metrics
            </span>
            <span>Queue: {liveMetrics.taskQueue} tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};
