// ./pages/article/[articleId].tsx
import CourseDescription from '@/components/Course/CourseDetail/CourseDescription';
import CourseDetailBanner from '@/components/Course/CourseDetail/CourseDetailBranner';
import CourseDetailInfo from '@/components/Course/CourseDetail/CouseDetailInfo';
import UnitList from '@/components/Course/UnitList';
import { tagFormate } from '@/helper/formate';
import webApi from '@/service';
import { CourseDetailType } from '@/service/webApi/course/type';
import wrapper, { AppRootState } from '@/store/redux';
import { Typography, message } from 'antd';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { shallowEqual, useSelector } from 'react-redux';
import Congrats from '@/public/images/course/congrats.svg';

interface IProps {
  courseId: string;
  courseDetail?: CourseDetailType;
  lessonId: string;
}

const SyntaxDetail: NextPage<IProps> = (props) => {
  const { courseId, courseDetail, lessonId } = props;
  return (
    <div className="w-[59.125rem] h-[22.6875rem] bg-[#141414] rounded-[2.5rem] m-auto mt-[10.5rem] flex flex-col items-center">
      <div className="mt-[5rem]">
        <Image src={Congrats} alt="completed"></Image>
      </div>
      <h1 className="font-next-poster-Bold text-[1.5rem] leading-[100%]  text-[#f2f2f2] mt-[2rem]">
        Congrats!
      </h1>
      <p className="font-next-book text-[0.875rem] text-[#B2B2B2] mt-[2rem] leading-[128%]">{`By this point, you've completed the guided project!`}</p>
    </div>
  );
};

export default SyntaxDetail;
