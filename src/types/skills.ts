export interface SkillItem {
    name: string;
    level: string;
    years: number;
    keywords: string[];
    description?: string;
}

export interface SkillCategory {
    category: string;
    items: SkillItem[];
    icon?: string;
    color?: string;
}