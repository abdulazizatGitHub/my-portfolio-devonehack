// src/components/overlays/CodePlayground.tsx

import React from 'react';
import { X, Play, Code, Brain } from 'lucide-react';
import { LiveMetrics } from '@/types';

interface CodePlaygroundProps {
  isOpen: boolean;
  onClose: () => void;
  liveMetrics: LiveMetrics;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ isOpen, onClose, liveMetrics }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-6xl h-5/6 bg-black/90 border border-cyan-400 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-3 bg-gray-900 border-b border-cyan-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="ml-4 text-cyan-400 font-mono">neural-playground</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Code Editor */}
          <div className="p-4 bg-gray-900 border-r border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-cyan-400 font-semibold flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                GAN Training Demo - Abdul's Research
              </h3>
              <button className="flex items-center space-x-2 px-3 py-1 bg-green-600/20 text-green-400 rounded border border-green-600/30 hover:bg-green-600/30 transition-all">
                <Play className="w-4 h-4" />
                <span className="text-sm">Run</span>
              </button>
            </div>
            
            <div className="bg-black rounded-lg p-4 font-mono text-sm h-80 overflow-y-auto">
              <div className="text-gray-500 mb-2"># Dynamic Class-Weighted GAN Implementation</div>
              <div className="text-cyan-400">import torch</div>
              <div className="text-cyan-400">import torch.nn as nn</div>
              <div className="text-purple-400">from</div> <span className="text-cyan-400">torch.utils.data</span> <span className="text-purple-400">import</span> <span className="text-cyan-400">DataLoader</span>
              <br />
              <div className="text-purple-400">class</div> <span className="text-yellow-400">DCSWGAN</span><span className="text-white">(</span><span className="text-yellow-400">nn.Module</span><span className="text-white">):</span>
              <div className="ml-4 text-purple-400">def</div> <span className="text-blue-400">__init__</span><span className="text-white">(self, latent_dim=100, num_classes=2):</span>
              <div className="ml-8 text-purple-400">super</div><span className="text-white">().__init__()</span>
              <div className="ml-8 text-white">self.latent_dim = latent_dim</div>
              <div className="ml-8 text-white">self.num_classes = num_classes</div>
              <br />
              <div className="ml-4 text-gray-500"># Dynamic Class-Weighted Loss Function</div>
              <div className="ml-4 text-purple-400">def</div> <span className="text-blue-400">adaptive_loss</span><span className="text-white">(self, real_output, fake_output, labels):</span>
              <div className="ml-8 text-gray-500"># Calculate class weights dynamically</div>
              <div className="ml-8 text-white">class_counts = torch.bincount(labels)</div>
              <div className="ml-8 text-white">total_samples = labels.size(0)</div>
              <div className="ml-8 text-white">class_weights = total_samples / (len(class_counts) * class_counts.float())</div>
              <br />
              <div className="ml-8 text-gray-500"># Adaptive weighting based on performance</div>
              <div className="ml-8 text-white">minority_weight = torch.exp(-torch.mean(real_output))</div>
              <div className="ml-8 text-white">weighted_loss = minority_weight * self.criterion(real_output, fake_output)</div>
              <div className="ml-8 text-purple-400">return</div> <span className="text-white">weighted_loss</span>
              <br />
              <div className="text-gray-500"># Research Results: 94.8% accuracy on UNSW-NB15 dataset</div>
              <div className="text-gray-500"># Improved minority-class recall by 23%</div>
              <div className="animate-pulse text-green-400">Model training complete ✓</div>
            </div>
          </div>

          {/* Output/Visualization */}
          <div className="p-4 bg-gray-800">
            <h3 className="text-purple-400 font-semibold mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Real-time Neural Output
            </h3>
            <div className="bg-black rounded-lg p-4 h-80 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="grid grid-cols-8 gap-2 mb-6">
                    {Array.from({length: 64}).map((_, i) => (
                      <div 
                        key={i}
                        className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded animate-pulse"
                        style={{
                          animationDelay: `${i * 50}ms`,
                          animationDuration: '2s'
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="text-cyan-400 font-mono text-sm mb-4">Neural Network Architecture</div>
                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <div className="text-2xl font-bold text-green-400">{liveMetrics.neuralActivity.toFixed(1)}%</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">{liveMetrics.taskQueue}</div>
                      <div className="text-xs text-gray-400">Epoch</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">0.23</div>
                      <div className="text-xs text-gray-400">Loss</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Training Log */}
              <div className="bg-gray-900 rounded p-3 font-mono text-xs max-h-32 overflow-y-auto">
                <div className="text-green-400">[2024-12-21 15:30:42] Training started...</div>
                <div className="text-blue-400">[2024-12-21 15:30:43] Loading UNSW-NB15 dataset</div>
                <div className="text-yellow-400">[2024-12-21 15:30:44] Epoch 1/100 - Loss: 0.847</div>
                <div className="text-yellow-400">[2024-12-21 15:30:45] Epoch 2/100 - Loss: 0.623</div>
                <div className="text-green-400">[2024-12-21 15:30:46] Minority class recall improved: +15%</div>
                <div className="text-cyan-400 animate-pulse">[2024-12-21 15:30:47] Neural processing active...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};