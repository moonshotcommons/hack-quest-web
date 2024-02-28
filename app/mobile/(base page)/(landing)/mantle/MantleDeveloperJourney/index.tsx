import { FC } from 'react';
import Image from 'next/image';
import { developerCardData } from './constant';
import DeveloperCard from './DeveloperCard';

interface MantleDeveloperJourneyProps {}

const MantleDeveloperJourney: FC<MantleDeveloperJourneyProps> = async (
  props
) => {
  return (
    <div className="mx-auto flex w-full max-w-[77.5rem] flex-col items-center px-5 text-center">
      <div className="flex w-full flex-col items-center gap-8">
        <h3 className="text-[36px] font-medium leading-[110%] -tracking-[1.92px] text-white">
          Mantle Developer Journey
        </h3>
        <p className="w-full text-[1.125rem] leading-[140%] text-[#C4C4C4]">
          {`Developers reach 500 developer miles can claim Mantle learning certificate and participate in lucky draw.`}
        </p>
        <div className="relative h-0 w-full pt-[calc(9.051282%+40px)]">
          <Image
            src={'/images/mantle/milestone_progress_mobile.svg'}
            alt="milestone_progress"
            fill
          ></Image>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-4 [&>div]:w-[calc((100%-16px)/2)]">
        {developerCardData.map((item) => {
          return <DeveloperCard key={item.title} data={item} />;
        })}
      </div>
    </div>
  );
};

export default MantleDeveloperJourney;
