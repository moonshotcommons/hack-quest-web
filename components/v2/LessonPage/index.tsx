'use client';
import CompleteModal from '@/components/v2/LessonPage/CompleteModal';
import { BurialPoint } from '@/helper/burialPoint';
import { useGetLessonContent } from '@/hooks/useCoursesHooks/useGetLessenContent';
import { useGotoNextLesson } from '@/hooks/useCoursesHooks/useGotoNextLesson';
import webApi from '@/service';
import { CompleteStateType, CourseType } from '@/service/webApi/course/type';
import { ConfigProvider, Spin } from 'antd';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Split from 'react-split';
import LessonContent from './LessonContent';
import LessonFooter from './LessonFooter';
import Playground from './Playground';
import { CustomType, LessonPageContext, NotionComponent } from './type';

interface LessonPageProps {
  lessonId: string;
  courseType: CourseType;
}

const LessonPage: FC<LessonPageProps> = (props) => {
  const { lessonId, courseType } = props;
  const { lesson, loading } = useGetLessonContent(lessonId);
  const router = useRouter();
  const { courseId: courseName } = router.query;
  const { onNextClick, completeModalOpen, setCompleteModalOpen } =
    useGotoNextLesson(lesson!, courseType, true, true);
  const [isHandleNext, setIsHandleNext] = useState(false);
  const allowNextButtonClickTime = useRef(0);

  const judgmentInitIsHandleNext = useCallback(() => {
    const quiz = lesson?.content?.right.find(
      (v: NotionComponent) => v.type === CustomType.Quiz
    );
    if (!quiz || lesson?.state === CompleteStateType.COMPLETED) {
      setIsHandleNext(true);
      allowNextButtonClickTime.current = new Date().getTime();
    } else {
      setIsHandleNext(false);
    }
  }, [lesson]);

  useEffect(() => {
    if (lesson) {
      judgmentInitIsHandleNext();
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson, judgmentInitIsHandleNext]);

  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('lesson-页面留存时间', {
        duration,
        lesson: JSON.stringify({ name: lesson?.name || '', id: lesson?.id })
      });
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            contentHeight: 400
          }
        },
        token: {
          colorPrimary: '#ffd850'
        }
      }}
    >
      <Spin
        spinning={loading}
        className="h-[100vh] flex justify-center items-center translate-y-[calc(50vh-50%)]"
        tip="loading..."
        size="large"
      >
        {lesson && (
          <div className="relative w-full h-[calc(100vh-115px)]">
            <LessonPageContext.Provider
              value={{
                isHandleNext,
                changeHandleNext: (handle) => {
                  if (handle) {
                    allowNextButtonClickTime.current = new Date().getTime();
                  }
                  setIsHandleNext(handle);
                }
              }}
            >
              <Split
                className="flex-1 w-full h-full flex justify-between [&>div]:w-[50%] [&>.gutter]:cursor-col-resize"
                minSize={80}
                cursor="col-resize"
              >
                <LessonContent
                  lesson={lesson as any}
                  courseType={courseType}
                ></LessonContent>
                <Playground
                  lesson={lesson! as any}
                  onCompleted={() => {
                    // 当前lesson完成
                    setIsHandleNext(true);
                  }}
                ></Playground>
              </Split>
              <LessonFooter
                lesson={lesson as any}
                onNextClick={() => {
                  BurialPoint.track('lesson-底部next按钮点击');
                  BurialPoint.track(
                    'lesson-底部next按钮亮起到点击所消耗的时间',
                    {
                      duration:
                        new Date().getTime() - allowNextButtonClickTime.current,
                      lesson: JSON.stringify({
                        lessonName: lesson.name,
                        lessonId: lessonId,
                        courseName
                      })
                    }
                  );

                  onNextClick();
                }}
              />
              <CompleteModal
                title={courseName as string}
                open={completeModalOpen}
                onClose={() => setCompleteModalOpen(false)}
              ></CompleteModal>
            </LessonPageContext.Provider>
          </div>
        )}
      </Spin>
    </ConfigProvider>
  );
};

export default LessonPage;
