'use client';
import MenuLink from '@/constants/MenuLink';
import React, { useContext, useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
import { useRouter } from 'next-nprogress-bar';
import SubmitWordModal from '../SubmitWordModal';
import MobCourseListPageHeader from '@/components/Mobile/MobCourseListPageHeader';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';

interface GlossaryHeaderProp {
  keyword: string;
}

const GlossaryHeader: React.FC<GlossaryHeaderProp> = ({ keyword = '' }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const router = useRouter();
  const [submitVisible, setSubmitVisible] = useState(false);
  const buttonNode = () => {
    return (
      <div
        className="caption-14pt relative flex w-fit  items-center gap-[6px] text-neutral-off-black"
        onClick={() => setSubmitVisible(true)}
      >
        <span>{t('submitWord')}</span>
        <HiArrowLongRight size={16}></HiArrowLongRight>
        <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-[5px] bg-yellow-dark"></div>
      </div>
    );
  };
  const onSearch = (val = '') => {
    const url = new URL(MenuLink.GLOSSARY, window.location.href);
    val && url.searchParams.append('keyword', val);
    router.push(url.toString());
  };
  return (
    <>
      <MobCourseListPageHeader
        title={t('glossary')}
        coverImageUrl={'/images/resource/glossary_cover_mob.png'}
        coverWidth={149}
        coverHeight={120}
        buttonNode={buttonNode()}
        coverImgClassName={'top-[1.25rem]'}
        className="bg-transparent pb-0"
        onSearch={onSearch}
        defaultValue={keyword}
      />
      <SubmitWordModal open={submitVisible} onClose={() => setSubmitVisible(false)} />
    </>
  );
};

export default GlossaryHeader;
