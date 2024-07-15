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
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { getDomain } from '@/constants/links';

export function MintCertificateModal() {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  const router = useRouter();
  const { safeMintAsync } = useMintCertification();
  const { open, type, data, onClose } = useCertificateModal();

  const certification = data?.certification;

  const isOpen = open && type === 'mint';

  const canMint = !certification?.mint;

  // const ecosystemName = lang === 'en' ? data?.name?.split(' ')?.[1] : data?.name?.split(' ')?.[0];

  // const stringArray = data?.lab?.split(' ') || [];
  // lang === 'en' ? (stringArray[0] = '') : (stringArray[0] = '');
  // const ecosystemName = stringArray.join(' ');

  const mutation = useMutation({
    mutationFn: () => safeMintAsync(data.certification),
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
            <h1 className="text-2xl font-bold text-neutral-off-black">
              {t('modal.mint.title', { title: data.label })}
            </h1>
          </div>
          <p className="mt-3 text-center text-sm text-neutral-medium-gray">
            {t('modal.mint.description', { name: data.label })}
          </p>
          {/* {!certification?.certificateImage && data?.certification && (data.certification?.template as string) && (
            <div className="relative mx-auto my-6  overflow-hidden rounded-[0.5rem] shadow-idea-card">
              <CertificateRenderer
                template={data.certification?.template as string}
                certificateInfo={data?.certification}
                isSmall
              />
            </div>
          )} */}

          {/* {certification?.certificateImage && (
            <div className="relative mx-auto my-6 h-[13.75rem] w-[24.875rem] overflow-hidden rounded-[0.5rem] shadow-idea-card">
              <Image src={certification?.certificateImage} alt={certification?.certificateId} fill />
            </div>
          )} */}

          <div className="relative mx-auto my-6 h-[13.75rem] w-[24.875rem] overflow-hidden rounded-[0.5rem] shadow-idea-card">
            {certification && (
              <Image
                src={`${getDomain(process.env.RUNTIME_ENV || 'dev')}api/certificate/${certification?.username}-${certification?.certificateId}.png`}
                alt={certification?.certificateId}
                fill
              />
            )}
          </div>

          {!canMint && (
            <p className="mb-6 text-center text-sm text-neutral-medium-gray">
              Minting {data.label} Certificate is unavailable at this time. <br />
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
                {t('modal.mint.view_profile')}
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
