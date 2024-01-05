import React, { useRef, MouseEvent } from 'react';
import Image from 'next/image';
import ElectiveTag from '../ElectiveTag';
import Button from '@/components/v2/Common/Button';
import {
  EcosystemElectiveType,
  ElectiveCourseType
} from '@/service/webApi/elective/type';
import MiniElectiveDetailModal, {
  MiniElectiveDetailModalRef
} from '@/components/v2/Business/MiniElectiveDetailModal';
import { BurialPoint } from '@/helper/burialPoint';
import { QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
interface MiniElectiveCardProp {
  elective: EcosystemElectiveType & ElectiveCourseType;
}

const MiniElectiveCard: React.FC<MiniElectiveCardProp> = ({ elective }) => {
  const miniElectiveDetailInstance = useRef<MiniElectiveDetailModalRef>(null);
  const { jumpLearningLesson } = useJumpLeaningLesson();
  const handleClick = () => {
    BurialPoint.track('ecosystem-profile miniElectiveCard 点击');
    miniElectiveDetailInstance.current?.open(elective as ElectiveCourseType);
  };
  const handleLearn = (e: MouseEvent<HTMLElement>) => {
    BurialPoint.track('ecosystem-profile miniElectiveCard start按钮 点击');
    e.stopPropagation();
    jumpLearningLesson(elective, {
      menu: 'electives',
      idTypes: [QueryIdType.MENU_COURSE_ID],
      ids: [elective.id]
    });
  };
  return (
    <>
      <div
        className="cursor-pointer overflow-hidden flex h-[336px] bg-[#fff] font-next-book text-[#0b0b0b] rounded-[10px] hover:-translate-y-1 transition-all duration-300 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
        onClick={() => handleClick()}
      >
        <div className="w-[597px] h-full relative">
          <Image
            src={elective.image}
            fill
            alt="electiveImg"
            className="object-cover"
          ></Image>
        </div>
        <div className="flex-1 flex-shrink-0  flex flex-col justify-between h-full px-[40px] py-[20px]">
          <div>
            <p className="text-[rgba(11,11,11,0.6)] text-[18px]">
              {elective.type}
            </p>
            <p className="font-next-book-bold text-[21px] leading-[26px]">
              {elective.name}
            </p>
          </div>
          <div className="leading-[25px] h-[78px] line-clamp-3">
            {elective.description}
          </div>
          <div>
            <ElectiveTag elective={elective} />
          </div>
          <div className="flex justify-between">
            <Button
              type="primary"
              className="w-[calc((100%-15px)/2)] h-15 text-[18px] text-home-learning-track-view-button-color bg-home-learning-track-view-button-bg px-0"
              onClick={handleLearn}
            >
              {!!elective.progress && elective.progress > 0
                ? 'Resume'
                : 'Start'}
            </Button>
            <Button className="w-[calc((100%-15px)/2)] h-15 text-[18px] border border-home-learning-track-view-button-border text-home-learning-track-view-button-color px-0">
              View Syllabus
            </Button>
          </div>
        </div>
      </div>
      <MiniElectiveDetailModal ref={miniElectiveDetailInstance} />
    </>
  );
};

export default MiniElectiveCard;
