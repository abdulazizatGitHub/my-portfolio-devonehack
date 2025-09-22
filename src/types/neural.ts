export interface Node {
  id: string;
  x: number;
  y: number;
  type: 'skill' | 'project' | 'experience' | 'core' | 'Tool';
  label: string;
  connections: string[];
  active: boolean;
  description?: string;
  color?: string;
}

export interface NeuralConnection {
  from: string;
  to: string;
  strength: number;
  active: boolean;
}

export interface NeuralNetworkState {
  nodes: Node[];
  connections: NeuralConnection[];
  activeNode: string | null;
  animationSpeed: number;
}

export interface CanvasPoint {
  x: number;
  y: number;
}

export interface AnimationFrame {
  timestamp: number;
  progress: number;
}