import React, { useContext, useMemo, useRef, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { MissionStatus } from '@/service/webApi/missionCenter/type';
import Image from 'next/image';
import FireIcon from '@/public/images/mission-center/fire_icon.png';
import FireIconActive from '@/public/images/mission-center/fire_icon_active.png';
import ChestCover from '@/public/images/mission-center/chest_cover.png';
import CompletedIcon from '@/components/Common/Icon/Completed';
import RestoreModal from './RestoreModal';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import { weekInitials } from '../../constants/data';
import webApi from '@/service';
import { message } from 'antd';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import TreasureModal, { TreasureModalRef } from '@/components/Web/Business/TreasureModal';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { HiArrowLongRight } from 'react-icons/hi2';

interface DayStreakProp {
  link?: boolean;
}

const DayStreak: React.FC<DayStreakProp> = ({ link }) => {
  const missionData = useMissionCenterStore((state) => state.missionData);
  const treasureModalRef = useRef<TreasureModalRef>(null);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dealDayStreak } = useGetMissionData();
  const handleClaim = (id: string) => {
    if (loading) return;
    setLoading(true);
    webApi.missionCenterApi
      .missionClaim([id])
      .then((res) => {
        treasureModalRef.current?.open({
          treasureData: {
            coin: res.coin,
            exp: res.exp
          }
        });
      })
      .catch(async (error) => {
        message.error(`claim ${error.msg}!`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const dayStreakData = useMemo(() => {
    return dealDayStreak(missionData?.dailyBonus || []);
  }, [missionData]);
  return (
    <div className="flex flex-col gap-[16px] rounded-[24px] bg-yellow-extra-light p-[24px] ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[16px]">
          <Image src={dayStreakData.isContinu ? FireIconActive : FireIcon} alt={'fire-icon'} width={36} height={36} />
          <div>
            <p className="body-xl-bold text-neutral-off-black">{dayStreakData?.continuCount ?? 1}</p>
            <p className="body-s text-neutral-medium-gray">{t('dayStreak')}</p>
          </div>
        </div>
        {dayStreakData.isMissStreak && (
          <div className="underline-s cursor-pointer text-neutral-off-black" onClick={() => setOpen(true)}>
            {t('missStreak')}
          </div>
        )}
      </div>
      <div className="flex justify-between">
        {dayStreakData.missions?.map((m, i) => (
          <div key={i} className="w-[32px]">
            <div
              className={`flex-center h-[32px]  w-[32px] rounded-[50%] ${m.status === MissionStatus.UNCOMPLETED && 'border border-neutral-light-gray bg-neutral-white'} ${m.status === MissionStatus.RESTORE && 'border border-neutral-light-gray bg-neutral-off-white'}`}
            >
              {m.status === MissionStatus.UNCLAIM && (
                <Image
                  src={ChestCover}
                  alt={'chest-cover'}
                  width={32}
                  height={26}
                  onClick={() => handleClaim(m.id)}
                  className="animate-bounce cursor-pointer transition-all"
                />
              )}
              {m.status === MissionStatus.CLAIMED && <CompletedIcon size={32} />}
            </div>
            <p className="body-xs mt-[4px] text-center text-neutral-medium-gray">{weekInitials[i]}</p>
          </div>
        ))}
      </div>
      {link && (
        <Link className="flex items-center gap-[7px]" href={MenuLink.MISSION_CENTER}>
          <span className="button-text-s uppercase text-neutral-off-black">{t('mission')}</span>
          <HiArrowLongRight className="text-neutral-off-black" />
        </Link>
      )}
      <RestoreModal open={open} onClose={() => setOpen(false)} />
      <TreasureModal ref={treasureModalRef} />
    </div>
  );
};

export default DayStreak;
