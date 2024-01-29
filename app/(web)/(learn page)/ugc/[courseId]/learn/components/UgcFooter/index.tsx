'use client';
import Button from '@/components/Common/Button';
import React, { useContext, useEffect } from 'react';
import {
  FooterButtonStatus,
  FooterButtonText,
  UgcContext
} from '../../constants/type';
import { useUnitNavList } from '@/hooks/useUnitNavList';
import { CourseType } from '@/service/webApi/course/type';
import { useGotoNextLesson } from '@/hooks/useCoursesHooks/useGotoNextLesson';
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
    <div className="h-[68px] bg-neutral-rich-gray flex-center px-[40px] relative transition-all shadow-[0px_-2px_8px_0_rgba(0,0,0,0.12)]">
      <div className="max-w-[calc((100%-550px))] flex gap-[2px] overflow-auto">
        {unitNavList.map((item, i) => (
          <div
            key={item.id}
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
      <CompleteModal ref={completeModalRef}></CompleteModal>
    </div>
  );
};

export default UgcFooter;
