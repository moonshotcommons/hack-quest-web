import { create } from 'zustand';

export type ModalType = 'profile' | 'onboarding' | 'experience' | 'hackathon';

type Store = {
  open: boolean;
  type: ModalType | null;
  onOpen: (type: ModalType) => void;
  onClose: (type?: ModalType) => void;
};

export const useModal = create<Store>((set) => ({
  open: false,
  type: null,
  onOpen: (type: ModalType) => set({ open: true, type }),
  onClose: () => set({ open: false, type: null })
}));
