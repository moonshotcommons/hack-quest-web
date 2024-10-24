import React, { useContext } from 'react';
import { HackathonTimeLineKeyType, HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import dayjs from '@/components/Common/Dayjs';
import { hackathonDetailTimeLine } from '../../../constants/data';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonEditModalType } from '../../../constants/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

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
      <div className="relative flex items-center justify-between ">
        <div
          className={`absolute bottom-[16px] left-[151px] h-[3px] w-[calc((100%-404px)/2)] rounded-[100px]  ${stepIndex > 0 ? 'bg-yellow-primary' : 'bg-neutral-light-gray'}`}
        ></div>
        <div
          className={`absolute bottom-[16px] right-[151px] h-[3px] w-[calc((100%-404px)/2)] rounded-[100px] ${stepIndex > 2 ? 'bg-yellow-primary' : 'bg-neutral-light-gray'}`}
        ></div>
        {hackathonDetailTimeLine.map((v, i) => (
          <div className="flex w-[200px] flex-col items-center" key={v.key}>
            {isSame ? (
              <>
                <p className={`body-l-bold ${getIsActive(i) ? 'text-neutral-black' : 'text-neutral-medium-gray'}`}>
                  {v.timeStr}
                </p>
                <div className="mt-[4px] flex h-[44px] flex-col justify-center">
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
                <p className={`body-l-bold ${getIsActive(i) ? 'text-neutral-black' : 'text-neutral-medium-gray'}`}>
                  {v.key}
                </p>
                <div className="mt-[4px] flex h-[44px] flex-col justify-center">
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

            <div
              className={`flex-center mt-[10px] h-[34px] w-[34px] rounded-[50%] border border-dashed  ${i === stepIndex ? 'border-neutral-rich-gray' : 'border-transparent'}`}
            >
              <div
                className={`h-[24px] w-[24px] rounded-[50%] border  ${getIsActive(i) ? 'border-yellow-primary  bg-yellow-primary' : 'border-neutral-medium-gray bg-neutral-off-white'}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </EditBox>
  );
};

export default TimeLine;
