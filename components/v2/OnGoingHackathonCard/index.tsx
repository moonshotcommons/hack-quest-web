import React from 'react';
import Astronaut from '@/public/images/landing/astronaut.png';
import Image from 'next/image';
import Button from '@/components/v2/Common/Button';
import { useRouter } from 'next/router';
import { Menu, QueryIdType } from '../Breadcrumb/type';
import { menuLink } from '../Breadcrumb/data';
import { HackathonType } from '@/service/webApi/resourceStation/hackathon/type';

interface OnGoingHackathonCardProp {
  hackathon: HackathonType;
}

const OnGoingHackathonCard: React.FC<OnGoingHackathonCardProp> = ({
  hackathon
}) => {
  const router = useRouter();
  const goHackathonDetail = () => {
    router.push(
      `${menuLink.hackathon}/${hackathon.id}?menu=${Menu.HACKATHON}&${QueryIdType.HACKATHON_ID}=${hackathon.id}`
    );
  };
  return (
    <div
      className="h-[430px] cursor-pointer rounded-[10px] bg-[#fff] overflow-hidden flex  mb-20 hover:-translate-y-1 transition-all duration-300 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] "
      onClick={goHackathonDetail}
    >
      <div className="h-full flex-1">
        <Image
          src={Astronaut}
          alt="astronaut"
          className="w-full h-full"
        ></Image>
      </div>
      <div className="w-[580px] h-full flex flex-col justify-between p-[40px]">
        <div className="flex">
          <div className="text-[21px] leading-[21px] font-next-book-bold">
            2023 Web 3 Hackathon Forum London + Day Party
          </div>
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
        <div className="flex justify-between">
          <Button className="w-[245px] h-[60px] text-[18px] bg-[#ffd850]">
            Apply Now
          </Button>
          <Button className="w-[245px] h-[60px] text-[18px] border border-[#0B0B0B]">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnGoingHackathonCard;
