export type Language = 'es' | 'en';

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string; // lucide icon name
  description?: string;
  color: string; // custom neon theme (pink, cyan, purple, lime)
  active: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  image?: string;
  glowColor: string;
}

export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'design';
  svgPath: string; // customized clean SVG path / code
  color: string; // hex or tailwind text-color
}

export interface Milestone {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  bullets: string[];
  tags: string[];
}

export interface CyberdeckConfig {
  username: string;
  handle: string;
  tagline: string;
  longBio: string;
  avatarUrl: string;
  primaryNeon: string;
  secondaryNeon: string;
  soundEnabled: boolean;
  scanlinesEnabled: boolean;
  glitchFrequency: number;
  links: SocialLink[];
  projects: PortfolioProject[];
  milestones: Milestone[];
  techIds: string[];
}
