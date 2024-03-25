export enum ProjectStatus {
  PENDING = 'pending',
  START = 'start',
  END = 'end'
}

export enum LaunchPoolProjectStatus {
  UPCOMING = 'upcoming',
  FUELING = 'fueling',
  ALLOCATION = 'allocation',
  AIRDROP = 'airdrop',
  END = 'end'
}

export interface LaunchPoolProjectType {
  id: string;
  name: string;
  lowStakingTime: number;
  lowStakingAmount: number;
  currentStakings: number;
  totalAirdropAmount: number;
  airdropRatio: number;
  chain: string;
  stakingAddress: string;
  launchedAddress: string;
  fuelStart: Date;
  allocationStart: Date;
  airdropStart: Date;
  airdropEnd: Date;
  links: Record<string, string>;
  about: {};
  video: {};
  keyMtrics: [];
  tractions: [];
  status: LaunchPoolProjectStatus | ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParticipateInfo {
  totalFuel: number;
  inviteCount: number;
  inviteBy: string;
  rank: number;
  estimatedToken: number;
}

export interface StakeInfo {
  duration: number;
  amount: number;
  status: 'stake';
}

export interface FuelInfo {
  id: string;
  name: string;
  type: string;
  extra: string;
  reward: string;
  sequence: number;
  duration: number;
  amount: number;
  status: 'stake';
  inviteCount: number;
  completed: boolean;
  claimed: boolean;
  launchProjectId: string;
}
