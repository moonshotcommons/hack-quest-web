import { create } from 'zustand';

export enum CreationHandle {
  UN_SAVE = 'unSave',
  ON_SAVE = 'onSave',
  ON_NEXT = 'onNext'
}

export interface UgcCreationStateType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handle: CreationHandle;
  setHandle: (save: CreationHandle) => void;
}

export const useUgcCreationStore = create<UgcCreationStateType>()((set) => ({
  loading: false,
  setLoading(loading) {
    set(() => ({ loading }));
  },
  handle: CreationHandle.UN_SAVE,
  setHandle(handle) {
    set(() => ({ handle }));
  }
}));
