import React, { useContext } from 'react';
import { MantleContext } from '../../../constants/type';
import TargetCard from '../../TargetCard';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface TargetBoxProp {}

const TargetBox: React.FC<TargetBoxProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const { targetList } = useContext(MantleContext);
  return (
    <div>
      <div className="body-l text-neutral-off-black">{t('targetsToAchieve')}</div>
      {targetList.map((target) => (
        <TargetCard key={target.id} target={target} />
      ))}
    </div>
  );
};

export default TargetBox;
