'use client';
import React, { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import OnGoingHackathonCard from '../OnGoing/OnGoingHackathonCard';
import SliderCard from '@/components/Web/Business/SliderCard';

interface MiniProp {
  miniHackathonList: HackathonType[];
}

const Mini: React.FC<MiniProp> = ({ miniHackathonList }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const title = () => {
    return (
      <>
        <p>{t('miniHacks')}</p>
        <p className="body-l mt-[12px] text-neutral-rich-gray">{t('miniHacksDescrition')}</p>
      </>
    );
  };
  return (
    <SliderCard
      title={title()}
      renderItem={(width) => {
        return miniHackathonList.map((hackathon) => {
          return (
            <div key={hackathon.id} className="w-full" style={{ width: `${width}px` }}>
              <OnGoingHackathonCard hackathon={hackathon} />
            </div>
          );
        });
      }}
    />
  );
};

export default Mini;
