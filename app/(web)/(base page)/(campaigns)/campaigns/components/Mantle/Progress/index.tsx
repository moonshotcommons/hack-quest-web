import React, { useContext, useMemo } from 'react';
import Image from 'next/image';
import BIcon from '@/public/images/campaigns/b_icon.png';
import { DM_Sans } from 'next/font/google';
import { MantleContext } from '../../../constants/type';
const inter = DM_Sans({
  weight: ['400', '700', '500'],
  subsets: ['latin', 'latin-ext']
});
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
    <div className={`text-[#000] ${inter.className} mb-[30px]`}>
      <div className="flex gap-[0.5%] relative">
        {schedule.schedulePeriod.map((s, i) => (
          <div key={i} className="w-[19.6%]">
            <div className="relative h-[25px]">
              {(schedule.curPeriod === i ||
                (i === periodNum - 1 && s[0] === s[1])) && (
                <div
                  className="absolute h-[40px] top-0 translate-x-[-100%] transition-all border-r border-r-yellow-primary pr-[2px]"
                  style={{
                    left: `${(s[0] / s[1]) * 100}%`
                  }}
                >
                  <span className="relative top-[-3px]">{progress[0]}</span>
                </div>
              )}
            </div>
            <div className="w-full h-[15px] bg-[#DADADA] mb-[14px]">
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
          className="absolute left-0 bottom-[4px]"
        ></Image>
      </div>
    </div>
  );
};

export default Progress;
