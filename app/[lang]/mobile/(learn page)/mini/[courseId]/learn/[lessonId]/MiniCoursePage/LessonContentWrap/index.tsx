import { ElectiveLessonType } from '@/service/webApi/elective/type';
import { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Progress from '../Progress';
import { useGetElectives } from '../hooks/useGetElectives';
import { CompleteStateType, CourseType } from '@/service/webApi/course/type';
import webApi from '@/service';
import { useGetLessonLink } from '@/hooks/courses/useGetLessonLink';
import { useRequest } from 'ahooks';
import JSConfetti from 'js-confetti';
import { useRedirect } from '@/hooks/router/useRedirect';

import Button from '@/components/Common/Button';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { CustomType, PageType } from '@/components/ComponentRenderer/type';
import { ComponentRendererProvider } from '@/components/ComponentRenderer';
import MobMiniCustomRenderer from '../MobMiniCustomRenderer';

interface LessonContentWrapProps {
  children: ReactNode;
  lesson: ElectiveLessonType;
  completed: VoidFunction;
}

const LessonContentWrap: FC<LessonContentWrapProps> = ({ children, lesson, completed }) => {
  const { course, loading, refresh } = useGetElectives(lesson);
  const { getLink } = useGetLessonLink();
  const { redirectToUrl } = useRedirect();
  const [nextControl, setNextControl] = useState(false);
  const jsConfetti = useRef<JSConfetti>();
  // const miniElectiveCompletedModalInstance =
  //   useRef<MiniElectiveCompletedModalRef>(null);
  const progress = useMemo(() => {
    if (!course)
      return {
        total: 0,
        current: 0
      };
    let current = course?.pages?.findIndex((item) => item.id === lesson.id) || 0;
    // if (
    //   current === course?.pages!.length - 1 &&
    //   course.pages![current].state === CompleteStateType.COMPLETED
    // ) {
    //   current += 1;
    // }
    return {
      total: course?.pages?.length || 0,
      current: current
    };
  }, [course, lesson]);

  const previousLessonId = useMemo(() => {
    if (!course || !lesson) return;
    const currentLessonIndex = course!.pages!.findIndex((item) => item.id === lesson.id);
    return course!.pages![currentLessonIndex - 1]?.id;
  }, [course, lesson]);

  const nextLessonId = useMemo(() => {
    if (!course || !lesson) return;
    const currentLessonIndex = course!.pages!.findIndex((item) => item.id === lesson.id);
    return course!.pages![currentLessonIndex + 1]?.id;
  }, [course, lesson]);

  useEffect(() => {
    if (lesson) {
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
      if (lesson.state === CompleteStateType.COMPLETED) setNextControl(true);
      if (lesson.content.type === CustomType.Content) setNextControl(true);
    }
  }, [lesson]);

  const { run: onNextClick, loading: completedLoading } = useRequest(
    async () => {
      const res = await webApi.courseApi.completeLesson(lesson.id);
      let link = null;
      if (nextLessonId) {
        link = getLink(course?.type || CourseType.MINI, nextLessonId as string);
      }
      return link;
    },
    {
      manual: true,
      onSuccess(res) {
        setNextControl(false);
        if (res) redirectToUrl(res);
      },
      onError(err) {
        console.log('完成quiz失败', err);
      }
    }
  );

  const onQuizPass = useCallback(() => {
    setNextControl(true);

    if (progress.current === progress.total - 1) {
      if (course!.pages![progress.current].state !== CompleteStateType.COMPLETED) {
        onNextClick();
        refresh();
      }
      // miniElectiveCompletedModalInstance.current?.open({});
      completed();
    }
    if (jsConfetti.current) {
      jsConfetti.current.addConfetti({
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
    }
  }, [course]);

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  return (
    <div className="relative flex h-full flex-col items-center">
      <Progress total={progress.total} current={progress.current}></Progress>
      {/* <MiniElectiveCompletedModal
        ref={miniElectiveCompletedModalInstance}
      ></MiniElectiveCompletedModal> */}
      <ComponentRendererProvider
        textRenderer={{
          fontSize: '18px'
        }}
        isMobile
        globalContext={{
          onCompleted: () => {
            if (progress.current === progress.total - 1) {
              // miniElectiveCompletedModalInstance.current?.open({});
              completed();
            } else {
              onNextClick();
            }
          },
          onQuizPass
        }}
        type={PageType.MINI}
        CustomComponentRenderer={MobMiniCustomRenderer}
      >
        {children}
      </ComponentRendererProvider>
      <div className="absolute bottom-0 left-0 flex w-full items-center justify-between">
        <Button
          iconPosition="left"
          icon={<BsArrowLeft size={20} />}
          className={`h-[60px] w-[161px] text-[16px] ${previousLessonId ? 'bg-yellow-primary' : 'border  border-[#0b0b0b] bg-[#fff] '}`}
          onClick={() => {
            if (!previousLessonId) return;
            const link = getLink(course?.type || CourseType.MINI, previousLessonId as string);

            redirectToUrl(link);
          }}
        >
          Previous
        </Button>
        <Button
          iconPosition="right"
          icon={<BsArrowRight size={20} />}
          className={`h-[60px] w-[161px] text-[16px] ${
            nextLessonId && nextControl ? 'bg-yellow-primary' : 'border  border-[#0b0b0b] bg-[#fff] '
          }`}
          onClick={() => {
            if (!nextLessonId || !nextControl) return;
            onNextClick();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LessonContentWrap;
