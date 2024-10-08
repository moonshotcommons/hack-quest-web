import Tag from '@/components/Web/Business/CourseTags/tag';
import ClockIcon from '@/components/Common/Icon/Clock';
import React from 'react';
import { EcosystemElectiveType } from '@/service/webApi/elective/type';
import { computeTime } from '@/helper/formate';

interface ElectiveTagProp {
  elective: EcosystemElectiveType;
}

const ElectiveTag: React.FC<ElectiveTagProp> = ({ elective }) => {
  return (
    <div className="body-m flex items-center gap-[33px]">
      {/* <div className="flex items-center gap-[10px]">
        <div className="w-[39px] h-[39px] relative overflow-hidden rounded-[50%]">
          <Image src={logo} fill alt="logo" className="object-contain"></Image>
        </div>
        <span className="underline ">Sui Foundation</span>
      </div> */}
      <Tag icon={<ClockIcon size={25} />} className="body-m text-neutral-black">
        {computeTime(elective?.duration || 0, 'Hour')}
      </Tag>
      {/* <Tag
        icon={<BadgeIcon color="#000" width={24} height={32} />}
        className="body-m text-neutral-black"
      >
        1 badge
      </Tag> */}
    </div>
  );
};

export default ElectiveTag;
