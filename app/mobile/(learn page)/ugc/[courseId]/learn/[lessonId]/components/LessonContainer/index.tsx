import { FC, useContext, useEffect } from 'react';
import {
  LessonReadingData,
  lessonTypeData
} from '@/app/mobile/(learn page)/ugc/[courseId]/learn/components/UgcSidebar/constant';
import ComponentRenderer from '../UgcRender';
import webApi from '@/service';
import { useGotoNextLesson } from '@/hooks/useCoursesHooks/useGotoNextLesson';
import { CourseType } from '@/service/webApi/course/type';
import {
  FooterButtonStatus,
  UgcContext
} from '@/app/mobile/(learn page)/ugc/[courseId]/learn/constants/type';
import CompleteModal from '@/components/Web/Business/CompleteModal';
import { useUnitNavList } from '@/hooks/useUnitNavList';
import emitter from '@/store/emitter';

interface LessonContainerProps {
  lesson: LessonReadingData;
}

const LessonContainer: FC<LessonContainerProps> = (props) => {
  const { lesson } = props;
  const { setFooterBtn } = useContext(UgcContext);
  const { onNextClick, completeModalRef } = useGotoNextLesson(
    lesson!,
    CourseType.UGC,
    true
  );
  const { refreshNavList } = useUnitNavList(lesson as any);
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
  emitter.on(FooterButtonStatus.NEXT, handleNext);
  useEffect(() => {
    if (lesson) {
      refreshNavList();
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
    return () => {
      emitter.off(FooterButtonStatus.NEXT, handleNext);
    };
  }, [lesson]);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-h2-mob">{lesson.title}</h2>
      <div className="flex gap-[.625rem] mt-[.625rem] items-center">
        <span>{lessonTypeData[lesson.type].icon}</span>
        <span className="caption-12pt">
          {lessonTypeData[lesson.type].label}
        </span>
      </div>
      <div className="pb-10 w-full">
        <ComponentRenderer
          parent={lesson}
          component={lesson.content}
        ></ComponentRenderer>
      </div>
      <CompleteModal ref={completeModalRef}></CompleteModal>
    </div>
  );
};

export default LessonContainer;
