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
    return showAll ? deepClone(listData) : listData?.slice(0, 12);
  }, [showAll, listData]);

  return listData?.length > 0 ? (
    <Box>
      <div className="flex flex-wrap gap-[20px] mb-[30px]">
        {showList.map((v: MentorType, i: number) => (
          <div key={i} className="w-[calc(25%-15px)] h-[72px]">
            <div className="w-full h-full relative">
              <Image
                src={v.picture as string}
                alt="picture"
                fill
                className="object-contain"
              ></Image>
            </div>
          </div>
        ))}
      </div>
      {listData.length > 12 && (
        <div className="flex justify-end text-[18px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setShowAll(!showAll);
              BurialPoint.track(`hackathonDetail show all 按钮点击`);
            }}
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

export default MediaCommunity;
