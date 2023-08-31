// ./pages/article/[articleId].tsx

import CourseDetail from '@/components/v2/CourseDetail';
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

  useEffect(() => {
    webApi.courseApi.getCourseDetail(courseId as string, true).then((res) => {
      setCourseDetail(res);
    });
  }, [courseId, router, setCourseDetail]);

  if (!courseDetail) return null;

  return (
    <div className="container mx-auto">
      <CourseDetail
        courseDetail={courseDetail}
        itemCount={courseDetail.units?.length || 0}
      ></CourseDetail>
    </div>
  );
};

export default CourseDetailPage;
