import React from 'react';
import CentralTitle from '../CentralTitle';
import { prizeTrackData } from '@/app/[lang]/(web)/(other)/hackdegalaxy/constants/data';

interface PrizeTrackProp {}

const PrizeTrack: React.FC<PrizeTrackProp> = () => {
  return (
    <div>
      <CentralTitle title="prizeTrack" />
      <div className="text-[.875rem] text-neutral-off-white">
        <div className="flex flex-col gap-[1.25rem]">
          {prizeTrackData.skill.map((v, i) => (
            <div key={i} className=" flex items-center justify-between">
              <span>{v.title}</span>
              <div className="flex gap-[8px]">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className={`h-[12px] w-[12px] rounded-[50%] border border-neutral-white ${v.level > j ? 'bg-neutral-white' : ''}`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[1.25rem] flex-1">{prizeTrackData.text}</div>
      </div>
    </div>
  );
};

export default PrizeTrack;
