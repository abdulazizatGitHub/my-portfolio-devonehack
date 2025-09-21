'use client';

import React, { useState, useEffect } from 'react';
import { LiveMetrics } from '@/types';

interface SystemMetricsProps {
  liveMetrics: LiveMetrics;
}

export const SystemMetrics: React.FC<SystemMetricsProps> = ({ liveMetrics }) => {
  const [graphHeights, setGraphHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate random heights after the component mounts (client-only)
    const heights = Array.from({ length: 10 }, () => Math.random() * 100);
    setGraphHeights(heights);
  }, []);

  return (
    <div className="fixed top-24 right-4 z-30 bg-black/80 backdrop-blur-lg border border-gray-600 rounded-lg p-3 text-xs font-mono">
      <div className="text-gray-400 mb-2">SYSTEM STATUS</div>
      
      <div className="flex items-center space-x-2 mb-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400">CPU: {liveMetrics.cpuUsage.toFixed(1)}%</span>
      </div>
      
      <div className="flex items-center space-x-2 mb-1">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <span className="text-blue-400">MEM: {liveMetrics.memoryUsage.toFixed(1)}%</span>
      </div>
      
      <div className="flex items-center space-x-2 mb-1">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <span className="text-purple-400">AI: {liveMetrics.neuralActivity.toFixed(1)}%</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        <span className="text-orange-400">QUEUE: {liveMetrics.taskQueue}</span>
      </div>

      {/* Mini Performance Graph */}
      <div className="mt-3 pt-2 border-t border-gray-700">
        <div className="text-gray-500 text-xs mb-1">Performance</div>
        <div className="flex items-end space-x-1 h-6">
          {graphHeights.map((height, i) => (
            <div 
              key={i}
              className="w-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-sm"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
