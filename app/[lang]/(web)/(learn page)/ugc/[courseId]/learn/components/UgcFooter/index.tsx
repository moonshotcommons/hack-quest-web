'use client';
import Button from '@/components/Common/Button';
import React, { useContext, useEffect } from 'react';
import {
  FooterButtonStatus,
  FooterButtonText,
  UgcContext
} from '../../constants/type';
import { useUnitNavList } from '@/hooks/courses/useUnitNavList';
import { CourseType } from '@/service/webApi/course/type';
import { useGotoNextLesson } from '@/hooks/courses/useGotoNextLesson';
import CompleteModal from '@/components/Web/Business/CompleteModal';
import emitter from '@/store/emitter';

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
  const {
    unitNavList = [],
    currentUnitIndex,
    refreshNavList
  } = useUnitNavList(lesson);

  const handleClick = () => {
    if (footerBtn.footerBtnDisable || nextLoading) return;
    if (footerBtn.footerBtnStatus !== FooterButtonStatus.NEXT) {
      emitter.emit(footerBtn.footerBtnStatus);
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    if (lesson?.courseId) {
      refreshNavList();
    }
    setFooterBtn({
      footerBtnDisable: false,
      footerBtnStatus: FooterButtonStatus.NEXT,
      footerBtnText: FooterButtonText.NEXT
    });
  }, [lesson]);

  return (
    <div className="flex-center relative h-[68px] bg-neutral-rich-gray px-[40px] shadow-[0px_-2px_8px_0_rgba(0,0,0,0.12)] transition-all">
      <div className="flex max-w-[calc((100%-550px))] gap-[2px] overflow-auto">
        {unitNavList.map((item, i) => (
          <div
            key={item.id}
            className="h-[5px] w-[70px] overflow-hidden rounded-[3px] bg-neutral-medium-gray"
          >
            <div
              className="h-full rounded-[3px] bg-yellow-dark transition-all"
              style={{ width: `${item.progress * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="absolute right-[40px] top-0 flex h-full items-center">
        <Button
          className={`button-text-m h-[48px] w-[216px]   ${
            footerBtn.footerBtnDisable
              ? 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray'
              : 'bg-yellow-primary text-neutral-black'
          }`}
          loading={footerBtn.footerBtnLoading}
          onClick={handleClick}
        >
          {footerBtn.footerBtnText}
        </Button>
      </div>
      <CompleteModal ref={completeModalRef}></CompleteModal>
    </div>
  );
};

export default UgcFooter;
