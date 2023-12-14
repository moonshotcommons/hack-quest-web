import { MentorType } from '@/service/webApi/resourceStation/type';
import React, { useMemo, useState, useEffect } from 'react';
import Box from '../components/Box';
import Title from '../components/Title';
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
      <Title title={title}></Title>
      <div className="flex flex-wrap gap-[20px] mb-[30px]">
        {showList.map((v: MentorType, i: number) => (
          <div
            key={i}
            className="p-[10px] gap-[10px] flex-row-center w-[calc(50%-10px)] border border-[#8C8C8C] bg-[#F4F4F4] rounded-[100px]"
          >
            <div className="w-[65px] h-[65px] rounded-[50%] overflow-hidden relative">
              <Image
                src={v.picture as string}
                alt="picture"
                fill
                className="object-cover"
              ></Image>
            </div>
            <div className="h-[65px] flex-1 flex-shrink-0 flex flex-col justify-center">
              <p className="text-[18px] tracking-[0.36px] font-next-book-bold">
                {v.name}
              </p>
              <p className="line-clamp-2">{v.title}</p>
            </div>
          </div>
        ))}
      </div>
      {listData.length > 6 && (
        <div className="flex justify-end text-[18px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            <span>Show {showAll ? 'Less' : 'All'}</span>
            <VscChevronDown
              className={`transition text-[24px] ${
                showAll ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      )}
    </Box>
  ) : null;
};

export default GuestMentors;
