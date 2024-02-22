import React, { useContext, useMemo } from 'react';
import Image from 'next/image';
import BIcon from '@/public/images/campaigns/b_icon.png';
import { MantleContext } from '../../../constants/type';
interface ProgressProp {}

const Progress: React.FC<ProgressProp> = () => {
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
    <div className={`mb-[30px] text-neutral-black`}>
      <div className="relative flex gap-[0.5%]">
        {schedule.schedulePeriod.map((s, i) => (
          <div key={i} className="w-[19.6%]">
            <div className="relative h-[25px]">
              {(schedule.curPeriod === i ||
                (i === periodNum - 1 && s[0] === s[1])) && (
                <div
                  className="absolute top-0 h-[40px] translate-x-[-100%] border-r border-r-yellow-primary pr-[2px] transition-all"
                  style={{
                    left: `${(s[0] / s[1]) * 100}%`
                  }}
                >
                  <span className="relative top-[-3px]">{progress[0]}</span>
                </div>
              )}
            </div>
            <div className="mb-[14px] h-[15px] w-full bg-[#DADADA]">
              <div
                className="h-[15px] bg-yellow-primary shadow-[0_0_8px_#ffd850] transition-all"
                style={{
                  width: `${(s[0] / s[1]) * 100}%`
                }}
              ></div>
            </div>
            <div className="text-right">{s[1] * (i + 1)}</div>
          </div>
        ))}
        <Image
          src={BIcon}
          width={22}
          alt="icon"
          className="absolute bottom-[4px] left-0"
        ></Image>
      </div>
    </div>
  );
};

export default Progress;
