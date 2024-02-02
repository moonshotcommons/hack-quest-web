import Button from '@/components/Common/Button';
import Link from 'next/link';
import React from 'react';

interface NoDataProp {
  href: string;
  keyword?: string;
}

const NoData: React.FC<NoDataProp> = ({ href, keyword }) => {
  return (
    <div className="flex flex-col items-center gap-[28px]">
      <p className="body-xl text-neutral-medium-gray">
        {keyword
          ? ` You can submit the word, “${keyword}”, and we will work on it!`
          : 'There is no content yet~'}
        {}
      </p>
      <div className="flex justify-center gap-[10px]">
        <Button
          type="primary"
          className="button-text-l h-[60px] w-[270px] uppercase"
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
  );
};

export default NoData;
