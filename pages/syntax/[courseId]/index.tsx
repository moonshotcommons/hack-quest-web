// ./pages/article/[articleId].tsx
import CourseDescription from '@/components/Course/CourseDetail/CourseDescription';
import CourseDetailBanner from '@/components/Course/CourseDetail/CourseDetailBranner';
import CourseDetailInfo from '@/components/Course/CourseDetail/CouseDetailInfo';
import UnitList from '@/components/Course/UnitList';
import { Block } from '@/components/TempComponent/Block';
import { tagFormate } from '@/helper/formate';
import webApi from '@/service';
import { CourseDetailType } from '@/service/webApi/course/type';
import wrapper, { AppRootState } from '@/store/redux';
import { useRequest } from 'ahooks';
import { Typography, message } from 'antd';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

interface IProps {
  //   courseId: string;
  //   courseDetail: CourseDetailType;
}

const SyntaxDetail: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { courseId } = router.query;
  const [courseDetail, setCourseDetail] = useState<CourseDetailType>();

  useEffect(() => {
    webApi.courseApi.getCourseDetail(courseId as string, true).then((res) => {
      setCourseDetail(res);
    });
  }, [courseId, router, setCourseDetail]);

  return (
    <div className="px-[5.5rem]">
      <CourseDetailBanner courseDetail={courseDetail}></CourseDetailBanner>

      <CourseDetailInfo courseDetail={courseDetail}></CourseDetailInfo>
      <div className="mt-[4rem]">
        <CourseDescription>
          {courseDetail?.aboutDesc?.map((item) => {
            return <Block key={item.id} block={item}></Block>;
          })}
        </CourseDescription>
      </div>
      <h2 className="text-[#F2F2F2] font-next-book text-[1.75rem] mt-[4rem]">
        Course structure
      </h2>
      <div className="mt-[2.5rem]">
        <UnitList courseDetail={courseDetail}></UnitList>
      </div>
    </div>
  );
};

export default SyntaxDetail;
