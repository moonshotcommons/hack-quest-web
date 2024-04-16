import React from 'react';
import CentralTitle from '../CentralTitle';
import { scheduleData } from '../../constants/data';

interface ScheduleProp {}

const Schedule: React.FC<ScheduleProp> = () => {
  return (
    <div>
      <CentralTitle title="schedule" />
      <div className="flex flex-col gap-[24px] text-[16px] text-neutral-off-white">
        {scheduleData.map((v, i) => (
          <div key={i} className="flex ">
            <span className="w-[200px] flex-shrink-0 font-bold">{v.time}</span>
            <span>{v.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
