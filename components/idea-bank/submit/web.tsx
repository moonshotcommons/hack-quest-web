'use client';

import * as React from 'react';
import Modal from '@/components/Common/Modal';
import { useSubmitModal } from './store';
import { SubmitBase } from './base';

export function SubmitWebModal() {
  const { open } = useSubmitModal();

  return (
    <Modal open={open} onClose={() => {}}>
      <div className="relative w-[50.375rem] rounded-2xl bg-neutral-white p-10 shadow-modal">
        <SubmitBase />
      </div>
    </Modal>
  );
}
