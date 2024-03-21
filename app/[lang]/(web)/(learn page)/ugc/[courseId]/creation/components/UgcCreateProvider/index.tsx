'use client';
import { FC, ReactNode, useEffect, useState } from 'react';

import emitter from '@/store/emitter';
import { LearnPageType, useCourseStore } from '@/store/zustand/courseStore';
import {
  UgcCreateContext,
  defaultCourseInformation
} from '../../constant/type';
import { useUgcCreationStore } from '@/store/zustand/ugcCreationStore';
import { useShallow } from 'zustand/react/shallow';
interface UgcCreateProviderProps {
  children: ReactNode;
  courseId: string;
}

const UgcCreateProvider: FC<UgcCreateProviderProps> = ({
  children,
  courseId: cId
}) => {
  const setLearnPageTitle = useCourseStore((state) => state.setPageType);
  const [units, setUnits] = useState<any[]>([]);
  const [courseInformation, setCourseInformation] = useState(
    defaultCourseInformation
  );
  const [selectLessonId, setSelectLessonId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [selectUnitMenuId, setSelectUnitMenuId] = useState('');

  const { loading, setHandle, handle } = useUgcCreationStore(
    useShallow((state) => ({
      loading: state.loading,
      setHandle: state.setHandle,
      handle: state.handle
    }))
  );

  const handleBack = () => {};
  const handleNext = () => {};
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
        setSelectUnitMenuId
      }}
    >
      {children}
    </UgcCreateContext.Provider>
  );
};

export default UgcCreateProvider;
