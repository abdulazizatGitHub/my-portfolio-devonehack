export interface SkillItem {
    name: string;
    level: number;        // match your JSON
    years: number;
    keywords?: string[];  // optional, since your JSON does not include it
    description?: string;
}

export interface SkillCategory {
    category: string;
    items: SkillItem[];
    icon?: string;
    color?: string;
}
