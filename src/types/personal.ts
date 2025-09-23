export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  image?: string;
  education: {
    degree: string;
    university: string;
    duration: string;
    cgpa: string;
  };
  languages: Array<{
    name: string;
    level: string;
  }>;
  social: {
    github: string;
    linkedin: string;
  };
}