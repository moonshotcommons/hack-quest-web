import { Dispatch, FC, SetStateAction, createContext, useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@/components/Common/Button';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import { useEnrollUnEnroll } from '@/hooks/courses/useEnrollUnEnroll';
import webApi from '@/service';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import CourseDetailHeader from '../CourseDetailHeader';
import HeaderRight from '../HeaderRight';
import TrackList from '../TrackList';
import { LearningStatus } from '../type';

interface LearningTrackDetailProps {
  // children: ReactNode;
  learningTrackDetail?: LearningTrackDetailType;
  refresh: VoidFunction;
}

export const TrackListContext = createContext<{
  setExpandList: Dispatch<SetStateAction<number[]>>;
  expandList: number[];
}>({
  setExpandList: (value) => {},
  expandList: []
});

const LearningTrackDetail: FC<LearningTrackDetailProps> = (props) => {
  const { learningTrackDetail, refresh } = props;

  const { enroll, enrollLoading, unEnroll } = useEnrollUnEnroll(learningTrackDetail, refresh);
  const [learningInfo, setLearningInfo] = useState<{
    learningSectionAndCourseName: string;
    learningLessonName: string;
  }>();

  const { jumpLearningLesson, loading: resumeLoading } = useJumpLeaningLesson();

  const learningStatus = useMemo(() => {
    if (learningTrackDetail) {
      let progress = learningTrackDetail.progress || 0;
      if (!learningTrackDetail.enrolled) return LearningStatus.UN_START;
      if (progress >= 1) return LearningStatus.COMPLETED;
    }
    return LearningStatus.IN_PROGRESS;
  }, [learningTrackDetail]);

  // const [expandAll, setExpandAll] = useState(false);
  const [expandList, setExpandList] = useState<number[]>([]);
  const expandAll = useMemo(() => {
    return expandList.length === learningTrackDetail?.sections.length;
  }, [expandList, learningTrackDetail?.sections.length]);

  const { learningSection, learningCourse, learningSectionIndex } = useMemo(() => {
    if (!learningTrackDetail) return {};
    const sections = learningTrackDetail.sections;
    let targetSection = sections[0];
    let targetCourse = targetSection.courses[0];
    let learningSectionIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const course = section.courses.find((course) => (!!course.progress && course.progress < 1) || !course.progress);
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
            learningSectionAndCourseName: `${learningSection.name}/${learningCourse.title}`
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [learningCourse, learningTrackDetail, learningSection]);

  const resumeCallback = useCallback(() => {
    if (learningTrackDetail && learningCourse) {
      jumpLearningLesson(learningCourse, {
        menu: Menu.LEARNING_TRACK,
        idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
        ids: [learningTrackDetail.id, learningCourse.id]
      });
    }
  }, [learningTrackDetail]);

  const RightComponent = useMemo(() => {
    if (!learningTrackDetail || !learningCourse) return false;
    return (
      <HeaderRight
        detail={learningTrackDetail}
        itemCount={learningTrackDetail.courseCount || 0}
        nextInfo={{
          title: learningInfo?.learningSectionAndCourseName || '',
          content: learningInfo?.learningLessonName || ''
        }}
        learningCourse={learningCourse}
        type="learning-track"
        resumeLoading={resumeLoading}
        resumeCallback={resumeCallback}
        learningStatus={learningStatus}
      ></HeaderRight>
    );
  }, [learningTrackDetail, resumeCallback, learningInfo, resumeLoading]);

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
        startLoading={enrollLoading}
        onStartCallback={() => {
          enroll();
          BurialPoint.track('learningTrackDetail-页面上方Enroll按钮', {
            learningTrackName: learningTrackDetail.name
          });
        }}
      ></CourseDetailHeader>
      {/* {learningTrackDetail.certificationId && (
        <div className="mb-[20px] mt-[80px]">
          <CertificationCard certificationId={learningTrackDetail.certificationId}></CertificationCard>
        </div>
      )} */}
      <div className="mt-[60px] w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-h3 mb-[30px] text-neutral-black">Syllabus</h2>
          <span
            className="underline-m cursor-pointer"
            onClick={() => {
              if (expandAll) {
                setExpandList([]);
              } else {
                setExpandList(learningTrackDetail?.sections.map((item, index) => index));
              }

              BurialPoint.track('learningTrackDetail-Expand All 按钮点击');
            }}
          >
            {expandAll && 'Collapse All'}
            {!expandAll && 'Expand All'}
          </span>
        </div>
        <TrackListContext.Provider
          value={{
            expandList,
            setExpandList
          }}
        >
          <TrackList
            trackDetail={learningTrackDetail}
            expandAll={expandAll}
            learningSectionIndex={learningSectionIndex}
          ></TrackList>
        </TrackListContext.Provider>
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
          <Button className="body-l w-[270px] px-0 py-[16px] text-neutral-black" type="primary">
            Enroll
          </Button>
        </div>
      )}
    </div>
  );
};

export default LearningTrackDetail;
