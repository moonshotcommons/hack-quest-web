import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { useEnrollUnEnroll } from '@/hooks/useLearningTrackHooks/useEnrollUnEnroll';
import webApi from '@/service';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { MenuLink, QueryIdType } from '../../Breadcrumb/type';
import CourseDetailHeader from '../CourseDetailHeader';
import HeaderRight from '../HeaderRight';
import TrackList from '../TrackList';
import { LearningStatus } from '../type';

interface LearningTrackDetailProps {
  // children: ReactNode;
  learningTrackDetail?: LearningTrackDetailType;
  refresh: VoidFunction;
}

const LearningTrackDetail: FC<LearningTrackDetailProps> = (props) => {
  const { learningTrackDetail, refresh } = props;

  const { enroll, unEnroll } = useEnrollUnEnroll(learningTrackDetail, refresh);
  const [learningInfo, setLearningInfo] = useState<{
    learningSectionAndCourseName: string;
    learningLessonName: string;
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

  const { learningSection, learningCourse, learningSectionIndex } =
    useMemo(() => {
      if (!learningTrackDetail) return {};
      const sections = learningTrackDetail.sections;
      let targetSection = sections[0];
      let targetCourse = targetSection.courses[0];
      let learningSectionIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const course = section.courses.find(
          (course) => course.progress < 1 || !course.progress
        );
        if (course) {
          targetCourse = course;
          targetSection = section;
          learningSectionIndex = i;
          break;
        }
      }
      return {
        learningSection: targetSection,
        learningCourse: targetCourse,
        learningSectionIndex
      };
    }, [learningTrackDetail]);

  useEffect(() => {
    if (learningCourse && learningTrackDetail?.enrolled) {
      webApi.courseApi
        .getLearningLessonId(learningCourse?.id as string)
        .then((res) => {
          setLearningInfo({
            learningLessonName: res.pageName,
            learningSectionAndCourseName: `${learningSection.name}/${learningCourse.name}`
          });
        });
    }
  }, [learningCourse, learningTrackDetail, learningSection]);

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
        itemCount={learningTrackDetail.courseCount || 0}
        nextInfo={{
          title: learningInfo?.learningSectionAndCourseName || '',
          content: learningInfo?.learningLessonName || ''
        }}
        type="learning-track"
        resumeCallback={resumeCallback}
        learningStatus={learningStatus}
      ></HeaderRight>
    );
  }, [learningTrackDetail, resumeCallback, learningInfo]);

  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('learningTrackDetail-页面留存时间', {
        duration,
        learningTrackName: learningTrackDetail?.name || ''
      });
    };
  }, []);

  if (!learningTrackDetail) return null;

  return (
    <div className="flex flex-col pb-[84px]">
      <CourseDetailHeader
        courseDetail={learningTrackDetail}
        itemCount={learningTrackDetail.sections?.length || 0}
        rightComponent={RightComponent}
        type="learning-track"
        learningStatus={learningStatus}
        onStartCallback={() => {
          enroll();
          BurialPoint.track('learningTrackDetail-页面上方Enroll按钮', {
            learningTrackName: learningTrackDetail.name
          });
        }}
      ></CourseDetailHeader>
      <div className="mt-[60px] w-full">
        <div className="flex justify-between items-center">
          <h2 className="mb-[30px] text-[#000] font-next-poster-Bold text-[28px] tracking-[1.68px]">
            Syllabus
          </h2>
          <span
            className="font-next-book leading-[125%] tracking-[0.32px] text-[16px] underline cursor-pointer"
            onClick={() => {
              setExpandAll(!expandAll);
              BurialPoint.track('learningTrackDetail-Expand All 按钮点击');
            }}
          >
            {expandAll && 'Fold All'}
            {!expandAll && 'Expand All'}
          </span>
        </div>
        <TrackList
          trackDetail={learningTrackDetail}
          expandAll={expandAll}
          learningSectionIndex={learningSectionIndex}
        ></TrackList>
      </div>
      {!learningTrackDetail.enrolled && (
        <div
          className="mt-[60px] self-center"
          onClick={() => {
            enroll();
            BurialPoint.track('learningTrackDetail-页面下方Enroll按钮', {
              learningTrackName: learningTrackDetail.name
            });
          }}
        >
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
