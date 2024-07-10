'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditNav from '../../../components/HackathonDetail/EditNav';
import Cover from '../../../components/HackathonDetail/Cover';
import TimeLine from '../../../components/HackathonDetail/TimeLine';
import PartnersBox from '../../../components/HackathonDetail/PartnersBox';
import SpeakersSponsorsBox from '../../../components/HackathonDetail/SpeakersSponsorsBox';
import Schedule from '../../../components/HackathonDetail/Schedule';
import FAQs from '../../../components/HackathonDetail/FAQs';
import DetailInfo from '../../../components/HackathonDetail/DetailInfo';
import { OffsetTopsType } from '../../../constants/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { initDetailNavs } from '../../../constants/data';
import Description from '../../../components/HackathonDetail/Decription';
import Rewards from '../../../components/HackathonDetail/Rewards';
import Judging from '../../../components/HackathonDetail/Judging';
import ThemeResource from '../../../components/HackathonDetail/ThemeResource';

interface HackathonDetailProp {
  hackathon: HackathonType;
  isEdit?: boolean;
}

const HackathonDetail: React.FC<HackathonDetailProp> = ({ hackathon }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
  const [curAnchorIndex, setCurAnchorIndex] = useState(0);
  const isOnScoll = useRef(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const { getHackathonNavList } = useDealHackathonData();
  const handleClickAnchor = (index: number) => {
    setCurAnchorIndex(index);
    isOnScoll.current = true;
    boxRef.current?.scrollTo({
      top: offsetTops[index]?.offsetTop || 0
    });
    setTimeout(() => {
      isOnScoll.current = false;
    }, 10);
  };
  const getOffsetTops = () => {
    const newOffsetTops = [];
    const childNodes = contentRef.current?.childNodes || [];
    for (let i = 0; i < childNodes?.length; i++) {
      const offsetTop = (childNodes[i] as HTMLDivElement).offsetTop || 0;
      newOffsetTops.push({
        title: ``,
        offsetTop: offsetTop
      });
    }
    setOffsetTops(newOffsetTops);
  };
  const handleScoll = () => {
    if (isOnScoll.current) return;
    const scrollTop = boxRef.current?.scrollTop || 0;
    timeOut.current = setTimeout(() => {
      timeOut.current = null;
      for (let i = 0; i < offsetTops.length; i++) {
        if (scrollTop >= offsetTops[offsetTops.length - 1].offsetTop) {
          setCurAnchorIndex(offsetTops.length - 1);
          break;
        } else if (scrollTop >= offsetTops[i].offsetTop && scrollTop < offsetTops[i + 1].offsetTop) {
          setCurAnchorIndex(i);
          break;
        }
      }
    }, 150);
  };
  // const index = getStepIndex(hackathon);
  const index = 1;

  const navList = useMemo(() => {
    return getHackathonNavList({
      hackathon,
      isDetail: true,
      initNavs: initDetailNavs
    });
  }, [hackathon]);

  useEffect(() => {
    setTimeout(() => {
      getOffsetTops();
    }, 300);
  }, [hackathon]);
  return (
    <div className="scroll-wrap-y h-[calc(100vh-64px)]" ref={boxRef} onScroll={handleScoll}>
      <div className="container relative mx-auto pb-[80px] pt-[40px]">
        <EditNav curAnchorIndex={curAnchorIndex} handleClickAnchor={handleClickAnchor} navList={navList} />
        <div className="relative flex justify-between pt-[60px]">
          <div className="flex w-[58%] flex-col gap-[60px] [&>div]:w-full" ref={contentRef}>
            <Cover hackathon={hackathon} />
            <TimeLine hackathon={hackathon} />
            {navList.some((v) => v.value === 'description') && <Description hackathon={hackathon} />}
            {navList.some((v) => v.value === 'rewards') && <Rewards hackathon={hackathon} />}
            {navList.some((v) => v.value === 'judge') &&
              (hackathon.judge?.length > 0 ? (
                <Judging hackathon={hackathon} />
              ) : (
                <ThemeResource hackathon={hackathon} type="criteria" />
              ))}
            {navList.some((v) => v.value === 'coHosts') && <PartnersBox hackathon={hackathon} type="coHosts" />}
            {navList.some((v) => v.value === 'theme') && <ThemeResource hackathon={hackathon} type="theme" />}
            {navList.some((v) => v.value === 'resource') && <ThemeResource hackathon={hackathon} type="resource" />}
            <PartnersBox hackathon={hackathon} type="mediaPartners" />
            <PartnersBox hackathon={hackathon} type="communityPartners" />
            <PartnersBox hackathon={hackathon} type="partners" />
            <SpeakersSponsorsBox hackathon={hackathon} type="speakers" />
            <SpeakersSponsorsBox hackathon={hackathon} type="sponsors" />
            <Schedule hackathon={hackathon} />
            <FAQs hackathon={hackathon} />
          </div>
          <div className="relative w-[39%]">
            <div className="sticky left-0 top-[106px]">
              <DetailInfo hackathon={hackathon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetail;