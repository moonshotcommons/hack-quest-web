import React from 'react';
import CentralTitle from '../CentralTitle';
import { prizeTrackData } from '../../constants/data';

interface PrizeTrackProp {}

const PrizeTrack: React.FC<PrizeTrackProp> = () => {
  return (
    <div>
      <CentralTitle title="prizeTrack" />
      <div className="flex gap-[20px] text-[16px] text-neutral-off-white">
        <div className="flex flex-col gap-[20px] pr-[70px]">
          {prizeTrackData.skill.map((v, i) => (
            <div key={i} className=" flex items-center">
              <span className="w-[153px]">{v.title}</span>
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
        <div className="flex-1 ">{prizeTrackData.text}</div>
      </div>
    </div>
  );
};

export default PrizeTrack;
