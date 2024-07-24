import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import { create } from 'zustand';

export interface HackathonAuditStateType {
  hackathon: SimpleHackathonInfo;
  setHackathon: (payload: SimpleHackathonInfo) => void;
}

export const useHackathonAuditStore = create<HackathonAuditStateType>()((set) => ({
  hackathon: {} as SimpleHackathonInfo,
  setHackathon(payload) {
    set((state) => ({ hackathon: payload }));
  }
}));
