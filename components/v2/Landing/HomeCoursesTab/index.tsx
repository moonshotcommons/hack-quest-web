import BottomIcon from '@/components/v2/Common/Icon/Bottom';
import RightIcon from '@/components/v2/Common/Icon/Right';
import SkipIcon from '@/components/v2/Common/Icon/Skip';
import { FC, useState } from 'react';
import { tabData } from './data';
import Link from 'next/link';
import { renderCourseCard } from '@/helper/renderCard';
import { cn } from '@/helper/utils';
interface HomeCourseTabProps {
  // children: ReactNode;
}

const HomeCourseTab: FC<HomeCourseTabProps> = (props) => {
  const [selectTabItem, setSelectTabItem] = useState<(typeof tabData)[number]>(
    tabData[0]
  );

  return (
    <div>
      <div className="text-text-default-color mt-[18.37rem] relative font-next-poster-Bold font-bold text-[2.5rem] text-center z-[99]">
        What we offer...
      </div>
      <div className="flex justify-center mt-[5.25rem] relative z-[99] items-center gap-[1.25rem]">
        {tabData.map((item) => {
          return (
            <div
              key={item.title}
              className={cn(
                `
              flex items-center w-fit px-[2rem] py-[1.25rem] font-next-book-Thin bg-landing-tab-bg
              text-[1rem] rounded-[2.25rem] border border-solid border-landing-tab-border-color
              hover:bg-landing-tab-hover-bg hover:text-landing-tab-hover-text-color
              hover:border-landing-tab-hover-border-color cursor-pointer text-landing-tab-text-color
              `,
                item.type === selectTabItem?.type
                  ? 'text-landing-tab-hover-text-color bg-landing-tab-hover-bg border-landing-tab-hover-border-color'
                  : ''
              )}
              onClick={() => setSelectTabItem(item)}
            >
              <div>{item.title}</div>
              {item.type === selectTabItem?.type && (
                <span
                  className={cn(
                    `mb-1 ml-[0.62rem]  text-landing-tab-hover-text-color`
                  )}
                >
                  <BottomIcon
                    width={11}
                    height={17}
                    color="currentColor"
                  ></BottomIcon>
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-[5rem]">
        <div className="">
          <div className="w-fit whitespace-nowrap flex items-center font-next-book-bold text-text-default-color text-[2rem] rounded-[5rem] gap-[1.5rem]">
            <div>{selectTabItem.title}</div>
            <RightIcon></RightIcon>
          </div>
          <div className="w-[19.625rem] mt-[1.25rem] font-next-book text-[1rem] text-text-default-color">
            {selectTabItem.description}
          </div>
          <Link href={'/courses'}>
            <div className="flex w-fit text-text-default-color font-next-book text-[1.25rem] items-center gap-[0.31rem] mt-8">
              <div>
                <span>Explore All Course</span>
                <span className="block h-[.125rem] w-full bg-yellow-primary"></span>
              </div>
              <span className="text-text-default-color">
                <SkipIcon color="currentColor"></SkipIcon>
              </span>
            </div>
          </Link>
        </div>
        <div className="flex gap-[2.5rem]">
          {selectTabItem?.cards.map((item) => {
            return <div key={item.id}>{renderCourseCard(item as any)}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeCourseTab;
