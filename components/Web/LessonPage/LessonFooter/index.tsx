import { LessonContent } from '@/components/Web/Business/Renderer/type';
import Button from '@/components/Common/Button';
import { useUnitNavList } from '@/hooks/useUnitNavList';
import { CourseLessonType } from '@/service/webApi/course/type';
import React, { useContext, useEffect } from 'react';
import { LessonPageContext } from '../type';

interface LessonFooterProps {
  lesson?: Omit<CourseLessonType, 'content'> & { content: LessonContent };
  onNextClick: VoidFunction;
}
const LessonFooter: React.FC<LessonFooterProps> = ({ lesson, onNextClick }) => {
  const {
    unitNavList = [],
    currentUnitIndex,
    refreshNavList
  } = useUnitNavList(lesson as any);

  const { isHandleNext, nextLoading } = useContext(LessonPageContext);
  const handleNext = () => {
    if (!isHandleNext) return;
    onNextClick();
  };

  useEffect(() => {
    refreshNavList();
  }, [lesson]);
  return (
    <div
      className="fixed flex-center w-full transition-all left-0 bottom-0 bg-lesson-footer-bg"
      style={{
        height: isHandleNext ? '80px' : '30px'
      }}
    >
      <div className="w-[calc(100%-380px)] flex-center overflow-auto gap-[2px]">
        {unitNavList.map((item, i) => (
          <div
            key={i}
            className={`w-[70px]   ${
              i === currentUnitIndex
                ? 'h-[7px] border border-lesson-footer-tab-active-border rounded-[5px]'
                : 'h-[5px] border border-lesson-footer-tab-border rounded-[3px]'
            }`}
          >
            <div
              className={`h-full    ${
                i === currentUnitIndex
                  ? 'bg-lesson-footer-tab-active-bg rounded-[2px]'
                  : 'bg-lesson-footer-tab-bg rounded-[1px]'
              }`}
              style={{ width: `${item.progress * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
      {isHandleNext && (
        <div
          className=" flex items-center fixed right-10 bottom-0"
          style={{
            height: isHandleNext ? '80px' : '30px'
          }}
        >
          <Button
            loading={nextLoading}
            type="primary"
            disabled={!isHandleNext || nextLoading}
            className={`w-[140px] h-[44px] bg-lesson-primary-button-bg text-lesson-primary-button-text-color ${
              !isHandleNext && 'opacity-40 cursor-not-allowed'
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
