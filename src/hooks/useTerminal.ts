import { useState, useCallback, useEffect } from "react";
import { TerminalLine, PageId, LiveMetrics } from "@/types";
import { runCommand } from "@/lib/commands";

interface UseTerminalProps {
  onNavigate: (page: PageId) => void;
  onToggleMatrix: () => void;
  onOpenPlayground: () => void;
  liveMetrics: LiveMetrics;
  onClose: () => void;
}

export const useTerminal = (props: UseTerminalProps) => {
  const { onNavigate, onToggleMatrix, onOpenPlayground, liveMetrics, onClose } = props;

  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("terminalHistory"): null;
    return saved
      ? JSON.parse(saved)
      : [
          { type: "system", content: "🧠 Neural Interface v2.0 initialized...", timestamp: new Date().toLocaleTimeString() },
          { type: "system", content: "🚀 AI/ML Engineer portfolio loaded", timestamp: new Date().toLocaleTimeString() },
          { type: "output", content: 'Type "help" for available commands', timestamp: new Date().toLocaleTimeString() },
        ];
  });

  // persist history
  useEffect(() => {
    localStorage.setItem("terminalHistory", JSON.stringify(terminalHistory));
  }, [terminalHistory]);

  const executeCommand = useCallback(
    async (input: string) => {
      const newHistory = [...terminalHistory];
      newHistory.push({ type: "input", content: `> ${input}`, timestamp: new Date().toLocaleTimeString() });

      const result = await runCommand(input, {
        setHistory: setTerminalHistory,
        onNavigate,
        onToggleMatrix,
        onOpenPlayground,
        onClose,
        liveMetrics,
      });

      if (input.trim() === "clear") {
      setTerminalHistory([]); // ✅ wipe history fully
      localStorage.removeItem("terminalHistory");
      return;
    }

      if (result) {
        newHistory.push({
          type: result.type,
          content: result.content,
          timestamp: new Date().toLocaleTimeString(),
        });
      }

      setTerminalHistory(newHistory);
    },
    [terminalHistory, onNavigate, onToggleMatrix, onOpenPlayground, onClose, liveMetrics]
  );

  const clearHistory = useCallback(() => {
    setTerminalHistory([]);
    localStorage.removeItem("terminalHistory");
  }, []);

  return { terminalHistory, executeCommand, clearHistory };
};
