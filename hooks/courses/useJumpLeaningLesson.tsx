import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { getLessonLink } from '@/helper/utils';
import webApi from '@/service';
import {
  CourseDetailType,
  ProjectCourseType,
  CourseType
} from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { useRedirect } from '../router/useRedirect';
import { message } from 'antd';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { isMobile } from 'react-device-detect';
import { NavType } from '@/components/Mobile/MobLayout/constant';
import { useGlobalStore } from '@/store/zustand/globalStore';

export interface JumpLeaningLessonType {
  menu: string;
  idTypes: string[];
  ids: string[];
}
export const useJumpLeaningLesson = () => {
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const setAuthType = useUserStore((state) => state.setAuthType);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const mobileNavModalToggleOpenHandle = useGlobalStore(
    (state) => state.mobileNavModalToggleOpenHandle
  );
  const { redirectToUrl } = useRedirect();
  const { run: jumpLearningLesson, loading } = useRequest(
    async (
      courseDetail: CourseDetailType | ProjectCourseType | ElectiveCourseType,
      lParam?: JumpLeaningLessonType
    ) => {
      let lesson: any;
      switch (courseDetail.type) {
        case CourseType.MINI:
          lesson = await webApi.courseApi.getLearningLessonId(courseDetail.id);
          break;
        default:
          lesson = await webApi.courseApi.getLearningLessonId(
            courseDetail?.id as string
          );
      }
      return {
        courseDetail,
        pageId: lesson?.pageId,
        lParam
      };
    },
    {
      manual: true,
      onSuccess({ courseDetail, pageId, lParam }) {
        const linkParam = lParam || {
          menu: query.get('menu') as string,
          idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
          ids: [
            query.get(QueryIdType.LEARNING_TRACK_ID) || '',
            query.get(QueryIdType.MENU_COURSE_ID) || ''
          ] as string[]
        };
        let link = `${getLessonLink(
          courseDetail?.type,
          courseDetail?.title,
          pageId,
          courseDetail?.id,
          linkParam
        )}`;
        redirectToUrl(link);
      },
      onError(err: any) {
        if (err.code === 401) {
          message.warning('Please login first');
          setAuthType(AuthType.LOGIN);
          if (!isMobile) {
            setAuthModalOpen(true);
          } else {
            mobileNavModalToggleOpenHandle.setNavType(NavType.AUTH);
            mobileNavModalToggleOpenHandle.toggleOpen();
          }
        }
      }
    }
  );

  return { jumpLearningLesson, loading };
};
