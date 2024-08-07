'use client';
import CompleteModal from '@/components/Web/Business/CompleteModal';
import { BurialPoint } from '@/helper/burialPoint';
import { useGetLessonContent } from '@/hooks/courses/useGetLessenContent';
import { useGotoNextLesson } from '@/hooks/courses/useGotoNextLesson';
import webApi from '@/service';
import { CompleteStateType, CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { ConfigProvider, Spin } from 'antd';
import { useParams } from 'next/navigation';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Split from 'react-split';
import LessonContent from './LessonContent';
import LessonFooter from './LessonFooter';
import Playground from './Playground';
import { LessonPageContext, NavbarDataType } from './type';
import TreasureModal, { TreasureModalRef } from '@/components/Web/Business/TreasureModal';

import { useUserStore } from '@/store/zustand/userStore';
import { useCourseStore } from '@/store/zustand/courseStore';
import { CustomType, NotionComponent, PageType } from '@/components/ComponentRenderer/type';
import PgcCustomRenderer from './PgcCustomRenderer';
import { ComponentRendererProvider } from '@/components/ComponentRenderer';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';

interface LessonPageProps {
  lessonId: string;
  courseType: CourseType;
}

const LessonPage: FC<LessonPageProps> = (props) => {
  const { lessonId, courseType } = props;
  const { lesson, loading } = useGetLessonContent<CourseLessonType>(lessonId, courseType);
  const { courseId: courseName } = useParams();
  const [nextLoading, setNextLoading] = useState(false);
  const { onNextClick, completeModalRef } = useGotoNextLesson(lesson!, courseType, true);
  const [navbarData, setNavbarData] = useState<NavbarDataType[]>([]);
  const [isHandleNext, setIsHandleNext] = useState(false);
  const allowNextButtonClickTime = useRef(0);
  const treasureModalRef = useRef<TreasureModalRef>(null);
  const { updatePageId } = useUpdateHelperParams();

  const judgmentInitIsHandleNext = useCallback(() => {
    const quiz = lesson?.content?.right?.find((v: NotionComponent) => v.type === CustomType.Quiz);
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
      updatePageId(lessonId);
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

  const userInfo = useUserStore((state) => state.userInfo);
  const setLearnPageTitle = useCourseStore((state) => state.setLearnPageTitle);

  useEffect(() => {
    setLearnPageTitle(courseName as string);
  }, [courseName]);

  const CustomRenderer = useMemo(() => {
    return PgcCustomRenderer;
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
        className="flex h-[100vh] translate-y-[calc(50vh-50%)] items-center justify-center"
        tip="loading..."
        size="large"
      >
        {lesson ? (
          <div className={`relative w-full ${isHandleNext ? 'h-[calc(100vh-145px)]' : 'h-[calc(100vh-95px)]'}`}>
            <ComponentRendererProvider type={PageType.PGC} CustomComponentRenderer={CustomRenderer}>
              <LessonPageContext.Provider
                value={{
                  navbarData,
                  setNavbarData: (data: NavbarDataType[]) => setNavbarData(data),
                  nextLoading,
                  isHandleNext,
                  leftLength: lesson?.content?.left?.length || 0,
                  changeHandleNext: (handle) => {
                    if (handle) {
                      allowNextButtonClickTime.current = new Date().getTime();
                    }
                    setIsHandleNext(handle);
                  }
                }}
              >
                <Split
                  className="flex h-full w-full flex-1 justify-between [&>.gutter]:cursor-col-resize [&>div]:w-[50%]"
                  minSize={400}
                  cursor="col-resize"
                  gutter={(index, direction) => {
                    const gutter = document.createElement('div');
                    const container = document.createElement('div');
                    const content1 = document.createElement('span');
                    const content2 = document.createElement('span');
                    container.className = 'w-full px-[6px] flex justify-between';
                    content1.className = 'w-[2px] h-[12px] bg-neutral-medium-gray rounded-full';
                    content2.className = 'w-[2px] h-[12px] bg-neutral-medium-gray rounded-full';

                    container.appendChild(content1);
                    container.appendChild(content2);
                    gutter.appendChild(container);
                    gutter.className = `gutter gutter-${direction} flex flex-col justify-center items-center bg-neutral-white shadow-[-2px_0px_4px_0px_rgba(0,0,0,0.10)] w-[20px!important]`;
                    return gutter;
                  }}
                >
                  <LessonContent lesson={lesson as any} courseType={courseType}></LessonContent>
                  <Playground
                    lesson={lesson! as any}
                    onCompleted={() => {
                      if (lesson.state !== CompleteStateType.COMPLETED) {
                        webApi.missionCenterApi.digTreasures(lessonId).then((res) => {
                          if (res.success) {
                            treasureModalRef.current?.open({
                              treasureData: {
                                coin: res.coin,
                                exp: res.exp
                              }
                            });
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
                    BurialPoint.track('lesson-底部next按钮亮起到点击所消耗的时间(用户lesson完成时间)', {
                      duration: new Date().getTime() - allowNextButtonClickTime.current,
                      detail: JSON.stringify({
                        lessonName: lesson.name,
                        lessonId: lessonId,
                        courseName,
                        username: userInfo?.name
                      })
                    });
                    setNextLoading(true);
                    if (lesson.state !== CompleteStateType.COMPLETED) {
                      onNextClick({
                        callback: () => {
                          webApi.missionCenterApi
                            .digTreasures(lessonId)
                            .then(async (res) => {
                              if (res.success) {
                                treasureModalRef.current?.open({
                                  treasureData: {
                                    coin: res.coin,
                                    exp: res.exp
                                  }
                                });
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
                <TreasureModal ref={treasureModalRef} />
              </LessonPageContext.Provider>
            </ComponentRendererProvider>
          </div>
        ) : null}
      </Spin>
    </ConfigProvider>
  );
};

export default LessonPage;
