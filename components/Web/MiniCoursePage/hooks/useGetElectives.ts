import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import {
  ElectiveLessonType,
  ElectiveCourseType,
  ElectiveCourseDetailType
} from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

export const useGetElectives = (lesson: ElectiveLessonType) => {
  const [course, setCourse] = useState<ElectiveCourseType | null>(null);

  const {
    run: getCourseDetail,
    loading,
    refresh
  } = useRequest(
    async () => {
      const res =
        await webApi.courseApi.getCourseDetail<ElectiveCourseDetailType>(
          lesson.courseId,
          false,
          true
        );
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setCourse(res);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useEffect(() => {
    if (lesson) {
      getCourseDetail();
    }
  }, [lesson, getCourseDetail]);

  return {
    course,
    loading,
    refresh
  };
};
