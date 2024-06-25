import React from 'react';
import Overview from './Overview';
import Enrollment from './Enrollment';
import Syllabus from './Syllabus';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import CourseDesc from './CourseDesc';
import { Lang } from '@/i18n/config';
import MediaCommunity from './MediaCommunity';
import { strategicPartners, mediaPartners } from '@/app/[lang]/(web)/(base page)/(learn)/web3mooc/constants/data';
import { MentorType } from '@/service/webApi/resourceStation/type';

interface ContentProp {
  lang: Lang;
}

const Content: React.FC<ContentProp> = ({ lang }) => {
  return (
    <div className="flex flex-col gap-[3.75rem] text-neutral-off-black">
      <Overview lang={lang} />
      {/* <ClassTime lang={lang} /> */}
      <CourseDesc lang={lang} />
      <Enrollment lang={lang} />
      <Syllabus />
      <Speakers />
      <Sponsors />
      <MediaCommunity title="strategicPartners" listData={strategicPartners as MentorType[]} />
      <MediaCommunity title="mediaPartners" listData={mediaPartners as MentorType[]} />
    </div>
  );
};

export default Content;
