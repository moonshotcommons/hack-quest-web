import React, { useMemo, useState } from 'react';
import Box from '../components/Box';
import Title from '../components/Title';
import ShowBox from '../components/ShowBox';
import { deepClone } from '@/helper/utils';
import Image from 'next/image';
import { HackathonType } from '@/service/webApi/resourceStation/hackathon/type';

interface GuestsMentorsProp {
  hackathon: HackathonType;
}

const GuestsMentors: React.FC<GuestsMentorsProp> = ({ hackathon }) => {
  const [showAll, setShowAll] = useState(false);
  const showList = useMemo(() => {
    return showAll
      ? deepClone(hackathon.guestsAndMentors)
      : hackathon.guestsAndMentors?.slice(0, 3);
  }, [showAll, hackathon]);
  return (
    <Box>
      <Title title="Guests and Mentors" />
      <ShowBox
        showAll={showAll}
        isShowAllButton={hackathon.guestsAndMentors.length > 3}
        changeShowAll={() => setShowAll(!showAll)}
      >
        {showList?.map((v: any, i: number) => (
          <div
            key={i}
            className="w-[32.5%] h-[307px] mb-[20px] rounded-[10px] overflow-hidden shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]"
          >
            <div className="h-[178px] relative overflow-hidden">
              <Image
                src={v.picture as string}
                alt="picture"
                fill
                className="object-contain"
              ></Image>
            </div>
            <div className="p-[15px]">
              <p className="text-[21px] pb-[5px] font-next-book-bold">
                {v.name}
              </p>
              <p className="text-[16px] leading-[20px] line-clamp-3">
                {v.title}
              </p>
            </div>
          </div>
        ))}
      </ShowBox>
    </Box>
  );
};

export default GuestsMentors;
