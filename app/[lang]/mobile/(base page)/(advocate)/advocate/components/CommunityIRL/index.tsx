import { FC } from 'react';
import CommunityIRLCard from './CommunityIRLCard';
import { bottomDataList, topDataList } from './constant';
import Link from 'next/link';
import ScrollArea from './ScrollArea';

interface CommunityIRLProps {}

const CommunityIRL: FC<CommunityIRLProps> = (props) => {
  const leftContent = (
    <div className="flex justify-center gap-5">
      {topDataList.map((item, index) => {
        return (
          <CommunityIRLCard key={index} title={item.title} image={item.image} place={item.place} date={item.date}></CommunityIRLCard>
          // </div>
        );
      })}
    </div>
  );

  const rightContent = (
    <div className="flex justify-center gap-5">
      {bottomDataList.map((item, index) => {
        return <CommunityIRLCard key={index} title={item.title} image={item.image} place={item.place} date={item.date}></CommunityIRLCard>;
      })}
    </div>
  );

  return (
    <div className="mt-[100px]">
      <h2 className="text-h2 text-center text-neutral-off-black">HackQuest Community IRL 👀</h2>
      <ScrollArea leftContent={leftContent} rightContent={rightContent} />
      <div className="container mx-auto flex justify-center">
        <Link
          href={'https://moonshotcommons.notion.site/HackQuest-Past-Events-0a39befe0cd643559443d73e945fe0e1?pvs=4'}
          target="_blank"
          className="body-m-bold flex cursor-pointer items-center gap-2 text-center"
        >
          <span className="relative after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
            View Events
          </span>
          <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 3.5L10 8.79412L2.5 14.0882" stroke="#0B0B0B" strokeWidth="1.76471" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CommunityIRL;
