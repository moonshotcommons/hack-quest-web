import { FC, useContext, useEffect } from 'react';
import { LessonReadingData, lessonTypeData } from '@/app/[lang]/mobile/(learn page)/ugc/[courseId]/learn/components/UgcSidebar/constant';
import ComponentRenderer from '../UgcRender';
import webApi from '@/service';
import { useUnitNavList } from '@/hooks/courses/useUnitNavList';
import { UgcContext } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';

interface LessonContainerProps {
  lesson: LessonReadingData;
}

const LessonContainer: FC<LessonContainerProps> = (props) => {
  const { lesson } = props;
  const { refreshNavList } = useUnitNavList(lesson as any);
  const { setMounted } = useContext(UgcContext);
  useEffect(() => {
    if (lesson) {
      refreshNavList();
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="text-h2-mob">{lesson.title}</h2>
      <div className="mt-[.625rem] flex items-center gap-[.625rem]">
        <span>{lessonTypeData[lesson.type].icon}</span>
        <span className="caption-12pt">{lessonTypeData[lesson.type].label}</span>
      </div>
      <div className="w-full pb-10">
        <ComponentRenderer parent={lesson} component={lesson.content}></ComponentRenderer>
      </div>
    </div>
  );
};

export default LessonContainer;
