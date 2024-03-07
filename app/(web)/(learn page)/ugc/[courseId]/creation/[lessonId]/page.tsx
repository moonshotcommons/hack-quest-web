'use client';
import { FC, useEffect } from 'react';
import Introduction from './components/Introduction';
import {
  InformationKey,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';
import IntendedLearners from './components/IntendedLearners';
import KnowledgeGain from './components/KnowledgeGain';
import ContentCreate from './components/ContentCreate';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import useUgcInformation from '@/hooks/useUgcInformation';

interface UgcCreatePageProps {
  params: { lessonId: string; courseId: string };
}

const UgcCreatePage: FC<UgcCreatePageProps> = ({ params }) => {
  const { lessonId, courseId } = params;
  const setSelectLessonId = useUgcCreationStore(
    (state) => state.setSelectLessonId
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
    case InformationKey.Introduction:
      return <Introduction />;
    case InformationKey.IntendedLearners:
      return <IntendedLearners />;
    case InformationKey.KnowledgeGain:
      return <KnowledgeGain />;
    default:
      return <ContentCreate />;
  }
};

export default UgcCreatePage;
