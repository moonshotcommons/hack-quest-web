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
      className="card-hover mb-[20px] flex  h-[322px] cursor-pointer overflow-hidden rounded-[10px]  bg-neutral-white text-neutral-off-black"
      onClick={goHackathonDetail}
    >
      <div className="relative h-full w-[571px] bg-[#d9d9d9]/30">
        <Image
          src={hackathon.image}
          fill
          alt="hackathonImage"
          className="object-cover"
        ></Image>
      </div>
      <div className="flex h-full flex-1 flex-col justify-between px-[24px] py-[20px]">
        <div className="text-h3">{hackathon.name}</div>
        <div className="relative flex h-[60px] flex-col justify-between pl-[20px]">
          <div className="absolute left-0 top-0 h-full w-[5px] rounded-[10px] bg-yellow-dark"></div>
          <div className="flex items-center gap-[16px]">
            <div className="body-s text-neutral-medium-gray">RUNS FROM</div>
            <div className="body-m">
              {getRunFromTime(hackathon.startTime, hackathon.endTime)}
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="body-s text-neutral-medium-gray">HAPPENING</div>
            <div className="underline-m">{hackathon.address}</div>
          </div>
        </div>
        <div className="flex h-[42px] items-center  gap-[16px] rounded-[10px] bg-yellow-extra-light px-[20px]">
          <div className="body-s text-neutral-medium-gray">
            APPLICATIONS CLOSE IN
          </div>
          <div className="body-m">{closeInTime}</div>
        </div>
        <div className="flex gap-[16px]">
          <Button
            className="body-l h-[60px] flex-1 bg-yellow-primary"
            onClick={() => {
              BurialPoint.track(`hackathon onGoingCard Apply Now 按钮点击`);
              window.open(hackathon.applyLink);
            }}
          >
            APPLY NOW
          </Button>
          <Button
            className="body-l h-[60px] flex-1 border border-neutral-black"
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
