'use client';
import Button from '@/components/Common/Button';
import React, { useContext, useEffect } from 'react';
import {
  UgcContext,
  FooterButtonStatus,
  FooterButtonText
} from '@/app/mobile/(learn page)/ugc/[courseId]/learn/constants/type';
import emitter from '@/store/emitter';
import { useGotoNextLesson } from '@/hooks/useCoursesHooks/useGotoNextLesson';
import { CourseType } from '@/service/webApi/course/type';
import MobCompleteModal from '@/components/Mobile/MobCompleteModal';

interface UgcFooterProp {}

const UgcFooter: React.FC<UgcFooterProp> = ({}) => {
  const { footerBtn, lesson, setFooterBtn } = useContext(UgcContext);
  const {
    onNextClick,
    completeModalRef,
    loading: nextLoading
  } = useGotoNextLesson(lesson!, CourseType.UGC, true);
  const handleNext = () => {
    setFooterBtn({
      footerBtnLoading: true
    });
    onNextClick({
      completedCallback: () => {
        setFooterBtn({
          footerBtnLoading: false
        });
      }
    });
  };

  const handleClick = () => {
    if (footerBtn.footerBtnDisable || nextLoading) return;
    if (footerBtn.footerBtnStatus !== FooterButtonStatus.NEXT) {
      emitter.emit(footerBtn.footerBtnStatus);
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    setFooterBtn({
      footerBtnDisable: false,
      footerBtnStatus: FooterButtonStatus.NEXT,
      footerBtnText: FooterButtonText.NEXT
    });
  }, [lesson]);

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
      <MobCompleteModal ref={completeModalRef}></MobCompleteModal>
    </div>
  );
};

export default UgcFooter;
