import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@/components/Common/Button';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { useEnrollUnEnroll } from '@/hooks/useLearningTrackHooks/useEnrollUnEnroll';
import webApi from '@/service';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import CourseDetailHeader from '../CourseDetailHeader';
import HeaderRight from '../HeaderRight';
import TrackList from '../TrackList';
import { LearningStatus } from '../type';
import { MenuLink, QueryIdType } from '../../Breadcrumb/type';

interface LearningTrackDetailProps {
  // children: ReactNode;
  learningTrackDetail?: LearningTrackDetailType;
  refresh: VoidFunction;
}

const LearningTrackDetail: FC<LearningTrackDetailProps> = (props) => {
  const { learningTrackDetail, refresh } = props;

  const { enroll, unEnroll } = useEnrollUnEnroll(learningTrackDetail, refresh);
  const [learningInfo, setLearningInfo] = useState<{
    learningCourseDetail: any;
    learningUnit: any;
  }>();

  const jumpLearningLesson = useJumpLeaningLesson();

  const learningStatus = useMemo(() => {
    if (learningTrackDetail) {
      let progress = learningTrackDetail.progress || 0;
      if ((!progress || progress <= 0) && !learningTrackDetail.enrolled)
        return LearningStatus.UN_START;
      if (progress >= 1) return LearningStatus.COMPLETED;
    }
    return LearningStatus.IN_PROGRESS;
  }, [learningTrackDetail]);

  const [expandAll, setExpandAll] = useState(false);

  const { learningSection, learningCourse } = useMemo(() => {
    if (!learningTrackDetail) return {};
    const sections = learningTrackDetail.sections;
    let targetSection = sections[0];
    let targetCourse = targetSection.courses[0];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const course = section.courses.find(
        (course) => course.progress < 1 || !course.progress
      );
      if (course) {
        targetCourse = course;
        targetSection = section;
        break;
      }
    }
    return {
      learningSection: targetSection,
      learningCourse: targetCourse
    };
  }, [learningTrackDetail]);

  useEffect(() => {
    if (learningCourse) {
      webApi.courseApi.getCourseDetail(learningCourse.id).then((res) => {
        const learningInfo = {
          learningCourseDetail: res,
          learningUnit: res.units?.find(
            (unit) => unit.progress < 1 || !unit.progress
          )
        };
        setLearningInfo(learningInfo);
      });
    }
  }, [learningCourse]);

  const resumeCallback = useCallback(() => {
    if (learningTrackDetail && learningCourse) {
      jumpLearningLesson(learningCourse, {
        menu: MenuLink.LEARNING_TRACK,
        idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
        ids: [learningTrackDetail.id, learningCourse.id]
      });
    }
  }, [learningTrackDetail]);

  const RightComponent = useMemo(() => {
    if (!learningTrackDetail || !learningCourse) return false;
    return (
      <HeaderRight
        courseDetail={learningTrackDetail}
        itemCount={learningCourse.unitCount || 0}
        nextInfo={{
          title: `${learningSection.name}/${learningCourse.name}`,
          content: learningCourse.name
        }}
        type="learning-track"
        resumeCallback={resumeCallback}
        learningStatus={learningStatus}
      ></HeaderRight>
    );
  }, [learningTrackDetail, resumeCallback]);

  if (!learningTrackDetail) return null;

  return (
    <div className="flex flex-col pb-[84px]">
      <CourseDetailHeader
        courseDetail={learningTrackDetail}
        itemCount={learningTrackDetail.sections?.length || 0}
        rightComponent={RightComponent}
        type="learning-track"
        learningStatus={learningStatus}
        onStartCallback={enroll}
      ></CourseDetailHeader>
      <div className="mt-[60px] w-full">
        <div className="flex justify-between items-center">
          <h2 className="mb-[30px] text-[#000] font-next-poster-Bold text-[28px] tracking-[1.68px]">
            Syllabus
          </h2>
          <span
            className="font-next-book leading-[125%] tracking-[0.32px] text-[16px] underline cursor-pointer"
            onClick={() => setExpandAll(!expandAll)}
          >
            {expandAll && 'Fold All'}
            {!expandAll && 'Expand All'}
          </span>
        </div>
        <TrackList
          trackDetail={learningTrackDetail}
          expandAll={expandAll}
        ></TrackList>
      </div>
      {!learningTrackDetail.enrolled && (
        <div className="mt-[60px] self-center" onClick={enroll}>
          <Button
            className="px-0 w-[270px] py-[16px] leading-[125%] text-[#000] font-next-book text-[18px] tracking-[0.36px]"
            type="primary"
          >
            Enroll
          </Button>
        </div>
      )}
    </div>
  );
};

export default LearningTrackDetail;
