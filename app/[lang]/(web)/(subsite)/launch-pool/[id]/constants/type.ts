import {
  FuelInfo,
  LaunchPoolProjectType,
  ParticipateInfo
} from '@/service/webApi/launchPool/type';
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

export interface LaunchInfoType extends LaunchPoolProjectType {
  participateInfo: ParticipateInfo | null;
  fuelsInfo: FuelInfo[];
}

export interface LaunchDetailContextType {
  launchInfo: any;
}

export const LaunchDetailContext = createContext<LaunchDetailContextType>({
  launchInfo: {} as LaunchInfoType
});
