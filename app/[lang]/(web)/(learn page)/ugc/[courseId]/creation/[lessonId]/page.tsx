'use client';
import { FC, useContext, useEffect, useState } from 'react';
import Introduction from './components/Introduction';
import IntendedLearners from './components/IntendedLearners';
import KnowledgeGain from './components/KnowledgeGain';
import ContentCreate from './components/ContentCreate';
import { useRequest } from 'ahooks';
import useUgcCreationDataHandle from '@/hooks/courses/useUgcCreationDataHandle';
import ChooseLesson from './components/ChooseLesson';
import { CreationPageKey, UgcCreateContext } from '../constant/type';
import { lessonIdKeys } from '../constant/data';

interface UgcCreatePageProps {
  params: { lessonId: string; courseId: string };
}

const UgcCreatePage: FC<UgcCreatePageProps> = ({ params }) => {
  const { lessonId, courseId } = params;
  const [lesson, setLesson] = useState<any>(null);
  const { setSelectLessonId, setCourseId } = useContext(UgcCreateContext);

  const { setInformation, getUnitList, getLessonDetail } =
    useUgcCreationDataHandle(courseId);
  const { run } = useRequest(async () => {
    if (courseId !== '-1') {
      await setInformation();
      await getUnitList();
    }
  });

  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    if (!lessonId) return;
    if (
      lessonIdKeys
        .concat(CreationPageKey.ChooseLesson)
        .includes(lessonId as any)
    ) {
      setCourseId(courseId);
      setSelectLessonId(lessonId);
    } else {
      getLessonDetail(lessonId).then((l) => {
        if (l) {
          setLesson(l);
          setCourseId(courseId);
          setSelectLessonId(lessonId);
        }
      });
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
      // if (!lesson) return null;
      return <ContentCreate />;
  }
};

export default UgcCreatePage;
