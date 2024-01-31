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
      className="mb-[20px] flex h-[400px] cursor-pointer overflow-hidden rounded-[10px] bg-neutral-white  font-next-book shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] "
      onClick={goHackathonDetail}
    >
      <div className="relative h-full w-[711px] bg-[#d9d9d9]/30">
        <Image
          src={hackathon.image}
          fill
          alt="hackathonImage"
          className="object-cover"
        ></Image>
      </div>
      <div className="flex h-full flex-1 flex-col justify-between p-[30px]">
        <div className="flex">
          <div className="text-h3 text-neutral-off-black">{hackathon.name}</div>
        </div>
        <div className="relative flex h-[100px] flex-col justify-between pl-[20px]">
          <div className="absolute left-0 top-0 h-full w-[5px] rounded-[10px] bg-yellow-primary"></div>
          <div>
            <div className="body-s text-neutral-medium-gray">RUNS FROM</div>
            <div className="body-m">
              {getRunFromTime(hackathon.startTime, hackathon.endTime)}
            </div>
          </div>
          <div>
            <div className="body-s text-neutral-medium-gray">HAPPENING</div>
            <div className="body-m">{hackathon.address}</div>
          </div>
        </div>
        <div className="flex h-[63px] flex-col justify-center rounded-[10px] bg-[rgba(255,244,206,0.5)] px-[20px] ">
          <div className="body-s text-neutral-medium-gray">
            APPLICATIONS CLOSE IN
          </div>
          <div className="body-m">{closeInTime}</div>
        </div>
        <div className="flex justify-between">
          <Button
            className="button-l h-[60px] w-[245px] bg-yellow-primary"
            onClick={() => {
              BurialPoint.track(`hackathon onGoingCard Apply Now 按钮点击`);
              window.open(hackathon.applyLink);
            }}
          >
            Apply Now
          </Button>
          <Button
            className="button-l h-[60px] w-[245px] border border-neutral-black"
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
