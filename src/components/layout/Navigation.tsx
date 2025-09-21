import React from 'react';
import { Brain, Home, User, Briefcase, Code, Mail, Terminal, MessageSquare, Wallet } from 'lucide-react';
import { PageId } from '@/types';

interface NavigationProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  onTerminalToggle: () => void;
  onAiChatToggle: () => void;
  onCodePlaygroundToggle: () => void;
  onWalletToggle: () => void;
  walletConnected: boolean;
}

const navigationItems = [
  { id: 'home' as PageId, label: 'Home', icon: Home },
  { id: 'about' as PageId, label: 'About', icon: User },
  { id: 'projects' as PageId, label: 'Projects', icon: Briefcase },
  { id: 'skills' as PageId, label: 'Skills', icon: Code },
  { id: 'contact' as PageId, label: 'Contact', icon: Mail },
];

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onPageChange,
  onTerminalToggle,
  onAiChatToggle,
  onCodePlaygroundToggle,
  onWalletToggle,
  walletConnected
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-cyan-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Abdul Aziz
          </span>
          <span className="text-sm text-gray-400">AI/ML Engineer</span>
        </div>
        
        {/* Page Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === item.id
                  ? 'bg-cyan-600/30 border border-cyan-400/50 text-cyan-400'
                  : 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onTerminalToggle}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 transition-all"
          >
            <Terminal className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Terminal</span>
          </button>
          
          <button 
            onClick={onAiChatToggle}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-800/50 rounded-lg border border-purple-600/50 hover:bg-purple-700/50 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">AI Chat</span>
          </button>

          <button 
            onClick={onCodePlaygroundToggle}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-800/50 rounded-lg border border-cyan-600/50 hover:bg-cyan-700/50 transition-all"
          >
            <Code className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Playground</span>
          </button>
          
          <button 
            onClick={onWalletToggle}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
              walletConnected 
                ? 'bg-green-800/50 border-green-600/50 hover:bg-green-700/50' 
                : 'bg-orange-800/50 border-orange-600/50 hover:bg-orange-700/50'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">{walletConnected ? 'Connected' : 'Web3'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};