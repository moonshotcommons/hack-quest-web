import { create } from 'zustand';

export interface HackathonAuditStateType {
  hackathonAuditName: string;
  setHackathonAuditName: (payload: string) => void;
}

export const useHackathonAuditStore = create<HackathonAuditStateType>()((set) => ({
  hackathonAuditName: '',
  setHackathonAuditName(payload) {
    set((state) => ({ hackathonAuditName: decodeURIComponent(payload) }));
  }
}));
