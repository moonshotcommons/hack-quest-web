import { ElectiveLessonType } from '@/service/webApi/elective/type';
import { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Progress from '../Progress';
import Icons from '../Icons';
import { useGetElectives } from '../hooks/useGetElectives';
import { cn } from '@/helper/utils';
import { CompleteStateType, CourseType } from '@/service/webApi/course/type';
import webApi from '@/service';
import { useGetLessonLink } from '@/hooks/courses/useGetLessonLink';
import { useRequest } from 'ahooks';
import JSConfetti from 'js-confetti';
import MiniElectiveCompletedModal, { MiniElectiveCompletedModalRef } from '../../Business/MiniElectiveCompletedModal';
import { useRedirect } from '@/hooks/router/useRedirect';
import { CustomType, PageType } from '@/components/ComponentRenderer/type';
import { ComponentRendererProvider } from '@/components/ComponentRenderer';
import MiniCustomRenderer from '../MiniCustomRenderer';

interface LessonContentWrapProps {
  children: ReactNode;
  lesson: ElectiveLessonType;
}

const LessonContentWrap: FC<LessonContentWrapProps> = ({ children, lesson }) => {
  const { course, loading, refresh } = useGetElectives(lesson);
  const { getLink } = useGetLessonLink();
  const { redirectToUrl } = useRedirect();
  const [nextControl, setNextControl] = useState(false);
  const jsConfetti = useRef<JSConfetti>();
  const miniElectiveCompletedModalInstance = useRef<MiniElectiveCompletedModalRef>(null);
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
      miniElectiveCompletedModalInstance.current?.open({});
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
    <div className="flex h-[calc(100vh-64px-80px)] flex-1 flex-col items-center justify-center gap-[24px]">
      <div className="flex h-[calc(100%-24px-6px)] w-full flex-1 items-center justify-center gap-[60px]">
        <div
          className={cn(previousLessonId ? 'cursor-pointer' : 'cursor-not-allowed opacity-20')}
          onClick={() => {
            if (!previousLessonId) return;
            const link = getLink(course?.type || CourseType.MINI, previousLessonId as string);

            redirectToUrl(link);
          }}
        >
          {Icons.LeftArrowIcon}
        </div>
        <ComponentRendererProvider
          textRenderer={{
            fontSize: '18px'
          }}
          globalContext={{
            onCompleted: () => {
              if (progress.current === progress.total - 1) {
                miniElectiveCompletedModalInstance.current?.open({});
              } else {
                onNextClick();
              }
            },
            onQuizPass
          }}
          type={PageType.MINI}
          CustomComponentRenderer={MiniCustomRenderer}
        >
          {children}
        </ComponentRendererProvider>
        <div
          className={cn(nextLessonId && nextControl ? 'cursor-pointer' : 'cursor-not-allowed opacity-20')}
          onClick={() => {
            if (!nextLessonId || !nextControl) return;
            onNextClick();
          }}
        >
          {Icons.RightArrowIcon}
        </div>
      </div>
      <Progress total={progress.total} current={progress.current}></Progress>
      <MiniElectiveCompletedModal ref={miniElectiveCompletedModalInstance}></MiniElectiveCompletedModal>
    </div>
  );
};

export default LessonContentWrap;
