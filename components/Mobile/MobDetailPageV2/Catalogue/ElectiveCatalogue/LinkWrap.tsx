'use client';
import { cn, getLessonLink } from '@/helper/utils';
import { CompleteStateType, CourseType } from '@/service/webApi/course/type';
import { FC, ReactNode, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRedirect } from '@/hooks/router/useRedirect';
import { ElectiveCourseDetailType, PageType } from '@/service/webApi/elective/type';
import { LessonContext } from '../../Provider/LessonProvider';
import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';

interface LinkWrapProps {
  lesson: PageType;
  courseDetail: ElectiveCourseDetailType;
  children: ReactNode;
}

const LinkWrap: FC<LinkWrapProps> = ({ lesson: propLesson, courseDetail, children }) => {
  const { lesson: contextLesson } = useContext(LessonContext);
  const lesson = contextLesson ?? propLesson;
  const query = useSearchParams();
  const { redirectToUrl } = useRedirect();
  const { type: courseType } = courseDetail || {};

  return (
    <div
      className={cn(lesson.state === CompleteStateType.COMPLETED ? 'cursor-pointer' : '')}
      onClick={async (e) => {
        if (lesson.state === CompleteStateType.COMPLETED) {
          let link = `${getLessonLink(courseType as CourseType, courseDetail?.title as string, lesson.id, courseDetail?.id as string, {
            menu: query.get('menu') as string,
            idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
            ids: [query.get(QueryIdType.LEARNING_TRACK_ID) || '', query.get(QueryIdType.MENU_COURSE_ID) || ''] as string[]
          })}`;
          redirectToUrl(link);
        }
      }}
    >
      {children}
    </div>
  );
};

export default LinkWrap;
