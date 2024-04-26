'use client';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import MenuLink from '@/constants/MenuLink';
import React, { useContext, useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
import { useRouter } from 'next-nprogress-bar';
import SubmitWordModal from '../SubmitWordModal';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

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
        className="body-m relative flex w-fit cursor-pointer items-center gap-[7px] text-neutral-off-black"
        onClick={() => setSubmitVisible(true)}
      >
        <span>{t('submitWord')}</span>
        <HiArrowLongRight size={16}></HiArrowLongRight>
        <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-[2px] bg-yellow-dark"></div>
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
      <CourseListPageHeader
        title={t('glossary')}
        description={t('glossaryDescription')}
        coverImageUrl={'/images/resource/glossary_cover.png'}
        coverWidth={410}
        coverHeight={330}
        buttonNode={buttonNode()}
        coverImgClassName={'pt-[33px]'}
        onSearch={onSearch}
        defaultValue={keyword}
        className="pb-[55px]"
      />
      <SubmitWordModal open={submitVisible} onClose={() => setSubmitVisible(false)} />
    </>
  );
};

export default GlossaryHeader;
