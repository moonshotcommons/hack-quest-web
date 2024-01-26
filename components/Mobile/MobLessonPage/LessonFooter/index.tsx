import { LessonContent } from '@/components/Web/Business/Renderer/type';
import Button from '@/components/Common/Button';
import { CourseLessonType } from '@/service/webApi/course/type';
import React, { useContext } from 'react';
import { LessonPageContext } from '../type';

interface LessonFooterProps {
  lesson?: Omit<CourseLessonType, 'content'> & { content: LessonContent };
  onNextClick: VoidFunction;
}
const LessonFooter: React.FC<LessonFooterProps> = ({ lesson, onNextClick }) => {
  const { nextLoading } = useContext(LessonPageContext);
  const handleNext = () => {
    onNextClick();
  };

  return (
    <div className="px-[1.375rem] fixed w-full left-0 bottom-[1.25rem] ">
      <Button
        className={`w-full h-[3rem] button-text-m text-neutral-black bg-yellow-primary`}
        loading={nextLoading}
        onClick={handleNext}
      >
        NEXT
      </Button>
    </div>
  );
};

export default LessonFooter;
