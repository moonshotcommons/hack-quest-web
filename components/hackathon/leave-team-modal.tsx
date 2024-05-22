'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { create } from 'zustand';

interface State {
  open: boolean;
  hackathonId: string;
  onOpen: (hackathonId: string) => void;
  onClose: () => void;
}

export const useLeaveTeamModal = create<State>((set) => ({
  open: false,
  hackathonId: '',
  onOpen: (hackathonId) => set({ open: true, hackathonId }),
  onClose: () => set({ open: false, hackathonId: '' })
}));

export function LeaveTeamModal() {
  const { open, hackathonId, onClose } = useLeaveTeamModal();
  const mutation = useMutation({
    mutationKey: ['leaveTeam', hackathonId],
    mutationFn: () => webApi.resourceStationApi.leaveTeam(hackathonId)
  });
  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative flex w-[532px] flex-col items-center rounded-2xl bg-neutral-white py-10 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
        <button aria-label="Close Modal" className="absolute right-5 top-5 outline-none" onClick={onClose}>
          <XIcon size={20} />
        </button>
        <h1 className="font-next-book-bold text-lg font-bold">Do you want to leave this team?</h1>
        <p className="body-m mb-9 mt-5">Spiderman</p>
        <div className="grid w-full grid-cols-2 gap-2 px-20">
          <Button ghost className="w-full" onClick={onClose}>
            cancel
          </Button>
          <Button loading={mutation.isPending} className="w-full" type="primary" onClick={() => mutation.mutate()}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}