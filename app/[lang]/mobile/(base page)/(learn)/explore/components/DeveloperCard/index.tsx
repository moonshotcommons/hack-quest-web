import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';
import React from 'react';
import CourseIcon from '@/components/Common/Icon/Course';
import AltIcon from '@/components/Common/Icon/AltIcon';
import { Tag } from '@/components/Web/Business/CourseTags';
import CourseCover from '@/public/images/learn/couse_cover.png';

interface DeveloperCardProp {}

const DeveloperCard: React.FC<DeveloperCardProp> = () => {
  const unitCount = 2;
  return (
    <div className="card-hover flex h-[270px] w-full overflow-hidden rounded-[16px] bg-neutral-white">
      <div className="relative h-full w-[480px] flex-shrink-0 overflow-hidden">
        <Image src={CourseCover} fill alt={'course-cover'} className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-[24px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[12px]">
            <TrackTag track={'Learn'} />
          </div>
          <h2 className="body-l-bold line-clamp-2 text-neutral-off-black">Web3 Basics</h2>
          <p className="body-s line-clamp-3 text-neutral-medium-gray">
            Mantle Network, an Ethereum layer-2 (L2) solution, is one of the fastest-growing Ethereum infrastructures.
            Learn Solidity step by step from the basic syntax to advanced guided projects. Mantle Network, an Ethereum
            layer-2 (L2) solution, is one of the fastest-growing Ethereum infrastructures. Learn Solidity step by step
            from the basic syntax to advanced guided projects .
          </p>
        </div>
        <div className="flex gap-[20px]">
          <Tag icon={<AltIcon />} className="text-neutral-rich-gray" size={'small'}>
            {'language'}
          </Tag>

          <Tag icon={<CourseIcon />} className="text-neutral-rich-gray" size={'small'}>
            {unitCount + ' ' + `${unitCount > 1 ? 'Courses' : 'Course'}`}
          </Tag>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
