import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { menuLink } from '@/components/Web/Business/Breadcrumb/data';
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
      className="h-[322px] cursor-pointer text-neutral-off-black  rounded-[10px] bg-[#fff] overflow-hidden flex  mb-[20px] card-hover"
      onClick={goHackathonDetail}
    >
      <div className="h-full w-[571px] relative bg-[#d9d9d9]/30">
        <Image
          src={hackathon.image}
          fill
          alt="hackathonImage"
          className="object-cover"
        ></Image>
      </div>
      <div className="flex-1 h-full flex flex-col justify-between px-[24px] py-[20px]">
        <div className="text-[21px] leading-[21px] font-next-book-bold">
          {hackathon.name}
        </div>
        <div className="relative h-[60px] flex flex-col justify-between pl-[20px]">
          <div className="absolute left-0 top-0 w-[5px] h-full rounded-[10px] bg-yellow-dark"></div>
          <div className="flex items-center gap-[16px]">
            <div className="text-neutral-medium-gray body-s">RUNS FROM</div>
            <div className="body-m">
              {getRunFromTime(hackathon.startTime, hackathon.endTime)}
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="text-neutral-medium-gray body-s">HAPPENING</div>
            <div className="underline-m">{hackathon.address}</div>
          </div>
        </div>
        <div className="h-[42px] px-[20px] rounded-[10px]  bg-yellow-extra-light flex items-center gap-[16px]">
          <div className="text-neutral-medium-gray body-s">
            APPLICATIONS CLOSE IN
          </div>
          <div className="body-m">{closeInTime}</div>
        </div>
        <div className="flex gap-[16px]">
          <Button
            className="flex-1 h-[60px] text-[18px] bg-yellow-primary"
            onClick={() => {
              BurialPoint.track(`hackathon onGoingCard Apply Now 按钮点击`);
              window.open(hackathon.applyLink);
            }}
          >
            APPLY NOW
          </Button>
          <Button
            className="flex-1 h-[60px] text-[18px] border border-neutral-black"
            onClick={goHackathonDetail}
          >
            LEARN MORE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnGoingHackathonCard;
