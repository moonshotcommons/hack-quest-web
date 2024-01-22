'use client';
import CertificationModal, {
  CertificationModalInstance
} from '@/components/Web/Business/Certification/CertificationModal';
import { BurialPoint } from '@/helper/burialPoint';
import Loading from '@/public/images/other/loading.png';
import webApi from '@/service';
import { MantleType, TargetsType } from '@/service/webApi/campaigns/type';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { MantleContext, TabListType } from '../constants/type';
import Tab from './Tab';
import Mantle from './Mantle';

interface CampaignsProp {}

const Campaigns: React.FC<CampaignsProp> = () => {
  const params = useParams();
  const [curIndex, setCurIndex] = useState(0);
  const [mantles, setMantles] = useState<MantleType[]>([]);
  const [targetList, setTargetList] = useState<TargetsType[]>([]);
  const [tabList, setTabList] = useState<TabListType[]>([]);
  const [claimIds, setClaimIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const certificationModalRef = useRef<CertificationModalInstance>(null);
  const getCampaignsInfo = async (campaignId?: string) => {
    return new Promise(async (resolve) => {
      const res = await webApi.campaignsApi.getCampaigns();
      let id;
      if (campaignId) {
        const index = res.findIndex((v) => v.id === campaignId);
        if (index < 0) {
          id = res[curIndex].id;
        } else {
          setCurIndex(index);
          id = campaignId;
        }
      } else {
        id = res[curIndex].id;
      }
      setLoading(false);
      setMantles(res);
      getTabList(res);
      getTargetList(id);
      resolve(res);
    });
  };

  const getTabList = (list: MantleType[]) => {
    const tList: TabListType[] = list.map((v) => {
      const count = 0;
      return {
        label: v.name,
        count
      };
    });
    setTabList(tList);
  };

  const getTargetList = async (id: string) => {
    const res = await webApi.campaignsApi.getCampaignsTargets(id);
    setClaimIds([]);
    setTargetList(res);
  };

  const campaignsClaim = async () => {
    BurialPoint.track('campaigns certificateCard claim 按钮点击');
    setLoading(true);
    await webApi.campaignsApi.campaignsClaim({
      campaignId: mantles[curIndex].id
    });
    getCampaignsInfo().then(() => {
      certificationModalRef.current?.open();
    });
  };

  const campaignsTargetClaim = async (ids: string[]) => {
    BurialPoint.track('campaigns targetCard claim 按钮点击');
    setClaimIds(ids);
    await webApi.campaignsApi.campaignsTargetClaim(mantles[curIndex].id, {
      targetIds: ids
    });
    getCampaignsInfo();
  };

  useEffect(() => {
    const campaignId = params?.campaignId as string;
    getCampaignsInfo(campaignId);
  }, []);
  return (
    <MantleContext.Provider
      value={{
        mantle: mantles[curIndex],
        targetList,
        campaignsClaim,
        campaignsTargetClaim,
        loading,
        refresh: getCampaignsInfo,
        claimIds
      }}
    >
      <div
        className={`container m-auto flex h-full font-next-book text-[#0b0b0b] py-[40px] text-[16px]`}
      >
        <div className="w-[203px]">
          <Tab
            tabList={tabList}
            curIndex={curIndex}
            changeTab={(index) => {
              BurialPoint.track('campaigns tab 点击');
              setCurIndex(index);
            }}
          />
        </div>
        <div className="flex-1 h-full no-scrollbar  overflow-auto bg-[#fff] rounded-b-[10px] rounded-r-[10px] shadow-[5px_5px_5px_#dadada]">
          {mantles[curIndex]?.id ? (
            <Mantle />
          ) : (
            <div className="w-full h-full flex-center">
              <Image
                src={Loading}
                width={40}
                alt="loading"
                className="object-contain animate-spin opacity-100 absolute"
              ></Image>
            </div>
          )}
        </div>
        <CertificationModal
          ref={certificationModalRef}
          certification={mantles[curIndex]?.certification || {}}
          showCoin={true}
          refreshCertification={() =>
            getCampaignsInfo(params.campaignId as string)
          }
        />
      </div>
    </MantleContext.Provider>
  );
};

export default Campaigns;
