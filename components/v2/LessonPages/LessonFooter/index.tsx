import React from 'react';
import Button from '@/components/Common/Button';
import { UnitPagesListType } from '@/service/webApi/course/type';

interface LessonFooterProps {
  currentUnitIndex: number;
  unitData: UnitPagesListType[];
}
const LessonFooter: React.FC<LessonFooterProps> = ({
  unitData,
  currentUnitIndex
}) => {
  const isHandle = false;
  return (
    <div className="fixed flex-center w-full h-20 left-0 bottom-0 bg-lesson-footer-bg">
      <div className="w-[calc(100%-380px)] flex-center overflow-auto">
        {unitData.map((item, i) => (
          <div
            key={i}
            className={`w-[70px] rounded-[3px]  mx-[1px] ${
              i < currentUnitIndex
                ? ' h-[5px] bg-lesson-footer-tab-bg'
                : i === currentUnitIndex
                ? 'h-[7px] border border-lesson-footer-tab-active-border rounded-[5px]'
                : 'h-[5px] border border-lesson-footer-tab-border'
            }`}
          >
            {i === currentUnitIndex ? (
              <div
                className={`relative -top-[1px] h-[7px] bg-lesson-footer-tab-active-bg  rounded-[5px]`}
                style={{ width: `${item.progress * 100}%` }}
              ></div>
            ) : null}
          </div>
        ))}
      </div>
      <Button
        className={`fixed bottom-[18px] right-10 w-[140px] h-11 bg-lesson-primary-button-bg text-lesson-primary-button-text-color ${
          !isHandle && 'opacity-40 cursor-not-allowed'
        }`}
      >
        Next
      </Button>
    </div>
  );
};

export default LessonFooter;
