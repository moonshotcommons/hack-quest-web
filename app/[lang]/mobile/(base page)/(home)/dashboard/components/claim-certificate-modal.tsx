'use client';

import * as React from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';
import Button from '@/components/Common/Button';

export function ClaimCertificateModal() {
  const { open, type, data, onOpen, onClose } = useCertificateModal();

  const isOpen = open && type === 'claim';

  function handleClaim() {
    onOpen('username', data);
  }

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <div className="fixed inset-x-0 top-16 z-50 h-[calc(100vh-4rem)]">
          <div className="relative flex h-full w-full flex-col bg-neutral-white px-5 py-6">
            <button className="absolute right-4 top-6 outline-none" onClick={() => onClose()}>
              <XIcon size={32} />
            </button>
            <h1 className="mt-11 text-lg font-bold text-neutral-off-black">
              Lvl {data?.level}. {data?.label}
            </h1>
            <p className="mt-3 text-sm text-neutral-medium-gray">
              Complete tasks to earn official certificate from Solana ecosystem. After you earn 100 points from level 1,
              you will get a starter certificate and level up. Get 500 points to become an expert Solana developer.
            </p>
            <div className="relative mt-5 h-[12.125rem] w-full overflow-hidden rounded-[0.5rem]">
              <Image src={data?.certification?.image} fill alt={data?.label} />
            </div>
            <Button
              disabled={data?.currentExp < data?.maxExp}
              type="primary"
              className="mt-auto h-12 w-full uppercase disabled:bg-neutral-light-gray"
              onClick={handleClaim}
            >
              claim certificate
            </Button>
          </div>
        </div>,
        document.body
      )
    : null;
}
