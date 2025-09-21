export interface Node {
  id: string;
  x: number;
  y: number;
  type: 'skill' | 'project' | 'experience' | 'core' | 'tool';
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