'use client';
import React, { useEffect, useRef, useState } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditProvider from './EditProvider';
import EditNav from './EditNav';
import Info from './Info';
import HandleEditModal from './HandleEditModal';
import AddSection from './AddSection';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import Loading from '@/components/Common/Loading';
import Cover from './Cover';
import TimeLine from './TimeLine';
import Rewards from './Rewards';
import Judging from './Judging';
import Application from './Application';
import Submission from './Submission';
import Links from './Links';
import PartnersBox from './PartnersBox';
import SpeakersSponsorsBox from './SpeakersSponsorsBox';
import Schedule from './Schedule';
import FAQs from './FAQs';
import { OffsetTopsType } from '../../../constants/type';

interface HackathonEditProp {
  hackathon: HackathonType;
  isEdit?: boolean;
}

const HackathonEdit: React.FC<HackathonEditProp> = ({ hackathon: h, isEdit = false }) => {
  const [curTab, setCurTab] = useState('');
  const [hackathon, setHackathon] = useState(h);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
  const [curAnchorIndex, setCurAnchorIndex] = useState(0);
  const isOnScoll = useRef(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const { run: refreshHackathon, loading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getHackathonDetail(hackathon.id);
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setHackathon(res || {});
      }
    }
  );
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
    console.info(newOffsetTops);
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
  console.info(hackathon);

  useEffect(() => {
    setTimeout(() => {
      getOffsetTops();
    }, 300);
  }, [hackathon]);
  return (
    <EditProvider refreshHackathon={refreshHackathon} hackathon={hackathon} isEdit={isEdit}>
      <Loading loading={loading}>
        <div className="scroll-wrap-y h-[calc(100vh-64px)]" ref={boxRef} onScroll={handleScoll}>
          <div className="container relative mx-auto pb-[80px] pt-[40px]">
            <EditNav curAnchorIndex={curAnchorIndex} handleClickAnchor={handleClickAnchor} />
            <div className="relative flex justify-between pt-[60px]">
              <div className="flex w-[58%] flex-col gap-[60px] [&>div]:w-full" ref={contentRef}>
                <Cover hackathon={hackathon} />
                <TimeLine hackathon={hackathon} />
                <Rewards hackathon={hackathon} />
                <Judging hackathon={hackathon} />
                <Application hackathon={hackathon} />
                <Submission hackathon={hackathon} />
                <Links hackathon={hackathon} />
                <PartnersBox hackathon={hackathon} type="mediaPartners" />
                <PartnersBox hackathon={hackathon} type="communityPartners" />
                <PartnersBox hackathon={hackathon} type="partners" />
                <SpeakersSponsorsBox hackathon={hackathon} type="speakers" />
                <SpeakersSponsorsBox hackathon={hackathon} type="sponsors" />
                <Schedule hackathon={hackathon} />
                <FAQs hackathon={hackathon} />
                <AddSection hackathon={hackathon} />
              </div>
              <div className="relative w-[39%]">
                <div className="sticky left-0 top-[70px]">
                  <Info hackathon={hackathon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Loading>
      <HandleEditModal hackathon={hackathon} />
    </EditProvider>
  );
};

export default HackathonEdit;
