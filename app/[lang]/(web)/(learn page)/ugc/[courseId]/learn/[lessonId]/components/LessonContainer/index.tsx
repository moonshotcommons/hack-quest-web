import { FC, useEffect } from 'react';

import ComponentRenderer from '../UgcRender';
import webApi from '@/service';

import { lessonTypeData, LessonReadingData } from '../../../components/UgcSidebar/constant';

interface LessonContainerProps {
  lesson: LessonReadingData;
}

const LessonContainer: FC<LessonContainerProps> = (props) => {
  const { lesson } = props;
  // const { refreshNavList } = useUnitNavList(lesson as any);
  useEffect(() => {
    if (lesson) {
      // refreshNavList();
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);

  if (!lesson) return null;

  return (
    <div className="flex h-full w-[50.5rem] flex-col items-center ">
      <h2 className="text-h2">{lesson.title}</h2>
      <div className="mt-[.625rem] flex items-center gap-[.625rem]">
        <span>{lessonTypeData[lesson.type].icon}</span>
        <span className="caption-16pt">{lessonTypeData[lesson.type].label}</span>
      </div>
      <div className="w-full pb-10">
        <ComponentRenderer parent={lesson} component={lesson.content}></ComponentRenderer>
      </div>
    </div>
  );
};

export default LessonContainer;
