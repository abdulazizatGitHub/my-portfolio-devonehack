import React, { useState } from 'react';
import { Activity, Code, GitBranch, Zap, Cpu, Eye, Globe } from 'lucide-react';
import { NeuralCanvas } from '@/components/ui/NeuralCanvas';
import { LiveMetrics } from '@/types/index';

interface HomePageProps {
  liveMetrics: LiveMetrics;
  visitorCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({ liveMetrics, visitorCount }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleNodeHover = (nodeId: string | null) => {
    setActiveNode(nodeId);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Neural Network Canvas */}
      <NeuralCanvas 
        activeNode={activeNode}
        onNodeHover={handleNodeHover}
      />
      
      <div className="text-center z-20 relative">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Abdul Aziz
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-6">AI/ML Engineer</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Pioneering the future with GANs, Computer Vision, and Deep Learning. 
            Building intelligent systems that bridge the gap between imagination and reality.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center space-x-2 px-4 py-2 bg-black/40 rounded-full border border-cyan-400/30">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Neural Networks</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-black/40 rounded-full border border-purple-400/30">
            <Eye className="w-5 h-5 text-purple-400" />
            <span>Computer Vision</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-black/40 rounded-full border border-blue-400/30">
            <Globe className="w-5 h-5 text-blue-400" />
            <span>Full Stack Web Development</span>
          </div>
        </div>

        {/* Live Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Neural Efficiency */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-8 h-8 text-cyan-400" />
              <span className="text-lg font-semibold">Neural Efficiency</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              {liveMetrics.neuralActivity.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Live AI Processing</div>
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${liveMetrics.neuralActivity}%` }}
              ></div>
            </div>
          </div>

          {/* Code Commits */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="w-8 h-8 text-purple-400" />
              <span className="text-lg font-semibold">Code Commits</span>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-2">1,247</div>
            <div className="text-sm text-gray-400">This Year</div>
            <div className="mt-3 flex items-center space-x-1">
              {Array.from({length: 7}).map((_, i) => (
                <div key={i} className={`w-2 h-6 rounded ${i < 5 ? 'bg-purple-400' : 'bg-gray-600'}`}></div>
              ))}
            </div>
          </div>

          {/* Live Visitors */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-green-400/50 transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <GitBranch className="w-8 h-8 text-green-400" />
              <span className="text-lg font-semibold">Live Visitors</span>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">
              {visitorCount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Neural Connections</div>
            <div className="mt-3 flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* System Load */}
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-orange-400/50 transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-orange-400" />
              <span className="text-lg font-semibold">System Load</span>
            </div>
            <div className="text-3xl font-bold text-orange-400 mb-2">
              {liveMetrics.cpuUsage.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-400">CPU Utilization</div>
            <div className="mt-3 grid grid-cols-8 gap-1">
              {Array.from({length: 8}).map((_, i) => (
                <div 
                  key={i}
                  className={`h-4 rounded ${i < (liveMetrics.cpuUsage / 12.5) ? 'bg-orange-400' : 'bg-gray-600'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};