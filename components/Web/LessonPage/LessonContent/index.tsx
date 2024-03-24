'use client';
import ComponentRenderer from '@/components/Web/Business/Renderer/ComponentRenderer';
import {
  CustomComponent,
  LessonContent,
  NotionComponent
} from '@/components/Web/Business/Renderer/type';
import {
  ExpandDataType,
  useLessonExpand
} from '@/hooks/courses/useLessonExpand';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import {
  FC,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense
} from 'react';
import LessonEvents from '../LessonEvents';
import FoundBugButton from '../../Business/FoundBugButton';
import LessonNavbar from '../LessonNavbar';

export const LessonContentContext = createContext<{
  expandData: ExpandDataType[];
  changeExpandData: (data: ExpandDataType[], index: number) => void;
}>({} as any);
interface LessonContentProps {
  lesson: Omit<CourseLessonType, 'content'> & { content: LessonContent };
  isPreview?: boolean;
  courseType: CourseType;
}

const LessonContentComponent: FC<LessonContentProps> = (props) => {
  const { lesson, isPreview = false, courseType } = props;
  const [components, setComponents] = useState<
    (CustomComponent | NotionComponent)[]
  >(() => {
    return lesson.content.left;
  });
  const { getLessonExpand } = useLessonExpand(lesson.content.left);
  const [expandData, setExpandData] =
    useState<ExpandDataType[][]>(getLessonExpand());

  const changeExpandData = (data: ExpandDataType[], index: number) => {
    expandData[index] = data;
    setExpandData([...expandData]);
  };

  const componentsWrapRef = useRef<HTMLDivElement>(null);

  const parent = useMemo(() => {
    return {
      ...lesson.content,
      isRoot: true
    };
  }, [lesson]);

  useEffect(() => {
    setExpandData(getLessonExpand());
    if (lesson.content.left) {
      setComponents(lesson.content.left);
    }
  }, [lesson]);

  const getExpandData = (cId: string) => {
    const eData = expandData.find((v) => v.some((v1) => v1.cId === cId));
    return eData || [];
  };

  useEffect(() => {
    if (componentsWrapRef.current) {
      componentsWrapRef.current.scrollTo(0, 0);
    }
  }, [lesson]);

  return (
    <div className="flex h-[calc(100%-10px)] flex-shrink-0 flex-col pl-[20px] pr-[20px]">
      <Suspense>
        <LessonNavbar />
      </Suspense>

      <LessonEvents
        isPreview={isPreview}
        lesson={lesson as any}
        courseType={courseType}
      />

      {!!components?.length && (
        <div
          className="scroll-wrap-y scroll-wrap-x mb-[20px] flex h-full w-full flex-1 shrink-0 flex-col"
          ref={componentsWrapRef}
        >
          {components.map((component, i) => {
            return (
              <div key={component.id} className="">
                <LessonContentContext.Provider
                  value={{
                    expandData: getExpandData(component.id),
                    changeExpandData
                  }}
                >
                  <ComponentRenderer
                    parent={parent}
                    component={component}
                  ></ComponentRenderer>
                </LessonContentContext.Provider>
              </div>
            );
          })}
          <FoundBugButton
            params={{
              lessonId: lesson.id
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LessonContentComponent;
