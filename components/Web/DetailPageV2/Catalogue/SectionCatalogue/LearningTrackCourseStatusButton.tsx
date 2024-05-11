'use client';
import { FC, useContext, useMemo, useState } from 'react';

import { ProjectCourseType } from '@/service/webApi/course/type';
import Button from '@/components/Common/Button';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { useRedirect } from '@/hooks/router/useRedirect';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import { SectionContext } from '../../Provider/SectionProvider';
import { LearningTrackDetailContext } from '../../Provider/LearningTrackDetailProvider';
import { BurialPoint } from '@/helper/burialPoint';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface LearningTrackCourseStatusButtonProps {
  course: ProjectCourseType | ElectiveCourseType;
}

const LearningTrackCourseStatusButton: FC<LearningTrackCourseStatusButtonProps> = ({ course: propCourse }) => {
  const { redirectToUrl } = useRedirect();
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

  const { learningTrackDetail } = useContext(LearningTrackDetailContext);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);

  const { section, sectionIndex } = useContext(SectionContext);
  const enrolled = learningTrackDetail!.enrolled;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const [clickIndex, setClickIndex] = useState<null | number>(null);
  const sectionList = learningTrackDetail!.sections;

  const { course, courseIndex } = useMemo(() => {
    const index = section!.courses.findIndex((c) => c.id === propCourse.id);
    return {
      courseIndex: index,
      course: section!.courses[index]
    };
  }, [section, propCourse]);

  if (!enrolled) return null;

  const progress = course.progress || 0;

  if (!!progress && progress <= 0) {
    // 课程为当前section的第一个，判断上个section的最后一个的进度，如果没有完成，那么不显示按钮
    if (courseIndex === 0 && sectionIndex !== 0) {
      let prevCourses = sectionList[sectionIndex - 1].courses;
      let prevCourse = prevCourses[prevCourses.length - 1] as ProjectCourseType;
      if (!!prevCourse.progress && prevCourse.progress < 1) return null;
    }

    //  课程不为当前section的第一个，判断上一个course的progress是否完成，完成展示start，未完成不展示
    if (courseIndex !== 0) {
      let prevCourse = sectionList[sectionIndex].courses[courseIndex - 1];
      if (!!prevCourse.progress && prevCourse.progress < 1) return null;
    }
  }

  if (!learningTrackDetail!.enrolled || !progress) return null;

  return (
    <div className="flex w-[322px] max-w-[322px] gap-8">
      {progress < 1 && (
        <div className="flex w-full items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="relative h-[6px] w-[120px] max-w-[7.5rem] rounded-[3px] bg-neutral-off-white">
              <div
                className="absolute left-0 top-0 h-full rounded-[3px] bg-yellow-primary"
                style={{
                  width: `${progress * 100}%`
                }}
              ></div>
            </div>
            <span className="caption-10pt text-neutral-rich-gray">{Math.floor(progress * 100)}%</span>
          </div>
          <Button
            loading={loading && clickIndex === courseIndex}
            disabled={loading && clickIndex === courseIndex}
            type="primary"
            className="
              button-text-s
              h-fit w-[140px] py-[8px]
              uppercase transition hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
            onClick={(e) => {
              e.stopPropagation();
              BurialPoint.track('learningTrackDetail-course学习按钮', {
                sectionName: section?.name || '',
                courseName: course.title
              });
              setClickIndex(courseIndex);
              jumpLearningLesson(course, {
                menu: Menu.LEARNING_TRACK,
                idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID, QueryIdType.DOCUMENTATION_ID],
                ids: [learningTrackDetail!.id, course.id, course.documentationId!]
              });
            }}
          >
            {progress > 0 ? 'Continue' : 'Start'}
          </Button>
        </div>
      )}
      {progress >= 1 && (
        <div className="flex items-center gap-3">
          <span className="body-xs text-neutral-black">{t('courses.completed')}</span>
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="16" height="16" rx="8" fill="#00C365" />
            <path
              d="M12.3249 5.69085L6.54713 11.9131C6.46336 12.0034 6.34587 12.0549 6.22268 12.0553C6.10455 12.056 5.991 12.0096 5.90713 11.9264L3.68491 9.70418C3.51063 9.52991 3.51063 9.24735 3.68491 9.07307C3.85918 8.8988 4.14174 8.8988 4.31602 9.07307L6.22268 10.9708L11.676 5.08641C11.7806 4.95741 11.9484 4.8975 12.111 4.93106C12.2737 4.96462 12.4041 5.08605 12.449 5.24591C12.494 5.40577 12.4462 5.57738 12.3249 5.69085Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default LearningTrackCourseStatusButton;
