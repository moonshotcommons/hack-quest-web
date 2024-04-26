'use client';
import React, { useContext } from 'react';
import Title from '../components/Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Box from '../components/Box';
import { hackathonDetailTimeLine } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/data';
import dayjs from '@/components/Common/Dayjs';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface TimeLineProp {
  hackathon: HackathonType;
}

const TimeLine: React.FC<TimeLineProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = getStepIndex(hackathon);
  return (
    <div>
      <Title title={t('hackathonDetail.timeline')} />
      <Box className="p-[1.5rem]">
        <div className="relative flex flex-col gap-[1.75rem]">
          <div
            className={`absolute left-[1rem] top-[3.25rem]  h-[1.75rem]  w-[.1875rem] rounded-[6.25rem]   ${stepIndex > 0 ? 'bg-yellow-primary' : 'bg-neutral-light-gray'}`}
          ></div>
          <div
            className={`rounded-[6.25rem]] absolute bottom-[3.25rem]  left-[1rem]  h-[1.75rem] w-[.1875rem] ${stepIndex > 1 ? 'bg-yellow-primary' : 'bg-neutral-light-gray'}`}
          ></div>
          {hackathonDetailTimeLine.map((v, i) => (
            <div className="flex items-center gap-[2.5rem]" key={i}>
              <div
                className={`flex-center h-[2.125rem] w-[2.125rem] rounded-[50%] border border-dashed  ${i === stepIndex ? 'border-neutral-rich-gray' : 'border-transparent'}`}
              >
                <div
                  className={`h-[1.5rem] w-[1.5rem] rounded-[50%] border  ${i > stepIndex ? 'border-neutral-medium-gray bg-neutral-off-white' : 'border-yellow-primary  bg-yellow-primary'}`}
                ></div>
              </div>
              <div>
                <p className={`body-l-bold ${i > stepIndex ? 'text-neutral-medium-gray' : 'text-neutral-black'}`}>
                  {' '}
                  {t(`hackathonDetail.${v.key}`)}
                </p>
                <p className={`body-s ${i > stepIndex ? 'text-neutral-medium-gray' : 'text-neutral-off-black'}`}>
                  {dayjs(hackathon[v.time as 'openTime' | 'reviewTime' | 'rewardTime'])
                    .tz()
                    .format('MMM D,YY H:mm')}
                  (GMT+8)
                </p>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default TimeLine;
