'use client';

import Image from 'next/image';
import { XIcon } from 'lucide-react';
import Modal from '@/components/Common/Modal';
import Button from '@/components/Common/Button';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function ClaimCertificateModal() {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  const { open, type, data, onOpen, onClose } = useCertificateModal();

  const isOpen = open && type === 'claim';

  const ecosystemName = lang === 'en' ? data?.label?.split(' ')[1] : data?.label?.split(' ')[0];
  console.log(data);
  function handleClaim() {
    onOpen('username', data);
  }

  return (
    <Modal open={isOpen} onClose={() => {}}>
      <div className="relative flex w-[56.25rem] flex-col justify-center rounded-3xl bg-neutral-white px-8 pb-8 pt-16 shadow-modal">
        <button className="absolute right-6 top-6 outline-none" onClick={() => onClose()}>
          <XIcon size={24} />
        </button>
        <h1 className="text-center text-2xl font-bold text-neutral-off-black">
          Lvl {data?.level}. {data?.label}
        </h1>
        <p className="mt-3 text-center text-sm text-neutral-medium-gray">
          {t('modal.claim.description', { name: ecosystemName })}
        </p>
        <div className="relative mx-auto my-8 h-[13.75rem] w-[24.875rem] overflow-hidden rounded-[0.5rem] shadow-idea-card">
          <Image src={data?.certification?.image} fill alt={data?.label} />
        </div>
        <Button
          type="primary"
          disabled={data?.currentExp < data?.maxExp}
          onClick={handleClaim}
          className="mx-auto h-12 w-64 uppercase disabled:bg-neutral-light-gray"
        >
          {t('claim_certificate')}
        </Button>
      </div>
    </Modal>
  );
}
