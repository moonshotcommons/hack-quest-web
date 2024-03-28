import React, { useContext, useMemo } from 'react';
import Image from 'next/image';
import BIcon from '@/public/images/campaigns/b_icon.png';
import { MantleContext } from '../../../constants/type';
interface ProgressProp {}

const Progress: React.FC<ProgressProp> = () => {
  const mantle = useContext(MantleContext).mantle;
  const { progress } = useContext(MantleContext).mantle;
  const periodNum = 5;
  const schedule = useMemo(() => {
    const average = progress[1] / periodNum;
    let curPeriod = Math.floor(progress[0] / average);
    const schedulePeriod = Array.from({ length: periodNum }).map((v, i) => {
      const c = progress[0] - average * i < 0 ? 0 : progress[0] - average * i;
      const curSchedule = progress[0] > average * (i + 1) ? average : c;
      return [curSchedule, average];
    });
    return {
      curPeriod,
      schedulePeriod
    };
  }, [progress]);
  return (
    <div
      className={`body-m fixed bottom-0 left-0  w-full bg-neutral-off-white px-[1.25rem] py-[.5rem] text-neutral-black shadow-[0_-4px_8px_0_rgba(0,0,0,0.12)]`}
    >
      <p className="caption-12pt mb-[.375rem] text-neutral-off-black">{`Your journey to ${mantle.certification?.name}`}</p>
      <div className="caption-10pt relative flex gap-[0.5%]">
        {schedule.schedulePeriod.map((s, i) => (
          <div key={i} className="w-[19.6%]">
            <div className="relative h-[1.0625rem]">
              {(schedule.curPeriod === i || (i === periodNum - 1 && s[0] === s[1])) && (
                <div
                  className="absolute top-0 h-full translate-x-[-100%] border-r border-r-yellow-primary pr-[2px] transition-all"
                  style={{
                    left: `${(s[0] / s[1]) * 100}%`
                  }}
                >
                  <span className="relative top-[-3px]">{progress[0]}</span>
                </div>
              )}
            </div>
            <div className="mb-[.25rem] h-[0.5rem] w-full bg-neutral-light-gray">
              <div
                className="h-[.5rem] bg-yellow-dark shadow-[0_0_2px_#F9D81C] transition-all"
                style={{
                  width: `${(s[0] / s[1]) * 100}%`
                }}
              ></div>
            </div>
            <div className="text-right">{s[1] * (i + 1)}</div>
          </div>
        ))}
        <Image src={BIcon} width={14} alt="icon" className="absolute bottom-[0px] left-0"></Image>
      </div>
    </div>
  );
};

export default Progress;
