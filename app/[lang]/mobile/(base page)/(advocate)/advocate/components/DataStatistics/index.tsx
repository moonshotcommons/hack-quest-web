import { FC } from 'react';
import CountUp from './CountUp';
interface DataStatisticsProps {}

const DataStatistics: FC<DataStatisticsProps> = (props) => {
  return (
    <div className="container relative mx-auto h-[195.5px]">
      <div className="absolute bottom-0 right-0 h-[220px] w-[1350px] gap-[32px] rounded-sm border border-dashed border-neutral-black bg-[#EDEDED]"></div>
      <div className="absolute bottom-[10px] left-0 flex h-[220px] w-[1350px] justify-between border border-neutral-black bg-neutral-white">
        <div className="mt-[58px] flex flex-1 flex-col items-center gap-4">
          <p className="text-h2 text-neutral-off-black">
            $
            <CountUp start={0} end={110} duration={3} enableScrollSpy></CountUp>
            M+
          </p>
          <p className="body-l w-[234px] text-center text-neutral-medium-gray">
            Funding Raised by Community Projects
          </p>
        </div>
        <div className="mt-[58px] flex flex-1 flex-col items-center gap-4">
          <p className="text-h2 text-neutral-off-black">
            <CountUp start={0} end={30} duration={3} enableScrollSpy></CountUp>+
          </p>
          <p className="body-l w-[234px] text-center text-neutral-medium-gray">
            Hackathons Hosted
          </p>
        </div>
        <div className="mt-[58px] flex flex-1 flex-col items-center gap-4">
          <p className="text-h2 text-neutral-off-black">
            <CountUp
              start={0}
              end={2400}
              duration={3}
              enableScrollSpy
            ></CountUp>
            +
          </p>
          <p className="body-l w-[234px] text-center text-neutral-medium-gray">
            Hackathon Projects
          </p>
        </div>
        <div className="mt-[58px] flex flex-1 flex-col items-center gap-4">
          <p className="text-h2 text-neutral-off-black">
            <CountUp start={0} end={65} duration={3} enableScrollSpy></CountUp>+
          </p>
          <p className="body-l w-[234px] text-center text-neutral-medium-gray">
            Venture-backed Projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataStatistics;
