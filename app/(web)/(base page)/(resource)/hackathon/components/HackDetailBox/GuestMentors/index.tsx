'use client';
import { MentorType } from '@/service/webApi/resourceStation/type';
import React, { useMemo, useState } from 'react';
import Box from '../components/Box';
import Image from 'next/image';
import { VscChevronDown } from 'react-icons/vsc';
import { deepClone } from '@/helper/utils';

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
      <div className="mb-[30px] flex flex-wrap gap-[20px]">
        {showList.map((v: MentorType, i: number) => (
          <div
            key={i}
            className="flex-row-center w-[calc(50%-10px)] gap-[10px] rounded-[100px] border border-neutral-medium-gray bg-neutral-off-white p-[10px]"
          >
            <div className="relative h-[65px] w-[65px] overflow-hidden rounded-[50%]">
              <Image
                src={v.picture as string}
                alt="picture"
                fill
                className="object-cover"
              ></Image>
            </div>
            <div className="flex h-[65px] flex-1 flex-shrink-0 flex-col justify-center">
              <p className="body-l-bold">{v.name}</p>
              <p className="line-clamp-2">{v.title}</p>
            </div>
          </div>
        ))}
      </div>
      {listData.length > 6 && (
        <div className="body-l flex justify-end">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => setShowAll(!showAll)}
          >
            <span>Show {showAll ? 'Less' : 'All'}</span>
            <VscChevronDown
              className={`body-xl transition ${showAll ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      )}
    </Box>
  ) : null;
};

export default GuestMentors;
