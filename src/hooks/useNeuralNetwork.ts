import { useState, useEffect, useRef } from 'react';
import { Node } from '@/types';
import nodesData from '@/data/nodes.json';

export const useNeuralNetwork = (activeNode: string | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const validNodes: Node[] = nodesData.filter(
        n => ['core', 'skill', 'project', 'experience', 'tool'].includes(n.type)
    ) as Node[];

  const [nodes] = useState<Node[]>(validNodes);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 + Math.sin(time * 0.02) * 0.2})`;
      ctx.lineWidth = 2;
      
      for (const node of nodes) {
        const nodeX = (node.x / 100) * canvas.width;
        const nodeY = (node.y / 100) * canvas.height;
        
        for (const connectionId of node.connections) {
          const connectedNode = nodes.find(n => n.id === connectionId);
          if (connectedNode) {
            const connX = (connectedNode.x / 100) * canvas.width;
            const connY = (connectedNode.y / 100) * canvas.height;
            
            ctx.beginPath();
            ctx.moveTo(nodeX, nodeY);
            ctx.lineTo(connX, connY);
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes
      for (const node of nodes) {
        const nodeX = (node.x / 100) * canvas.width;
        const nodeY = (node.y / 100) * canvas.height;
        const isActive = activeNode === node.id;
        const radius = isActive ? 12 : 8;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, radius * 2);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${isActive ? 0.8 : 0.4})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Node core
        ctx.fillStyle = node.color || (
          node.type === 'core' ? '#10b981' : 
          node.type === 'skill' ? '#3b82f6' :
          node.type === 'project' ? '#8b5cf6' : '#f59e0b'
        );
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      time++;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeNode, nodes]);

  const findNearestNode = (x: number, y: number) => {
    let closestNode = null;
    let minDistance = Infinity;
    
    for (const node of nodes) {
      const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
      if (distance < 15 && distance < minDistance) {
        minDistance = distance;
        closestNode = node;
      }
    }
    
    return closestNode;
  };

  return {
    canvasRef,
    nodes,
    findNearestNode
  };
};