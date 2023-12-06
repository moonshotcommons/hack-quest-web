import Button from '@/components/v2/Common/Button';
import CheckIcon from '@/components/Common/Icon/Check';
import { BurialPoint } from '@/helper/burialPoint';
import { computeProgress } from '@/helper/formate';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { useEnrollUnEnroll } from '@/hooks/useLearningTrackHooks/useEnrollUnEnroll';
import LearningImage from '@/public/images/home/learning_track.png';
import webApi from '@/service';
import { LearningTrackCourseType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { Progress } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import CourseTags from '@/components/v2/Business/CourseTags';
import { menuLink } from '@/components/v2/Business/Breadcrumb/data';
import CardProgress from '../CardProgress';

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: #3e3e3e;
      font-size: 12px;
    }
  }
`;
interface LearningTrackCardProps {
  learningTrack: LearningTrackDetailType;
  isLandingPage?: boolean;
  status?: LearningTrackCourseType;
}
const LearningTrackCard: React.FC<LearningTrackCardProps> = ({
  learningTrack: track,
  isLandingPage,
  status
}) => {
  const router = useRouter();
  const [learningInfo, setLearningInfo] = useState<{
    learningSectionAndCourseName: string;
    learningLessonName: string;
  }>();
  const { jumpLearningLesson, loading: jumpLoading } = useJumpLeaningLesson();
  const [learningTrack, setLearningTrack] =
    useState<LearningTrackDetailType>(track);
  const refresh = () => {
    const newLearningTrack = {
      ...learningTrack,
      enrolled: !learningTrack.enrolled
    };
    setLearningTrack({ ...newLearningTrack });
  };
  const { enroll, enrollLoading } = useEnrollUnEnroll(track, refresh);
  const learningTrackStatus = useMemo(() => {
    if (status) return status;
    const { progress } = learningTrack;
    if (learningTrack.enrolled && progress > 0 && progress < 1) {
      return LearningTrackCourseType.IN_PROCESS;
    } else if (progress >= 1) {
      return LearningTrackCourseType.COMPLETED;
    } else {
      return LearningTrackCourseType.UN_ENROLL;
    }
  }, [learningTrack, status]);

  const handleRoll = async (e: any) => {
    if (isLandingPage) {
      BurialPoint.track('landing-learning track Enroll按钮点击');
      return;
    }
    e.stopPropagation();
    BurialPoint.track('home-learning track卡片Enroll按钮点击', {
      learningTrackName: track.name
    });
    await enroll();
  };
  const handleResume = (e: any) => {
    if (isLandingPage) return;
    e.stopPropagation();
    BurialPoint.track('home-learning track卡片Continue按钮点击', {
      learningTrackName: track.name
    });
    const section = learningTrack.sections.find((v) => (v?.progress || 0) < 1);
    if (section) {
      const course = section.courses.find((v) => v.progress < 1);
      if (course)
        jumpLearningLesson(course, {
          menu: Menu.LEARNING_TRACK,
          idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
          ids: [learningTrack.id, course.id]
        });
    }
  };
  const leftRender = () => {
    switch (learningTrackStatus) {
      case LearningTrackCourseType.UN_ENROLL:
      case LearningTrackCourseType.COMPLETED:
        return (
          <span className="text-[#8C8C8C] text-[14px]">
            {learningTrack.description}
          </span>
        );
      case LearningTrackCourseType.IN_PROCESS:
        return (
          <div className="w-[97%]">
            <CardProgress progress={learningTrack.progress} />
          </div>
        );
    }
  };

  const rightRender = () => {
    if (isLandingPage) {
      return (
        <div className="flex-col-center h-full justify-center">
          <Button
            className="w-[80%] h-15 text-[18px] border border-home-learning-track-view-button-border text-home-learning-track-view-button-color px-0"
            onClick={handleRoll}
          >
            View Syllabus
          </Button>
          <Button
            type="primary"
            className="w-[80%] mt-5 h-15 text-[18px] text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg px-0"
            onClick={handleResume}
          >
            Enroll
          </Button>
        </div>
      );
    }
    switch (learningTrackStatus) {
      case LearningTrackCourseType.UN_ENROLL:
        return (
          <>
            <div className="w-full h-full flex flex-col justify-center">
              {!learningTrack.enrolled ? (
                <Button
                  type="primary"
                  loading={enrollLoading}
                  disabled={enrollLoading}
                  className="w-full h-11 text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg"
                  onClick={handleRoll}
                >
                  Enroll
                </Button>
              ) : (
                <Button
                  loading={jumpLoading}
                  disabled={jumpLoading}
                  type="primary"
                  className="w-full h-11 text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg px-0"
                  onClick={handleResume}
                >
                  Start
                </Button>
              )}
              <Button
                onClick={() => {
                  BurialPoint.track(
                    'home-learning track卡片View Syllabus按钮点击'
                  );
                }}
                className="w-full mt-[20px] h-11 border border-home-learning-track-view-button-border p-0 text-home-learning-track-view-button-color"
              >
                View Syllabus
              </Button>
            </div>
          </>
        );
      case LearningTrackCourseType.IN_PROCESS:
        return (
          <>
            <div className="text-[24px]">Deploy Your NFT</div>
            <div className="w-full flex justify-between">
              <Button
                loading={jumpLoading}
                disabled={jumpLoading}
                type="primary"
                className="w-full h-11 text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg px-0"
                onClick={handleResume}
              >
                Continue
              </Button>
            </div>
          </>
        );
      case LearningTrackCourseType.COMPLETED:
        return (
          <>
            <div>
              <p className="text-[24px]">
                You’ve finished this learning track.
              </p>
            </div>
            <div className="w-full flex justify-between">
              <Button className="w-full h-11 border border-home-learning-track-view-button-border text-home-learning-track-view-button-color">
                View Syllabus
              </Button>
            </div>
          </>
        );
    }
  };

  useEffect(() => {
    const isProgress =
      learningTrackStatus === LearningTrackCourseType.IN_PROCESS;

    if (learningTrack && isProgress) {
      const section = learningTrack.sections.find(
        (v) => (v?.progress || 0) < 1
      );
      const course = section!.courses.find((v) => v.progress < 1);

      webApi.courseApi.getLearningLessonId(course?.id as string).then((res) => {
        setLearningInfo({
          learningLessonName: res.pageName,
          learningSectionAndCourseName: `${section?.name || ''}/${
            course?.name || ''
          }`
        });
      });
    }
  }, [learningTrack, learningTrackStatus]);
  useEffect(() => {
    setLearningTrack(track);
  }, [track]);

  const goLearningTrackDetail = (e: any) => {
    if (isLandingPage) return;
    router.push(
      `${menuLink.learningTrack}/${learningTrack.id}?${QueryIdType.LEARNING_TRACK_ID}=${learningTrack.id}&menu=${Menu.LEARNING_TRACK}`
    );
  };

  return (
    <div
      className="h-[280px] font-next-book cursor-pointer rounded-[10px] bg-home-learning--track-bg overflow-hidden flex flex-col mb-10 hover:-translate-y-1 transition-all duration-300 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
      onClick={goLearningTrackDetail}
    >
      <div className="w-full flex-1 flex items-center p-10 relative">
        <div
          className={`w-[69%] flex items-center justify-between pr-[40px] gap-[24px] h-full  border-home-learning-track-progress-border ${
            !isLandingPage ? 'border-r' : ''
          }`}
        >
          <Image src={LearningImage} width={200} alt="learning-image" />
          <div className="flex flex-col justify-between h-full w-[77%] ">
            <div>
              <div className="flex flex-col">
                <div className="text-[#3E3E3E] w-[fit-content] text-[12px] px-[10px] py-[3px] border border-[#3E3E3E] rounded-[20px]">
                  Learning Track
                </div>
                <p className="text-home-learning-track-color my-[16px] leading-[28px] tracking-[1.68px] font-next-poster-Bold text-[28px]">
                  {learningTrack?.name}
                </p>
              </div>
              <div>
                <CourseTags
                  level={learningTrack?.level as string}
                  unitCount={learningTrack?.courseCount}
                  type={'learning-track'}
                ></CourseTags>
              </div>
            </div>
            <div className="w-full  text-[16px] text-home-learning-track-default-color">
              {leftRender()}
            </div>
          </div>
        </div>
        <div className="w-[31%] pl-[30px] h-full flex flex-col text-home-learning-track-default-color">
          {!isLandingPage &&
            learningTrackStatus === LearningTrackCourseType.IN_PROCESS && (
              <p className="text-[16px] text-[#8C8C8C]">Next Up</p>
            )}
          <div className="flex-1 flex flex-col justify-between">
            {rightRender()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningTrackCard;
