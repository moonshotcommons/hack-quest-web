'use client';
import Button from '@/components/Common/Button';
import React, { useContext } from 'react';
import { UgcContext } from '@/app/mobile/(learn page)/ugc/[courseId]/learn/constants/type';
import emitter from '@/store/emitter';

interface UgcFooterProp {}

const UgcFooter: React.FC<UgcFooterProp> = ({}) => {
  const { footerBtn } = useContext(UgcContext);
  const handleClick = () => {
    if (footerBtn.footerBtnDisable) return;
    emitter.emit(footerBtn.footerBtnStatus);
  };

  return (
    <div className="px-[1.375rem] absolute w-full left-0 bottom-[1.25rem] ">
      <Button
        className={`w-full h-[3rem] button-text-m   ${
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
  );
};

export default UgcFooter;
