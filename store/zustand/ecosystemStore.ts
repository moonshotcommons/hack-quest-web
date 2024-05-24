import { EcosystemType } from '@/service/webApi/ecosystem/type';
import { create } from 'zustand';

export interface EcosystemStateType {
  ecosystems: EcosystemType[];
  setEcosystem: (payload: EcosystemType[]) => void;
}

export const ecosystemStore = create<EcosystemStateType>()((set) => ({
  ecosystems: [],
  setEcosystem(payload) {
    set((state) => ({ ecosystems: payload }));
  }
}));
