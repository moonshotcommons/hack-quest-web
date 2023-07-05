// ./pages/article/[articleId].tsx
import CourseDescription from '@/components/Course/CourseDetail/CourseDescription';
import CourseDetailBanner from '@/components/Course/CourseDetail/CourseDetailBranner';
import CourseDetailInfo from '@/components/Course/CourseDetail/CouseDetailInfo';
import { tagFormate } from '@/helper/formate';
import { AppRootState } from '@/store/redux';
import { Typography } from 'antd';
import type { NextPage } from 'next';
import Image from 'next/image';
import { shallowEqual, useSelector } from 'react-redux';

interface IProps {
  courseId: string;
}

const Syntax: NextPage<IProps> = ({ courseId }) => {
  const { courseDetail } = useSelector((state: AppRootState) => {
    return {
      courseDetail: state.course.courseList.find(
        (course) => course.id === courseId
      )
    };
  }, shallowEqual);
  return (
    <div className="px-[5.5rem]">
      <CourseDetailBanner courseDetail={courseDetail}></CourseDetailBanner>
      <CourseDetailInfo courseDetail={courseDetail}></CourseDetailInfo>
      <div className="mt-[4rem]">
        <CourseDescription>
          {`Here, we will learn how to write a custom token and try to interact with it! Our token supports minting, transferring and balance checking.

Working on this project allows you to understand how all of the tokens in current Ethereum ecosystem work in low level... </ View More>`}
        </CourseDescription>
      </div>
      <h2 className="text-[#F2F2F2] font-next-book text-[1.75rem] mt-[4rem]">
        Course structure
      </h2>
    </div>
  );
};

Syntax.getInitialProps = (context) => {
  const { courseId } = context.query;
  return {
    courseId: courseId as string
  };
};

export default Syntax;
