import React, { useContext } from 'react';
import UgcUnit from '../UgcUnit';
import { CreationPageKey, UgcCreateContext } from '../../constant/type';

interface UgcUnitSidebarProp {}

const UgcUnitSidebar: React.FC<UgcUnitSidebarProp> = () => {
  const { selectLessonId, courseInformation } = useContext(UgcCreateContext);
  if (!courseInformation.introduction.completed) {
    return null;
  }
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
