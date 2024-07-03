'use client';

import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { ConfigProvider, Spin, message } from 'antd';
import axios from 'axios';
import { FC, useEffect, useMemo, useState } from 'react';
import Split from 'react-split';
import LessonContent from '../LessonPage/LessonContent';
import LessonFooter from '../LessonPage/LessonFooter';
import Playground from '../LessonPage/Playground';
import { LessonContent as LessonContentType, PageType } from '@/components/ComponentRenderer/type';
import { ComponentRendererProvider } from '@/components/ComponentRenderer';
import PgcCustomRenderer from '../LessonPage/PgcCustomRenderer';
import { LessonPageContext } from '../LessonPage/type';

interface PreviewLessonPageProps {
  previewUrl: string;
}

const PreviewLessonPage: FC<PreviewLessonPageProps> = (props) => {
  const { previewUrl } = props;
  const [lesson, setLesson] = useState<Omit<CourseLessonType, 'content'> & { content: LessonContentType }>();

  const [errorMessage, setErrorMessage] = useState('');

  const { run, loading, refresh } = useRequest(
    async (previewUrl) => {
      // const res = await webApi.previewApi.getPreviewLesson(previewUrl);
      // return res;
      const res = await axios.post('/api/preview/lesson', {
        notionPageUrl: previewUrl
      });
      return res.data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        setLesson(res);
      },
      onError(error: any) {
        message.error(error.response?.data.msg);
        setErrorMessage(error.response?.data.msg);
      }
    }
  );

  useEffect(() => {
    run(previewUrl);
  }, [run, previewUrl]);

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
        {lesson && (
          <div className={`relative w-full ${false ? 'h-[calc(100vh-145px)]' : 'h-[calc(100vh-95px)]'}`}>
            <ComponentRendererProvider type={PageType.PGC} CustomComponentRenderer={CustomRenderer}>
              {/* <div className="relative h-[calc(100vh-115px)] w-full pl-[20px]">
              <Split
                className="flex h-full w-full flex-1 justify-between [&>.gutter]:cursor-col-resize [&>div]:w-[50%]"
                minSize={80}
                cursor="col-resize"
              >
                <LessonContent
                  lesson={lesson as any}
                  courseType={CourseType.GUIDED_PROJECT}
                  isPreview={true}
                ></LessonContent>
                <Playground
                  lesson={lesson! as any}
                  isPreview={true}
                  onCompleted={() => {
                    // 请求下一个lesson
                    message.info('当前是预览模式');
                  }}
                ></Playground>
              </Split>
              <LessonFooter lesson={lesson as any} onNextClick={() => {}} />
            </div> */}

              <LessonPageContext.Provider
                value={{
                  navbarData: [],
                  setNavbarData: (data: any) => {},
                  nextLoading: false,
                  isHandleNext: false,
                  leftLength: lesson?.content?.left?.length || 0,
                  changeHandleNext: (handle) => {}
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
                  <LessonContent
                    lesson={lesson as any}
                    courseType={CourseType.GUIDED_PROJECT}
                    isPreview={true}
                  ></LessonContent>
                  <Playground
                    lesson={lesson! as any}
                    onCompleted={() => {
                      // 请求下一个lesson
                      message.info('当前是预览模式');
                    }}
                    isPreview={true}
                  ></Playground>
                </Split>
                <LessonFooter
                  lesson={lesson as any}
                  onNextClick={async () => {
                    // 请求下一个lesson
                    message.info('当前是预览模式');
                  }}
                />
              </LessonPageContext.Provider>
            </ComponentRendererProvider>
          </div>
        )}
        {!lesson && !!errorMessage && <div className="body-l text-text-default-color">{errorMessage}</div>}
      </Spin>
    </ConfigProvider>
  );
};

export default PreviewLessonPage;
