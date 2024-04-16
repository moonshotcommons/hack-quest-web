export enum LaunchPoolProjectStatus {
  UPCOMING = 'upcoming',
  FUELING = 'fueling',
  ALLOCATION = 'allocation',
  AIRDROP = 'airdrop',
  END = 'end'
}

export const LIVE_NOW_STATUS = [
  LaunchPoolProjectStatus.FUELING,
  LaunchPoolProjectStatus.ALLOCATION,
  LaunchPoolProjectStatus.AIRDROP
];
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
  launchPadID: bigint;
  fuelStart: Date;
  allocationStart: Date;
  airdropStart: Date;
  airdropEnd: Date;
  links: Record<string, string>;
  about: {};
  video: {};
  keyMtrics: [];
  tractions: [];
  status: LaunchPoolProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  userCount: number;
  totalFuel: number;
}

export interface ParticipateInfo {
  isParticipate: boolean;
  userLaunchProject: {
    id: string;
    totalFuel: number;
    inviteCount: number;
    inviteBy: string;
    rank: number;
    estimatedToken: number;
  };
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
  reward: number;
  sequence: number;
  duration: number;
  amount: number;
  status: 'stake';
  inviteCount: number;
  completed: boolean;
  claimed: boolean;
  launchProjectId: string;
  index: number;
}
