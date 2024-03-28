'use client';
import { MentorType } from '@/service/webApi/resourceStation/type';
import React, { useMemo, useState } from 'react';
import Box from '../Box';
import Image from 'next/image';
import { VscChevronDown } from 'react-icons/vsc';
import { deepClone } from '@/helper/utils';
import { BurialPoint } from '@/helper/burialPoint';

interface MediaCommunityProp {
  listData: MentorType[];
  title: string;
}

const MediaCommunity: React.FC<MediaCommunityProp> = ({ listData, title }) => {
  const [showAll, setShowAll] = useState(false);
  const showList = useMemo(() => {
    return showAll ? deepClone(listData) : listData?.slice(0, 6);
  }, [showAll, listData]);

  return listData?.length > 0 ? (
    <Box>
      <div className="text-h3-mob mb-[.5rem] text-neutral-off-black">{title}</div>
      <div className="mb-[.5rem] flex flex-wrap gap-[8px]">
        {showList.map((v: MentorType, i: number) => (
          <div key={i} className="h-[4.4375rem] w-[calc((100%-8px)/2)]">
            <div className="relative h-full w-full">
              <Image src={v.picture as string} alt="picture" fill className="object-contain"></Image>
            </div>
          </div>
        ))}
      </div>
      {listData.length > 6 && (
        <div className="body-s flex justify-end">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              setShowAll(!showAll);
              BurialPoint.track(`hackathonDetail show all 按钮点击`);
            }}
          >
            <span>Show {showAll ? 'Less' : 'All'}</span>
            <VscChevronDown className={`body-s transition ${showAll ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
    </Box>
  ) : null;
};

export default MediaCommunity;
