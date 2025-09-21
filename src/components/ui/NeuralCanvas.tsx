import React from 'react';
import { useNeuralNetwork } from '@/hooks/useNeuralNetwork';

interface NeuralCanvasProps {
  activeNode: string | null;
  onNodeHover: (nodeId: string | null) => void;
}

export const NeuralCanvas: React.FC<NeuralCanvasProps> = ({ activeNode, onNodeHover }) => {
  const { canvasRef, nodes, findNearestNode } = useNeuralNetwork(activeNode);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const closestNode = findNearestNode(x, y);
    onNodeHover(closestNode?.id || null);
  };

  const activeNodeData = nodes.find(n => n.id === activeNode);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => onNodeHover(null)}
      />
      
      {/* Node Information Tooltip */}
      {activeNodeData && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
          <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 border border-white/20 max-w-sm">
            <h3 className="font-bold text-cyan-400 mb-2">
              {activeNodeData.label}
            </h3>
            <p className="text-sm text-gray-300">
              {activeNodeData.description || 'Neural node activated'}
            </p>
            <div className="mt-2 text-xs text-gray-400">
              Type: {activeNodeData.type} | Connections: {activeNodeData.connections.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};