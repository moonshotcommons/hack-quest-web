import {
  ChangeState,
  ScrollContainer
} from '@/components/Common/ScrollContainer';
import webApi from '@/service';
import { CourseDataType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
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
      <Link
        href={'/v2/electives'}
        className="flex gap-x-[15px] items-center text-[#0B0B0B] hover:opacity-70 font-next-book tracking-[0.36px] text-[18px]"
      >
        <span>View All</span>
        <LuChevronRight size={32}></LuChevronRight>
      </Link>
    </div>
  );
};

const FeatureCourses: FC<FeatureCoursesProps> = (props) => {
  const [courseList, setCourseList] = useState<CourseDataType[]>([]);
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();

  const { run, loading } = useRequest(
    async () => {
      const res = await webApi.courseApi.getCourseList('featured=true');
      return res.data;
    },
    {
      onSuccess(courses) {
        setCourseList(courses);
      },
      onError(error: any) {
        console.log(error);
        // message.error(error.msg);
      }
    }
  );

  return (
    <div className="w-full bg-[#FFF4CE] py-[60px]">
      <div className="container mx-auto">
        <FeaturedCourseHeader></FeaturedCourseHeader>
        <ScrollContainer
          onChange={(state: any) => setScrollContainerState(state)}
        >
          <div className="my-[30px] flex gap-[20px] overflow-x-hidden">
            {courseList.map((course, index) => {
              return <CourseCard key={course.id} course={course}></CourseCard>;
            })}
          </div>
        </ScrollContainer>
        <ScrollControl changeState={scrollContainerState}></ScrollControl>
      </div>
    </div>
  );
};

export default FeatureCourses;
