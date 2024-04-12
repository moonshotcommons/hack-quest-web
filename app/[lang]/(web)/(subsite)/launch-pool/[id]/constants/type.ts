import { FuelInfo, LaunchPoolProjectType, ParticipateInfo } from '@/service/webApi/launchPool/type';
import { createContext } from 'react';

export enum TitleTxt {
  OVERVIEW = 'overview',
  TIME_LINE = 'timeline',
  YOUR_FUELING_BOARD = 'yourFuelingBoard',
  ABOUT = 'about',
  DEMO_VIDEO = 'demoDideo',
  KEY_METRICS = 'keyMetrics',
  TRACTIONS = 'tractions'
}

export interface LaunchInfoType extends LaunchPoolProjectType {
  participateInfo: ParticipateInfo | null;
  fuelsInfo: FuelInfo[];
  isParticipate: boolean;
  isStake: boolean;
  isJoined: boolean;
  symbol: string;
}

export interface LaunchDetailContextType {
  launchInfo: LaunchInfoType;
  refreshLaunchInfo: VoidFunction;
  refreshFuel: VoidFunction;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  joinWaitlist: VoidFunction;
  participateNow: VoidFunction;
  handleStake: (amount: string) => void;
  handleUnStake: () => void;
  handleClaimToken: () => void;
}

export const LaunchDetailContext = createContext<LaunchDetailContextType>({
  launchInfo: {} as LaunchInfoType,
  refreshLaunchInfo: () => {},
  refreshFuel: () => {},
  loading: false,
  setLoading: () => {},
  joinWaitlist: () => {},
  participateNow: () => {},
  handleStake: () => {},
  handleUnStake: () => {},
  handleClaimToken: () => {}
});
