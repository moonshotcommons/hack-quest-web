import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import { menuLink } from '@/components/v2/Business/Breadcrumb/data';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import useDealHackathonData from '@/hooks/useDealHackathonData';
import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/useRedirect';

interface OnGoingHackathonCardProp {
  hackathon: HackathonType;
}

const OnGoingHackathonCard: React.FC<OnGoingHackathonCardProp> = ({
  hackathon
}) => {
  const { redirectToUrl } = useRedirect();
  const closeInTimeOut = useRef<NodeJS.Timeout | null>(null);
  const [closeInTime, setCloseInTime] = useState('');
  const goHackathonDetail = () => {
    BurialPoint.track(`hackathon onGoingCard 点击`);
    redirectToUrl(
      `${menuLink.hackathon}/${hackathon.id}?menu=${Menu.HACKATHON}&${QueryIdType.HACKATHON_ID}=${hackathon.id}`
    );
  };
  const { getRunFromTime, getCloseInTime } = useDealHackathonData();
  const getCloseIn = () => {
    setCloseInTime(getCloseInTime(hackathon.endTime));
    closeInTimeOut.current = setTimeout(() => {
      getCloseIn();
    }, 60 * 1000);
  };
  useEffect(() => {
    getCloseIn();
    return () => {
      if (closeInTimeOut.current) clearTimeout(closeInTimeOut.current);
    };
  }, [hackathon]);
  return (
    <div
      className="h-[400px] cursor-pointer font-next-book rounded-[10px] bg-[#fff] overflow-hidden flex  mb-[20px] hover:-translate-y-1 transition-all duration-300 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] "
      onClick={goHackathonDetail}
    >
      <div className="h-full w-[711px] relative bg-[#d9d9d9]/30">
        <Image
          src={hackathon.image}
          fill
          alt="hackathonImage"
          className="object-cover"
        ></Image>
      </div>
      <div className="flex-1 h-full flex flex-col justify-between p-[30px]">
        <div className="flex">
          <div className="text-[21px] leading-[21px] font-next-book-bold">
            {hackathon.name}
          </div>
        </div>
        <div className="relative h-[100px] flex flex-col justify-between pl-[20px]">
          <div className="absolute left-0 top-0 w-[5px] h-full rounded-[10px] bg-yellow-primary"></div>
          <div>
            <div className="text-[#8C8C8C]">RUNS FROM</div>
            <div className="text-[16px]">
              {getRunFromTime(hackathon.startTime, hackathon.endTime)}
            </div>
          </div>
          <div>
            <div className="text-[#8C8C8C]">HAPPENING</div>
            <div className="text-[16px]">{hackathon.address}</div>
          </div>
        </div>
        <div className="h-[63px] px-[20px] rounded-[10px] bg-[rgba(255,244,206,0.5)] flex flex-col justify-center ">
          <div className="text-[#8C8C8C]">APPLICATIONS CLOSE IN</div>
          <div className="text-[16px]">{closeInTime}</div>
        </div>
        <div className="flex justify-between">
          <Button
            className="w-[245px] h-[60px] text-[18px] bg-yellow-primary"
            onClick={() => {
              BurialPoint.track(`hackathon onGoingCard Apply Now 按钮点击`);
              window.open(hackathon.applyLink);
            }}
          >
            Apply Now
          </Button>
          <Button
            className="w-[245px] h-[60px] text-[18px] border border-[#0B0B0B]"
            onClick={goHackathonDetail}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnGoingHackathonCard;
