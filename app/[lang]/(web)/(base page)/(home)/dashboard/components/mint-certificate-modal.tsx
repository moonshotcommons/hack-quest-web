'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MoveRightIcon, XIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import Modal from '@/components/Common/Modal';
import Button from '@/components/Common/Button';
import { useMintCertification } from '@/hooks/useMintCertification';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';

function ClaimCertificateForm() {
  const [name, setName] = React.useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="mt-6">
      <form className="flex w-full flex-col" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-neutral-rich-gray">
          Enter Your Name to Claim Certificate
        </label>
        <input
          id="name"
          type="text"
          className="my-1 w-full rounded-[0.5rem] p-3 text-base text-neutral-black outline-none ring-1 ring-neutral-light-gray"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mb-6 text-sm text-neutral-medium-gray">
          Once you claim the certificate, you’ll not be able to change your name
        </p>
        <button
          disabled={!name}
          type="submit"
          className="mx-auto h-12 w-64 rounded-full bg-yellow-primary text-sm font-medium uppercase text-neutral-black outline-none disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray"
        >
          continue
        </button>
      </form>
    </div>
  );
}

export function MintCertificateModal() {
  const router = useRouter();
  const { safeMintAsync } = useMintCertification();
  const { open, type, data, onClose } = useCertificateModal();

  const isOpen = open && type === 'mint';

  const canMint = data?.label?.toLowerCase()?.includes('mantle') && !data?.certification?.mint;

  const ecosystemName = data?.label?.split(' ')?.[1];

  const mutation = useMutation({
    mutationKey: ['mintCertificate'],
    mutationFn: () =>
      safeMintAsync({
        sourceType: 'Certification',
        sourceId: data?.certificationId,
        signatureId: data?.certification?.signatureId
      }),
    onSuccess: () => {
      onClose();
      router.refresh();
    }
  });

  return (
    <Modal open={isOpen} onClose={() => {}}>
      <div className="flex w-[56.25rem] flex-col gap-6 bg-transparent">
        <div className="relative flex flex-col justify-center rounded-3xl bg-neutral-white px-8 pb-8 pt-12">
          <button className="absolute right-6 top-6 outline-none" onClick={() => onClose()}>
            <XIcon size={24} />
          </button>
          <div className="mx-auto flex items-center gap-2">
            <Image src="/images/ecosystem/silver_medal.svg" width={24} height={33} alt="silver medal" />
            <h1 className="text-2xl font-bold text-neutral-off-black">Congratulations! You’re a {data?.label}</h1>
          </div>
          <p className="mt-3 text-center text-sm text-neutral-medium-gray">
            You’ve reached a significant milestone in your Web3 learning! Mint your certificate as a testament to your
            expertise.
          </p>
          <div className="relative mx-auto my-6 h-[13.75rem] w-[24.875rem] overflow-hidden rounded-[0.5rem]">
            <Image src={data?.certification?.image} fill alt={data?.label} />
          </div>
          {!canMint && (
            <p className="mb-6 text-center text-sm text-neutral-medium-gray">
              Minting {ecosystemName} Certificate is unavailable at this time. <br />
              Please stay tuned for our latest updates, and we will notify you if minting becomes available.
            </p>
          )}
          <div className="mx-auto flex items-center gap-4">
            {canMint && (
              <Button
                type="primary"
                size="small"
                loading={mutation.isPending}
                className="h-12 w-64 text-sm font-medium uppercase"
                onClick={() => mutation.mutate()}
              >
                Mint
              </Button>
            )}
            <Link href="/user/profile">
              <Button ghost size="small" className="h-12 w-64 text-sm font-medium uppercase">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between rounded-3xl bg-neutral-white p-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-neutral-off-black">Don’t know how to mint certificate?</h2>
            <p className="text-sm text-neutral-medium-gray">Follow steps in the video to get your web 3 certificate.</p>
            <Link href="/hackathon/explore" className="self-start">
              <div className="inline-flex items-center gap-1.5">
                <span className="text-sm font-medium capitalize text-neutral-black">Learn more</span>
                <MoveRightIcon size={16} />
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <Image src="/images/ecosystem/certificate.png" width={85} height={56} alt="certificate" />
          </div>
        </div>
      </div>
    </Modal>
  );
}
