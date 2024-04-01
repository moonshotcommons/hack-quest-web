'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { HackathonStatusType, HackathonType } from '@/service/webApi/resourceStation/type';
import useDealhackathon from '@/hooks/resource/useDealHackathonData';
import { BurialPoint } from '@/helper/burialPoint';
import { useGlobalStore } from '@/store/zustand/globalStore';

interface HackathonInfoProp {
  hackathon: HackathonType;
}

const HackathonInfo: React.FC<HackathonInfoProp> = ({ hackathon }) => {
  const closeInTimeOut = useRef<NodeJS.Timeout | null>(null);
  const [status, setStatus] = useState<HackathonStatusType | null>(null);
  const [closeInTime, setCloseInTime] = useState('');
  const setTipsModalOpenState = useGlobalStore((state) => state.setTipsModalOpenState);
  const { getRunFromTime, getCloseInTime, getParticipantsStr } = useDealhackathon();
  const getCloseIn = () => {
    const t = getCloseInTime(hackathon.endTime);
    setStatus(t as HackathonStatusType);
    if (t === HackathonStatusType.PAST) {
      if (closeInTimeOut.current) clearTimeout(closeInTimeOut.current);
      return;
    }
    setCloseInTime(t);
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
    <div className="flex flex-col gap-[1.5rem] text-neutral-off-black">
      <div className="text-h3-mob font-next-book-bold">{hackathon.name}</div>
      <div>
        <div className="text-h4-mob mb-[.25rem] ">THEME</div>
        <pre className="body-s">{hackathon.theme}</pre>
      </div>
      <div>
        <div className="text-h4-mob  mb-[.25rem]">PARTICIPANTS</div>
        <div className="body-s break-words">{getParticipantsStr(hackathon.participants)}</div>
      </div>
      <div>
        <div className="text-h4-mob mb-[.25rem]">HOST</div>
        {hackathon.hosts.map((v, i) => (
          <div key={i} className="flex-row-center mb-[10px] h-[30px]">
            <div className="relative h-[30px] w-[30px]">
              <Image src={v.picture} alt="hackathonHost" fill className="object-contain"></Image>
            </div>
            <span className="body-s pl-[8px] uppercase">{v.name}</span>
          </div>
        ))}
      </div>
      <div className="relative  pl-[1.1875rem]">
        <div
          className={`absolute left-0 top-0 h-full w-[.3125rem] flex-shrink-0 rounded-[.3125rem] ${status === HackathonStatusType.ON_GOING ? 'bg-yellow-primary' : 'bg-neutral-light-gray'}`}
        ></div>
        <div>
          <div className="body-xs text-neutral-medium-gray">RUNS FROM</div>
          <div className="body-s">{getRunFromTime(hackathon.startTime, hackathon.endTime)}</div>
        </div>
        <div className="mt-[.5rem]">
          <div className="body-xs text-neutral-medium-gray">HAPPENING</div>
          <div className="body-s break-words underline">{hackathon.address}</div>
        </div>
      </div>
      {status === HackathonStatusType.ON_GOING ? (
        <>
          <div className="flex flex-col justify-center gap-[.25rem] rounded-[.75rem] bg-[rgba(255,244,206,0.5)]  px-[1.25rem] py-[.25rem] ">
            <div className="body-xs text-neutral-medium-gray">APPLICATIONS CLOSE IN</div>
            <div className="body-s">{closeInTime}</div>
          </div>
          <Button
            className="button-text-m fixed bottom-[1.25rem] left-[1.25rem] z-[10] h-[3rem] w-[calc(100vw-2.5rem)] bg-yellow-primary uppercase"
            onClick={() => {
              BurialPoint.track(`hackathon detail Apply Now 按钮点击`);
              window.open(hackathon.applyLink);
            }}
          >
            Apply Now
          </Button>
        </>
      ) : status === HackathonStatusType.PAST ? (
        <>
          <div className="flex flex-col justify-center rounded-[8px] bg-[rgba(218,218,218,0.5)] px-[1.25rem] py-[.25rem] ">
            <div className="body-l text-neutral-rich-gray">This hackathon is not available now.</div>
          </div>
          {/* <Link
            onClick={() => {
              BurialPoint.track(`hackathon detail View All Projects 按钮点击`);
            }}
            href={`${MenuLink.PROJECTS}?keyword=${hackathon.name}`}
          > */}
          <Button
            className="button-text-m fixed bottom-[1.25rem] left-[1.25rem] z-[10] h-[3rem] w-[calc(100vw-2.5rem)] bg-neutral-black uppercase text-neutral-white"
            onClick={() => {
              setTipsModalOpenState(true);
            }}
          >
            View All Projects
          </Button>
          {/* </Link> */}
        </>
      ) : null}
    </div>
  );
};

export default HackathonInfo;
