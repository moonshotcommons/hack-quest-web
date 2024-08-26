'use client';

import * as React from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';
import Button from '@/components/Common/Button';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function ClaimCertificateModal() {
  const { open, type, data, onOpen, onClose } = useCertificateModal();
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  const isOpen = open && type === 'claim';

  const ecosystemName = lang === 'en' ? data?.label?.split(' ')[1] : data?.label?.split(' ')[0];

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
              {t('modal.claim.description', { name: ecosystemName })}
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
              {t('claim_certificate')}
            </Button>
          </div>
        </div>,
        document.body
      )
    : null;
}
