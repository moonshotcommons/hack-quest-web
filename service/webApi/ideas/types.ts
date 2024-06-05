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
  user: User;
  ecosystem: Ecosystem;
  votes: Vote[];
  isLike: boolean;
}

export interface User {
  id: string;
  nickname: string;
}

export interface Ecosystem {
  id: string;
  name: string;
}

export interface Vote {
  ideaBankId: string;
  userId: string;
  createdAt: string;
}
