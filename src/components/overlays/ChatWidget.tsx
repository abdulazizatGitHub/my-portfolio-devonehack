"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Loader2, Minimize2, Maximize2, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi! I'm Sarah, Abdul's AI assistant. Ask me anything about Abdul.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Send message to backend API
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.reply || "⚠️ Sorry, I couldn’t generate a response.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "⚠️ There was an error connecting to the AI backend.",
          sender: "bot",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const renderMessage = (msg: Message) => {
    const isUser = msg.sender === "user";
    return (
      <motion.div
        key={msg.id}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        layout
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
      >
        {!isUser && (
          <div className="relative w-8 h-8 mr-2">
            <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        <div
          className={`max-w-[75%] px-3 py-2 rounded-xl text-sm leading-relaxed shadow-md ${
            isUser
              ? "bg-purple-600 text-white"
              : "bg-gray-800/80 text-gray-200 border border-purple-400/20"
          }`}
        >
          {msg.text}
        </div>

        {isUser && (
          <div className="ml-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shadow-lg">
            <User className="w-4 h-4 text-white" />
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-20 right-6 w-full max-w-sm sm:max-w-md md:w-96 
          bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col z-50 border border-purple-400/30"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-purple-400/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-md">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-purple-300">Sarah (AI Assistant)</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMinimized((prev) => !prev)}
                className="text-gray-400 hover:text-white"
              >
                {minimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>
              <button onClick={onClose} className="text-gray-400 hover:text-red-400">
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          {!minimized ? (
            <>
              <div className="flex-1 p-4 overflow-y-auto space-y-2 custom-scrollbar max-h-[50vh]">
                {messages.map(renderMessage)}
                {typing && (
                  <div className="flex items-center space-x-2 text-purple-300 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center border-t border-purple-400/20 p-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 
                  focus:outline-none px-2"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="ml-2 p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition disabled:opacity-40"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center py-6 text-sm text-gray-400">
              <span className="italic">Chat minimized • click expand to continue</span>
            </div>
          )}

          {/* Footer */}
          <div className="text-center py-1 text-xs text-gray-500 bg-black/40 flex items-center justify-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Powered by <span className="text-purple-400 ml-1">Neural AI</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
