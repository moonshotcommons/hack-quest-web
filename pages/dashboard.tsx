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
        {filterCourseList.map((card, index) => {
          return <div key={index}>{renderCourseCard(card)}</div>;
        })}
      </>
    );
  }, [selectTab, courseList]);

  return (
    <div className="w-full">
      {userInfo && (
        <h1 className="text-[#FFF] font-neuemachina font-bold text-[1.25rem] leading-[110%] mt-[2.8125rem]">{`( “Welcome, ${userInfo.name}” )`}</h1>
      )}
      {learningTracks.length && (
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
