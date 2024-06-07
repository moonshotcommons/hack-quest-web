import Button from '@/components/Common/Button';
import { useUnitNavList } from '@/hooks/courses/useUnitNavList';
import { CourseLessonType } from '@/service/webApi/course/type';
import React, { useContext, useEffect, useRef } from 'react';
import { LessonPageContext } from '../type';
import { LessonContent } from '@/components/ComponentRenderer/type';

interface LessonFooterProps {
  lesson?: Omit<CourseLessonType, 'content'> & { content: LessonContent };
  onNextClick: VoidFunction;
}
const LessonFooter: React.FC<LessonFooterProps> = ({ lesson, onNextClick }) => {
  const { unitNavList = [], currentUnitIndex, refreshNavList } = useUnitNavList(lesson as any);

  const { isHandleNext, nextLoading } = useContext(LessonPageContext);
  const handleNext = () => {
    debugger;
    if (!isHandleNext) return;
    onNextClick();
  };

  const ref = useRef(null);

  useEffect(() => {
    refreshNavList();
  }, [lesson]);

  // useKeyPress('Enter', handleNext, {
  //   target: ref.current
  // });
  return (
    <div
      className="flex-center fixed bottom-0 left-0 w-full bg-lesson-footer-bg transition-all"
      style={{
        height: isHandleNext ? '80px' : '30px'
      }}
    >
      <div className="flex-center w-[calc(100%-380px)] gap-[2px] overflow-auto">
        {unitNavList.map((item, i) => (
          <div
            key={i}
            className={`w-[70px]   ${
              i === currentUnitIndex
                ? 'h-[7px] rounded-[5px] border border-lesson-footer-tab-active-border'
                : 'h-[5px] rounded-[3px] border border-lesson-footer-tab-border'
            }`}
          >
            <div
              className={`h-full    ${
                i === currentUnitIndex
                  ? 'rounded-[2px] bg-lesson-footer-tab-active-bg'
                  : 'rounded-[1px] bg-lesson-footer-tab-bg'
              }`}
              style={{ width: `${item.progress * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
      {isHandleNext && (
        <div
          className="fixed bottom-0 right-10 flex items-center"
          style={{
            height: isHandleNext ? '80px' : '30px'
          }}
        >
          <Button
            ref={ref}
            loading={nextLoading}
            type="primary"
            disabled={!isHandleNext || nextLoading}
            className={`h-[44px] w-[140px] bg-lesson-primary-button-bg text-lesson-primary-button-text-color ${
              !isHandleNext && 'cursor-not-allowed opacity-40'
            }`}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default LessonFooter;
