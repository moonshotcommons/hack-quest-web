import React, { useMemo, useState } from 'react';
import Box from '../components/Box';
import Title from '../components/Title';
import ShowBox from '../components/ShowBox';
import { deepClone } from '@/helper/utils';
import Image from 'next/image';
import { HackathonType } from '@/service/webApi/resourceStation/hackathon/type';

interface CommunityPartnersProp {
  hackathon: HackathonType;
}

const CommunityPartners: React.FC<CommunityPartnersProp> = ({ hackathon }) => {
  const [showAll, setShowAll] = useState(false);
  const showList = useMemo(() => {
    return showAll
      ? deepClone(hackathon.communityPartners)
      : hackathon.communityPartners.slice(0, 3);
  }, [hackathon, showAll]);
  return (
    <Box>
      <Title title="Community Partners" />
      <ShowBox
        showAll={showAll}
        isShowAllButton={hackathon.communityPartners.length > 3}
        changeShowAll={() => setShowAll(!showAll)}
      >
        {showList.map((v: any, i: number) => (
          <div
            key={i}
            className="w-[32.5%] h-[125px] mb-[20px] rounded-[10px] relative overflow-hidden shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]"
          >
            <Image
              src={v.picture}
              fill
              alt="picture"
              className="object-contain"
            ></Image>
          </div>
        ))}
      </ShowBox>
    </Box>
  );
};

export default CommunityPartners;
