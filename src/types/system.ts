export interface SystemStatus {
  online: boolean;
  lastUpdated: string;
  version: string;
  uptime: number;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}
