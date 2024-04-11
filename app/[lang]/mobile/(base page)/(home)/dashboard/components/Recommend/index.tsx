import MobLearningTrackCard from '@/components/Mobile/MobLearningTrackCard';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import React, { useContext } from 'react';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';

interface RecommendProp {}

const Recommend: React.FC<RecommendProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  const { data: list = [] } = useRequest(async () => {
    const list = await webApi.learningTrackApi.getLearningTracks();
    return list;
  });

  return (
    <div>
      <div className="text-h4 text-neutral-off-black">{t('dashboard.recommendedForYou')}</div>
      <div className="mt-[16px] flex flex-wrap gap-[20px]">
        {list.map((learningTrack) => (
          <div key={learningTrack.id} className="w-full">
            <MobLearningTrackCard learningTrack={learningTrack} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
