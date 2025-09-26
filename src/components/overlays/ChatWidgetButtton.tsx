"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { ChatWidget } from "./ChatWidget";

interface ChatWidgetButtonProps {
  onClick: () => void;
}

export const ChatWidgetButton: React.FC<ChatWidgetButtonProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={onClick}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 
        text-white shadow-lg flex items-center justify-center z-50 hover:scale-105 transition"
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && <ChatWidget isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};
