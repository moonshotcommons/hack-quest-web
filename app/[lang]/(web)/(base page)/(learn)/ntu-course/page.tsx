import MenuLink from '@/constants/MenuLink';
import { Metadata } from 'next';
import React from 'react';
import NtuCoursePage from './components';
import { Lang } from '@/i18n/config';
export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Ntu course',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.NTU_COURSE}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.NTU_COURSE}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.NTU_COURSE}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.NTU_COURSE}`
      }
    }
  };
}
interface NtuCourseProp {}

const NtuCourse: React.FC<NtuCourseProp> = () => {
  return <NtuCoursePage />;
};

export default NtuCourse;
