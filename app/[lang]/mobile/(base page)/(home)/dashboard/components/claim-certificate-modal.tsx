'use client';

import * as React from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import Button from '@/components/Common/Button';

export function ClaimCertificateModal() {
  const router = useRouter();
  const { open, type, data, onClose } = useCertificateModal();

  const isOpen = open && type === 'claim';

  const mutation = useMutation({
    mutationKey: ['claimCertificate', data?.id],
    mutationFn: () => webApi.campaignsApi.claimCertification(data?.id),
    onSuccess: () => {
      onClose();
      router.refresh();
    }
  });

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
            <h1 className="mt-11 text-lg font-bold text-neutral-off-black">Become a Starter Solana Developer</h1>
            <p className="mt-3 text-sm text-neutral-medium-gray">
              Complete tasks to earn official certificate from Solana ecosystem. After you earn 100 points from level 1,
              you will get a starter certificate and level up. Get 500 points to become an expert Solana developer.
            </p>
            <div className="relative mt-5 h-[12.125rem] w-full rounded-[0.5rem]">
              <Image src={data?.image} alt={data?.name} fill />
            </div>
            <Button
              loading={mutation.isPending}
              type="primary"
              className="mt-auto h-12 w-full uppercase"
              onClick={() => mutation.mutate()}
            >
              claim certificate
            </Button>
          </div>
        </div>,
        document.body
      )
    : null;
}
