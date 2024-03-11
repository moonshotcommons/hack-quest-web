import {
  CreationPageKey,
  useUgcCreationStore
} from '@/store/zustand/ugcCreationStore';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import UgcUnit from '../UgcUnit';

interface UgcUnitSidebarProp {}

const UgcUnitSidebar: React.FC<UgcUnitSidebarProp> = () => {
  const { selectLessonId } = useUgcCreationStore(
    useShallow((state) => ({
      selectLessonId: state.selectLessonId
    }))
  );
  switch (selectLessonId) {
    case CreationPageKey.Introduction:
    case CreationPageKey.IntendedLearners:
    case CreationPageKey.KnowledgeGain:
      return null;
    default:
      return <UgcUnit />;
  }
};

export default UgcUnitSidebar;
