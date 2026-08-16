export type SceneId = 
  | 'hero' 
  | 'about' 
  | 'skills' 
  | 'experience' 
  | 'projects' 
  | 'dataviz' 
  | 'leadership' 
  | 'education' 
  | 'contact';

export interface Project {
  id: string;
  title: string;
  category: 'ML' | 'NLP' | 'Analytics' | 'Web' | 'All';
  shortDesc: string;
  technologies: string[];
  visualType: 'resume' | 'churn' | 'fraud' | 'sales' | 'clustering' | 'attrition' | 'car' | 'iris' | 'spam' | 'unemployment';
  problem: string;
  approach: string;
  modelDetails: string;
  results: string[];
  keyInsights: string[];
  githubUrl: string;
  demoType?: string;
  metrics?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Virtual' | 'Remote' | 'On-site' | 'Hybrid';
  highlights: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 1-100
    description: string;
  }[];
}

export interface LeadershipRole {
  id: string;
  role: string;
  organization: string;
  impactMetric: string;
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  grade: string;
  period: string;
  details: string;
}

export interface Certification {
  title: string;
  issuer: string;
  status: 'Completed' | 'In Progress';
  year: string;
  credentialId?: string;
}
