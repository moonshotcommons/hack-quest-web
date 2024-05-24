'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { create } from 'zustand';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { useRouter } from 'next/navigation';

interface Store {
  open: boolean;
  name: string;
  hackathonId: string;
  onOpen: (name: string, hackathonId: string) => void;
  onClose: () => void;
}

export const useWithdrawModal = create<Store>((set) => ({
  open: false,
  name: '',
  hackathonId: '',
  onOpen: (name, hackathonId) => set({ open: true, name, hackathonId }),
  onClose: () => set({ open: false, name: '', hackathonId: '' })
}));

export function WithdrawModal() {
  const router = useRouter();
  const { open, hackathonId, name, onClose } = useWithdrawModal();

  const mutation = useMutation({
    mutationKey: ['withdraw', hackathonId],
    mutationFn: () => webApi.resourceStationApi.leaveTeam(hackathonId),
    onSuccess: () => {
      onClose();
      router.refresh();
    }
  });

  return (
    <Modal open={open} onClose={() => {}}>
      <div className="relative flex w-full flex-col items-center rounded-2xl bg-neutral-white px-6 py-10 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)] sm:w-[532px] sm:px-0">
        <button aria-label="Close Modal" className="absolute right-5 top-5 outline-none" onClick={onClose}>
          <XIcon size={20} />
        </button>
        <h1 className="text-center font-next-book-bold text-lg font-bold">
          Do you want to withdraw from this hackathon?
        </h1>
        <p className="body-m mb-9 mt-5">{name}</p>
        <div className="grid w-full grid-cols-2 gap-2 sm:px-20">
          <Button size="medium-x" ghost className="h-12 w-full uppercase" onClick={onClose}>
            cancel
          </Button>
          <Button
            size="medium-x"
            className="h-12 w-full uppercase"
            type="primary"
            htmlType="button"
            loading={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
