'use client';
import React, { FC, useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';
import MenuLink from '@/constants/MenuLink';
import SliderCard from '@/components/Web/Business/SliderCard';
import { HackathonVoteContext, ViewValue } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import PastHackathonCard from '../../../../components/HackathonBox/Past/PastHackathonCard';

interface FooterProps {
  otherHackathons: HackathonType[];
}

const Footer: FC<FooterProps> = ({ otherHackathons }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { view } = useContext(HackathonVoteContext);
  return (
    <div className={`${view === ViewValue.AGENDA && 'pb-[2rem]'}`}>
      <SliderCard
        title={t('hackathonVoting.otherHackathons')}
        viewLink={`${MenuLink.HACKATHON}`}
        isMobile={true}
        renderItem={(contarinerWidth) => {
          return otherHackathons.map((item) => (
            <div
              key={item.id}
              style={{
                width: `${contarinerWidth}px`
              }}
            >
              <PastHackathonCard hackathon={item} isVoting={true} />
            </div>
          ));
        }}
      />
    </div>
  );
};

export default Footer;
