import Tab from '@/components/v2/Campaigns/Tab';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Mantle from '@/components/v2/Campaigns/Mantle';
import { MantleContext } from '@/components/v2/Campaigns/Mantle/type';
import webApi from '@/service';
import { MantleType, TargetsType } from '@/service/webApi/campagins/type';
import { TabListType } from '@/components/v2/Campaigns/Tab/type';
import Loading from '@/public/images/other/loading.png';
import Image from 'next/image';
import { message } from 'antd';
import { BurialPoint } from '@/helper/burialPoint';
import { useRouter } from 'next/router';
import CertificationModal, {
  CertificationModalInstance
} from '@/components/v2/Certification/CertificationModal';

interface CampaignsProp {}

const Campaigns: React.FC<CampaignsProp> = () => {
  const router = useRouter();
  const [curIndex, setCurIndex] = useState(0);
  const [mantles, setMantles] = useState<MantleType[]>([]);
  const [targetList, setTargetList] = useState<TargetsType[]>([]);
  const [tabList, setTabList] = useState<TabListType[]>([]);
  const [claimIds, setClaimIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const certificationModalRef = useRef<CertificationModalInstance>(null);
  const getCampaignsInfo = async (campaignId?: string) => {
    return new Promise(async (resolve) => {
      const res = await webApi.campaigns.getCampaigns();
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
    const res = await webApi.campaigns.getCampaignsTargets(id);
    setClaimIds([]);
    setTargetList(res);
  };

  const campaignsClaim = async () => {
    BurialPoint.track('campaigns certificateCard claim 按钮点击');
    setLoading(true);
    await webApi.campaigns.campaignsClaim({ campaignId: mantles[curIndex].id });
    getCampaignsInfo().then(() => {
      certificationModalRef.current?.open();
    });
  };
  const campaignsTargetClaim = async (ids: string[]) => {
    BurialPoint.track('campaigns targetCard claim 按钮点击');
    setClaimIds(ids);
    await webApi.campaigns.campaignsTargetClaim(mantles[curIndex].id, {
      targetIds: ids
    });
    getCampaignsInfo();
  };

  useEffect(() => {
    const campaignId = router.query.campaignId as string;
    getCampaignsInfo(campaignId);
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('campaigns-页面留存时间', {
        duration
      });
    };
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
        className={`container m-auto flex h-[calc(100vh-64px)] font-next-book text-[#0b0b0b] py-[40px] text-[16px]`}
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
        />
      </div>
    </MantleContext.Provider>
  );
};

export default Campaigns;
