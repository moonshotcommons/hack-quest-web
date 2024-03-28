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
    <div className="fixed bottom-[1.25rem] left-0 w-full px-[1.375rem] ">
      <Button
        className={`button-text-m h-[3rem] w-full bg-yellow-primary text-neutral-black`}
        loading={nextLoading}
        onClick={handleNext}
      >
        NEXT
      </Button>
    </div>
  );
};

export default LessonFooter;
