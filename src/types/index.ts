export * from './project';
export * from './skill';
export * from './terminal';
export * from './neural';

export interface LiveMetrics {
  cpuUsage: number;
  memoryUsage: number;
  neuralActivity: number;
  taskQueue: number;
}

export interface AppState {
  currentPage: string;
  terminalOpen: boolean;
  aiChatOpen: boolean;
  codePlaygroundOpen: boolean;
  walletConnected: boolean;
  matrixMode: boolean;
  visitorCount: number;
  liveMetrics: LiveMetrics;
}

export type PageId = 'home' | 'about' | 'projects' | 'skills' | 'contact';