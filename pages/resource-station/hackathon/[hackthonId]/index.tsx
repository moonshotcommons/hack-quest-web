import { FC } from 'react';
import Box from '@/components/v2/HackDetailBox/components/Box';
import About from '@/components/v2/HackDetailBox/About';
import GuestsMentors from '@/components/v2/HackDetailBox/GuestsMentors';
import MediaPartners from '@/components/v2/HackDetailBox/MediaPartners';
import CommunityPartners from '@/components/v2/HackDetailBox/CommunityPartners';
import HackathonInfo from '@/components/v2/HackDetailBox/HackathonInfo';

interface HackDetailProps {}

const HackDetail: FC<HackDetailProps> = (props) => {
  const hackathonData = {};
  return (
    <div className="mx-auto container flex justify-between tracking-[0.36px]">
      <div className="w-[58%]">
        <About hackathonData={hackathonData} />
        <GuestsMentors hackathonData={hackathonData} />
        <MediaPartners hackathonData={hackathonData} />
        <CommunityPartners hackathonData={hackathonData} />
      </div>
      <div className="w-[39%]">
        <HackathonInfo hackathonData={hackathonData} />
      </div>
    </div>
  );
};

export default HackDetail;
