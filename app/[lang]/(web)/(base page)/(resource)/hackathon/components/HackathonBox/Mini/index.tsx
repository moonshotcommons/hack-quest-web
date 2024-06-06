'use client';
import React, { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';

interface MiniProp {
  miniHackathonList: HackathonType[];
}

const Mini: React.FC<MiniProp> = ({ miniHackathonList }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const title = () => {
    return (
      <div className="pl-[20px]">
        <p>{t('miniHacks')}</p>
        <p className="body-l mt-[12px] text-neutral-rich-gray">{t('miniHacksDescrition')}</p>
      </div>
    );
  };
  return null;
  // return (
  //   <div className="relative left-[-20px] w-[calc(100%+40px)]">
  //     <SliderCard
  //       title={title()}
  //       renderItem={(width) => {
  //         return miniHackathonList.map((hackathon) => {
  //           return (
  //             <div key={hackathon.id} className="w-full p-[20px]" style={{ width: `${width}px` }}>
  //               <OnGoingHackathonCard hackathon={hackathon} />
  //             </div>
  //           );
  //         });
  //       }}
  //     />
  //   </div>
  // );
};

export default Mini;
