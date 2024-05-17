'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';

export function LeaveTeamModal({ open, onClose }: { open?: boolean; onClose: () => void }) {
  return (
    <Modal open={true} onClose={onClose}>
      <div className="relative flex w-[532px] flex-col items-center rounded-2xl bg-neutral-white py-10 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
        <button aria-label="Close Modal" className="absolute right-5 top-5 outline-none">
          <XIcon size={20} />
        </button>
        <h1 className="font-next-book-bold text-lg font-bold">Do you want to leave this team?</h1>
        <p className="body-m mb-9 mt-5">Spiderman</p>
        <div className="grid w-full grid-cols-2 gap-2 px-20">
          <Button ghost className="w-full">
            cancel
          </Button>
          <Button className="w-full" type="primary">
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
