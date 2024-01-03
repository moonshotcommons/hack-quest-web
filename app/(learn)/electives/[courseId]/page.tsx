'use client';
import Loading from '@/components/v2/Common/Loading';
import CourseDetail from '@/components/v2/DetailPage/CourseDetail';
import webApi from '@/service';
import { CourseDetailType } from '@/service/webApi/course/type';
import type { NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IProps {
  //   courseId: string;
  //   courseDetail: CourseDetailType;
}

const CourseDetailPage: NextPage<IProps> = (props) => {
  const { courseId } = useParams();
  const [courseDetail, setCourseDetail] = useState<CourseDetailType>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    webApi.courseApi.getCourseDetail(courseId as string, true).then((res) => {
      setCourseDetail(res);
      setIsLoading(false);

      // update title and description
      document.title = res.name;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', res.description);
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
