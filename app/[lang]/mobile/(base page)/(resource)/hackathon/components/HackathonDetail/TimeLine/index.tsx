import React, { useContext, useMemo } from 'react';
import { HackathonTimeLineKeyType, HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import dayjs from '@/components/Common/Dayjs';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { hackathonDetailTimeLine } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/data';

interface TimeLineProp {
  hackathon: HackathonType;
  isEdit?: boolean;
}

const TimeLine: React.FC<TimeLineProp> = ({ hackathon, isEdit }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getStepIndex } = useDealHackathonData();
  const stepIndex = useMemo(() => {
    return isEdit ? 0 : getStepIndex(hackathon);
  }, [isEdit]);

  const h = useMemo(() => {
    return {
      h1: dayjs(hackathon.timeline?.registrationOpen).isSame(hackathon.timeline?.submissionOpen),
      h2: dayjs(hackathon.timeline?.registrationClose).isSame(hackathon.timeline?.submissionClose)
    };
  }, [hackathon]);

  return (
    <EditBox title={'hackathonDetail.timeline'} type={HackathonEditModalType.TIMELINE}>
      <div className="relative flex flex-col gap-[1.75rem]">
        <div
          className={`absolute left-[1rem]  w-[.1875rem] rounded-[6.25rem]   ${stepIndex > 0 ? 'bg-yellow-primary' : 'bg-neutral-light-gray'} ${h.h1 ? 'top-[3.25rem]  h-[1.75rem] ' : 'top-[4rem]  h-[3rem] '}`}
        ></div>
        <div
          className={`rounded-[6.25rem]] absolute   left-[1rem]  w-[.1875rem] ${stepIndex > 1 ? 'bg-yellow-primary' : 'bg-neutral-light-gray'} ${h.h2 ? 'bottom-[3.25rem]  h-[1.75rem] ' : 'bottom-[3.25rem]  h-[2.5rem] '}`}
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
                {dayjs(hackathon?.timeline?.[v.time[0] as HackathonTimeLineKeyType])
                  .tz()
                  .format('MMM D,YYYY H:mm')}
                (GMT+8)
              </p>
              {hackathon?.timeline?.[v.time[1] as HackathonTimeLineKeyType] &&
                !dayjs(hackathon?.timeline?.[v.time[0] as HackathonTimeLineKeyType]).isSame(
                  hackathon?.timeline?.[v.time[1] as HackathonTimeLineKeyType]
                ) && (
                  <p className={`body-s ${i > stepIndex ? 'text-neutral-medium-gray' : 'text-neutral-off-black'}`}>
                    {dayjs(hackathon?.timeline?.[v.time[1] as HackathonTimeLineKeyType])
                      .tz()
                      .format('MMM D,YYYY H:mm')}
                    (GMT+8)
                  </p>
                )}
            </div>
          </div>
        ))}
      </div>
    </EditBox>
  );
};

export default TimeLine;
