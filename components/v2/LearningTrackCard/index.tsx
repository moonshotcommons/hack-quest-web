import Button from '@/components/Common/Button';
import LearningImage from '@/public/images/home/learning-image.svg';
import Image from 'next/image';
import React from 'react';
import { LearningTrackType } from '@/service/webApi/learningTrack/type';
import { LearningTrackCourseType } from '@/service/webApi/course/type';
import CheckIcon from '@/components/Common/Icon/Check';
import { computeProgress } from '@/helper/formate';
import { styled } from 'styled-components';
import { Progress } from 'antd';
import CourseTags from '../CourseTags';
import Link from 'next/link';

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: #3e3e3e;
      font-size: 12px;
    }
  }
`;
interface LearningTrackCardProps {
  learningTrack: LearningTrackType;
  status?: any;
}
const LearningTrackCard: React.FC<LearningTrackCardProps> = ({
  learningTrack,
  status
}) => {
  const leftRender = () => {
    switch (status) {
      case LearningTrackCourseType.UN_ENROLL:
      case LearningTrackCourseType.COMPLETED:
        return (
          <span className="text-home-default-color">
            {learningTrack.description}
          </span>
        );
      case LearningTrackCourseType.IN_PROCESS:
        const percent = `${learningTrack.progress * 100}%`;
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
    switch (status) {
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
              <Button className="w-[47%] h-11 border border-home-learning-track-view-button-border text-home-learning-track-view-button-color">
                View Syllabus
              </Button>
              <Button className="w-[47%] h-11 text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg">
                Enroll
              </Button>
            </div>
          </>
        );
      case LearningTrackCourseType.IN_PROCESS:
        return (
          <>
            <div>
              <p className="text-[21px] pt-[15px] pb-[10px]">Deploy Your NFT</p>
              <div>
                <CourseTags
                  level={learningTrack.level as string}
                  duration={learningTrack.duration}
                  unitCount={learningTrack.courseCount}
                ></CourseTags>
              </div>
            </div>
            <div className="w-full flex justify-between">
              <Button className="w-[48%] h-11 border border-home-learning-track-view-button-border text-home-learning-track-view-button-color px-0">
                View Syllabus
              </Button>
              <Button className="w-[48%] h-11 text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg px-0">
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
  return (
    <Link href={`/v2/learning-track/${learningTrack.id}`}>
      <div
        className="h-[275px] rounded-[10px] bg-home-learning--track-bg overflow-hidden flex flex-col mb-10"
        style={{
          boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div className="h-[10px] bg-home-learning--track-border-bg"></div>
        <div className="w-full flex-1 flex items-center p-10 relative">
          <div className="absolute left-[16px] top-[13px]">
            {learningTrack.progress < 1 && learningTrack.progress > 0 && (
              <CustomProgress
                type="circle"
                percent={Math.floor(computeProgress(learningTrack.progress))}
                strokeWidth={6}
                strokeColor={'#FCC409'}
                trailColor={'#8C8C8C'}
                size={32}
                format={(percent: any) => {
                  if (percent === 100) {
                    return (
                      <span className="flex justify-center items-center align-middle text-[#3E3E3E]">
                        <CheckIcon
                          width={32}
                          height={32}
                          color="currentColor"
                        />
                      </span>
                    );
                  }
                  return (
                    <span
                      className="inline-block text-[#3E3E3E] scale-50 text-[12px] font-neuemachina-light whitespace-nowrap"
                      style={{ transform: `scale(${0.5})` }}
                    >{`${percent} %`}</span>
                  );
                }}
              ></CustomProgress>
            )}
            {learningTrack.progress >= 1 && (
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
            )}
          </div>
          <div className="w-[69%] flex items-center justify-between px-[37px] h-full border-r border-home-learning-track-progress-border">
            <Image src={LearningImage} width={92} alt="learning-image" />
            <div className="flex flex-col justify-between h-full w-[77%] ">
              <div>
                <p className="text-home-learning-track-default-color text-[18px]">
                  Learning Track
                </p>
                <p className="text-home-learning-track-color font-next-book-bold text-[28px]">
                  {learningTrack.name}
                </p>
              </div>
              <div>
                <CourseTags
                  level={learningTrack.level as string}
                  duration={learningTrack.duration}
                  unitCount={learningTrack.courseCount}
                  type={'learning-track'}
                ></CourseTags>
              </div>
              <div className="w-full  text-[16px] text-home-learning-track-default-color">
                {leftRender()}
              </div>
            </div>
          </div>
          <div className="w-[31%] pl-[30px] h-full flex flex-col text-home-learning-track-default-color">
            <p className="text-[16px] font-next-book-bold">Next Up</p>
            <div className="flex-1 flex flex-col justify-between">
              {rightRender()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LearningTrackCard;
