import React, { useContext, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { MissionDataType, MissionStatus } from '@/service/webApi/missionCenter/type';
import Image from 'next/image';
import FireIcon from '@/public/images/mission-center/fire_icon.png';
import FireIconActive from '@/public/images/mission-center/fire_icon_active.png';
import ChestCover from '@/public/images/mission-center/chest_cover.png';
import CompletedIcon from '@/components/Common/Icon/Completed';
import RestoreModal from './RestoreModal';

interface DayStreakProp {
  missionDatas: MissionDataType[];
  missionClaim: (ids: string[]) => void;
}

const DayStreak: React.FC<DayStreakProp> = ({ missionDatas, missionClaim }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const [open, setOpen] = useState(false);
  const handleClaim = (id: string) => {
    missionClaim([id]);
  };
  return (
    <div className="rounded-[24px] bg-yellow-extra-light p-[24px] ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[16px]">
          <Image src={true ? FireIconActive : FireIcon} alt={'fire-icon'} width={36} height={36} />
          <div>
            <p className="body-xl-bold text-neutral-off-black">{10}</p>
            <p className="body-s text-neutral-medium-gray">{t('dayStreak')}</p>
          </div>
        </div>
        <div className="underline-s cursor-pointer text-neutral-off-black" onClick={() => setOpen(true)}>
          {t('missStreak')}
        </div>
      </div>
      <div className="mt-[24px] flex justify-between">
        {missionDatas.map((m, i) => (
          <div key={i} className="w-[32px]">
            <div
              className={`flex-center h-[32px]  w-[32px] rounded-[50%] ${m.status === MissionStatus.UNCOMPLETED && 'border border-neutral-light-gray bg-neutral-white'}`}
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
            <p className="body-xs mt-[4px] text-center text-neutral-medium-gray">{i}</p>
          </div>
        ))}
      </div>
      <RestoreModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default DayStreak;
