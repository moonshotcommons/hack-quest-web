import React from 'react';
import CentralTitle from '../CentralTitle';
import { scheduleData } from '@/app/[lang]/(web)/(other)/central-dao/constants/data';

interface ScheduleProp {}

const Schedule: React.FC<ScheduleProp> = () => {
  return (
    <div>
      <CentralTitle title="schedule" />
      <div className="flex flex-col gap-[1.25rem] text-[.875rem] text-neutral-off-white">
        {scheduleData.map((v, i) => (
          <div key={i} className="">
            <p className="font-bold">{v.time}</p>
            <p className="mt-[.5rem]">{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
