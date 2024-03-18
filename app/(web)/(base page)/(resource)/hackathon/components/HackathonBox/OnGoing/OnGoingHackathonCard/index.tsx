import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import useDealHackathonData from '@/hooks/useDealHackathonData';
import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

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
    redirectToUrl(`${MenuLink.HACKATHON}/${hackathon.alias}`);
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
      className="card-hover flex h-[322px] overflow-hidden rounded-[10px] bg-neutral-white "
      onClick={goHackathonDetail}
    >
      <div className="relative h-full w-[571px] bg-[#d9d9d9]/30">
        <Image
          src={hackathon.image}
          fill
          alt={hackathon.alias}
          className="object-cover"
        ></Image>
      </div>
      <div className="flex h-full flex-1 flex-col justify-between p-[20px] text-neutral-off-black">
        <div className="flex">
          <div className="text-h3 line-clamp-1 font-next-book-bold ">
            {hackathon.name}
          </div>
        </div>
        <div className="relative flex h-[60px] flex-col justify-between pl-[20px] ">
          <div className="absolute left-0 top-0 h-full w-[5px] rounded-[10px] bg-yellow-primary"></div>
          <div className="flex items-center gap-[16px]">
            <div className="body-s text-neutral-medium-gray">RUNS FROM</div>
            <div className="body-m">
              {getRunFromTime(hackathon.startTime, hackathon.endTime)}
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="body-s text-neutral-medium-gray">HAPPENING</div>
            <div className="body-m w-0 flex-1 truncate underline">
              {hackathon.address}
            </div>
          </div>
        </div>
        <div className="flex h-[42px] items-center gap-[15px] rounded-[8px] bg-yellow-extra-light px-[20px]">
          <div className="body-s text-neutral-medium-gray">
            APPLICATIONS CLOSE IN
          </div>
          <div className="body-m">{closeInTime}</div>
        </div>
        <div className="flex gap-[16px]">
          <Button
            className="button-text-l h-[60px] flex-1 bg-yellow-primary uppercase"
            onClick={() => {
              BurialPoint.track(`hackathon onGoingCard Apply Now 按钮点击`);
              window.open(hackathon.applyLink);
            }}
          >
            Apply Now
          </Button>
          <Button
            className="button-text-l h-[60px] flex-1 border border-neutral-black uppercase"
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
