import React, { useContext, useMemo, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { leaderboardTab } from '../../constants/data';
import LeaderCard from './LeaderCard';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import { useShallow } from 'zustand/react/shallow';
import { UserLevelRankType } from '@/service/webApi/missionCenter/type';

interface LeaderboardProp {}

const Leaderboard: React.FC<LeaderboardProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const [curTab, setCurTab] = useState(leaderboardTab[0].value);
  const { rankInfo } = useMissionCenterStore(
    useShallow((state) => ({
      rankInfo: state.rankInfo
    }))
  );

  const { ranks, myRank } = useMemo(() => {
    const ranksKey = `${curTab}Ranks` as keyof typeof rankInfo;
    const myRankKey = `${curTab}MyRank` as keyof typeof rankInfo;
    return {
      ranks: (rankInfo[ranksKey] as UserLevelRankType[])?.slice(0, 5),
      myRank: rankInfo[myRankKey] as UserLevelRankType
    };
  }, [curTab, rankInfo]);
  return (
    <div className="flex flex-col gap-[24px] rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[24px]">
      <div className="flex items-center justify-between">
        <div className="text-h4  text-neutral-off-black">{t('Leaderboard')}</div>
        <div className="flex gap-[8px]">
          {leaderboardTab.map((v, i) => (
            <div
              key={i}
              className={`body-s-bold cursor-pointer rounded-[8px] px-[12px] py-[2px] text-neutral-rich-gray ${curTab === v.value ? 'bg-yellow-primary' : 'bg-neutral-off-white'}`}
              onClick={() => setCurTab(v.value)}
            >
              {t(v.label)}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-[4px] border-b border-dashed border-neutral-medium-gray pb-[4px]">
          {ranks?.map((rank) => <LeaderCard key={rank.id} rankInfo={rank} />)}
        </div>
        <LeaderCard rankInfo={myRank || {}} />
      </div>
    </div>
  );
};

export default Leaderboard;
