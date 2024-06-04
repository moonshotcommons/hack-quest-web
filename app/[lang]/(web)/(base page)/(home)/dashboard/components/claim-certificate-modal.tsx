'use client';

import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Modal from '@/components/Common/Modal';
import webApi from '@/service';
import Button from '@/components/Common/Button';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';

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

  return (
    <Modal open={isOpen} onClose={() => {}}>
      <div className="relative flex w-[56.25rem] flex-col justify-center rounded-3xl bg-neutral-white px-8 pb-8 pt-16 shadow-modal">
        <button className="absolute right-6 top-6 outline-none" onClick={() => onClose()}>
          <XIcon size={24} />
        </button>
        <h1 className="text-center text-2xl font-bold text-neutral-off-black">Level 1. Certified Solana Learner</h1>
        <p className="mt-3 text-center text-sm text-neutral-medium-gray">
          Complete tasks to earn official certificate from Solana ecosystem. After you earn 100 points from level 1, you
          will get a starter certificate and level up. Get 500 points to become an expert Solana developer.
        </p>
        <div className="relative mx-auto my-8 h-[13.75rem] w-[24.875rem] rounded-[0.5rem]">
          <Image src={data?.image} fill alt={data?.name} />
        </div>
        <Button
          type="primary"
          onClick={() => mutation.mutate()}
          loading={mutation.isPending}
          className="mx-auto h-12 w-64 uppercase"
        >
          claim certificate
        </Button>
      </div>
    </Modal>
  );
}
