'use client';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { useGetMissionData } from '@/hooks/useGetMissionData';
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
  const dailyQuests = useMissionCenterStore(
    (state) => state.missionData.dailyQuests
  );
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
      <div className="text-neutral-black text-h4 mb-[24px]">Daily Quests</div>
      <div>
        {dailyQuests.map((v) => (
          <div
            key={v.id}
            className="h-[87px] rounded-[10px] bg-neutral-white relative mb-[16px] p-[12px] overflow-hidden"
          >
            <div
              className="absolute left-0 top-0 h-full rounded-[10px] bg-yellow-light"
              style={{
                width: `${
                  (v.progress?.progress?.[0] / v.progress?.progress?.[1]) * 100
                }%`
              }}
            ></div>
            <div className="relative z-2">
              <div className="flex items-center gap-[8px] mb-[9px]">
                <Image src={IconHack} alt="IconHack" width={24}></Image>
                <span className="body-s text-neutral-black">{`${v.name}(${v.progress?.progress?.[0]}/${v.progress?.progress?.[1]})`}</span>
              </div>
              <div className="flex items-center justify-between h-[31px]">
                <div className="flex gap-[20px] pl-[12px]">
                  <div className="w-[45px] h-[24px] flex items-center pl-[18px]  body-s text-neutral-off-black  bg-neutral-off-white rounded-r-[20px] relative ">
                    <Image
                      src={IconXp}
                      width={24}
                      alt="icon"
                      className="absolute left-[-12px]"
                    ></Image>
                    <span>{v.exp}</span>
                  </div>
                  <div className="w-[45px] h-[24px] flex items-center pl-[18px]  body-s text-neutral-off-black  bg-neutral-off-white rounded-r-[20px] relative ">
                    <Image
                      src={IconCoin}
                      width={24}
                      alt="icon"
                      className="absolute left-[-12px]"
                    ></Image>
                    <span>{v.coin}</span>
                  </div>
                </div>
                {v.progress.completed && (
                  <Button
                    className={`w-[71px] h-[31px] bg-yellow-primary text-neutral-off-black button-text-s ${
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
        className="flex text-neutral-off-black button-text-s items-center  cursor-pointer"
        href={MenuLink.MISSION_CENTER}
      >
        <span className="uppercase">Mission center</span>
        <HiArrowLongRight size={18}></HiArrowLongRight>
      </Link>
    </div>
  );
};

export default DaliyQuest;
