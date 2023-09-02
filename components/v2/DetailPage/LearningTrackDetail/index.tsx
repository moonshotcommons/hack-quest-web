import { FC, useCallback, useMemo, useState } from 'react';

import Button from '@/components/Common/Button';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { useEnrollUnEnroll } from '@/hooks/useLearningTrackHooks/useEnrollUnEnroll';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import CourseDetailHeader from '../CourseDetailHeader';
import HeaderRight from '../HeaderRight';
import TrackList from '../TrackList';
import { LearningStatus } from '../type';

interface LearningTrackDetailProps {
  // children: ReactNode;
  learningTrackDetail: LearningTrackDetailType;
  refresh: VoidFunction;
}

const LearningTrackDetail: FC<LearningTrackDetailProps> = (props) => {
  const { learningTrackDetail, refresh } = props;

  const { enroll, unEnroll } = useEnrollUnEnroll(learningTrackDetail, refresh);

  const jumpLearningLesson = useJumpLeaningLesson();

  const learningStatus = useMemo(() => {
    let progress = learningTrackDetail.progress || 0;
    if (progress <= 0 || !progress || !learningTrackDetail.enrolled)
      return LearningStatus.UN_START;
    if (progress >= 1) return LearningStatus.COMPLETED;
    return LearningStatus.IN_PROGRESS;
  }, [learningTrackDetail.progress, learningTrackDetail.enrolled]);

  const [expandAll, setExpandAll] = useState(false);

  const { learningSection, learningCourse } = useMemo(() => {
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

  const resumeCallback = useCallback(() => {}, [learningTrackDetail]);

  const RightComponent = useMemo(
    () => (
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
    ),
    [learningTrackDetail, resumeCallback]
  );

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
