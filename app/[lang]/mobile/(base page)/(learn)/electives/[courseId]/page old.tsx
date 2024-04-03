'use client';
import Loading from '@/components/Common/Loading';
import CourseDetail from '@/components/Web/DetailPage/CourseDetail';
import webApi from '@/service';
import { ElectiveCourseDetailType } from '@/service/webApi/elective/type';
import type { NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IProps {
  //   courseId: string;
  //   courseDetail: CourseDetailType;
}

const CourseDetailPage: NextPage<IProps> = (props) => {
  const { courseId } = useParams();
  const [courseDetail, setCourseDetail] = useState<ElectiveCourseDetailType>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    webApi.courseApi.getCourseDetail<ElectiveCourseDetailType>(courseId as string, true).then((res) => {
      setCourseDetail(res);
      setIsLoading(false);

      // update title and description
      document.title = res.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', res.description);
    });
  }, [courseId, setCourseDetail]);

  return (
    <div className="container mx-auto">
      <Loading loading={isLoading} className="mt-[50vh]">
        <CourseDetail courseDetail={courseDetail}></CourseDetail>
      </Loading>
    </div>
  );
};

export default CourseDetailPage;
