'use client';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import React, { useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import SubmitWordModal from '../SubmitWordModal';

interface GlossaryHeaderProp {
  keyword: string;
}

const GlossaryHeader: React.FC<GlossaryHeaderProp> = ({ keyword = '' }) => {
  const router = useRouter();
  const [submitVisible, setSubmitVisible] = useState(false);
  const buttonNode = () => {
    return (
      <div
        className="body-m relative flex w-fit cursor-pointer items-center gap-[7px] text-neutral-off-black"
        onClick={() => setSubmitVisible(true)}
      >
        <span>Submit A Word You Want To Know</span>
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
        title="Glossary"
        description="Explore the world of Web3 with our Glossary—a quick guide to essential terms. Whether you're a beginner or a pro, find clear explanations to navigate the decentralized landscape."
        coverImageUrl={'/images/resource/glossary_cover.png'}
        coverWidth={410}
        coverHeight={330}
        buttonNode={buttonNode()}
        coverImgClassName={'pt-[33px]'}
        onSearch={onSearch}
        defaultValue={keyword}
        className="pb-[75px]"
      />
      <SubmitWordModal
        open={submitVisible}
        onClose={() => setSubmitVisible(false)}
      />
    </>
  );
};

export default GlossaryHeader;
