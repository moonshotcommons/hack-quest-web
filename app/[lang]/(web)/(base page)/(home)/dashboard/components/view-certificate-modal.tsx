'use client';

import { XIcon } from 'lucide-react';
import Modal from '@/components/Common/Modal';

export function ViewCertificateModal() {
  return (
    <Modal open onClose={() => {}}>
      <div className="relative flex w-[56.25rem] flex-col justify-center rounded-3xl bg-neutral-white px-8 pb-8 pt-16 shadow-modal">
        <button className="absolute right-6 top-6 outline-none">
          <XIcon size={24} />
        </button>
        <h1 className="text-center text-2xl font-bold text-neutral-off-black">Level 1. Certified Solana Learner</h1>
        <p className="mt-3 text-center text-sm text-neutral-medium-gray">
          Complete tasks to earn official certificate from Solana ecosystem. After you earn 100 points from level 1, you
          will get a starter certificate and level up. Get 500 points to become an expert Solana developer.
        </p>
        <div className="mx-auto my-8 h-[13.75rem] w-[24.875rem] rounded-[0.5rem] border border-neutral-medium-gray"></div>
        <button
          disabled
          className="mx-auto w-64 rounded-full bg-neutral-light-gray py-4 text-sm font-medium uppercase text-neutral-medium-gray outline-none"
        >
          claim certificate
        </button>
      </div>
    </Modal>
  );
}
