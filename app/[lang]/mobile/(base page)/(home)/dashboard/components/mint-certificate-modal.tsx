'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { MoveRightIcon, XIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/Common/Button';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';
import { useMintCertification } from '@/hooks/useMintCertification';

function ClaimCertificateForm() {
  const [name, setName] = React.useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="mt-6 flex-1">
      <form className="flex h-full w-full flex-col" onSubmit={handleSubmit}>
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
        <p className="text-sm text-neutral-medium-gray">
          Once you claim the certificate, you’ll not be able to change your name
        </p>
        <button
          disabled={!name}
          type="submit"
          className="mt-auto h-12 w-full rounded-full bg-yellow-primary text-sm font-medium uppercase text-neutral-black outline-none disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray"
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
          <div className="relative flex h-full flex-col bg-neutral-white px-5 py-6">
            <button className="absolute right-4 top-6 outline-none" onClick={() => onClose()}>
              <XIcon size={24} />
            </button>
            <div className="mt-11 flex flex-col gap-2">
              <Image src="/images/ecosystem/silver_medal.svg" width={24} height={33} alt="silver medal" />
              <h1 className="text-lg font-bold text-neutral-off-black sm:text-2xl">
                Congratulations! You’re a {data?.label}
              </h1>
            </div>
            <p className="mt-2 text-sm text-neutral-medium-gray">
              You’ve reached a significant milestone in your Web3 learning! Mint your certificate as a testament to your
              expertise.
            </p>
            <div className="relative mt-5 h-[12.125rem] w-full overflow-hidden rounded-[0.5rem]">
              <Image src={data?.certification?.image} alt={data?.label} fill />
            </div>
            {canMint ? (
              <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-neutral-off-white p-4">
                <div className="relative">
                  <Image src="/images/ecosystem/certificate.png" width={85} height={56} alt="certificate" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-neutral-off-black">Don’t know how to mint certificate?</h2>
                  <p className="text-sm text-neutral-medium-gray">
                    Follow steps in the video to get your web 3 certificate.
                  </p>
                  <Link href="/hackathon/explore" className="self-start">
                    <div className="inline-flex items-center gap-1.5">
                      <span className="text-sm font-medium capitalize text-neutral-black">Learn more</span>
                      <MoveRightIcon size={16} />
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="mt-5 text-sm text-neutral-medium-gray">
                Minting {ecosystemName} Certificate is unavailable at this time. Please stay tuned for our latest
                updates, and we will notify you if minting becomes available.
              </p>
            )}
            <div className="mt-auto flex flex-col gap-4">
              {canMint && (
                <Button
                  type="primary"
                  size="small"
                  loading={mutation.isPending}
                  className="h-12 w-full text-sm font-medium uppercase"
                  onClick={() => mutation.mutate()}
                >
                  Mint
                </Button>
              )}
              <Link href="/user/profile">
                <Button ghost size="small" className="h-12 w-full text-sm font-medium uppercase">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}
