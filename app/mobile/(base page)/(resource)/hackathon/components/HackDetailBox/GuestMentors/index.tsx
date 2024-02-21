'use client';
import { MentorType } from '@/service/webApi/resourceStation/type';
import React, { useMemo, useState } from 'react';
import Box from '../components/Box';
import Image from 'next/image';
import { VscChevronDown } from 'react-icons/vsc';
import { deepClone } from '@/helper/utils';
import { BurialPoint } from '@/helper/burialPoint';

interface GuestMentorsProp {
  listData: MentorType[];
  title: string;
}

const GuestMentors: React.FC<GuestMentorsProp> = ({ listData, title }) => {
  const [showAll, setShowAll] = useState(false);
  const showList = useMemo(() => {
    return showAll ? deepClone(listData) : listData?.slice(0, 6);
  }, [showAll, listData]);
  return listData.length > 0 ? (
    <Box>
      <div className="text-h3-mob mb-[.5rem] text-neutral-off-black">
        {title}
      </div>
      <div className="mb-[.5rem] flex flex-col gap-[.5rem]">
        {showList.map((v: MentorType, i: number) => (
          <div
            key={i}
            className="flex-row-center full gap-[10px] rounded-[1.875rem] border border-neutral-medium-gray bg-neutral-off-white py-[4px] pl-[.25rem] pr-[1.25rem]"
          >
            <div className="relative h-[2.5rem] w-[2.5rem] overflow-hidden rounded-[50%]">
              <Image
                src={v.picture as string}
                alt="picture"
                fill
                className="object-cover"
              ></Image>
            </div>
            <div className="flex h-full flex-1 flex-shrink-0 flex-col justify-center">
              <p className="body-xs">{v.name}</p>
              <p className="caption-10pt line-clamp-1">{v.title}</p>
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
            <VscChevronDown
              className={`body-s transition ${showAll ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      )}
    </Box>
  ) : null;
};

export default GuestMentors;
