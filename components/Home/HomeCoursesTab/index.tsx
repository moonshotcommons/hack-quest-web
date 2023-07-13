import BottomIcon from '@/components/Common/Icon/Bottom';
import RightIcon from '@/components/Common/Icon/Right';
import SkipIcon from '@/components/Common/Icon/Skip';
import { CourseType } from '@/service/webApi/course/type';
import { FC, ReactNode, useState } from 'react';
import { tabData, renderCard } from './data';
import Link from 'next/link';
interface HomeCourseTabProps {
  // children: ReactNode;
}

const HomeCourseTab: FC<HomeCourseTabProps> = (props) => {
  const [selectTabItem, setSelectTabItem] = useState<(typeof tabData)[number]>(
    tabData[0]
  );

  return (
    <div>
      <div className="text-[#F5F5F5] mt-[18.37rem] relative font-next-poster-Bold font-bold text-[2.5rem] text-center z-[99]">
        What we offer...
      </div>
      <div className="flex justify-center mt-[4.25rem] relative z-[99] items-center gap-[1.25rem]">
        {tabData.map((item) => {
          return (
            <div
              key={item.title}
              className={`flex items-center w-fit px-[2rem] py-[1.25rem]  font-next-book-Thin text-[#F5F5F5] text-[1rem] rounded-[2.25rem] border border-solid border-[#F5F5F5] gap-[0.62rem] hover:bg-[#D9D9D9] hover:text-black hover:border-none cursor-pointer ${
                item.type === selectTabItem?.type
                  ? 'text-black bg-[#D9D9D9] border-none'
                  : ''
              }`}
              onClick={() => setSelectTabItem(item)}
            >
              <div>{item.title}</div>
              <span className="mb-1">
                {item.type === selectTabItem?.type ? (
                  <BottomIcon width={11} height={17} color="black"></BottomIcon>
                ) : null}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-[5rem]">
        <div className="">
          <div className="w-fit whitespace-nowrap flex items-center font-next-book-bold text-[#F5F5F5] text-[2rem] rounded-[5rem] gap-[1.5rem]">
            <div>{selectTabItem.title}</div>
            <RightIcon></RightIcon>
          </div>
          <div className="w-[19.625rem] mt-[1.25rem] font-next-book text-[1rem] text-[#F5F5F5]">
            {selectTabItem.description}
          </div>
          <Link href={'/courses'}>
            <div className="flex w-fit text-[#F5F5F5] font-next-book text-[1.25rem] items-center gap-[0.31rem] mt-8">
              <div>
                <span>Explore All Course</span>
                <span className="block h-[.0625rem] w-full bg-[#595959]"></span>
              </div>
              <SkipIcon></SkipIcon>
            </div>
          </Link>
        </div>
        <div className="flex gap-[2.5rem]">
          {selectTabItem?.cards.map((item) => {
            return <div key={item.id}>{renderCard(item)}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeCourseTab;
