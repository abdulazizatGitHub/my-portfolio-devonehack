export interface SkillItem {
  name: string;
  level: number;
  years: number;
  description?: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
  icon?: string;
  color?: string;
}

export interface SkillProgress {
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
}