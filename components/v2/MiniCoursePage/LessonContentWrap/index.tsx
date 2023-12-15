import { ElectiveLessonType } from '@/service/webApi/elective/type';
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import Progress from '../Progress';
import Icons from '../Icons';
import { useGetElectives } from '../hooks/useGetElectives';
import { cn } from '@/helper/utils';
import { CustomType } from '../../Business/Renderer/type';
import { CompleteStateType, CourseType } from '@/service/webApi/course/type';
import webApi from '@/service';
import { useGetLessonLink } from '@/hooks/useCoursesHooks/useGetLessonLink';
import { useRouter } from 'next/router';
import { useRequest } from 'ahooks';
import { RendererContext } from '../../Business/Renderer/context';
import JSConfetti from 'js-confetti';
import MiniElectiveCompletedModal, {
  MiniElectiveCompletedModalRef
} from '../../Business/MiniElectiveCompletedModal';

interface LessonContentWrapProps {
  children: ReactNode;
  lesson: ElectiveLessonType;
}

const LessonContentWrap: FC<LessonContentWrapProps> = ({
  children,
  lesson
}) => {
  const { course, loading, refresh } = useGetElectives(lesson);
  const { getLink } = useGetLessonLink();
  const router = useRouter();
  const [nextControl, setNextControl] = useState(false);
  const miniElectiveCompletedModalInstance =
    useRef<MiniElectiveCompletedModalRef>(null);
  const progress = useMemo(() => {
    if (!course)
      return {
        total: 0,
        current: 0
      };
    let current =
      course?.pages?.findIndex((item) => item.id === lesson.id) || 0;
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
    const currentLessonIndex = course!.pages!.findIndex(
      (item) => item.id === lesson.id
    );
    return course!.pages![currentLessonIndex - 1]?.id;
  }, [course, lesson]);

  const nextLessonId = useMemo(() => {
    if (!course || !lesson) return;
    const currentLessonIndex = course!.pages!.findIndex(
      (item) => item.id === lesson.id
    );
    return course!.pages![currentLessonIndex + 1]?.id;
  }, [course, lesson]);

  useEffect(() => {
    if (lesson) {
      webApi.electiveApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
      if (lesson.state === CompleteStateType.COMPLETED) setNextControl(true);
      if (lesson.content.type === CustomType.Content) setNextControl(true);
    }
  }, [lesson]);

  const { run: onNextClick, loading: completedLoading } = useRequest(
    async () => {
      const res = await webApi.electiveApi.completedLesson(lesson.id);
      let link = null;
      if (nextLessonId) {
        link = getLink(course?.type || CourseType.Mini, nextLessonId as string);
      }
      return link;
    },
    {
      manual: true,
      onSuccess(res) {
        setNextControl(false);
        if (res) router.push(res);
      },
      onError(err) {
        console.log('完成quiz失败', err);
      }
    }
  );

  const onQuizPass = useCallback(() => {
    const jsConfetti = new JSConfetti();
    setNextControl(true);

    if (progress.current === progress.total - 1) {
      if (
        course!.pages![progress.current].state !== CompleteStateType.COMPLETED
      ) {
        onNextClick();
        refresh();
      }
      miniElectiveCompletedModalInstance.current?.open({});
    }

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
  }, [course]);

  return (
    <div className="flex-1 h-[calc(100vh-64px-80px)] flex flex-col justify-center items-center gap-[24px]">
      <div className="flex-1 w-full flex gap-[60px] h-[calc(100%-24px-6px)] justify-center items-center">
        <div
          className={cn(
            previousLessonId
              ? 'cursor-pointer'
              : 'opacity-20 cursor-not-allowed'
          )}
          onClick={() => {
            if (!previousLessonId) return;
            const link = getLink(
              course?.type || CourseType.Mini,
              previousLessonId as string
            );

            router.push(link);
          }}
        >
          {Icons.LeftArrowIcon}
        </div>
        <RendererContext.Provider
          value={{
            globalContext: {
              onCompleted: () => {
                if (progress.current === progress.total - 1) {
                  miniElectiveCompletedModalInstance.current?.open({});
                } else {
                  onNextClick();
                }
              },
              onQuizPass
            }
          }}
        >
          {children}
        </RendererContext.Provider>
        <div
          className={cn(
            nextLessonId && nextControl
              ? 'cursor-pointer'
              : 'opacity-20 cursor-not-allowed'
          )}
          onClick={() => {
            if (!nextLessonId || !nextControl) return;
            onNextClick();
          }}
        >
          {Icons.RightArrowIcon}
        </div>
      </div>
      <Progress total={progress.total} current={progress.current}></Progress>
      <MiniElectiveCompletedModal
        ref={miniElectiveCompletedModalInstance}
      ></MiniElectiveCompletedModal>
    </div>
  );
};

export default LessonContentWrap;
