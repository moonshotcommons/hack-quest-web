import { create } from 'zustand';

export type ModalType = 'claim' | 'mint' | 'username';

type ModalData = Record<string, any>;

interface Store {
  type: ModalType | null;
  open: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: (type?: ModalType) => void;
}

export const useCertificateModal = create<Store>((set) => ({
  type: null,
  data: {},
  open: false,
  onOpen: (type, data = {}) => set({ type, data, open: true }),
  onClose: (type) => {
    set({ type, open: false });
    // Reset data after 300ms to avoid flashing
    setTimeout(() => {
      set({ data: {} });
    }, 300);
  }
}));
