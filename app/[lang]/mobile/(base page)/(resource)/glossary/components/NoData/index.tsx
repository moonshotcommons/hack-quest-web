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
      <div className="flex flex-col items-center gap-[1rem]">
        <p className="body-s text-neutral-medium-gray">
          {keyword ? ` You can submit the word, “${keyword}”, and we will work on it!` : 'There is no content yet~'}
          {}
        </p>
        <div className="flex w-full justify-center gap-[.5rem]">
          <Button type="primary" className="button-text-m h-[3rem] flex-1 p-0 uppercase  " onClick={() => setSubmitVisible(true)}>
            submit the word
          </Button>
          <Link
            className="button-text-m flex h-[3rem] flex-1  items-center justify-center rounded-[2.5rem] border border-neutral-black uppercase text-neutral-black"
            href={href}
          >
            cancel
          </Link>
        </div>
      </div>
      <SubmitWordModal open={submitVisible} onClose={() => setSubmitVisible(false)} />
    </>
  );
};

export default NoData;
