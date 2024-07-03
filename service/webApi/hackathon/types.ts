export interface HackathonType {
  id: string;
  name: string;
  alias: string;
  creatorId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  progress: string[];
  info: Record<string, any> | null;
}
