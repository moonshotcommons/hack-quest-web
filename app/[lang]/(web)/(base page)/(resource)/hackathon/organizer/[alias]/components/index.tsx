'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import Loading from '@/components/Common/Loading';
import EditProvider from './EditProvider';
import EditNav from '../../../components/HackathonDetail/EditNav';
import Cover from '../../../components/HackathonDetail/Cover';
import TimeLine from '../../../components/HackathonDetail/TimeLine';
import Rewards from '../../../components/HackathonDetail/Rewards';
import Judging from '../../../components/HackathonDetail/Judging';
import Application from '../../../components/HackathonDetail/Application';
import Submission from '../../../components/HackathonDetail/Submission';
import Links from '../../../components/HackathonDetail/Links';
import PartnersBox from '../../../components/HackathonDetail/PartnersBox';
import SpeakersSponsorsBox from '../../../components/HackathonDetail/SpeakersSponsorsBox';
import Schedule from '../../../components/HackathonDetail/Schedule';
import FAQs from '../../../components/HackathonDetail/FAQs';
import AddSection from '../../../components/HackathonDetail/AddSection';
import HandleEditModal from '../../../components/HackathonDetail/HandleEditModal';
import { OffsetTopsType } from '../../../constants/type';
import EditInfo from '../../../components/HackathonDetail/EditInfo';
import ViewButton from '../../../components/HackathonDetail/ViewButton';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import { initEditNavs } from '../../../constants/data';
import { useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { useRedirect } from '@/hooks/router/useRedirect';
import Customs from '../../../components/HackathonDetail/Customs';

interface HackathonEditDetailProp {
  hackathon: HackathonType;
  isEdit?: boolean;
}

const HackathonEditDetail: React.FC<HackathonEditDetailProp> = ({ hackathon: h, isEdit = false }) => {
  const [hackathon, setHackathon] = useState(h);
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
  const [curAnchorIndex, setCurAnchorIndex] = useState(0);
  const isOnScoll = useRef(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const { redirectToUrl } = useRedirect();
  const { getHackathonNavList } = useDealHackathonData();
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

  const navList = useMemo(() => {
    return getHackathonNavList({
      hackathon,
      isDetail: false,
      initNavs: initEditNavs
    });
  }, [hackathon]);

  useEffect(() => {
    setTimeout(() => {
      getOffsetTops();
    }, 1000);
  }, [hackathon]);

  return (
    <EditProvider refreshHackathon={refreshHackathon} hackathon={hackathon} isEdit={isEdit} navs={navList}>
      <Loading loading={loading}>
        <div className="scroll-wrap-y h-[calc(100vh-64px)]" ref={boxRef} onScroll={handleScoll}>
          <div className="container relative mx-auto pb-[80px] pt-[40px]">
            <EditNav curAnchorIndex={curAnchorIndex} handleClickAnchor={handleClickAnchor} navList={navList} />
            <div className="relative flex justify-between gap-[40px] pt-[60px]">
              <div className="flex w-[790px] flex-shrink-0 flex-col gap-[60px] [&>div]:w-full" ref={contentRef}>
                <Cover hackathon={hackathon} imageLoad={getOffsetTops} />
                <TimeLine hackathon={hackathon} isEdit={true} />
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
                <Customs hackathon={hackathon} />
                <AddSection hackathon={hackathon} />
              </div>
              <div className="relative flex-1 flex-shrink-0">
                <div className="sticky left-0 top-[106px] flex flex-col gap-[48px]">
                  <EditInfo hackathon={hackathon} />
                  <ViewButton hackathon={hackathon} />
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

export default HackathonEditDetail;
