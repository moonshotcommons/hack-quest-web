import { HackathonType } from '@/service/webApi/resourceStation/type';
import { create } from 'zustand';

export interface HackathonAuditStateType {
  hackathon: HackathonType | null;
  setHackathon: (payload: HackathonType) => void;
}

export const useHackathonAuditStore = create<HackathonAuditStateType>()((set) => ({
  hackathon: null,
  setHackathon(payload) {
    set((state) => ({ hackathon: payload }));
  }
}));
