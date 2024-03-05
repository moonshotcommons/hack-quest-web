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

interface UgcCreatePageProps {
  params: { lessonId: string; courseId: string };
}

const UgcCreatePage: FC<UgcCreatePageProps> = ({ params }) => {
  const { lessonId, courseId } = params;

  const setSelectLessonId = useUgcCreationStore(
    (state) => state.setSelectLessonId
  );

  useEffect(() => {
    if (lessonId) {
      setSelectLessonId(courseId, lessonId);
    }
  }, [lessonId]);

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
