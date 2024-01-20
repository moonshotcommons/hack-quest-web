'use client';
import Button from '@/components/Common/Button';
import React, { useContext, useEffect } from 'react';
import { UgcContext } from '../../constants/type';
import { useUnitNavList } from '@/hooks/useUnitNavList';

interface UgcFooterProp {}

const UgcFooter: React.FC<UgcFooterProp> = ({}) => {
  const { emitter, footerBtn, lesson } = useContext(UgcContext);
  const {
    unitNavList = [],
    currentUnitIndex,
    refreshNavList
  } = useUnitNavList(lesson);
  const handleClick = () => {
    if (footerBtn.footerBtnDisable) return;
    emitter.emit(footerBtn.footerBtnStatus);
  };
  useEffect(() => {
    refreshNavList();
  }, [lesson]);

  return (
    <div className="h-[68px] bg-neutral-rich-gray flex-center px-[40px] relative transition-all shadow-[0px_-2px_8px_0_rgba(0,0,0,0.12)]">
      <div className="max-w-[calc((100%-550px))] flex gap-[2px] overflow-auto">
        {unitNavList.map((item, i) => (
          <div
            key={i}
            className="w-[70px] h-[5px] rounded-[3px] bg-neutral-medium-gray overflow-hidden"
          >
            {currentUnitIndex >= i ? (
              <div
                className="h-full rounded-[3px] bg-yellow-dark transition-all"
                style={{
                  width: `${
                    currentUnitIndex === i ? item.progress * 100 : '100'
                  }%`
                }}
              ></div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="absolute h-full top-0 right-[40px] flex items-center">
        <Button
          className={`w-[216px] h-[48px] button-text-m   ${
            footerBtn.footerBtnDisable
              ? 'bg-neutral-light-gray text-neutral-medium-gray cursor-not-allowed'
              : 'text-neutral-black bg-yellow-primary'
          }`}
          loading={footerBtn.footerBtnLoading}
          onClick={handleClick}
        >
          {footerBtn.footerBtnText}
        </Button>
      </div>
    </div>
  );
};

export default UgcFooter;
