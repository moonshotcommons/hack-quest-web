import Button from '@/components/Common/Button';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import Link from 'next/link';
import React from 'react';

interface ApplyProp {}

const Apply: React.FC<ApplyProp> = () => {
  return (
    <div className="body-l mx-auto flex w-[755px] flex-col items-center gap-[40px] pt-[120px] text-neutral-off-black">
      <p className="text-h3 text-neutral-black">UGC Feature Application</p>
      <p>
        Our UGC Feature is still in Beta. If you fit any one of the descriptions below, please fill in the request form
        to upload your own courses here.
      </p>
      <ul className="w-full list-disc pl-[20px]">
        <li>KOL in an area</li>
        <li>Have produced contents/videos on other platforms like YouTube, Udemy, etc.</li>
        <li>Strong skills in specific Web3 area</li>
      </ul>
      <div className="flex w-full justify-center gap-[16px]">
        <Button type="primary" className="button-text-l h-[60px] w-[270px] uppercase">
          apply now
        </Button>
        <Link href={MenuLink.DASHBOARD}>
          <Button ghost className="button-text-l h-[60px] w-[270px]  border-neutral-black uppercase">
            Cancel
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Apply;
