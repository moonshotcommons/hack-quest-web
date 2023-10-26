import React, { useMemo, useState } from 'react';
import Box from '../components/Box';
import Title from '../components/Title';
import ShowBox from '../components/ShowBox';
import { deepClone } from '@/helper/utils';
import Astronaut from '@/public/images/landing/astronaut.png';
import Image from 'next/image';

interface GuestsMentorsProp {
  hackathonData: any;
}

const GuestsMentors: React.FC<GuestsMentorsProp> = ({ hackathonData }) => {
  const data = Array.from({ length: 10 });
  const [showAll, setShowAll] = useState(false);
  const showList = useMemo(() => {
    return showAll ? deepClone(data) : data.slice(0, 3);
  }, [data, showAll]);
  return (
    <Box>
      <Title title="Guests and Mentors" />
      <ShowBox showAll={showAll} changeShowAll={() => setShowAll(!showAll)}>
        {showList.map((_: any, i: number) => (
          <div
            key={i}
            className="w-[32.5%] h-[307px] mb-[20px] rounded-[10px] overflow-hidden shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]"
          >
            <div className="h-[178px] overflow-hidden">
              <Image src={Astronaut} alt="astronaut" className="w-full"></Image>
            </div>
            <div className="p-[15px]">
              <p className="text-[21px] pb-[5px] font-next-book-bold">
                Dr. Ayesha Kiani
              </p>
              <p className="text-[16px] leading-[16px]">
                New York University Professor
              </p>
            </div>
          </div>
        ))}
      </ShowBox>
    </Box>
  );
};

export default GuestsMentors;
