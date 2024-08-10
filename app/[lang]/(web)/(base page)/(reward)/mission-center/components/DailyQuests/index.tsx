import React, { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { MissionDataType } from '@/service/webApi/missionCenter/type';
import DailyCard from './DailyCard';

interface DailyQuestsProp {
  missionDatas: MissionDataType[];
  missionClaim: (ids: string[], cb?: VoidFunction) => void;
}

const DailyQuests: React.FC<DailyQuestsProp> = ({ missionDatas, missionClaim }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  return (
    <div>
      <div className="mb-[24px] flex justify-between">
        <div className="text-h35 text-neutral-off-black">{t('dailyQuests')}</div>
        {/* <span className="body-s text-neutral-medium-gray">{t('rewardsRefresh')}</span> */}
      </div>
      <div className="flex flex-wrap gap-[20px]">
        {missionDatas.map((m) => (
          <div className="w-[calc((100%-40px)/3)]" key={m.id}>
            <DailyCard missionData={m} missionClaim={missionClaim} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyQuests;
