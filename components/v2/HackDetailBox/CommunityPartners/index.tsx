import React, { useMemo, useState } from 'react';
import Box from '../components/Box';
import Title from '../components/Title';
import ShowBox from '../components/ShowBox';
import { deepClone } from '@/helper/utils';
import Astronaut from '@/public/images/landing/astronaut.png';
import Image from 'next/image';

interface CommunityPartnersProp {
  hackathonData: any;
}

const CommunityPartners: React.FC<CommunityPartnersProp> = ({
  hackathonData
}) => {
  const data = Array.from({ length: 10 });
  const [showAll, setShowAll] = useState(false);
  const showList = useMemo(() => {
    return showAll ? deepClone(data) : data.slice(0, 3);
  }, [data, showAll]);
  return (
    <Box>
      <Title title="Community Partners" />
      <ShowBox showAll={showAll} changeShowAll={() => setShowAll(!showAll)}>
        {showList.map((_: any, i: number) => (
          <div
            key={i}
            className="w-[32.5%] h-[125px] mb-[20px] rounded-[10px] overflow-hidden"
          >
            <Image src={Astronaut} alt="astronaut" className="w-full"></Image>
          </div>
        ))}
      </ShowBox>
    </Box>
  );
};

export default CommunityPartners;
