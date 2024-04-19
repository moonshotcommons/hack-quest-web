'use client';
import React, { useContext } from 'react';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Box from '../components/Box';

interface TimeLineProp {
  hackathon: HackathonType;
}

const TimeLine: React.FC<TimeLineProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div>
      <Title title={t('hackathonDetail.timeline')} />
      <Box className="flex items-center justify-between p-[24px] text-center [&>div]:w-[200px]">
        <div className="">
          <p className="body-l-bold">{t('hackathonDetail.registrationOpen')}</p>
          <p className="body-s text-neutral-off-black">Feb 13, 2024 8:00pm(GMT+8)</p>
        </div>
        <div className="">
          <p className="body-l-bold">{t('hackathonDetail.submissionsClose')}</p>
          <p className="body-s text-neutral-off-black">Feb 13, 2024 8:00pm(GMT+8)</p>
        </div>
        <div className="">
          <p className="body-l-bold text-neutral-medium-gray">{t('hackathonDetail.rewardAnnouncement')}</p>
          <p className="body-s text-neutral-medium-gray">Feb 13, 2024 8:00pm(GMT+8)</p>
        </div>
      </Box>
    </div>
  );
};

export default TimeLine;
