export interface PersonalDetails {
  name: string;
  role: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  resumeUrl?: string;
  interests?: string[];
  languages?: { name: string; level: string }[];
  availability?: "open" | "busy" | "not-looking";
}
