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
      <Box className="p-[24px] text-center ">
        <div className="relative flex items-center justify-between [&>div]:w-[200px]">
          <div className="absolute bottom-[16px] left-[151px] h-[3px] w-[calc((100%-404px)/2)] rounded-[100px] bg-neutral-light-gray"></div>
          <div className="absolute bottom-[16px] right-[151px] h-[3px] w-[calc((100%-404px)/2)] rounded-[100px] bg-neutral-light-gray"></div>
          <div className="flex flex-col items-center">
            <p className="body-l-bold">{t('hackathonDetail.registrationOpen')}</p>
            <p className="body-s text-neutral-off-black">Feb 13, 2024 8:00pm(GMT+8)</p>
            <div className="flex-center mt-[10px] h-[34px] w-[34px] rounded-[50%] border border-dashed border-transparent">
              <div className="h-[24px] w-[24px] rounded-[50%] border border-yellow-primary  bg-yellow-primary"></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="body-l-bold">{t('hackathonDetail.submissionsClose')}</p>
            <p className="body-s text-neutral-off-black">Feb 13, 2024 8:00pm(GMT+8)</p>
            <div className="flex-center mt-[10px] h-[34px] w-[34px] rounded-[50%] border border-dashed border-neutral-rich-gray">
              <div className="h-[24px] w-[24px] rounded-[50%] border border-yellow-primary  bg-yellow-primary"></div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="body-l-bold text-neutral-medium-gray">{t('hackathonDetail.rewardAnnouncement')}</p>
            <p className="body-s text-neutral-medium-gray">Feb 13, 2024 8:00pm(GMT+8)</p>
            <div className="flex-center mt-[10px] h-[34px] w-[34px] rounded-[50%] border border-dashed border-transparent">
              <div className="h-[24px] w-[24px] rounded-[50%] border border-neutral-medium-gray  bg-neutral-off-white"></div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default TimeLine;
