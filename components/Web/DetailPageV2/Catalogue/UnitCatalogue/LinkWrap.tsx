'use client';
import { cn, getLessonLink } from '@/helper/utils';
import webApi from '@/service';
import { CourseDetailType, CourseType, CourseUnitType } from '@/service/webApi/course/type';
import { FC, ReactNode, useContext } from 'react';
import { QueryIdType } from '../../../Business/Breadcrumb/type';
import { useSearchParams } from 'next/navigation';
import { UnitContext } from '../../Provider/UnitProvider';
import { useRedirect } from '@/hooks/router/useRedirect';

interface LinkWrapProps {
  unit: CourseUnitType;
  courseDetail: CourseDetailType;
  children: ReactNode;
}

const LinkWrap: FC<LinkWrapProps> = ({ unit: propUnit, courseDetail, children }) => {
  const { unit: contextUnit } = useContext(UnitContext);
  const unit = contextUnit ?? propUnit;
  const query = useSearchParams();
  const { redirectToUrl } = useRedirect();
  const { type: courseType } = courseDetail || {};

  return (
    <div
      className={cn('max-w-[90%]', unit.progress === 1 ? 'cursor-pointer' : '')}
      onClick={async (e) => {
        if (unit.progress === 1) {
          const unitPages = await webApi.courseApi.getCourseUnitLessons(courseDetail?.id || '', unit.id);
          const lessonId = unitPages.pages[0]?.id;
          let link = `${getLessonLink(
            courseType as CourseType,
            courseDetail?.title as string,
            courseDetail.documentationId as string,
            lessonId,
            courseDetail?.id as string,
            {
              menu: query.get('menu') as string,
              idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID, QueryIdType.DOCUMENTATION_ID],
              ids: [
                query.get(QueryIdType.LEARNING_TRACK_ID) || '',
                courseDetail.id,
                courseDetail.documentationId!
              ] as string[]
            }
          )}`;
          redirectToUrl(link);
        }
      }}
    >
      {children}
    </div>
  );
};

export default LinkWrap;
