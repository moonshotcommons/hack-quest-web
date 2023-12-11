import Tag from '@/components/v2/Business/CourseTags/tag';
import BadgeIcon from '@/components/v2/Common/Icon/Badge';
import ClockIcon from '@/components/v2/Common/Icon/Clock';
import { computeTime } from '@/helper/formate';
import React from 'react';
import Image from 'next/image';
import logo from '@/public/images/user/star_avatar/maskgroup-2.png';

interface ElectiveTagProp {}

const ElectiveTag: React.FC<ElectiveTagProp> = () => {
  return (
    <div className="flex items-center gap-[33px] text-[16px]">
      <div className="flex items-center gap-[10px]">
        <div className="w-[39px] h-[39px] relative overflow-hidden rounded-[50%]">
          <Image src={logo} fill alt="logo" className="object-contain"></Image>
        </div>
        <span className="underline ">Sui Foundation</span>
      </div>
      <Tag
        icon={<ClockIcon size={25} />}
        className="text-[16px] text-[#0b0b0b]"
      >
        {computeTime(100000, 'Hour')}
      </Tag>
      <Tag
        icon={<BadgeIcon color="#000" width={24} height={32} />}
        className="text-[16px] text-[#0b0b0b]"
      >
        1 badge
      </Tag>
    </div>
  );
};

export default ElectiveTag;
