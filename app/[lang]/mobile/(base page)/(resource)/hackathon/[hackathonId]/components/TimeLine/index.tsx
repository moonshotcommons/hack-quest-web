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
      <Box className="p-[1.5rem]">
        <div className="relative flex flex-col gap-[1.75rem]">
          <div className="absolute left-[1rem] top-[3.25rem]  h-[1.75rem]  w-[.1875rem] rounded-[100px] bg-transparent"></div>
          <div className="absolute bottom-[3.25rem] left-[1rem]  h-[1.75rem]  w-[.1875rem] rounded-[100px] bg-neutral-light-gray"></div>
          <div className="flex items-center gap-[2.5rem]">
            <div className="flex-center h-[2.125rem] w-[2.125rem] rounded-[50%] border border-dashed border-neutral-rich-gray">
              <div className="h-[1.5rem] w-[1.5rem] rounded-[50%] border border-yellow-primary  bg-yellow-primary"></div>
            </div>
            <div>
              <p className="body-l-bold">{t('hackathonDetail.registrationOpen')}</p>
              <p className="body-s text-neutral-off-black">Feb 13, 2024 8:00pm(GMT+8)</p>
            </div>
          </div>
          <div className="flex items-center gap-[2.5rem]">
            <div className="flex-center h-[2.125rem] w-[2.125rem] rounded-[50%] border border-dashed border-neutral-rich-gray">
              <div className="h-[1.5rem] w-[1.5rem] rounded-[50%] border border-yellow-primary  bg-yellow-primary"></div>
            </div>
            <div>
              <p className="body-l-bold">{t('hackathonDetail.submissionsClose')}</p>
              <p className="body-s text-neutral-off-black">Feb 13, 2024 8:00pm(GMT+8)</p>
            </div>
          </div>
          <div className="flex items-center gap-[2.5rem]">
            <div className="flex-center h-[2.125rem] w-[2.125rem] rounded-[50%] border border-dashed border-transparent">
              <div className="h-[1.5rem] w-[1.5rem] rounded-[50%] border border-neutral-medium-gray  bg-neutral-off-white"></div>
            </div>
            <div>
              <p className="body-l-bold text-neutral-medium-gray">{t('hackathonDetail.rewardAnnouncement')}</p>
              <p className="body-s text-neutral-medium-gray">Feb 13, 2024 8:00pm(GMT+8)</p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default TimeLine;
