import React, { useContext, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { leaderboardTab } from '../../constants/data';
import LeaderCard from './LeaderCard';

interface LeaderboardProp {}

const Leaderboard: React.FC<LeaderboardProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const [curTab, setCurTab] = useState(leaderboardTab[0].value);
  return (
    <div className="flex flex-col gap-[24px] rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[24px]">
      <div className="flex items-center justify-between">
        <div className="text-h4  text-neutral-off-black">{t('Leaderboard')}</div>
        <div className="flex gap-[8px]">
          {leaderboardTab.map((v, i) => (
            <div
              key={i}
              className={`body-s-bold cursor-pointer rounded-[8px] px-[12px] py-[2px] text-neutral-medium-gray ${curTab === v.value ? 'bg-yellow-primary' : 'bg-neutral-off-white'}`}
              onClick={() => setCurTab(v.value)}
            >
              {t(v.label)}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-[4px] border-b border-dashed border-neutral-medium-gray pb-[4px]">
          {[1, 2, 3, 4, 5, 6, 7].slice(0, 5).map((_, i) => (
            <LeaderCard key={i} index={i + 1} />
          ))}
        </div>
        <LeaderCard index={100} />
      </div>
    </div>
  );
};

export default Leaderboard;
