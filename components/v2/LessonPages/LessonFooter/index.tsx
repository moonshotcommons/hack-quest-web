import React from 'react';
import Button from '@/components/Common/Button';

function LessonFooter() {
  const data = [
    {
      p: 0.1
    },
    {
      p: 0.2
    },
    {
      p: 0.5
    },
    {
      p: 0.4
    },
    {
      p: 0.1
    }
  ];
  const active = 2;
  const isHandle = false;
  return (
    <div className="fixed flex-center w-full h-20 left-0 bottom-0 bg-lesson-footer-bg">
      <div className="w-[calc(100%-380px)] flex-center overflow-auto">
        {data.map((item, i) => (
          <div
            key={i}
            className={`w-[70px] rounded-[3px]  mx-[1px] ${
              i < active
                ? ' h-[5px] bg-lesson-footer-tab-bg'
                : i === active
                ? 'h-[7px] border border-lesson-footer-tab-active-border rounded-[5px]'
                : 'h-[5px] border border-lesson-footer-tab-border'
            }`}
          >
            {i === active ? (
              <div
                className={`w-[${
                  item.p * 100
                }%] relative -top-[1px] h-[7px] bg-lesson-footer-tab-active-bg  rounded-[5px]`}
              ></div>
            ) : null}
          </div>
        ))}
      </div>
      <Button
        className={`fixed bottom-[18px] right-10 w-[140px] h-11 bg-lesson-primary-button-bg text-lesson-primary-button-text-color ${
          !isHandle && 'opacity-40'
        }`}
      >
        Next
      </Button>
    </div>
  );
}

export default LessonFooter;
