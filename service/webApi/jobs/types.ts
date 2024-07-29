export interface Job {
  id: string;
  userId: string;
  name: string;
  companyName: string;
  companyLogo: string;
  website: string;
  workMode: string;
  location: string | null;
  workType: string;
  tags: string[];
  description: Record<string, any>;
  contact: Record<string, string>;
  minSalary: number;
  maxSalary: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
}
