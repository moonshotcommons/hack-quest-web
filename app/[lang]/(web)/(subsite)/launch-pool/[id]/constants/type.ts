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

export enum LaunchStatus {
  UN_FUELING = 'unFueling',
  FUELING = 'fueling',
  ALLOCATIONING = 'Allocationing',
  AIRDROPING = 'Airdroping',
  ENDED = 'ended'
}

export interface LaunchDetailContextType {
  launchInfo: {
    status: LaunchStatus;
    participate: Boolean;
    stakeManta: Boolean;
  };
}

export const LaunchDetailContext = createContext<LaunchDetailContextType>({
  launchInfo: {
    status: LaunchStatus.UN_FUELING,
    participate: false,
    stakeManta: false
  }
});
