export interface Idea {
  id: string;
  userId: string;
  ecosystemId: string;
  name: string;
  track: string;
  solve: string;
  solution: string;
  inspiration: string;
  otherInfo?: string;
  contractKey: string;
  contractValue: string;
  teamUp: boolean;
  vote: number;
  createdAt: string;
  updatedAt: string;
}
