// src/components/overlays/AIChat.tsx

import React from 'react';
import { Brain, X, MessageSquare, Zap, Code } from 'lucide-react';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-black/90 backdrop-blur-lg border border-purple-400 rounded-lg z-50">
      <div className="flex items-center justify-between p-3 bg-purple-900/50 border-b border-purple-400">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="text-purple-400 font-semibold">AI Assistant</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="h-80 flex items-center justify-center text-center p-6">
        <div>
          <div className="relative mb-6">
            <Brain className="w-16 h-16 text-purple-400 mx-auto animate-pulse" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">Neural AI Assistant</h3>
          <p className="text-gray-300 mb-4 text-sm">
            Intelligent conversation system ready to discuss Abdul's projects, research, and expertise.
          </p>
          
          <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-400/20 mb-4">
            <div className="text-xs text-purple-400 font-mono mb-2 flex items-center">
              <Code className="w-3 h-3 mr-1" />
              Integration Ready:
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <div>POST /api/ai-chat</div>
              <div>Status: Awaiting Python backend</div>
              <div>Features: NLP • Context-aware • Project insights</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-900/50 rounded p-2 border border-gray-700">
              <MessageSquare className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-cyan-400 font-semibold">Ask about</div>
              <div className="text-gray-400">Projects & Research</div>
            </div>
            
            <div className="bg-gray-900/50 rounded p-2 border border-gray-700">
              <Brain className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <div className="text-purple-400 font-semibold">Discuss</div>
              <div className="text-gray-400">AI/ML Topics</div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            Connect your Python AI backend to enable conversations
          </div>
        </div>
      </div>
    </div>
  );
};