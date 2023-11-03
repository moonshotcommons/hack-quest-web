'use client';
import { ExpandDataType, useLessonExpand } from '@/hooks/useLessonExpand';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import Breadcrumb from '../../Breadcrumb';
import ComponentRenderer from '../ComponentRenderer';
import LessonEvents from '../LessonEvents';
import {
  CustomComponent,
  LessonContent,
  LessonPageContext,
  NotionComponent
} from '../type';
import Button from '../../Common/Button';

export const LessonContentContext = createContext<{
  expandData: ExpandDataType[];
  changeExpandData: (data: ExpandDataType[], index: number) => void;
}>({} as any);
interface LessonContentProps {
  lesson: Omit<CourseLessonType, 'content'> & { content: LessonContent };
  isPreview?: boolean;
  courseType: CourseType;
}

const LessonContent: FC<LessonContentProps> = (props) => {
  const { lesson, isPreview = false, courseType } = props;
  const { onBugCommit } = useContext(LessonPageContext);
  const [components, setComponents] = useState<
    (CustomComponent | NotionComponent)[]
  >(() => {
    return lesson.content.left;
  });
  const { getLessonExpand } = useLessonExpand(lesson.content.left);
  const [expandData, setExpandData] = useState<ExpandDataType[][]>(
    getLessonExpand()
  );

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

  useEffect(() => {
    if (componentsWrapRef.current) {
      componentsWrapRef.current.scrollTo(0, 0);
    }
  }, [lesson]);

  return (
    <div className="flex flex-shrink-0 flex-col h-[calc(100%-10px)] pl-[20px] pr-[20px]">
      <Breadcrumb />

      <LessonEvents
        isPreview={isPreview}
        lesson={lesson as any}
        courseType={courseType}
      />

      {!!components?.length && (
        <div
          className="flex flex-col mb-[20px] w-full flex-1 shrink-0 h-full scroll-wrap-y scroll-wrap-x"
          ref={componentsWrapRef}
        >
          {components.map((component, i) => {
            return (
              <div key={component.id} className="">
                <LessonContentContext.Provider
                  value={{
                    expandData: expandData[i] || [],
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
            className="bg-[#8c8c8c] text-white rounded-[10px] px-[16px] py-[14px]"
            onClick={() => {
              onBugCommit?.();
            }}
          >
            <span className="ml-[0.5] leading-[125%] tracking-[0.32px] font-next-book text-[16px]">
              Found a bug?
            </span>
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

export default LessonContent;
