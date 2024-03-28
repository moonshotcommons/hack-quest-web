import React, { useContext, useMemo } from 'react';
import TargetCard from './TargetCard';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext } from '../../../constants/type';
import LockMask from '../../LockMask';
import { isNotDefaultTargetType } from '../../../constants/data';

interface TargetFuelProp {}

const TargetFuel: React.FC<TargetFuelProp> = () => {
  const { launchInfo } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const targetList = useMemo(() => {
    return launchInfo.fuelsInfo.filter(
      (v: any) => ~isNotDefaultTargetType.indexOf(v.type)
    );
  }, [launchInfo]);
  return (
    <div className="mt-[24px]">
      <p className="body-l text-neutral-black">{t('targetFuel')}</p>
      <div className="relative">
        {!launchInfo.isStake && <LockMask />}
        {targetList.map((v: any) => (
          <div key={v.id} className="mt-[16px]">
            <TargetCard target={v} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetFuel;
