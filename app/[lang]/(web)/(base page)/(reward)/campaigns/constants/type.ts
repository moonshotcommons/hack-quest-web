import { MantleType, TargetsType } from '@/service/webApi/campaigns/type';
import { createContext } from 'react';

export interface TabListType {
  label: string;
  value: string;
  count?: number;
}

export interface MantleContextType {
  mantle: MantleType;
  targetList: TargetsType[];
  campaignsClaim: () => void;
  campaignsTargetClaim: (ids: string[]) => void;
  loading: boolean;
  refresh: () => void;
  claimIds: string[];
}
export const MantleContext = createContext<MantleContextType>({
  mantle: {} as MantleType,
  targetList: [],
  campaignsClaim: () => {},
  campaignsTargetClaim: () => {},
  loading: false,
  refresh: () => {},
  claimIds: []
});
