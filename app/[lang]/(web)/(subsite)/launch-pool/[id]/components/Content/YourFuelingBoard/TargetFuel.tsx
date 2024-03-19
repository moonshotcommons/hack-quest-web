import React, { useContext } from 'react';
import TargetCard from './TargetCard';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';

interface TargetFuelProp {}

const TargetFuel: React.FC<TargetFuelProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="mt-[24px]">
      <p className="body-l text-neutral-black">{t('targetFuel')}</p>
      <div className="mt-[16px]">
        <TargetCard />
      </div>
    </div>
  );
};

export default TargetFuel;
