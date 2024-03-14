'use client';
import { FC, useContext, useEffect } from 'react';
import Introduction from './components/Introduction';
import IntendedLearners from './components/IntendedLearners';
import KnowledgeGain from './components/KnowledgeGain';
import ContentCreate from './components/ContentCreate';
import { useRequest } from 'ahooks';
import useUgcCreationDataHanlde from '@/hooks/useUgcCreationDataHanlde';
import ChooseLesson from './components/ChooseLesson';
import { CreationPageKey, UgcCreateContext } from '../constant/type';

interface UgcCreatePageProps {
  params: { lessonId: string; courseId: string };
}

const UgcCreatePage: FC<UgcCreatePageProps> = ({ params }) => {
  const { lessonId, courseId } = params;

  const { setSelectLessonId, setCourseId } = useContext(UgcCreateContext);

  const { setInformation } = useUgcCreationDataHanlde(courseId);
  const { run } = useRequest(async () => {
    if (courseId !== '-1') {
      setInformation();
    }
  });
  useEffect(() => {
    if (lessonId) {
      setCourseId(courseId);
      setSelectLessonId(lessonId);
      run();
    }
  }, [lessonId, courseId]);

  useEffect(() => {}, []);

  switch (lessonId) {
    case CreationPageKey.Introduction:
      return <Introduction />;
    case CreationPageKey.IntendedLearners:
      return <IntendedLearners />;
    case CreationPageKey.KnowledgeGain:
      return <KnowledgeGain />;
    case CreationPageKey.ChooseLesson:
      return <ChooseLesson />;
    default:
      return <ContentCreate />;
  }
};

export default UgcCreatePage;
