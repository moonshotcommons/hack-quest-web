import React from 'react';
import CoCard from './CoCard';
import { Lang } from '@/i18n/config';

interface CourseListProp {
  lang: Lang;
}

const CourseList: React.FC<CourseListProp> = ({ lang }) => {
  return (
    <div className="flex flex-col gap-[100px]">
      <CoCard lang={lang} />
    </div>
  );
};

export default CourseList;
