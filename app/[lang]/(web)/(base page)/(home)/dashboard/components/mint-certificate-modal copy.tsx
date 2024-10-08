'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MoveRightIcon, XIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import Modal from '@/components/Common/Modal';
import Button from '@/components/Common/Button';

import { useCertificateModal } from '@/components/ecosystem/use-certificate';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { ChainType } from '@/config/wagmi';
import { useMintCertificate } from '@/hooks/certificate';

export function MintCertificateModal() {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  const router = useRouter();
  const { safeMintAsyncFromEvm, safeMintAsyncFromSolana, safeMintAsyncFromSui } = useMintCertificate();
  const { open, type, data, onClose } = useCertificateModal();

  const certification = data?.certification;
  const isOpen = open && type === 'mint';
  const canMint = !certification?.mint || certification.chainId > 0;

  const [modalStatus, setModalStatus] = React.useState('mint');

  // const ecosystemName = lang === 'en' ? data?.name?.split(' ')?.[1] : data?.name?.split(' ')?.[0];

  // const stringArray = data?.lab?.split(' ') || [];
  // lang === 'en' ? (stringArray[0] = '') : (stringArray[0] = '');
  // const ecosystemName = stringArray.join(' ');

  const mutation = useMutation({
    mutationFn: async () => {
      switch (certification.chainId) {
        case ChainType.Solana:
          await safeMintAsyncFromSolana(data.certification);
          break;
        case ChainType.Sui:
          await safeMintAsyncFromSui(data.certification);
          break;
        default:
          await safeMintAsyncFromEvm(data.certification);
      }
    },
    onSuccess: () => {
      router.refresh();
      setModalStatus('success');
    }
  });

  // const mintSuccess = certification?.mint && modalStatus === 'success';
  const mintSuccess = false;

  return (
    <Modal open={isOpen} onClose={() => {}}>
      <div className="flex w-[56.25rem] flex-col gap-6 bg-transparent">
        <div className="relative flex flex-col justify-center rounded-3xl bg-neutral-white px-8 pb-8 pt-12">
          <button className="absolute right-6 top-6 outline-none" onClick={() => onClose()}>
            <XIcon size={24} />
          </button>
          <div className="mx-auto flex items-center gap-2">
            <Image src="/images/ecosystem/silver_medal.svg" width={24} height={33} alt="silver medal" />
            {!mintSuccess && (
              <h1 className="text-2xl font-bold text-neutral-off-black">
                {t('modal.mint.title', { title: data.label })}
              </h1>
            )}
            {mintSuccess && (
              <h1 className="text-2xl font-bold text-neutral-off-black">
                {t('modal.mint.mintSuccessTitle', { title: data.label })}
              </h1>
            )}
          </div>
          <p className="mt-3 text-center text-sm text-neutral-medium-gray">
            {!mintSuccess && t('modal.mint.description', { name: data.label })}
          </p>
          {/* {mintSuccess && (
            <p className="mt-3 text-center text-sm text-neutral-medium-gray">
              {!mintSuccess && t('modal.mint.mintSuccessDesc', { name: data.label })}
            </p>
          )} */}
          <div className="relative mx-auto my-6 h-[13.75rem] w-[24.875rem] overflow-hidden rounded-[0.5rem] shadow-idea-card">
            <Image src={certification?.certificateImage} alt={certification?.certificateId} fill />
          </div>
          {!canMint && !mintSuccess && (
            <p className="mb-6 text-center text-sm text-neutral-medium-gray">
              Minting {data.label} Certificate is unavailable at this time. <br />
              Please stay tuned for our latest updates, and we will notify you if minting becomes available.
            </p>
          )}
          <div className="mx-auto flex items-center gap-4">
            {canMint && !mintSuccess && (
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
            {mintSuccess && (
              <Button
                type="primary"
                size="small"
                loading={mutation.isPending}
                className="h-12 w-64 text-sm font-medium uppercase"
                onClick={() => onClose()}
              >
                confirm
              </Button>
            )}
            <Link href="/user/profile">
              <Button ghost size="small" className="h-12 w-64 text-sm font-medium uppercase">
                {t('modal.mint.view_profile')}
              </Button>
            </Link>
          </div>
        </div>
        {canMint && !mintSuccess && (
          <div className="flex justify-between rounded-3xl bg-neutral-white p-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-neutral-off-black">Don’t know how to mint certificate?</h2>
              <p className="text-sm text-neutral-medium-gray">
                Follow steps in the video to get your web 3 certificate.
              </p>
              <Link href="" className="self-start">
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
        )}
      </div>
    </Modal>
  );
}
