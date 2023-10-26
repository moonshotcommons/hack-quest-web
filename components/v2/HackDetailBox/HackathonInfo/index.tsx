import React from 'react';
import HackathonHost from '@/public/images/hackathon/hackathon_host.png';
import Image from 'next/image';
import Button from '@/components/v2/Common/Button';
import { useRouter } from 'next/router';

interface HackathonInfoProp {
  hackathonData: any;
}

const HackathonInfo: React.FC<HackathonInfoProp> = ({ hackathonData }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-[25px] ">
      <div className="text-[21px] leading-[21px] font-next-book-bold">
        2023 Web 3 Hackathon Forum London
      </div>
      <div>
        <div className="text-[18px] font-next-book-bold leading-[22.5px] mb-[5px]">
          THEME
        </div>
        <div className="text-[16px] leading-[20px]">
          Web3-Focused, Open to Gen-Z Entrepreneurs from all over the world.
        </div>
      </div>
      <div>
        <div className="text-[18px] font-next-book-bold leading-[22.5px] mb-[5px]">
          PARTICIPANTS
        </div>
        <div className="text-[16px] leading-[20px]">
          Web3/blockchain/decentralized technology advocates, developers,
          designers, companies or enthusiasts.
        </div>
      </div>
      <div>
        <div className="text-[18px] font-next-book-bold leading-[22.5px] mb-[5px]">
          HOST
        </div>
        <Image src={HackathonHost} width={500} alt="hackathonHost"></Image>
      </div>
      <div className="relative h-[100px] flex flex-col justify-between pl-[20px]">
        <div className="absolute left-0 top-0 w-[5px] h-full rounded-[10px] bg-[#ffd850]"></div>
        <div>
          <div className="text-[#8C8C8C]">RUNS FROM</div>
          <div className="text-[16px]">Dec 8 - 10, 2023</div>
        </div>
        <div>
          <div className="text-[#8C8C8C]">HAPPENING</div>
          <div className="text-[16px]">
            Broadleaf, 25, Old Broad Street, EC2N 1HN, City of London
          </div>
        </div>
      </div>
      <div className="h-[63px] px-[20px] rounded-[10px] bg-[rgba(255,244,206,0.5)] flex flex-col justify-center ">
        <div className="text-[#8C8C8C]">APPLICATIONS CLOSE IN</div>
        <div className="text-[16px]">22d:23h:3m</div>
      </div>
      <Button className="w-full h-[60px] text-[18px] bg-[#ffd850]">
        Apply Now
      </Button>
      <div className="h-[63px] px-[20px] rounded-[10px] bg-[rgba(218,218,218,0.5)] flex flex-col justify-center ">
        <div className="text-[#8C8C8C] text-[21px]">
          This hackathon is not available now.
        </div>
      </div>
      <Button
        className="w-full h-[60px] text-[18px] border border-[#0b0b0b]"
        onClick={() => router.push('/hackathon/projects')}
      >
        View All Projects
      </Button>
    </div>
  );
};

export default HackathonInfo;
