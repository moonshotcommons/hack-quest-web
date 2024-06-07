import React from 'react';
import Content from './Content';
import { Lang } from '@/i18n/config';

interface NtuCoursePageProp {
  lang: Lang;
}

const NtuCoursePage: React.FC<NtuCoursePageProp> = ({ lang }) => {
  return (
    <div className="bg-neutral-off-white px-[1.25rem] py-[1.25rem]">
      <Content lang={lang} />
    </div>
  );
};

export default NtuCoursePage;
