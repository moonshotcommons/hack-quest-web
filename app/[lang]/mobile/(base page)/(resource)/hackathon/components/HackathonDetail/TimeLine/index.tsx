import React, { useContext } from 'react';
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
  const { getStepIndex, getHackathonTimeSame } = useDealHackathonData();
  const isSame = getHackathonTimeSame(hackathon);
  const stepIndex = getStepIndex(hackathon);
  const getIsActive = (index: number) => {
    switch (index) {
      case 0:
        return stepIndex >= 0;
      case 1:
        return stepIndex > 1;
      default:
        return stepIndex > 2;
    }
  };
  return (
    <EditBox title={'hackathonDetail.timeline'} type={HackathonEditModalType.TIMELINE}>
      <div className="relative flex flex-col gap-[1.75rem]">
        <div
          className={`absolute left-[1rem]  w-[.1875rem] rounded-[6.25rem]   ${stepIndex > 0 ? 'bg-yellow-primary' : 'bg-neutral-light-gray'} ${isSame ? 'top-[3.25rem]  h-[1.75rem] ' : 'top-[4rem]  h-[3rem] '}`}
        ></div>
        <div
          className={`rounded-[6.25rem]] absolute   left-[1rem]  w-[.1875rem] ${stepIndex > 2 ? 'bg-yellow-primary' : 'bg-neutral-light-gray'} ${isSame ? 'bottom-[3.25rem]  h-[1.75rem] ' : 'bottom-[3.25rem]  h-[2.5rem] '}`}
        ></div>
        {hackathonDetailTimeLine.map((v, i) => (
          <div className="flex items-center gap-[2.5rem]" key={i}>
            {isSame ? (
              <>
                <div
                  className={`flex-center h-[2.125rem] w-[2.125rem] rounded-[50%] border border-dashed  ${getIsActive(i) ? 'border-neutral-rich-gray' : 'border-transparent'}`}
                >
                  <div
                    className={`h-[1.5rem] w-[1.5rem] rounded-[50%] border  ${getIsActive(i) ? 'border-yellow-primary  bg-yellow-primary' : 'border-neutral-medium-gray bg-neutral-off-white'}`}
                  ></div>
                </div>
                <div>
                  <p className={`body-l-bold ${getIsActive(i) ? 'text-neutral-black' : 'text-neutral-medium-gray'}`}>
                    {v.timeStr}
                  </p>
                  <p className={`body-s ${getIsActive(i) ? 'text-neutral-off-black' : 'text-neutral-medium-gray'}`}>
                    {/* {dayjs(hackathon?.timeline?.[v.time[i === 1 ? 1 : 0] as HackathonTimeLineKeyType])
                      .tz()
                      .format('MMM D,YYYY H:mm')}
                    (GMT+8) */}

                    {dayjs
                      .utc(hackathon?.timeline?.[v.time[i === 1 ? 1 : 0] as HackathonTimeLineKeyType])
                      .local()
                      .format('MMM D,YYYY H:mm')}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`flex-center h-[2.125rem] w-[2.125rem] rounded-[50%] border border-dashed  ${getIsActive(i) ? 'border-neutral-rich-gray' : 'border-transparent'}`}
                >
                  <div
                    className={`h-[1.5rem] w-[1.5rem] rounded-[50%] border  ${getIsActive(i) ? 'border-yellow-primary  bg-yellow-primary' : 'border-neutral-medium-gray bg-neutral-off-white'}`}
                  ></div>
                </div>
                <div>
                  <p className={`body-l-bold ${getIsActive(i) ? 'text-neutral-black' : 'text-neutral-medium-gray'}`}>
                    {v.key}
                  </p>
                  <p className={`body-s ${getIsActive(i) ? 'text-neutral-off-black' : 'text-neutral-medium-gray'}`}>
                    {/* {dayjs(hackathon?.timeline?.[v.time[0] as HackathonTimeLineKeyType])
                      .tz()
                      .format('MMM D,YYYY H:mm')}
                    (GMT+8) */}

                    {dayjs
                      .utc(hackathon?.timeline?.[v.time[0] as HackathonTimeLineKeyType])
                      .local()
                      .format('MMM D,YYYY H:mm')}
                  </p>
                  {hackathon?.timeline?.[v.time[1] as HackathonTimeLineKeyType] && (
                    <p className={`body-s ${getIsActive(i) ? 'text-neutral-off-black' : 'text-neutral-medium-gray'}`}>
                      {/* {dayjs(hackathon?.timeline?.[v.time[1] as HackathonTimeLineKeyType])
                        .tz()
                        .format('MMM D,YYYY H:mm')}
                      (GMT+8) */}

                      {dayjs
                        .utc(hackathon?.timeline?.[v.time[1] as HackathonTimeLineKeyType])
                        .local()
                        .format('MMM D,YYYY H:mm')}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </EditBox>
  );
};

export default TimeLine;
