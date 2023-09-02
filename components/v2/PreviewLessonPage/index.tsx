'use client';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import Split from 'react-split';
import Loading from '../Common/Loading';
import LessonContent from '../LessonPage/LessonContent';
import LessonFooter from '../LessonPage/LessonFooter';
import Playground from '../LessonPage/Playground';
import { LessonContent as LessonContentType } from '../LessonPage/type';

interface PreviewLessonPageProps {
  previewUrl: string;
}

const PreviewLessonPage: FC<PreviewLessonPageProps> = (props) => {
  const { previewUrl } = props;
  const [lesson, setLesson] = useState<
    Omit<CourseLessonType, 'content'> & { content: LessonContentType }
  >();

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

  // if (!lesson) return null;

  return (
    <div className="relative w-full h-[calc(100vh-80px-76px)] pl-[20px]">
      {lesson && (
        <Split
          className="flex-1 w-full h-full flex justify-between [&>div]:w-[50%] [&>.gutter]:cursor-col-resize"
          minSize={80}
          cursor="col-resize"
        >
          <LessonContent
            lesson={lesson!}
            isPreview={true}
            courseType={CourseType.GUIDED_PROJECT}
          ></LessonContent>
          <Playground
            lesson={lesson!}
            isPreview={true}
            onCompleted={() => {
              message.info('当前是预览模式');
            }}
          ></Playground>
        </Split>
      )}
      {!lesson && !!errorMessage && (
        <div className="text-[18px] text-text-default-color">
          {errorMessage}
        </div>
      )}
      <LessonFooter lesson={lesson} />

      {loading && (
        <div className="w-full h-full flex justify-center items-center text-text-default-color">
          <Loading loading={loading}>
            <div className="w-40 h-40 flex justify-center items-center bg-transparent"></div>
          </Loading>
        </div>
      )}
    </div>
  );
};

export default PreviewLessonPage;
