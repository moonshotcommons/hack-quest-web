import { FC, useCallback, useMemo } from 'react';

import Button from '@/components/Common/Button';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import CourseDetailHeader from '../CourseDetailHeader';
import HeaderRight from '../HeaderRight';
import TrackList from '../TrackList';
import { LearningStatus } from '../type';

interface LearningTrackDetailProps {
  // children: ReactNode;
  learningTrackDetail: LearningTrackDetailType;
}

const LearningTrackDetail: FC<LearningTrackDetailProps> = (props) => {
  const { learningTrackDetail } = props;

  const jumpLearningLesson = useJumpLeaningLesson();

  const learningStatus = useMemo(() => {
    let progress = learningTrackDetail.progress || 0;
    if (progress <= 0 || !progress) return LearningStatus.UN_START;
    if (progress >= 1) return LearningStatus.COMPLETED;
    return LearningStatus.IN_PROGRESS;
  }, [learningTrackDetail.progress]);

  const resumeCallback = useCallback(() => {
    // jumpLearningLesson(courseDetail);
  }, [learningTrackDetail]);

  const RightComponent = useMemo(
    () => (
      <HeaderRight
        courseDetail={learningTrackDetail}
        itemCount={learningTrackDetail.courses?.length || 0}
        nextInfo={{ title: 'Unit 3', content: 'Mint - 1' }}
        type="course"
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
        itemCount={learningTrackDetail.courses?.length || 0}
        rightComponent={RightComponent}
        type="course"
        learningStatus={learningStatus}
      ></CourseDetailHeader>
      <div className="mt-[60px] w-full">
        <h2 className="mb-[30px] text-[#000] font-next-poster-Bold text-[28px] tracking-[1.68px]">
          Syllabus
        </h2>
        <TrackList trackDetail={learningTrackDetail}></TrackList>
      </div>
      {learningStatus === LearningStatus.UN_START && (
        <div className="mt-[60px] self-center">
          <Button
            className="px-0 w-[270px] py-[16px] leading-[125%] text-[#000] font-next-book text-[18px] tracking-[0.36px]"
            type="primary"
          >
            Start
          </Button>
        </div>
      )}
    </div>
  );
};

export default LearningTrackDetail;
