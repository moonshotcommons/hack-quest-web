'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import emitter from '@/store/emitter';
import { LearnPageType, useCourseStore } from '@/store/zustand/courseStore';
import {
  CreationPageKey,
  UgcCreateContext,
  defaultCourseInformation
} from '../../constant/type';
import { lessonIdKeys } from '../../constant/data';
import { useRedirect } from '@/hooks/router/useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { UGCCourseUnitType } from '@/service/webApi/course/type';
interface UgcCreateProviderProps {
  children: ReactNode;
  courseId: string;
}

const UgcCreateProvider: FC<UgcCreateProviderProps> = ({
  children,
  courseId: cId
}) => {
  const setLearnPageTitle = useCourseStore((state) => state.setPageType);
  const [units, setUnits] = useState<UGCCourseUnitType[]>([]);
  const [courseInformation, setCourseInformation] = useState(
    defaultCourseInformation
  );
  const { redirectToUrl } = useRedirect();
  const [selectLessonId, setSelectLessonId] = useState('');
  const [courseId, setCourseId] = useState(cId);
  const [selectUnitMenuId, setSelectUnitMenuId] = useState('');

  const handleNext = (id?: string) => {
    const index = lessonIdKeys.findIndex((v) => v === selectLessonId);
    let lessonPage = '';
    if (index < 0 || selectLessonId === CreationPageKey.ChooseLesson) {
      //publish页面
    } else if (selectLessonId === CreationPageKey.GetYourReady) {
      //unit lesson
    } else {
      lessonPage =
        lessonPage = `${MenuLink.UGC}/${id || courseId}/creation/${lessonIdKeys[index + 1]}`;
    }
    redirectToUrl(lessonPage);
  };

  useEffect(() => {
    setLearnPageTitle(LearnPageType.UGC_CREATION);
    return () => {
      setLearnPageTitle(null);
    };
  }, []);

  useEffect(() => {
    return () => {
      emitter.all.clear();
    };
  }, []);

  return (
    <UgcCreateContext.Provider
      value={{
        courseInformation,
        setCourseInformation,
        selectLessonId,
        setSelectLessonId,
        units,
        setUnits,
        courseId,
        setCourseId,
        selectUnitMenuId,
        setSelectUnitMenuId,
        handleNext
      }}
    >
      {children}
    </UgcCreateContext.Provider>
  );
};

export default UgcCreateProvider;
