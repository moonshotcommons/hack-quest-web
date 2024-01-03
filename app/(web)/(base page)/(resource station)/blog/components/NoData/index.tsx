import Button from '@/components/Common/Button';
import Link from 'next/link';
import React from 'react';

interface NoDataProp {
  href: string;
}

const NoData: React.FC<NoDataProp> = ({ href }) => {
  return (
    <div className="flex flex-col gap-[40px] items-center">
      <p className="body-xl text-neutral-medium-gray">
        There is no content yet~
      </p>
      <Link
        className="flex items-center justify-center w-[270px] h-[60px] border border-neutral-black text-neutral-black button-text-l"
        href={href}
      >
        BACK TO ALL BLOGS
      </Link>
    </div>
  );
};

export default NoData;
