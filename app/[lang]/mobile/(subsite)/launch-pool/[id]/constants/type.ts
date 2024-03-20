import { createContext } from 'react';

export enum TitleTxt {
  OVERVIEW = 'Overview',
  TIME_LINE = 'Timeline',
  YOUR_FUELING_BOARD = 'Your Fueling Board',
  ABOUT = 'About',
  DEMO_VIDEO = 'Demo Video',
  KEY_METRICS = 'Key Metrics',
  TRACTIONS = 'Tractions'
}

export interface LaunchDetailContextType {
  launch: any;
}

export const LaunchDetailContext = createContext<LaunchDetailContextType>({
  launch: {}
});
