import React, { useMemo, useState } from 'react';
import Box from '../components/Box';
import Title from '../components/Title';
import ShowBox from '../components/ShowBox';
import { deepClone } from '@/helper/utils';
import Image from 'next/image';
import { HackathonType } from '@/service/webApi/resourceStation/hackathon/type';

interface MediaPartnersProp {
  hackathon: HackathonType;
}

const MediaPartners: React.FC<MediaPartnersProp> = ({ hackathon }) => {
  const [showAll, setShowAll] = useState(false);
  const showList = useMemo(() => {
    return showAll
      ? deepClone(hackathon.mediaPartners)
      : hackathon.mediaPartners.slice(0, 3);
  }, [hackathon, showAll]);
  return (
    <Box>
      <Title title="Guests and Mentors" />
      <ShowBox
        showAll={showAll}
        isShowAllButton={hackathon.mediaPartners.length > 3}
        changeShowAll={() => setShowAll(!showAll)}
      >
        {showList.map((v: any, i: number) => (
          <div
            key={i}
            className="w-[32.5%] h-[125px] mb-[20px] rounded-[10px] relative overflow-hidden"
          >
            <Image
              src={v.picture}
              alt="picture"
              fill
              className="object-contain"
            ></Image>
          </div>
        ))}
      </ShowBox>
    </Box>
  );
};

export default MediaPartners;
