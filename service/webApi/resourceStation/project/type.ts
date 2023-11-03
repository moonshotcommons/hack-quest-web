export type ProjectType = {
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
  thumbnail: string;
};

export interface ProjectDataType {
  data: ProjectType[];
  total: number;
}
