import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import dayjs from '@/components/Common/Dayjs';
import { hackathonDetailTimeLine } from '../../constants/data';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface TimeLineProp {
  hackathon: HackathonType;
}

const TimeLine: React.FC<TimeLineProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const stepIndex = 0;
  return (
    <EditBox title={'hackathonDetail.timeline'}>
      <div className="relative flex items-center justify-between ">
        <div
          className={`absolute bottom-[16px] left-[151px] h-[3px] w-[calc((100%-404px)/2)] rounded-[100px]  ${stepIndex > 0 ? 'bg-yellow-primary' : 'bg-neutral-light-gray'}`}
        ></div>
        <div
          className={`absolute bottom-[16px] right-[151px] h-[3px] w-[calc((100%-404px)/2)] rounded-[100px] ${stepIndex > 1 ? 'bg-yellow-primary' : 'bg-neutral-light-gray'}`}
        ></div>
        {hackathonDetailTimeLine.map((v, i) => (
          <div className="flex w-[200px] flex-col items-center" key={v.key}>
            <p className={`body-l-bold ${i > stepIndex ? 'text-neutral-medium-gray' : 'text-neutral-black'}`}>
              {t(`hackathonDetail.${v.key}`)}
            </p>
            <p className={`body-s ${i > stepIndex ? 'text-neutral-medium-gray' : 'text-neutral-off-black'}`}>
              {dayjs(hackathon[v.time as 'openTime' | 'reviewTime' | 'rewardTime'])
                .tz()
                .format('MMM D,YY H:mm')}
              (GMT+8)
            </p>
            <div
              className={`flex-center mt-[10px] h-[34px] w-[34px] rounded-[50%] border border-dashed  ${i === stepIndex ? 'border-neutral-rich-gray' : 'border-transparent'}`}
            >
              <div
                className={`h-[24px] w-[24px] rounded-[50%] border  ${i > stepIndex ? 'border-neutral-medium-gray bg-neutral-off-white' : 'border-yellow-primary  bg-yellow-primary'}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </EditBox>
  );
};

export default TimeLine;
