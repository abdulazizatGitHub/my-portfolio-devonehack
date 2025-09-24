'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { PageIndicator } from '@/components/layout/PageIndicator';
import { Terminal } from '@/components/overlays/Terminal';
import { AIChat } from '@/components/overlays/AIChat';
import { CodePlayground } from '@/components/overlays/codePlayground';
import { MatrixRain } from '@/components/overlays/MatrixRain';
import { SystemMetrics } from '@/components/ui/SystemMatrics';
import { HomePage } from '@/components/pages/HomePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { ProjectsPage } from '@/components/pages/ProjectPage';
import { SkillsPage } from '@/components/pages/SkillsPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { useLiveMetrics } from '@/hooks/useLiveMetrics';
import { useTerminal } from '@/hooks/useTerminal';
import { useMatrixEffect } from '@/hooks/useMatrixEffect';
import { useVisitorCount } from '@/hooks/useVisitorCount';
import { PageId } from '@/types';

const NeuralPortfolio: React.FC = () => {
  // State Management
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [codePlaygroundOpen, setCodePlaygroundOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");

  // Handlers
  const handlePageChange = (page: PageId) => setCurrentPage(page);
  const handleTerminalToggle = () => setTerminalOpen(prev => !prev);
  const handleAiChatToggle = () => setAiChatOpen(prev => !prev);
  const handleCodePlaygroundToggle = () => setCodePlaygroundOpen(prev => !prev);
  const handleWalletToggle = () => setWalletConnected(prev => !prev);

  // Custom Hooks
  const liveMetrics = useLiveMetrics();
  const { matrixMode, matrixCanvasRef, toggleMatrix } = useMatrixEffect();
  const visitorCount = useVisitorCount();
  
  // Terminal hook with proper props
  const { terminalHistory, executeCommand, clearHistory } = useTerminal({
    onNavigate: handlePageChange,
    onToggleMatrix: toggleMatrix,
    onOpenPlayground: handleCodePlaygroundToggle,
    liveMetrics,
    onClose: () => setTerminalOpen(false),
  });

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage liveMetrics={liveMetrics} visitorCount={visitorCount} />;
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'skills':
        return <SkillsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage liveMetrics={liveMetrics} visitorCount={visitorCount} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Matrix Rain Effect */}
      <MatrixRain 
        isActive={matrixMode} 
        canvasRef={matrixCanvasRef} 
      />

      {/* Navigation */}
      <Navigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onTerminalToggle={handleTerminalToggle}
        onAiChatToggle={handleAiChatToggle}
        onCodePlaygroundToggle={handleCodePlaygroundToggle}
        onWalletToggle={handleWalletToggle}
        walletConnected={walletConnected}
      />

      {/* Mobile Navigation */}
      <MobileNavigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* System Metrics */}
      <SystemMetrics liveMetrics={liveMetrics} />

      {/* Main Content */}
      <div className="relative z-10 pt-20 md:pt-20">
        {renderCurrentPage()}
      </div>

      {/* Overlays */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        history={terminalHistory}
        input={terminalInput}
        setInput={setTerminalInput}
        onSubmit={executeCommand}
        commandHistory={[]} 
        historyIndex={-1} 
        setHistoryIndex={() => {}}
        liveMetrics={liveMetrics}
      />

      <AIChat
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
      />

      <CodePlayground
        isOpen={codePlaygroundOpen}
        onClose={() => setCodePlaygroundOpen(false)}
        liveMetrics={liveMetrics}
      />

      {/* Web3 Wallet Status */}
      {walletConnected && (
        <div className="fixed bottom-4 left-4 bg-black/80 backdrop-blur-lg border border-green-400 rounded-lg p-4 z-40">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold">Web3 Connected</span>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Blockchain resume verification active
          </div>
        </div>
      )}

      {/* Page Transition Indicator */}
      <PageIndicator currentPage={currentPage} />
    </div>
  );
};

export default NeuralPortfolio;