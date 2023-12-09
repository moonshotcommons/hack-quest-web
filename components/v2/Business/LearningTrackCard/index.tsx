import CheckIcon from '@/components/Common/Icon/Check';
import Button from '@/components/v2/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { computeProgress } from '@/helper/formate';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { useEnrollUnEnroll } from '@/hooks/useLearningTrackHooks/useEnrollUnEnroll';
import LearningImage from '@/public/images/home/learning-image.svg';
import webApi from '@/service';
import { LearningTrackCourseType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { Progress, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import CourseTags from '@/components/v2/Business/CourseTags';
import { menuLink } from '@/components/v2/Business/Breadcrumb/data';

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: #3e3e3e;
      font-size: 12px;
    }
  }
`;
interface LearningTrackLandingCardProps {
  learningTrack: LearningTrackDetailType;
  isLandingPage?: boolean;
  status?: LearningTrackCourseType;
}
const LearningTrackLandingCard: React.FC<LearningTrackLandingCardProps> = ({
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
    BurialPoint.track('home-learning track卡片resume按钮点击', {
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
  const leftIconRender = () => {
    switch (learningTrackStatus) {
      case LearningTrackCourseType.IN_PROCESS:
        return (
          <CustomProgress
            type="circle"
            percent={computeProgress(learningTrack.progress)}
            strokeWidth={6}
            strokeColor={'#FCC409'}
            trailColor={'#8C8C8C'}
            size={32}
            format={(percent: any) => {
              if (percent === 100) {
                return (
                  <span className="flex justify-center items-center align-middle text-[#3E3E3E]">
                    <CheckIcon width={32} height={32} color="currentColor" />
                  </span>
                );
              }
              return (
                <p className="flex justify-center relative top-[1px] items-end text-[12px] text-[#3E3E3E]   font-neuemachina-light whitespace-nowrap">
                  <span className="relative left-[3px]">{`${percent}`}</span>
                  <span className="scale-50 relative top-[1px] ">%</span>
                </p>
              );
            }}
          ></CustomProgress>
        );
      case LearningTrackCourseType.COMPLETED:
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#00C365" />
            <path
              d="M8 15.9999L14.4 22.3999L25.6 11.1999"
              stroke="white"
              strokeLinecap="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };
  const leftRender = () => {
    switch (learningTrackStatus) {
      case LearningTrackCourseType.UN_ENROLL:
      case LearningTrackCourseType.COMPLETED:
        return (
          <Typography.Paragraph
            ellipsis={{ rows: 3 }}
            style={{ marginBottom: '0px' }}
          >
            <span className="text-home-default-color text-[16px] font-next-book">
              {learningTrack.description}
            </span>
          </Typography.Paragraph>
        );
      case LearningTrackCourseType.IN_PROCESS:
        const percent = `${computeProgress(learningTrack.progress)}%`;
        return (
          <>
            <div className="w-full flex items-center justify-between">
              <div className="w-[93%] bg-home-learning-track-progress-bg rounded-[3px] h-[7px] overflow-hidden">
                <div
                  className="h-full bg-home-learning-track-progress-active-bg rounded-[3px]"
                  style={{ width: percent }}
                ></div>
              </div>
              <div>{percent}</div>
            </div>
            <div>Overall Process</div>
          </>
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
            <div>
              <p className="text-[21px] pt-[15px] pb-[10px]">
                You need to enroll in this learning track to display next
                lesson.
              </p>
            </div>
            <div className="w-full flex justify-between">
              <Button
                onClick={() => {
                  BurialPoint.track(
                    'home-learning track卡片View Syllabus按钮点击'
                  );
                }}
                className="w-[47%] h-11 border border-home-learning-track-view-button-border p-0 text-home-learning-track-view-button-color"
              >
                View Syllabus
              </Button>
              {!learningTrack.enrolled ? (
                <Button
                  type="primary"
                  loading={enrollLoading}
                  disabled={enrollLoading}
                  className="w-[47%] h-11 text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg"
                  onClick={handleRoll}
                >
                  Enroll
                </Button>
              ) : (
                <Button
                  loading={jumpLoading}
                  disabled={jumpLoading}
                  type="primary"
                  className="w-[48%] h-11 text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg px-0"
                  onClick={handleResume}
                >
                  Start
                </Button>
              )}
            </div>
          </>
        );
      case LearningTrackCourseType.IN_PROCESS:
        return (
          <>
            <div>
              <p className="text-[16px] pt-[10px] font-next-book-Thin leading-[160%]">
                {learningInfo?.learningSectionAndCourseName}&nbsp;
              </p>
              <p className="text-[24px] pb-[10px] leading-[160%]">
                {learningInfo?.learningLessonName}&nbsp;
              </p>
              {/* <div>
                <CourseTags
                  level={learningTrack.level as string}
                  duration={learningTrack.duration}
                  unitCount={learningTrack.unitCount ?? 0}
                ></CourseTags>
              </div> */}
            </div>
            <div className="w-full flex justify-between">
              <Button className="w-[48%] h-11 border border-home-learning-track-view-button-border text-home-learning-track-view-button-color px-0">
                View Syllabus
              </Button>
              <Button
                loading={jumpLoading}
                disabled={jumpLoading}
                type="primary"
                className="w-[48%] h-11 text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg px-0"
                onClick={handleResume}
              >
                Resume
              </Button>
            </div>
          </>
        );
      case LearningTrackCourseType.COMPLETED:
        return (
          <>
            <div>
              <p className="text-[21px] pt-[15px] pb-[10px]">
                You’ve finished this learning track.
              </p>
            </div>
            <div className="w-full flex justify-between">
              <Button className="w-[47%] h-11 border border-home-learning-track-view-button-border text-home-learning-track-view-button-color">
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
      className="h-[275px] font-next-book cursor-pointer relative rounded-[10px] bg-home-learning--track-bg overflow-hidden flex flex-col mb-10 hover:-translate-y-1 transition-all duration-300 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
      onClick={goLearningTrackDetail}
    >
      <div className="absolute left-0 top-0 w-full h-[10px] bg-home-learning--track-border-bg"></div>
      <div className="w-full flex-1 flex items-center p-10 relative">
        <div className="absolute left-[16px] top-[13px]">
          {leftIconRender()}
        </div>
        <div
          className={`w-[69%] flex items-center justify-between px-[37px] h-full  border-home-learning-track-progress-border ${
            !isLandingPage ? 'border-r' : ''
          }`}
        >
          <Image src={LearningImage} width={92} alt="learning-image" />
          <div className="flex flex-col justify-between h-full w-[77%] ">
            <div>
              <p className="text-home-learning-track-default-color text-[18px]">
                Learning Track
              </p>
              <p className="text-home-learning-track-color tracking-[1.68px] font-next-poster-Bold text-[28px]">
                {learningTrack?.name}
              </p>
            </div>
            <div>
              <CourseTags
                level={learningTrack?.level as string}
                duration={learningTrack?.duration}
                unitCount={learningTrack?.courseCount}
                type={'learning-track'}
              ></CourseTags>
            </div>
            <div className="w-full  text-[16px] text-home-learning-track-default-color">
              {leftRender()}
            </div>
          </div>
        </div>
        <div className="w-[31%] pl-[30px] h-full flex flex-col text-home-learning-track-default-color">
          {!isLandingPage && (
            <p className="text-[16px] font-next-book-bold">Next Up</p>
          )}
          <div className="flex-1 flex flex-col justify-between">
            {rightRender()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningTrackLandingCard;
