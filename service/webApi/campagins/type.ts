export interface MantleType {
  id: string;
  name: string;
  title: string;
  description: string;
  progress: [number, number];
  sequence: number;
  completed: boolean;
  claimed: boolean;
  certificate: {
    title: string;
    description: string;
    image: string;
  };
}

export enum TargetType {
  COURSE = 'COMPLETE_COURSE',
  LEARNING_TRACK = 'COMPLETE_LEARNING_TRACK',
  TWITTER = 'FOLLOW_TWITTER',
  DISCORD = 'JOIN_DISCORD'
}
export interface TargetsType {
  id: string;
  campaignId: string;
  name: string;
  title: string;
  progress: [number, number];
  sequence: number;
  completed: boolean;
  claimed: boolean;
  reward: number;
  type: TargetType;
}
