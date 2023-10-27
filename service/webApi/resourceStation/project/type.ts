export interface PType {
  id: string;
  name: string;
  description: string;
  video: string;
  introduction: string;
  team: string;
  hackathonId: string;
  hackathonName: string;
  tracks: string[];
  featured: boolean;
  apolloDay: boolean;
}

export type ProjectType = Partial<PType>;

export interface ProjectDataType {
  data: ProjectType[];
  total: number;
}
