'use client';
import Button from '@/components/Common/Button';
import React from 'react';

interface UgcFooterProp {}

const UgcFooter: React.FC<UgcFooterProp> = ({}) => {
  const unitNavList = [
    { propgress: 0.5 },
    { propgress: 0.5 },
    { propgress: 0.5 },
    { propgress: 0.5 }
  ];
  const curIndex = 1;
  const handleNext = () => {};
  return (
    <div className="h-[68px] bg-neutral-rich-gray flex-center px-[40px] relative transition-all">
      <div className="max-w-[calc((100%-550px))] flex gap-[2px] overflow-auto">
        {unitNavList.map((item, i) => (
          <div
            key={i}
            className="w-[70px] h-[5px] rounded-[3px] bg-neutral-medium-gray overflow-hidden"
          >
            {curIndex >= i ? (
              <div
                className="h-full rounded-[3px] bg-yellow-dark transition-all"
                style={{
                  width: `${curIndex === i ? item.propgress * 100 : '100'}%`
                }}
              ></div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="absolute h-full top-0 right-[40px] flex items-center">
        <Button
          className="w-[216px] h-[48px] bg-yellow-primary button-text-m text-neutral-black"
          onClick={handleNext}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default UgcFooter;
