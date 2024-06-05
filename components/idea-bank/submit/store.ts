import webApi from '@/service';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';

type Store = {
  open: boolean;
  step: number;
  values: Record<string, any>;
  onOpen: () => void;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  setValues: (values: Record<string, any>) => void;
};

export const useSubmitModal = create<Store>((set) => ({
  open: false,
  step: 0,
  values: {},
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
  onNext: () => set((state) => ({ step: state.step + 1 })),
  onBack: () => set((state) => ({ step: state.step - 1 })),
  setValues: (values) => set((state) => ({ values: { ...state.values, ...values } }))
}));

export function useIdeas() {
  const tracks = useQuery({
    queryKey: ['tracks'],
    staleTime: Infinity,
    queryFn: () => webApi.resourceStationApi.getProjectTracksDict(),
    select: (data) => data.map((item) => ({ label: item, value: item }))
  });

  const ecosystems = useQuery({
    queryKey: ['ecosystems'],
    staleTime: Infinity,
    queryFn: () => webApi.ecosystemApi.getEcosystems(),
    select: (data) => data.map((item) => ({ label: item.name?.split(' ')?.[0], value: item.id }))
  });

  return {
    tracks: tracks.data,
    ecosystems: ecosystems.data
  };
}
