// ./pages/article/[articleId].tsx

import webApi from '@/service';
import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';
import wrapper from '@/store/redux';

import type { GetServerSideProps, NextPage } from 'next';

import LessonHeader from '@/components/LessonPages/LessonHeader';
import LessonPageA from '@/components/LessonPages/LessonPageA';
import { useMemo } from 'react';

interface IProps {
  // lesson: CourseLessonType;
}

const SyntaxUnit: NextPage<IProps> = (props) => {
  return (
    <>
      <div className="w-full h-full flex flex-col"></div>
    </>
  );
};

export default SyntaxUnit;
