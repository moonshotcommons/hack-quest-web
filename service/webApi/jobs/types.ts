export interface Job {
  id: string;
  userId: string;
  name: string;
  companyName: string;
  companyLogo: string;
  website: string;
  workMode: 'REMOTE' | 'ONSITE';
  location: string | null;
  workType: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP';
  tags: string[];
  description: { type: string; content: object };
  contact: Record<string, string>;
  minSalary: number;
  maxSalary: number;
  currency: string;
  status: 'open' | 'closed';
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
}
