'use client';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { HackathonType, HackathonTypeVotesRoleType } from '@/service/webApi/resourceStation/type';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import CountDown from '@/components/Web/Business/CountDown';
import { LuChevronRight } from 'react-icons/lu';
import { MdOutlineRefresh } from 'react-icons/md';
import RoleUserIcon from '@/components/Common/Icon/RoleUser';
import RoleAdvocateIcon from '@/components/Common/Icon/RoleAdvocate';
import RoleJugleIcon from '@/components/Common/Icon/RoleJugle';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { HackathonVoteContext } from '../../../../constants/type';
import { decimalCountPercent } from '@/helper/utils';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import dayjs from '@/components/Common/Dayjs';
import message from 'antd/es/message';
import Box from '../Box';

interface HackathonInfoProp {
  hackathon: HackathonType;
}

const HackathonInfo: React.FC<HackathonInfoProp> = ({ hackathon }) => {
  const { userInfo, setAuthModalOpen, setAuthType } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen,
      setAuthType: state.setAuthType
    }))
  );
  const { lang } = useContext(LangContext);
  const { initProjects, voteData, setVoteData } = useContext(HackathonVoteContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [loading, setLoading] = useState(false);
  const isCanSubmit = useMemo(() => {
    const isReview = dayjs().tz().isBefore(hackathon.timeline?.rewardTime);
    return voteData.reduce((pre, cur) => pre + cur.vote, 0) && isReview;
  }, [voteData]);
  const votesPercent = useMemo(() => {
    const vote = {
      [HackathonTypeVotesRoleType.USER]: hackathon.votes[HackathonTypeVotesRoleType.USER] || 0,
      [HackathonTypeVotesRoleType.ADVOCATE]: hackathon.votes[HackathonTypeVotesRoleType.ADVOCATE] || 0,
      [HackathonTypeVotesRoleType.JUDGE]: hackathon.votes[HackathonTypeVotesRoleType.JUDGE] || 0
    };
    const total = Object.keys(vote).reduce((pre, key) => vote[key as HackathonTypeVotesRoleType] + pre, 0);
    return {
      [HackathonTypeVotesRoleType.USER]: decimalCountPercent(vote[HackathonTypeVotesRoleType.USER] / total, 2),
      [HackathonTypeVotesRoleType.ADVOCATE]: decimalCountPercent(vote[HackathonTypeVotesRoleType.ADVOCATE] / total, 2),
      [HackathonTypeVotesRoleType.JUDGE]: decimalCountPercent(vote[HackathonTypeVotesRoleType.JUDGE] / total, 2)
    };
  }, [hackathon]);

  const handleSubmit = () => {
    if (!userInfo) {
      setAuthType(AuthType.LOGIN);
      setAuthModalOpen(true);
      return;
    }
    if (!isCanSubmit) return;
    const submitData = voteData.filter((v) => v.vote);
    setLoading(true);
    webApi.resourceStationApi
      .hackathonVoteSubmit(hackathon.id, submitData)
      .then(() => {
        message.success('success');
        window.location.reload();
      })
      .catch((err) => {
        errorMessage(err);
        setLoading(false);
      });
  };

  function handleBeforeUnload(event: BeforeUnloadEvent) {
    isCanSubmit && event.preventDefault();
  }
  useEffect(() => {
    // 监听离开页面的事件
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      // 组件卸载时移除事件监听
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isCanSubmit]);

  return (
    <Box className="sticky right-0 top-[40px] flex flex-col  gap-[24px] p-[24px] pb-[20px] text-neutral-off-black">
      <Link href={`${MenuLink.EXPLORE_HACKATHON}/${hackathon.alias}`} className="flex items-center justify-between">
        <h1 className="text-h3 ">{hackathon.name}</h1>
        <LuChevronRight size={40} />
      </Link>
      <div className="body-l-bold w-fit rounded-[8px] border-[2px] border-status-success-dark px-[12px] py-[4px] uppercase text-status-success-dark">
        {t('hackathonVoting.submissionsReview')}
      </div>
      <div>
        <div className="body-m mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.votingCloseIn')}</div>
        <CountDown time={hackathon.timeline?.rewardTime} />
      </div>
      {initProjects?.length > 0 && (
        <div>
          <div className="body-m mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.votingProjects')}</div>
          <div className="flex items-center gap-[8px]">
            <div className="flex pl-[10px]">
              {initProjects.slice(0, 6)?.map((v, i) => (
                <div
                  key={i}
                  className="relative ml-[-10px] h-[42px] w-[42px] overflow-hidden rounded-[50%] border border-neutral-white"
                >
                  <Image src={v.logo} alt={v.name} fill className="object-contain"></Image>
                </div>
              ))}
            </div>

            <p className="body-m">{`${initProjects.length} ${t('navbar.learn.projects')}`}</p>
          </div>
        </div>
      )}

      {userInfo && hackathon.participation && (
        <>
          <div>
            <div className="body-m mb-[4px] text-neutral-medium-gray">{t('hackathonVoting.yourVotingRole')}</div>
            <div className="flex gap-[12px]">
              <div
                className={`flex flex-1 flex-col items-center gap-[8px] rounded-[8px] border px-[8px] py-[6px] ${hackathon.participation.voteRole === HackathonTypeVotesRoleType.USER ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
              >
                <div className="body-m flex items-center gap-[8px]">
                  <RoleUserIcon
                    color={
                      hackathon.participation.voteRole === HackathonTypeVotesRoleType.USER
                        ? 'black'
                        : 'var(--neutral-rich-gray)'
                    }
                  />
                  {t('hackathonVoting.user')}
                </div>
                <div className={`caption-12pt text-neutral-rich-gray`}>
                  {votesPercent[HackathonTypeVotesRoleType.USER]} {t('hackathonVoting.votes')}
                </div>
              </div>
              <div
                className={`flex flex-1 flex-col items-center gap-[8px] rounded-[8px] border px-[8px] py-[6px] ${hackathon.participation.voteRole === HackathonTypeVotesRoleType.ADVOCATE ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
              >
                <div className="body-m flex items-center gap-[8px]">
                  <RoleAdvocateIcon
                    color={
                      hackathon.participation.voteRole === HackathonTypeVotesRoleType.ADVOCATE
                        ? 'black'
                        : 'var(--neutral-rich-gray)'
                    }
                  />
                  {t('hackathonVoting.advocate')}
                </div>
                <div className={`caption-12pt text-neutral-rich-gray`}>
                  {votesPercent[HackathonTypeVotesRoleType.ADVOCATE]} {t('hackathonVoting.votes')}
                </div>
              </div>
              <div
                className={`flex flex-1 flex-col items-center gap-[8px] rounded-[8px] border px-[8px] py-[6px] ${hackathon.participation.voteRole === HackathonTypeVotesRoleType.JUDGE ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
              >
                <div className="body-m flex items-center gap-[8px]">
                  <RoleJugleIcon
                    color={
                      hackathon.participation.voteRole === HackathonTypeVotesRoleType.JUDGE
                        ? 'black'
                        : 'var(--neutral-rich-gray)'
                    }
                  />
                  {t('hackathonVoting.judge')}
                </div>
                <div className={`caption-12pt text-neutral-rich-gray`}>
                  {votesPercent[HackathonTypeVotesRoleType.JUDGE]} {t('hackathonVoting.votes')}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-[4px] flex items-center justify-between ">
              <div className="body-m text-neutral-medium-gray">{t('hackathonVoting.yourVotesToday')}</div>
              <div className="body-xs text-neutral-medium-gray">{t('hackathonVoting.refreshEveryday')}</div>
            </div>
            <div className="my-[4px] flex rounded-[8px] bg-yellow-extra-light px-[24px] py-[16px]">
              <div className="flex-1 border-r border-neutral-light-gray text-center">
                <p className="body-xl-bold text-neutral-off-black">{hackathon.participation.remainingVote}</p>
                <p className="body-s text-neutral-medium-gray">{t('hackathonVoting.remainingVotes')}</p>
              </div>
              <div className="flex-1 text-center">
                <p className="body-xl-bold text-neutral-off-black">{hackathon.participation.totalVote}</p>
                <p className="body-s text-neutral-medium-gray">{t('hackathonVoting.totalVotes')}</p>
              </div>
            </div>
            <p className="body-s pt-[10px] text-neutral-medium-gray">{t('hackathonVoting.voteTips')}</p>
          </div>
        </>
      )}

      <div className="flex gap-[16px]">
        <div
          className={`flex-center h-[48px] w-[48px] rounded-[50%] border transition-all ${isCanSubmit ? 'cursor-pointer border-neutral-black bg-transparent text-neutral-black hover:scale-[1.1]' : 'cursor-not-allowed border-neutral-light-gray bg-neutral-light-gray text-neutral-medium-gray'}`}
          onClick={() => setVoteData([])}
        >
          <MdOutlineRefresh size={24} />
        </div>
        <Button
          loading={loading}
          className={`button-text-m h-[48px] flex-1 uppercase ${isCanSubmit ? 'bg-yellow-primary text-neutral-off-black' : 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray hover:scale-[1]'}`}
          onClick={() => {
            if (!isCanSubmit) return;
            handleSubmit();
          }}
        >
          {t('hackathonVoting.confirmVote')}
        </Button>
      </div>
    </Box>
  );
};

export default HackathonInfo;
