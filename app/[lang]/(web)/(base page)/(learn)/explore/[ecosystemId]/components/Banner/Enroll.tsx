'use client';
import Button from '@/components/Common/Button';
import React, { useState } from 'react';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import SwichModal from './SwichModal';

interface EnrollProp {
  lang: Lang;
}

const Enroll: React.FC<EnrollProp> = ({ lang }) => {
  const { t } = useTranslation(lang, TransNs.LEARN);
  const [open, setOpen] = useState(false);
  return (
    <>
      {false ? (
        <Button type="primary" className="button-text-l h-[60px] w-[290px] uppercase text-neutral-black">
          {t('explore.enroll')}
        </Button>
      ) : (
        <Button
          ghost
          className="button-text-l h-[60px] w-[290px] border-neutral-black uppercase text-neutral-black"
          onClick={() => {
            setOpen(true);
          }}
        >
          {t('explore.addEcosystem')}
        </Button>
      )}
      <SwichModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Enroll;
