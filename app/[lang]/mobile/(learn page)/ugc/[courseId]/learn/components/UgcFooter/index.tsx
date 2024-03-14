'use client';
import Button from '@/components/Common/Button';
import React, { useContext, useEffect } from 'react';
import { CourseType } from '@/service/webApi/course/type';
import { useGotoNextLesson } from '@/hooks/useCoursesHooks/useGotoNextLesson';
import emitter from '@/store/emitter';
import MobCompleteModal from '@/components/Mobile/MobCompleteModal';
import {
  FooterButtonStatus,
  FooterButtonText,
  UgcContext
} from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';

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
    <div className="fixed bottom-[1.25rem] left-0 w-full px-[1.375rem] ">
      <Button
        className={`button-text-m h-[3rem] w-full   ${
          footerBtn.footerBtnDisable
            ? 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray'
            : 'bg-yellow-primary text-neutral-black'
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
