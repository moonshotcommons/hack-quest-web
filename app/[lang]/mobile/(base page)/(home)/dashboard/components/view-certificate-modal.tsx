'use client';

import * as React from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useViewCertificate } from '@/components/ecosystem/use-view-certificate';

export function ViewCertificateModal() {
  const { open, onClose } = useViewCertificate();

  React.useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  return open
    ? createPortal(
        <div className="fixed inset-x-0 top-16 z-50 h-[calc(100vh-4rem)]">
          <div className="relative flex h-full w-full flex-col bg-neutral-white px-5 py-6">
            <button className="absolute right-4 top-6 outline-none" onClick={onClose}>
              <XIcon size={32} />
            </button>
            <h1 className="mt-11 text-lg font-bold text-neutral-off-black">Become a Starter Solana Developer</h1>
            <p className="mt-3 text-sm text-neutral-medium-gray">
              Complete tasks to earn official certificate from Solana ecosystem. After you earn 100 points from level 1,
              you will get a starter certificate and level up. Get 500 points to become an expert Solana developer.
            </p>
            <div className="relative mt-5 h-[12.125rem] w-full rounded-[0.5rem] border border-neutral-medium-gray">
              <Image src="/images/ecosystem/solana-certificate.png" alt="solana certificate" fill />
            </div>
            <button
              disabled
              className="mt-auto w-full rounded-full bg-neutral-light-gray py-4 text-sm font-medium uppercase text-neutral-medium-gray outline-none"
            >
              claim certificate
            </button>
          </div>
        </div>,
        document.body
      )
    : null;
}
