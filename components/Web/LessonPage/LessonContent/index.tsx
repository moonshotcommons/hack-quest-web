'use client';
import Breadcrumb from '@/components/Web/Business/Breadcrumb';
import ComponentRenderer from '@/components/Web/Business/Renderer/ComponentRenderer';
import {
  CustomComponent,
  LessonContent,
  NotionComponent
} from '@/components/Web/Business/Renderer/type';
import Button from '@/components/Common/Button';
import { ExpandDataType, useLessonExpand } from '@/hooks/useLessonExpand';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense
} from 'react';
import LessonEvents from '../LessonEvents';
import { LessonPageContext } from '../type';

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
  const { onBugCommit } = useContext(LessonPageContext);
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
        <Breadcrumb />
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
          <Button
            icon={BugIcon}
            className="rounded-[10px] bg-neutral-medium-gray px-[16px] py-[14px] text-neutral-white"
            onClick={() => {
              onBugCommit?.();
            }}
          >
            <span className="body-m ml-[0.5]">Found a bug?</span>
          </Button>
        </div>
      )}
    </div>
  );
};

const BugIcon = (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11.5" cy="11.5" r="11.5" fill="white" />
    <circle cx="11.5001" cy="5.36634" r="1.53333" fill="#8C8C8C" />
    <rect
      x="9.9668"
      y="8.43359"
      width="3.06667"
      height="10.35"
      rx="1.53333"
      fill="#8C8C8C"
    />
  </svg>
);

export default LessonContentComponent;
