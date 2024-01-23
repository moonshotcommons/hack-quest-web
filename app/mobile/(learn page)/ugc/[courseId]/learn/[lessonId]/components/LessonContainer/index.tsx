import { FC, useEffect } from 'react';
import {
  LessonReadingData,
  lessonTypeData
} from '@/app/mobile/(learn page)/ugc/[courseId]/learn/components/UgcSidebar/constant';
import ComponentRenderer from '../UgcRender';
import webApi from '@/service';
import { useUnitNavList } from '@/hooks/useUnitNavList';

interface LessonContainerProps {
  lesson: LessonReadingData;
}

const LessonContainer: FC<LessonContainerProps> = (props) => {
  const { lesson } = props;
  const { refreshNavList } = useUnitNavList(lesson as any);
  useEffect(() => {
    if (lesson) {
      refreshNavList();
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
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
    </div>
  );
};

export default LessonContainer;
