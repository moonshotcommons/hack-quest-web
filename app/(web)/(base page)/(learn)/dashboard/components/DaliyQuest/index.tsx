import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import Link from 'next/link';
import React from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';

interface DaliyQuestProp {}

const DaliyQuest: React.FC<DaliyQuestProp> = () => {
  return (
    <div>
      <div className="text-neutral-black text-h4">Daily Quests</div>
      <div></div>
      <Link
        className="flex text-neutral-off-black button-text-s items-center  cursor-pointer"
        href={MenuLink.MISSION_CENTER}
      >
        <span className="uppercase">Mission center</span>
        <HiArrowLongRight size={18}></HiArrowLongRight>
      </Link>
    </div>
  );
};

export default DaliyQuest;
