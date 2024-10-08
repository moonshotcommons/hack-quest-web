import { FC, useContext, useEffect } from 'react';
import {
  LessonReadingData,
  lessonTypeData
} from '@/app/[lang]/mobile/(learn page)/ugc/[courseId]/learn/components/UgcSidebar/constant';
import webApi from '@/service';
import { useUnitNavList } from '@/hooks/courses/useUnitNavList';
import { UgcContext } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';
import { ComponentRenderer, ComponentRendererProvider } from '@/components/ComponentRenderer';
import { PageType } from '@/components/ComponentRenderer/type';
import MobUgcCustomRenderer from '../MobUgcCustomRenderer';

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
        <ComponentRendererProvider isMobile type={PageType.UGC} CustomComponentRenderer={MobUgcCustomRenderer}>
          <ComponentRenderer
            parent={lesson}
            component={lesson.content}
            nextComponent={null}
            prevComponent={null}
            position={0}
          ></ComponentRenderer>
        </ComponentRendererProvider>
      </div>
    </div>
  );
};

export default LessonContainer;
