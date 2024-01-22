import { FC, useContext, useEffect } from 'react';

import ComponentRenderer from '../UgcRender';
import webApi from '@/service';

import { useUnitNavList } from '@/hooks/useUnitNavList';
import {
  FooterButtonStatus,
  UgcContext
} from '@/app/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import {
  lessonTypeData,
  LessonReadingData
} from '../../../components/UgcSidebar/constant';

interface LessonContainerProps {
  lesson: LessonReadingData;
}

const LessonContainer: FC<LessonContainerProps> = (props) => {
  const { lesson } = props;
  const { setFooterBtn } = useContext(UgcContext);

  const { refreshNavList } = useUnitNavList(lesson as any);
  useEffect(() => {
    if (lesson) {
      refreshNavList();
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
    setFooterBtn({
      footerBtnDisable: false,
      footerBtnStatus: FooterButtonStatus.NEXT
    });
  }, [lesson]);

  return (
    <div className="w-[50.5rem] h-full flex flex-col items-center ">
      <h2 className="text-h2">{lesson.title}</h2>
      <div className="flex gap-[.625rem] mt-[.625rem] items-center">
        <span>{lessonTypeData[lesson.type].icon}</span>
        <span className="caption-16pt">
          {lessonTypeData[lesson.type].label}
        </span>
      </div>
      <div className="pb-10 w-full">
        <ComponentRenderer
          parent={lesson}
          component={lesson.content}
        ></ComponentRenderer>
      </div>
    </div>
  );
};

export default LessonContainer;
