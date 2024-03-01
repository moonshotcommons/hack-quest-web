'use client';
import { FC } from 'react';
import { CreateType } from '../constants/type';
import Introduction from './components/Introduction';
// import IntendedLearners from './components/IntendedLearners';

interface UgcCreatePageProps {
  params: { lessonId: string; courseId: string };
}

const UgcCreatePage: FC<UgcCreatePageProps> = () => {
  const creatType = CreateType.INTRODUCTION;
  switch (creatType) {
    case CreateType.INTRODUCTION:
      return <Introduction />;
    // case CreateType.INTENDEDLEARNERS:
    //   return <IntendedLearners />;
  }
};

export default UgcCreatePage;
