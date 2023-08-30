import {
  ChangeState,
  ScrollContainer
} from '@/components/Common/ScrollContainer';
import {
  useGetCourses,
  useLoadCourseList
} from '@/hooks/useCoursesHooks/useGetCourses';
import { CourseType } from '@/service/webApi/course/type';
import { FC, useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import CourseCard from '../../CourseCard';
import ScrollControl from './ScrollControl';
interface FeatureCoursesProps {}

const FeaturedCourseHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-[15px]">
        <h2 className="font-next-poster-Bold text-[28px] tracking-[1.68px] text-[#000]">
          Featured Selective Courses
        </h2>
        <p className="w-[540px] text-[14px] leading-[160%] font-next-book text-[#000]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="flex gap-x-[15px] items-center">
        <span>View All</span>
        <LuChevronRight size={32}></LuChevronRight>
      </div>
    </div>
  );
};

const FeatureCourses: FC<FeatureCoursesProps> = (props) => {
  useLoadCourseList();
  const courseList = useGetCourses();

  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();

  return (
    <div className="w-full bg-[#FFF4CE] py-[60px]">
      <div className="container mx-auto">
        <FeaturedCourseHeader></FeaturedCourseHeader>
        <ScrollContainer
          onChange={(state: any) => setScrollContainerState(state)}
        >
          <div className="my-[30px] flex gap-[20px] overflow-x-hidden">
            {courseList
              .filter((item) =>
                [CourseType.SYNTAX, CourseType.GUIDED_PROJECT].includes(
                  item.type
                )
              )
              .map((course, index) => {
                if (index > 4) return null;
                return (
                  <CourseCard key={course.id} course={course}></CourseCard>
                );
              })}
          </div>
        </ScrollContainer>
        <ScrollControl changeState={scrollContainerState}></ScrollControl>
      </div>
    </div>
  );
};

export default FeatureCourses;
