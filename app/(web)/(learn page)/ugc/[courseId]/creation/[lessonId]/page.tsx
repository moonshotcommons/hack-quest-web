'use client';
import { FC, useEffect } from 'react';
import Introduction from './components/Introduction';
import {
  CreationPageKey,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';
import IntendedLearners from './components/IntendedLearners';
import KnowledgeGain from './components/KnowledgeGain';
import ContentCreate from './components/ContentCreate';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import useUgcInformation from '@/hooks/useUgcInformation';
import { useShallow } from 'zustand/react/shallow';
import ChooseLesson from './components/ChooseLesson';

interface UgcCreatePageProps {
  params: { lessonId: string; courseId: string };
}

const UgcCreatePage: FC<UgcCreatePageProps> = ({ params }) => {
  const { lessonId, courseId } = params;
  const { setSelectLessonId } = useUgcCreationStore(
    useShallow((state) => ({
      setSelectLessonId: state.setSelectLessonId
    }))
  );

  const { setStoreInformation } = useUgcInformation();
  const { run } = useRequest(async () => {
    if (courseId !== '-1') {
      const info = await webApi.ugcCreateApi.getUgcInformationDetail(courseId);
      setStoreInformation(info);
    }
  });
  useEffect(() => {
    if (lessonId) {
      setSelectLessonId(courseId, lessonId);
      run();
    }
  }, [lessonId, courseId]);

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
