import React, { useContext, useRef, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useUserStore } from '@/store/zustand/userStore';
import { LoginResponse } from '@/service/webApi/user/type';
import { LuCopy } from 'react-icons/lu';
import { MdOutlineShare } from 'react-icons/md';
import { InviteTreasureType, TreasureStatus } from '@/service/webApi/missionCenter/type';
import Image from 'next/image';
import ChestCover from '@/public/images/mission-center/chest_cover.png';
import CompletedIcon from '@/components/Common/Icon/Completed';
import TreasureModal, { TreasureModalRef } from '@/components/Web/Business/TreasureModal';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import { copyText } from '@/helper/utils';
import PopBox from '@/components/Web/Business/InviteCodeCard/PopBox';
import { shareList, ShareWrap } from '@/components/Web/Business/InviteCodeCard/constant';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { cloneDeep } from 'lodash-es';

interface ReferEarnProp {}

const ReferEarn: React.FC<ReferEarnProp> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const userInfo = useUserStore((state) => state.userInfo as LoginResponse);
  const treasureModalRef = useRef<TreasureModalRef>(null);
  const [showShare, setShowShare] = useState(false);
  const [inviteCount, setInviteCount] = useState(0);
  const { dealTreasures } = useGetMissionData();
  const [userTreasures, setUserTreasure] = useState<InviteTreasureType[]>([]);
  const [targets, setTargets] = useState<number[]>([]);
  const openChest = (id: string) => {
    treasureModalRef.current?.open({
      treasureId: id,
      digCallback: () => {
        run();
      }
    });
  };

  const { run } = useRequest(
    async () => {
      const res = await webApi.missionCenterApi.getInvited();
      return res;
    },
    {
      onSuccess(res) {
        const treasures = cloneDeep(res.treasures);
        setUserTreasure(dealTreasures(treasures));
        setInviteCount(res.inviteCount ?? 0);
        setTargets(res.targets);
      }
    }
  );
  return (
    <div className="flex flex-col gap-[24px] rounded-[16px] border border-neutral-light-gray bg-neutral-white p-[24px]">
      <div>
        <div className="text-h4  text-neutral-off-black">{t('referEarn')}</div>
        <div className="body-s text-neutral-medium-gray">{t('inviteTogether')}</div>
      </div>
      <div>
        <div className="body-s-bold flex items-center justify-between text-neutral-off-black">
          <p className="">{t('referralCode')}</p>
          <div>
            <span>{inviteCount}</span>
            {` `}
            <span className="body-s text-neutral-medium-gray">{t('usersInvited')}</span>
          </div>
        </div>
        <div className="body-s mt-[8px] flex h-[46px] items-center justify-between rounded-[50px] bg-neutral-off-white px-[15px] text-neutral-off-black">
          <span>{userInfo?.inviteCode}</span>
          <div className="flex h-full items-center gap-[12px]">
            <div className="flex cursor-pointer items-center gap-[8px]" onClick={() => copyText(userInfo?.inviteCode)}>
              <LuCopy />
              <span>{t('copy')}</span>
            </div>
            <div
              tabIndex={1}
              className="relative flex  h-full cursor-pointer items-center gap-[8px]"
              onClick={() => setShowShare(!showShare)}
              onBlur={() =>
                setTimeout(() => {
                  setShowShare(false);
                }, 500)
              }
            >
              <MdOutlineShare />
              <span>{t('share')}</span>
              {showShare && (
                <PopBox className="left-[-100px] top-[-245px]">
                  {shareList(userInfo?.inviteCode || '').map((item) => {
                    return (
                      <ShareWrap
                        key={item.name}
                        name={item.name}
                        component={item.component}
                        icon={item.icon}
                        props={item.props}
                      ></ShareWrap>
                    );
                  })}
                </PopBox>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex justify-between">
        <div className="absolute top-[16px] w-full border-b border-dashed border-neutral-medium-gray"></div>
        {userTreasures.map((m, i) => (
          <div key={m.id} className="relative z-[2] w-[32px]">
            <div
              className={`flex-center h-[32px]  w-[32px] rounded-[50%] ${m.status === TreasureStatus.UNOBTAIN && 'border border-neutral-light-gray bg-neutral-white'}`}
            >
              {m.status === TreasureStatus.UNOPEN && (
                <Image
                  src={ChestCover}
                  alt={'chest-cover'}
                  width={32}
                  height={26}
                  onClick={() => openChest(m.id)}
                  className="animate-bounce cursor-pointer transition-all"
                />
              )}
              {m.status === TreasureStatus.OPENED && <CompletedIcon size={32} />}
            </div>
            <p className="body-xs mt-[4px] text-center text-neutral-medium-gray">{targets?.[i] ?? 0}</p>
          </div>
        ))}
      </div>
      <TreasureModal ref={treasureModalRef} />
    </div>
  );
};

export default ReferEarn;
