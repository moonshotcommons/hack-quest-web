import { Lang } from '@/i18n/config';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import BuildCover from '@/public/images/learn/build_on_web3_cover.png';
import CourseCard from './CourseCard';
import MenuLink from '@/constants/MenuLink';

interface BuildWeb3Prop {
  lang: Lang;
}

const BuildWeb3: React.FC<BuildWeb3Prop> = ({ lang }) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <DeveloperTitle lang={lang} image={BuildCover} title={'buildWeb3'} />
      <div className="flex flex-col flex-wrap gap-[32px]">
        <CourseCard lang={lang} type={'project'} link={MenuLink.PRACTICES} count={248} />
        <CourseCard lang={lang} type={'elective'} link={MenuLink.ELECTIVES} count={18} />
      </div>
    </div>
  );
};

export default BuildWeb3;
