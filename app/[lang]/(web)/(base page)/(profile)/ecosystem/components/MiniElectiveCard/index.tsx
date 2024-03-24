import React, { useRef, MouseEvent } from 'react';
import Image from 'next/image';
import ElectiveTag from '../ElectiveTag';
import Button from '@/components/Common/Button';
import {
  EcosystemElectiveType,
  ElectiveCourseType
} from '@/service/webApi/elective/type';
import MiniElectiveDetailModal, {
  MiniElectiveDetailModalRef
} from '@/components/Web/Business/MiniElectiveDetailModal';
import { BurialPoint } from '@/helper/burialPoint';
import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
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
        className="flex h-[336px] cursor-pointer overflow-hidden rounded-[10px] bg-neutral-white text-neutral-black shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
        onClick={() => handleClick()}
      >
        <div className="relative h-full w-[597px]">
          <Image
            src={elective.image}
            fill
            alt="electiveImg"
            className="object-cover"
          ></Image>
        </div>
        <div className="flex h-full  flex-1 flex-shrink-0 flex-col justify-between px-[40px] py-[20px]">
          <div>
            <p className="body-l text-[rgba(11,11,11,0.6)]">{elective.type}</p>
            <p className="text-h3">{elective.name}</p>
          </div>
          <div className="line-clamp-3 h-[78px]">{elective.description}</div>
          <div>
            <ElectiveTag elective={elective} />
          </div>
          <div className="flex justify-between">
            <Button
              type="primary"
              className="h-15 body-l w-[calc((100%-15px)/2)] bg-home-learning-track-view-button-bg px-0 text-home-learning-track-view-button-color"
              onClick={handleLearn}
            >
              {!!elective.progress && elective.progress > 0
                ? 'Resume'
                : 'Start'}
            </Button>
            <Button className="h-15 body-l w-[calc((100%-15px)/2)] border border-home-learning-track-view-button-border px-0 text-home-learning-track-view-button-color">
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
