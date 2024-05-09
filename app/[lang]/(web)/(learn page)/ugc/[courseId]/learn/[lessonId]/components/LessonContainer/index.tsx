import { FC, useContext, useEffect } from 'react';

import webApi from '@/service';

import { lessonTypeData, LessonReadingData } from '../../../components/UgcSidebar/constant';
import { UgcContext } from '../../../constants/type';
import { ComponentRenderer, ComponentRendererProvider } from '@/components/ComponentRenderer';
import { PageType } from '@/components/ComponentRenderer/type';
import UgcCustomRenderer from '../UgcCustomRenderer';

interface LessonContainerProps {
  lesson: LessonReadingData;
}

const LessonContainer: FC<LessonContainerProps> = (props) => {
  const { lesson } = props;
  const { setMounted } = useContext(UgcContext);
  // const { refreshNavList } = useUnitNavList(lesson as any);
  useEffect(() => {
    if (lesson) {
      // refreshNavList();
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!lesson) return null;

  console.log(lesson);

  return (
    <div className="flex h-full w-[50.5rem] flex-col items-center ">
      <h2 className="text-h2">{lesson.title}</h2>
      <div className="mt-[.625rem] flex items-center gap-[.625rem]">
        <span>{lessonTypeData[lesson.type].icon}</span>
        <span className="caption-16pt">{lessonTypeData[lesson.type].label}</span>
      </div>
      <div className="w-full pb-10">
        <ComponentRendererProvider
          type={PageType.UGC}
          CustomComponentRenderer={UgcCustomRenderer}
          textRenderer={{
            textStyle: 'body-l text-neutral-black',
            codeStyle: 'code-l text-code-red bg-neutral-off-white py-[2px] px-[7px]'
          }}
        >
          <ComponentRenderer
            parent={lesson}
            component={lesson.content}
            prevComponent={null}
            nextComponent={null}
            position={0}
          ></ComponentRenderer>
        </ComponentRendererProvider>
      </div>
    </div>
  );
};

export default LessonContainer;
