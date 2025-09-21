export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string; // matches your JSON
    status: 'completed' | 'in-progress' | 'planned'; // fixed typo
    category: "ai-ml" | "web-dev" | "research" | "mobile-dev" | "game-dev" | "other";
    highlights: string[];
    image?: string;
    featured?: boolean; // fixed typo
}
