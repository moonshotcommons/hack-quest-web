'use client';

import { BurialPoint } from '@/helper/burialPoint';
import { useGetLessonContent } from '@/hooks/courses/useGetLessenContent';
import { useGotoNextLesson } from '@/hooks/courses/useGotoNextLesson';
import webApi from '@/service';
import { CompleteStateType, CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { ConfigProvider, Spin } from 'antd';
import { useParams } from 'next/navigation';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Split from 'react-split';
import LessonContent from './LessonContent';
import LessonFooter from './LessonFooter';
import Playground from './Playground';
import { LessonPageContext, NavbarDataType } from './type';

import TreasureModal, { TreasureModalRef } from '@/components/Web/Business/TreasureModal';

import { useUserStore } from '@/store/zustand/userStore';
import { useCourseStore } from '@/store/zustand/courseStore';
import LessonSidebar from './LessonSidebar';
import LessonNavbar from './LessonNavbar';
import LessonProgress from './LessonProgress';
import MobCompleteModal from '../MobCompleteModal';
import useGetHeight from '@/hooks/dom/useGetHeight';
import { CustomType, NotionComponent, PageType } from '@/components/ComponentRenderer/type';
import { ComponentRendererProvider } from '@/components/ComponentRenderer';
import MobPgcCustomRenderer from './MobPgcCustomRenderer';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';

interface MobLessonPageProps {
  lessonId: string;
  courseType: CourseType;
}

const MobLessonPage: FC<MobLessonPageProps> = (props) => {
  const { lessonId, courseType } = props;
  const [navbarData, setNavbarData] = useState<NavbarDataType[]>([]);
  const { lesson, loading } = useGetLessonContent<CourseLessonType>(lessonId, courseType);
  const { courseId: courseName } = useParams();
  const [nextLoading, setNextLoading] = useState(false);
  const { onNextClick, completeModalRef } = useGotoNextLesson(lesson!, courseType, true);
  const { pageHeight } = useGetHeight();
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

  // const bugFeedbackModalRef = useRef<MobBugFeedbackModalRef>(null);

  useEffect(() => {
    setLearnPageTitle(courseName as string);
  }, [courseName]);

  return (
    <div
      className="overflow-hidden"
      style={{
        height: pageHeight
      }}
    >
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
            <div
              className={`relative flex h-full w-full flex-col overflow-hidden`}
              style={{
                height: pageHeight
              }}
            >
              <ComponentRendererProvider isMobile type={PageType.PGC} CustomComponentRenderer={MobPgcCustomRenderer}>
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
                      // bugFeedbackModalRef.current?.onCommit({
                      //   lessonId
                      // });
                    },
                    navbarData,
                    setNavbarData: (data: NavbarDataType[]) => setNavbarData(data)
                  }}
                >
                  <LessonSidebar lesson={lesson} />
                  <LessonProgress lesson={lesson} />
                  <div className="mb-[.625rem]">
                    <LessonNavbar />
                  </div>
                  <Split
                    className="relative w-full flex-1"
                    minSize={360}
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
                      gutter.className = `gutter gutter-${direction} flex flex-col justify-center items-center bg-neutral-off-white shadow-[-2px_0px_4px_0px_rgba(0,0,0,0.10)] w-[20px!important]`;
                      return gutter;
                    }}
                  >
                    <div className="scroll-wrap-y absolute left-0 top-0 h-full w-full overflow-auto pb-[30px]">
                      <LessonContent lesson={lesson as any} courseType={courseType}></LessonContent>
                      <div className="px-[1.375rem]">
                        <Playground
                          lesson={lesson! as any}
                          onCompleted={() => {
                            if (lesson.state !== CompleteStateType.COMPLETED) {
                              webApi.missionCenterApi.digTreasures(lessonId).then((res) => {
                                if (res.success && res.treasureId) {
                                  treasureModalRef.current?.open(res.treasureId);
                                }
                              });
                            }
                            // 当前lesson完成
                            setIsHandleNext(true);
                          }}
                        ></Playground>
                      </div>
                    </div>
                    {null}
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
                  <MobCompleteModal ref={completeModalRef} />
                  {/* <MobBugFeedbackModal ref={bugFeedbackModalRef} /> */}
                  <TreasureModal ref={treasureModalRef} />
                </LessonPageContext.Provider>
              </ComponentRendererProvider>
            </div>
          ) : null}
        </Spin>
      </ConfigProvider>
    </div>
  );
};

export default MobLessonPage;
