import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { useMutation, useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import { Idea } from '@/service/webApi/ideas/types';
import { useUserStore } from '@/store/zustand/userStore';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

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

export function useUpvoteIdea(props: Idea) {
  const { id, isLike, user } = props;

  const router = useRouter();

  const { userInfo, setAuthModalOpen } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen
    }))
  );

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => webApi.ideaApi.upvoteIdea(id)
  });

  function upvoteIdea(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (isLike) return;

    if (!userInfo?.id) {
      message.warning('Please login first');
      setAuthModalOpen(true);
      return;
    }

    if (user?.id === userInfo?.id) {
      message.warning('Can not upvote your idea');
      return;
    }

    mutateAsync().then(() => {
      message.success('Upvote success');
      router.refresh();
    });
  }

  return {
    isPending,
    upvoteIdea
  };
}
