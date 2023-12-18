'use client';
import CompleteModal from '@/components/v2/Business/CompleteModal';
import {
  CustomType,
  NotionComponent
} from '@/components/v2/Business/Renderer/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useGetLessonContent } from '@/hooks/useCoursesHooks/useGetLessenContent';
import { useGotoNextLesson } from '@/hooks/useCoursesHooks/useGotoNextLesson';
import webApi from '@/service';
import {
  CompleteStateType,
  CourseLessonType,
  CourseType
} from '@/service/webApi/course/type';
import { ConfigProvider, Spin } from 'antd';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Split from 'react-split';
import LessonContent from './LessonContent';
import LessonFooter from './LessonFooter';
import Playground from './Playground';
import { LessonPageContext } from './type';

import BugFeedbackModal, {
  BugFeedbackModalRef
} from '@/components/v2/Business/BugFeedbackModal';
import TreasureModal, {
  TreasureModalRef
} from '@/components/v2/Business/TreasureModal';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';

interface LessonPageProps {
  lessonId: string;
  courseType: CourseType;
}

const LessonPage: FC<LessonPageProps> = (props) => {
  const { lessonId, courseType } = props;
  const { lesson, loading } = useGetLessonContent<CourseLessonType>(
    lessonId,
    courseType
  );
  const router = useRouter();
  const { courseId: courseName } = router.query;
  const [nextLoading, setNextLoading] = useState(false);
  const { onNextClick, completeModalRef } = useGotoNextLesson(
    lesson!,
    courseType,
    true
  );
  const [isHandleNext, setIsHandleNext] = useState(false);
  const allowNextButtonClickTime = useRef(0);
  const treasureModalRef = useRef<TreasureModalRef>(null);
  const judgmentInitIsHandleNext = useCallback(() => {
    const quiz = lesson?.content?.right?.find(
      (v: NotionComponent) => v.type === CustomType.Quiz
    );
    if (
      !quiz ||
      lesson?.state === CompleteStateType.COMPLETED ||
      quiz?.children.length === lesson?.completedQuiz?.length
    ) {
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

  const userInfo = useGetUserInfo();

  const bugFeedbackModalRef = useRef<BugFeedbackModalRef>(null);

  // useEffect(() => {
  //   if (completeModalRef.current) {
  //     completeModalRef.current?.open({
  //       type: 'claim',
  //       title: courseName as string
  //     });
  //   }
  // }, [lesson]);

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
          <div
            className={`relative w-full ${
              isHandleNext ? 'h-[calc(100vh-145px)]' : 'h-[calc(100vh-95px)]'
            }`}
          >
            <LessonPageContext.Provider
              value={{
                nextLoading,
                isHandleNext,
                leftLength: lesson?.content?.left?.length || 0,
                changeHandleNext: (handle) => {
                  if (handle) {
                    allowNextButtonClickTime.current = new Date().getTime();
                  }
                  setIsHandleNext(handle);
                },
                onBugCommit() {
                  bugFeedbackModalRef.current?.onCommit({
                    lessonId
                  });
                }
              }}
            >
              <Split
                className="flex-1 w-full h-full flex justify-between [&>div]:w-[50%] [&>.gutter]:cursor-col-resize font-next-book"
                minSize={360}
                cursor="col-resize"
                gutter={(index, direction) => {
                  const gutter = document.createElement('div');
                  const container = document.createElement('div');
                  const content1 = document.createElement('span');
                  const content2 = document.createElement('span');
                  container.className = 'w-full px-[6px] flex justify-between';
                  content1.className =
                    'w-[2px] h-[12px] bg-[#8C8C8C] rounded-full';
                  content2.className =
                    'w-[2px] h-[12px] bg-[#8C8C8C] rounded-full';

                  container.appendChild(content1);
                  container.appendChild(content2);
                  gutter.appendChild(container);
                  gutter.className = `gutter gutter-${direction} flex flex-col justify-center items-center bg-[#F4F4F4] shadow-[-2px_0px_4px_0px_rgba(0,0,0,0.10)] w-[20px!important]`;
                  return gutter;
                }}
              >
                <LessonContent
                  lesson={lesson as any}
                  courseType={courseType}
                ></LessonContent>
                <Playground
                  lesson={lesson! as any}
                  onCompleted={() => {
                    if (lesson.state !== CompleteStateType.COMPLETED) {
                      webApi.missionCenterApi
                        .digTreasures(lessonId)
                        .then((res) => {
                          if (res.success && res.treasureId) {
                            treasureModalRef.current?.open(res.treasureId);
                          }
                        });
                    }
                    // 当前lesson完成
                    setIsHandleNext(true);
                  }}
                ></Playground>
              </Split>
              <LessonFooter
                lesson={lesson as any}
                onNextClick={async () => {
                  BurialPoint.track('lesson-底部next按钮点击');
                  BurialPoint.track(
                    'lesson-底部next按钮亮起到点击所消耗的时间(用户lesson完成时间)',
                    {
                      duration:
                        new Date().getTime() - allowNextButtonClickTime.current,
                      detail: JSON.stringify({
                        lessonName: lesson.name,
                        lessonId: lessonId,
                        courseName,
                        username: userInfo?.name
                      })
                    }
                  );
                  setNextLoading(true);
                  if (lesson.state !== CompleteStateType.COMPLETED) {
                    onNextClick({
                      callback: () => {
                        webApi.missionCenterApi
                          .digTreasures(lessonId)
                          .then(async (res) => {
                            if (res.success && res.treasureId) {
                              treasureModalRef.current?.open(res.treasureId);
                              setNextLoading(false);
                            } else {
                              onNextClick({
                                completedCallback: () => {
                                  setNextLoading(false);
                                }
                              });
                            }
                          })
                          .catch(() => {
                            setNextLoading(false);
                          });
                      },
                      completedCallback: () => {
                        setNextLoading(false);
                      }
                    });
                  } else {
                    onNextClick({
                      completedCallback: () => {
                        setNextLoading(false);
                      }
                    });
                  }
                }}
              />
              <CompleteModal ref={completeModalRef}></CompleteModal>
              <BugFeedbackModal ref={bugFeedbackModalRef}></BugFeedbackModal>
              <TreasureModal ref={treasureModalRef} />
            </LessonPageContext.Provider>
          </div>
        )}
      </Spin>
    </ConfigProvider>
  );
};

export default LessonPage;
