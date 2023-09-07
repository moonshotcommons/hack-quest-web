// ./pages/article/[articleId].tsx

import Loading from '@/components/v2/Common/Loading';
import CourseDetail from '@/components/v2/DetailPage/CourseDetail';
import webApi from '@/service';
import { CourseDetailType } from '@/service/webApi/course/type';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IProps {
  //   courseId: string;
  //   courseDetail: CourseDetailType;
}

const CourseDetailPage: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { courseId } = router.query;
  const [courseDetail, setCourseDetail] = useState<CourseDetailType>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    webApi.courseApi.getCourseDetail(courseId as string, true).then((res) => {
      setCourseDetail(res);
      setIsLoading(false);
    });
  }, [courseId, router, setCourseDetail]);

  return (
    <div className="container mx-auto">
      <Loading loading={isLoading} className="mt-[50vh]">
        <CourseDetail courseDetail={courseDetail}></CourseDetail>
      </Loading>
    </div>
  );
};

export default CourseDetailPage;
