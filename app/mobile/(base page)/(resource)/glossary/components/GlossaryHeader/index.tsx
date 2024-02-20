'use client';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import React, { useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import SubmitWordModal from '../SubmitWordModal';
import MobCourseListPageHeader from '@/components/Mobile/MobCourseListPageHeader';

interface GlossaryHeaderProp {
  keyword: string;
}

const GlossaryHeader: React.FC<GlossaryHeaderProp> = ({ keyword = '' }) => {
  const router = useRouter();
  const [submitVisible, setSubmitVisible] = useState(false);
  const buttonNode = () => {
    return (
      <div
        className="caption-14pt relative flex w-fit  items-center gap-[6px] text-neutral-off-black"
        onClick={() => setSubmitVisible(true)}
      >
        <span>Submit A Word You Want To Know</span>
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
        title="Glossary"
        coverImageUrl={'/images/resource/glossary_cover_mob.png'}
        coverWidth={149}
        coverHeight={120}
        buttonNode={buttonNode()}
        coverImgClassName={'top-[1.25rem]'}
        className="bg-transparent pb-0"
        onSearch={onSearch}
        defaultValue={keyword}
      />
      <SubmitWordModal
        open={submitVisible}
        onClose={() => setSubmitVisible(false)}
      />
    </>
  );
};

export default GlossaryHeader;
