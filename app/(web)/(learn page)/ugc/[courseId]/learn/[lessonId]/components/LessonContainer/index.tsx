import { FC, useEffect } from 'react';
import { LessonReadingData, lessonTypeData } from '../UgcSidebar/constant';
import ComponentRenderer from '../UgcRender';
import webApi from '@/service';

interface LessonContainerProps {
  lesson: LessonReadingData;
}

const LessonContainer: FC<LessonContainerProps> = (props) => {
  const { lesson } = props;

  useEffect(() => {
    if (lesson) {
      // judgmentInitIsHandleNext();
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);

  return (
    <div className="w-[50.5rem] h-full flex flex-col items-center ">
      <h2 className="text-h2">{lesson.title}</h2>
      <div className="flex gap-[.625rem] mt-[.625rem] items-center mb-[3.125rem]">
        <span>{lessonTypeData[lesson.type].icon}</span>
        <span className="caption-16pt">
          {lessonTypeData[lesson.type].label}
        </span>
      </div>
      <div className="pb-10">
        <ComponentRenderer
          parent={lesson}
          component={lesson.content}
        ></ComponentRenderer>
      </div>
    </div>
  );
};

export default LessonContainer;
