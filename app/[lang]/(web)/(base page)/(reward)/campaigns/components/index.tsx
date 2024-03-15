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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MantleContext, TabListType } from '../constants/type';
import Tab from './Tab';
import Mantle from './Mantle';

interface CampaignsProp {}

const Campaigns: React.FC<CampaignsProp> = () => {
  const params = useParams();
  const [curId, setCurId] = useState('');
  const [mantles, setMantles] = useState<MantleType[]>([]);
  const [targetList, setTargetList] = useState<TargetsType[]>([]);
  const [tabList, setTabList] = useState<TabListType[]>([]);
  const [claimIds, setClaimIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const certificationModalRef = useRef<CertificationModalInstance>(null);
  const getCampaignsInfo = async (campaignId?: string) => {
    return new Promise(async (resolve) => {
      const res = await webApi.campaignsApi.getCampaigns();
      let id = campaignId || curId || res[0].id;
      setCurId(id);
      setLoading(false);
      setMantles(res);
      getTabList(res);
      getTargetList(id);
      resolve(res);
    });
  };

  const curIndex = useMemo(() => {
    return mantles.findIndex((v) => v.id === curId) || 0;
  }, [curId, mantles]);

  const getTabList = (list: MantleType[]) => {
    const tList: TabListType[] = list.map((v) => {
      const count = 0;
      return {
        label: v.name,
        value: v.id,
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
      campaignId: curId
    });
    getCampaignsInfo().then(() => {
      certificationModalRef.current?.open();
    });
  };

  const campaignsTargetClaim = async (ids: string[]) => {
    BurialPoint.track('campaigns targetCard claim 按钮点击');
    setClaimIds(ids);
    await webApi.campaignsApi.campaignsTargetClaim(curId, {
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
        className={`tetx-body-m container m-auto flex h-full py-[40px] text-neutral-black`}
      >
        <div className="w-[203px]">
          <Tab
            tabList={tabList}
            curId={curId}
            changeTab={(id) => {
              BurialPoint.track('campaigns tab 点击');
              setCurId(id);
            }}
          />
        </div>
        <div className="no-scrollbar h-full flex-1  overflow-auto rounded-b-[10px] rounded-r-[10px] bg-neutral-white shadow-[5px_5px_5px_#dadada]">
          {curId ? (
            <Mantle />
          ) : (
            <div className="flex-center h-full w-full">
              <Image
                src={Loading}
                width={40}
                alt="loading"
                className="absolute animate-spin object-contain opacity-100"
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
