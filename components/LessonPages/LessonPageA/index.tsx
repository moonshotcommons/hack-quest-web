import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import NotionRenderer, { Renderer } from '@/components/NotionRender';
import webApi from '@/service';
import { AppRootState } from '@/store/redux';
// import JSConfetti from 'js-confetti';
import { CustomRenderType } from '@/components/NotionRender/type';
import { useGotoNextLesson } from '@/hooks/useCoursesHooks/useGotoNextLesson';
import JSConfetti from 'js-confetti';
import { useRouter } from 'next/router';
import { shallowEqual, useSelector } from 'react-redux';
import CompleteModal from '../CompleteModal';
import QuizPassModal from '../QuizPassModal';
interface LessonPageAProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const LessonPageA: FC<LessonPageAProps> = (props) => {
  const { lesson, courseType } = props;
  const [lessonContent, setLessonContent] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [isProgressing, setIsProgressing] = useState(false);
  const [pass, setPass] = useState<boolean>(false);
  const router = useRouter();
  const { courseId: courseName } = router.query;
  // const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [isLastLesson, setIsLastLesson] = useState(false);

  const { onNextClick, completeModalOpen, setCompleteModalOpen } =
    useGotoNextLesson(lesson, courseType, true);
  const { unitsLessonsList } = useSelector((state: AppRootState) => {
    return {
      unitsLessonsList: state.course.unitsLessonsList
    };
  }, shallowEqual);

  const onPass = useCallback(async () => {
    setPass(true);
    // try {
    //   let currentUnitIndex = unitsLessonsList.findIndex((unit) => {
    //     return unit.id === lesson.unitId;
    //   });
    //   const currentUnit = unitsLessonsList[currentUnitIndex];
    //   const currentLessonIndex =
    //     currentUnit?.pages.findIndex((page) => page.id === lesson.id) || 0;
    //   const isLastUnit =
    //     currentUnitIndex === (unitsLessonsList.length || 1) - 1;
    //   const isLastLesson =
    //     currentLessonIndex === (currentUnit?.pages.length || 1) - 1;
    //   if (isLastUnit && isLastLesson) setIsLastLesson(true);
    //   await webApi.courseApi.completeLesson(lesson.id);
    //   if (isLastUnit && isLastLesson) {
    //     setTimeout(() => {
    //       setCompleteModalOpen(true);
    //     }, 1000);
    //     return;
    //   }
    // } catch (e) {
    //   console.log('完成状态发生错误', e);
    // }

    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti({
      confettiColors: [
        '#ff0a54',
        '#ff477e',
        '#ff7096',
        '#ff85a1',
        '#fbb1bd',
        '#f9bec7',
        '#3b47af',
        '#28ca59',
        '#eb1c1c',
        '#15dffa',
        '#0452fa',
        '#cceb1c'
      ],
      confettiRadius: 6,
      confettiNumber: 500
    });

    setTimeout(() => {
      onNextClick();
      setPass(false);
    }, 500);
  }, [lesson, unitsLessonsList]);

  //   const RightComponent = useMemo(() => {
  //     if (pass) {
  //       const jsConfetti = new JSConfetti();

  //       jsConfetti.addConfetti({
  //         confettiColors: [
  //           '#ff0a54',
  //           '#ff477e',
  //           '#ff7096',
  //           '#ff85a1',
  //           '#fbb1bd',
  //           '#f9bec7',
  //           '#3b47af',
  //           '#28ca59',
  //           '#eb1c1c',
  //           '#15dffa',
  //           '#0452fa',
  //           '#cceb1c'
  //         ],
  //         confettiRadius: 6,
  //         confettiNumber: 500
  //       });
  //       return (
  //          <LessonPassPage
  //            isLastLesson={isLastLesson}
  //            lesson={lesson}
  //            courseType={courseType}
  //          ></LessonPassPage>

  //       );
  //     }
  //     return (
  // <>
  // <NotionRenderer styleType={LessonStyleType.A}>
  //         <Renderer
  //           type={CustomRenderType.Quiz}
  //           source={quizes}
  //           parent={{ ...quizes, isRoot: true, onPass, isLastLesson, lesson }}
  //         ></Renderer>
  //       </NotionRenderer>
  //       <QuizPassModal open={true} onClose={() => {}}></QuizPassModal>
  // </>
  //     );
  //   }, [pass, courseType, lesson, quizes, onPass, isLastLesson]);
  useEffect(() => {
    if (lesson) {
      setLessonContent((lesson.content?.[0] as any).children);
      setQuizes((lesson.content?.[1] as any).children);
      setPass(false);
      setIsLastLesson(false);
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);

  const lessonContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lessonContentRef.current) {
      lessonContentRef.current.scrollTo(0, 0);
    }
  }, [lesson]);
  return (
    <div className="h-[80vh] flex justify-between gap-[4.5rem] mt-[1.25rem]">
      <div
        ref={lessonContentRef}
        className="text-text-default-color text-[.875rem] h-full w-[50%] px-[3rem] py-[2.5rem] rounded-[2.5rem] bg-lesson-content-global-bg overflow-y-scroll no-scrollbar"
      >
        {/* {lessonContent &&
          lessonContent?.map((block: any) => (
            <Block
              block={block}
              key={block.id}
              darkMode={true}
              renderChildren={true}
            />
          ))} */}
        <div className="relative mb-8">
          <NotionRenderer styleType={LessonStyleType.A}>
            {lessonContent?.map((item: any) => {
              return (
                <Renderer
                  key={item.id}
                  type={item.type}
                  source={item}
                  parent={{
                    ...lesson,
                    content: [...lessonContent],
                    isRoot: true
                  }}
                ></Renderer>
              );
            })}
          </NotionRenderer>
        </div>
      </div>
      <div className="text-text-default-color w-[50%] h-full bg-lesson-content-global-bg px-[3rem] py-[2.5rem] rounded-[2.5rem]">
        <NotionRenderer styleType={LessonStyleType.A}>
          <Renderer
            type={CustomRenderType.Quiz}
            source={quizes}
            parent={{ ...quizes, isRoot: true, onPass, isLastLesson, lesson }}
          ></Renderer>
        </NotionRenderer>
        <QuizPassModal open={pass} onClose={() => {}}></QuizPassModal>
      </div>
      <>
        <CompleteModal
          title={courseName as string}
          open={completeModalOpen}
          onClose={() => setCompleteModalOpen(false)}
        ></CompleteModal>
      </>
    </div>
  );
};

export default LessonPageA;
