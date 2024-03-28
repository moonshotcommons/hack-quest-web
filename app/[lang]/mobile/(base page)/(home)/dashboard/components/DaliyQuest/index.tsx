'use client';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
import IconHack from '@/public/images/mission-center/icon_hack.png';
import Image from 'next/image';
import IconCoin from '@/public/images/mission-center/icon_coin.png';
import IconXp from '@/public/images/mission-center/icon_xp.png';
import Button from '@/components/Common/Button';
import { message } from 'antd';
import webApi from '@/service';
import { BurialPoint } from '@/helper/burialPoint';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import { MissionDataType } from '@/service/webApi/missionCenter/type';

interface DaliyQuestProp {}

const DaliyQuest: React.FC<DaliyQuestProp> = () => {
  const { updateMissionDataAll } = useGetMissionData();
  const [claimIds, setClaimIds] = useState<string[]>([]);
  const dailyQuests = useMissionCenterStore((state) => state.missionData.dailyQuests);
  const missionClaim = (mission: MissionDataType) => {
    if (~claimIds.indexOf(mission.id) || mission.progress.claimed) return;
    setClaimIds([...claimIds, mission.id]);
    BurialPoint.track(`mission-center-claim`);
    webApi.missionCenterApi
      .missionClaim([mission.id])
      .then(async () => {
        await updateMissionDataAll();
        message.success('success');
      })
      .catch(async (error) => {
        message.error(`claim ${error.msg}!`);
      })
      .finally(() => {
        const newIds = claimIds.filter((v) => v !== mission.id);
        setClaimIds(newIds);
      });
  };
  return (
    <div>
      <div className="text-h4 mb-[24px] text-neutral-black">Daily Quests</div>
      <div>
        {dailyQuests.map((v) => (
          <div
            key={v.id}
            className="relative mb-[16px] h-[87px] overflow-hidden rounded-[10px] bg-neutral-white p-[12px]"
          >
            <div
              className="absolute left-0 top-0 h-full rounded-[10px] bg-yellow-light"
              style={{
                width: `${(v.progress?.progress?.[0] / v.progress?.progress?.[1]) * 100}%`
              }}
            ></div>
            <div className="z-2 relative">
              <div className="mb-[9px] flex items-center gap-[8px]">
                <Image src={IconHack} alt="IconHack" width={24}></Image>
                <span className="body-s text-neutral-black">{`${v.name}(${v.progress?.progress?.[0]}/${v.progress?.progress?.[1]})`}</span>
              </div>
              <div className="flex h-[31px] items-center justify-between">
                <div className="flex gap-[20px] pl-[12px]">
                  <div className="body-s relative flex h-[24px] w-[45px]  items-center rounded-r-[20px]  bg-neutral-off-white pl-[18px] text-neutral-off-black ">
                    <Image src={IconXp} width={24} alt="icon" className="absolute left-[-12px]"></Image>
                    <span>{v.exp}</span>
                  </div>
                  <div className="body-s relative flex h-[24px] w-[45px]  items-center rounded-r-[20px]  bg-neutral-off-white pl-[18px] text-neutral-off-black ">
                    <Image src={IconCoin} width={24} alt="icon" className="absolute left-[-12px]"></Image>
                    <span>{v.coin}</span>
                  </div>
                </div>
                {v.progress.completed && (
                  <Button
                    className={`button-text-s h-[31px] w-[71px] bg-yellow-primary text-neutral-off-black ${
                      v.progress.claimed ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    loading={!!~claimIds.indexOf(v.id)}
                    onClick={() => missionClaim(v)}
                  >
                    {`${v.progress.claimed ? 'CLAIMED' : 'CLAIM'}`}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        className="button-text-s flex cursor-pointer items-center  text-neutral-off-black"
        href={MenuLink.MISSION_CENTER}
      >
        <span className="uppercase">Mission center</span>
        <HiArrowLongRight size={18}></HiArrowLongRight>
      </Link>
    </div>
  );
};

export default DaliyQuest;
