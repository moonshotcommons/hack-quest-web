'use client';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import React, { useState } from 'react';
import SubmitWordModal from '../SubmitWordModal';

interface NoDataProp {
  href: string;
  keyword?: string;
}

const NoData: React.FC<NoDataProp> = ({ href, keyword }) => {
  const [submitVisible, setSubmitVisible] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center gap-[28px] pt-[40px]">
        <p className="body-l text-neutral-rich-gray">
          {keyword ? ` You can submit the word, “${keyword}”, and we will work on it!` : 'There is no content yet~'}
          {}
        </p>
        <div className="flex justify-center gap-[10px]">
          <Button
            type="primary"
            className="button-text-l h-[60px] w-[270px] uppercase"
            onClick={() => setSubmitVisible(true)}
          >
            submit the word
          </Button>
          <Link
            className="button-text-l flex h-[60px] w-[270px] items-center justify-center rounded-[2.5rem] border border-neutral-black uppercase text-neutral-black"
            href={href}
          >
            cancel
          </Link>
        </div>
      </div>
      <SubmitWordModal open={submitVisible} keyword={keyword} onClose={() => setSubmitVisible(false)} />
    </>
  );
};

export default NoData;
