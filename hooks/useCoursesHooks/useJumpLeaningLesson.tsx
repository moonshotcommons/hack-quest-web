import { getLessonLink, getV2LessonLink } from '@/helper/utils';
import webApi from '@/service';
import { CourseDetailType, CourseResponse } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import { MenuLink, QueryIdType } from '@/components/v2/Breadcrumb/type';

interface JumpLeaningLessonType {
  menu: string;
  idTypes: string[];
  ids: string[];
}
export const useJumpLeaningLesson = () => {
  const router = useRouter();
  const { run } = useRequest(
    async (
      courseDetail: CourseDetailType | CourseResponse,
      linkParam?: JumpLeaningLessonType
    ) => {
      const lesson = await webApi.courseApi.getLearningLessonId(
        courseDetail?.id as string
      );
      const lParam = linkParam || {
        menu: MenuLink.ELECTIVES,
        idTypes: [QueryIdType.MENU_COURSE_ID],
        ids: [courseDetail.id]
      };
      return {
        courseDetail,
        pageId: lesson?.pageId,
        ...lParam
      };
    },
    {
      manual: true,
      onSuccess({ courseDetail, pageId, menu, idTypes, ids }) {
        let link = `${getLessonLink(
          courseDetail?.type,
          courseDetail?.name,
          pageId
        )}?menu=${menu}`;
        idTypes.map((v, i) => {
          link += `&${v}=${ids[i]}`;
        });
        router.push(link);
      },
      onError(err: any) {
        if (err.code === 401) {
          router.push('/auth/login');
        }
      }
    }
  );

  return run;
};
