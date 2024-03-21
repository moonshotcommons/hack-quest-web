import webApi from '@/service';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { ElectiveLessonType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useRedirect } from '../useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { isMobile } from 'react-device-detect';
import { NavType } from '@/components/Mobile/MobLayout/constant';
import { useGlobalStore } from '@/store/zustand/globalStore';

export const useGetLessonContent = <
  T extends CourseLessonType | ElectiveLessonType
>(
  lessonId: string,
  courseType: CourseType
) => {
  const [lesson, setLesson] = useState<T>();
  const { redirectToUrl } = useRedirect();
  const setAuthType = useUserStore((state) => state.setAuthType);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const mobileNavModalToggleOpenHandle = useGlobalStore(
    (state) => state.mobileNavModalToggleOpenHandle
  );
  const { run, loading, refresh } = useRequest(
    async (lessonId) => {
      switch (courseType) {
        case CourseType.MINI:
          return isMobile
            ? webApi.courseApi.getLessonContentMob<T>(lessonId)
            : webApi.courseApi.getLessonContent<T>(lessonId);
        default:
          return isMobile
            ? webApi.courseApi.getLessonContentMob<T>(lessonId)
            : webApi.courseApi.getLessonContent<T>(lessonId);
      }
    },
    {
      manual: true,
      onSuccess(res) {
        setLesson(res);
      },
      onError(error: any) {
        if (error.code === 401) {
          message.error(error?.msg);
          setAuthType(AuthType.LOGIN);
          if (!isMobile) {
            setAuthModalOpen(true);
          } else {
            mobileNavModalToggleOpenHandle.setNavType(NavType.AUTH);
            mobileNavModalToggleOpenHandle.toggleOpen();
          }
          return;
        }

        if (error?.code === 403) {
          message.error(error?.msg);
          redirectToUrl('/dashboard');
          return;
        }
        message.error('404 Not Found');
        redirectToUrl('/404');
      }
    }
  );

  useEffect(() => {
    run(lessonId);
  }, [run, lessonId]);

  return {
    lesson,
    loading,
    refresh
  };
};
