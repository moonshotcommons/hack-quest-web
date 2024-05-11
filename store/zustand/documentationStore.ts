import { create } from 'zustand';

interface DocumentationData {
  id?: string | number | null;
  placement?: 'center' | 'bottom-right';
}

const defaultData: DocumentationData = {
  id: null,
  placement: 'bottom-right'
};

interface DocumentationState {
  open: boolean;
  data: DocumentationData;
  onOpen: (data?: DocumentationData) => void;
  onClose: () => void;
  setData: (data: DocumentationData) => void;
}

export const useDocumentation = create<DocumentationState>((set) => ({
  open: false,
  data: {},
  onOpen: (data = defaultData) => set({ open: true, data }),
  onClose: () => set({ open: false, data: {} }),
  setData: (data) => set((state) => ({ ...state, data }))
}));
