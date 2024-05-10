'use client';
import { cn, getLessonLink } from '@/helper/utils';
import webApi from '@/service';
import { CourseDetailType, CourseType, CourseUnitType } from '@/service/webApi/course/type';
import { FC, ReactNode, useContext, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { UnitContext } from '../../Provider/UnitProvider';
import { useRedirect } from '@/hooks/router/useRedirect';
import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { PracticeDetailContext } from '../../Provider/PracticeDetailProvider';
interface LinkWrapProps {
  unit: CourseUnitType;
  courseDetail: CourseDetailType;
  children: ReactNode;
  index: number;
}

const LinkWrap: FC<LinkWrapProps> = ({ unit: propUnit, courseDetail: propCourseDetail, children, index }) => {
  const { unit: contextUnit } = useContext(UnitContext);
  const unit = contextUnit ?? propUnit;
  const query = useSearchParams();
  const { redirectToUrl } = useRedirect();

  const { courseDetail: contextCourseDetail } = useContext(PracticeDetailContext);
  const courseDetail = contextCourseDetail ?? propCourseDetail;
  const { type: courseType } = courseDetail || {};

  const isLock = useMemo(() => {
    if (index === 0) return false;
    return courseDetail.units![index - 1].progress < 1 || unit.progress === undefined;
  }, [unit, courseDetail, index]);

  return (
    <div
      className={cn(unit.progress === 1 ? 'cursor-pointer' : '')}
      onClick={async (e) => {
        if (unit.progress === 1) {
          const unitPages = await webApi.courseApi.getCourseUnitLessons(courseDetail?.id || '', unit.id);
          const lessonId = unitPages.pages[0]?.id;
          let link = `${getLessonLink(
            courseType as CourseType,
            courseDetail?.title as string,
            courseDetail?.documentationId as string,
            lessonId,
            courseDetail?.id as string,
            {
              menu: query.get('menu') as string,
              idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID, QueryIdType.DOCUMENTATION_ID],
              ids: [
                query.get(QueryIdType.LEARNING_TRACK_ID) || '',
                courseDetail.id,
                courseDetail?.documentationId
              ] as string[]
            }
          )}`;
          redirectToUrl(link);
        }
      }}
    >
      {children}
      {!isLock && unit.progress < 1 && (
        <div className="mt-4 flex w-full items-center gap-2">
          <div className="relative h-[6px] w-full rounded-[3px] bg-neutral-off-white">
            <div
              className="absolute left-0 top-0 h-full rounded-[3px] bg-yellow-primary"
              style={{
                width: `${unit.progress * 100}%`
              }}
            ></div>
          </div>
          <span className="caption-10pt text-neutral-rich-gray">{Math.floor(unit.progress * 100)}%</span>
        </div>
      )}
    </div>
  );
};

export default LinkWrap;
