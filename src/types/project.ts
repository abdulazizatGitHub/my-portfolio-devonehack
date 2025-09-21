export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    github?: string;
    link?: string;
    ststus: 'completed' | 'in-progress' | 'planned';
    category: "ai-ml" | "web-dev" | "research" | "mobile-dev" | "game-dev" | "other";
    highlights: string[];
    image?: string;
    feathured?: boolean; 
}
