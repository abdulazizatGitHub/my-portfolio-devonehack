export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  status: 'completed' | 'in-progress' | 'research';
  category: 'ai-ml' | 'web-dev' | 'research';
  highlights: string[];
  image?: string;
  featured?: boolean;
}

export interface ProjectFilter {
  category: string;
  status?: string;
  featured?: boolean;
}