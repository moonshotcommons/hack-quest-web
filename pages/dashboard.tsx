import { SliderContainer } from '@/components/Common/SliderContainer';
import Tab, { TabItem } from '@/components/Common/Tab';
import Title from '@/components/Common/Title';
import { coursesTabs } from '@/constants';
import { renderCourseCard, renderLearningTrackCard } from '@/helper/renderCard';
import {
  useGetCourses,
  useLoadCourseList
} from '@/hooks/useCoursesHooks/useGetCourses';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useGetLearningTracks } from '@/hooks/useLearningTrackHooks/useLearningTracks';
import { CourseType } from '@/service/webApi/course/type';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import Reflect from '@/public/images/course/reflect.svg';
import Image from 'next/image';
import { tagFormate } from '@/helper/formate';
import Link from 'next/link';
interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: NextPage<DashboardProps> = (props) => {
  const userInfo = useGetUserInfo();
  const hashCourseTypeRef = useRef<HTMLElement>();
  const { learningTracks } = useGetLearningTracks(false);
  useLoadCourseList();
  const courseList = useGetCourses();
  const router = useRouter();
  const { courseType } = router.query;
  const [selectTab, setSelectTab] = useState<CourseType>(
    (courseType as CourseType) || coursesTabs[0].type
  );

  const onSelect = (item: TabItem) => {
    setSelectTab(item.type);
  };

  const SelectCourseCards = useMemo(() => {
    const filterCourseList = courseList?.filter(
      (course) => course.type === selectTab && course.progress > 0
    );

    return (
      <>
        {filterCourseList.length > 0 &&
          filterCourseList.map((card, index) => {
            return <div key={index}>{renderCourseCard(card)}</div>;
          })}
        {!filterCourseList.length && (
          <div className="w-full border h-[15.5rem] rounded-[1.25rem] border-[#282828] flex flex-col items-center justify-center gap-[1.5rem]">
            <Image src={Reflect} alt="reflect"></Image>
            <p className="text-[#676767] font-next-book leading-[120%] tracking-[0.01rem] text-[1rem]">
              You haven’t started any {tagFormate(selectTab)} yet.
            </p>
            <Link href={`/courses?courseType=${selectTab}`}>
              <button className="border border-solid border-text-default-color py-4 px-8 rounded-[2.5rem] text-sm text-text-default-color leading-[120%]">
                View All {tagFormate(selectTab)}
              </button>
            </Link>
          </div>
        )}
      </>
    );
  }, [selectTab, courseList]);

  return (
    <div className="w-full">
      {userInfo && (
        <h1 className="text-text-default-color font-neuemachina font-bold text-[1.25rem] leading-[110%] mt-[2.8125rem]">{`( “Welcome, ${userInfo.name}” )`}</h1>
      )}
      {!!learningTracks.length && (
        <div>
          <Title className="font-bold">{'</Learning Tracks>'}</Title>
          <SliderContainer>
            <div className="flex h-[17.625rem] gap-[3.25rem] items-end">
              {learningTracks?.map((learningTrack, index) => {
                return (
                  <div key={index}>
                    {renderLearningTrackCard(learningTrack)}
                  </div>
                );
              })}
            </div>
          </SliderContainer>
        </div>
      )}

      <div ref={hashCourseTypeRef as any}>
        <div className="mt-[2.875rem]">
          <Tab
            tabs={coursesTabs}
            onSelect={onSelect}
            defaultSelect={selectTab}
          ></Tab>
        </div>
        <div className="flex flex-wrap gap-[3.25rem] mt-10">
          {SelectCourseCards}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
