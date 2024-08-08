'use client';
import React, { useContext, useMemo, useState } from 'react';
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
import RoleJugleIcon from '@/components/Common/Icon/RoleJugle';
import { useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { HackathonVoteContext, ViewValue } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { decimalCountPercent } from '@/helper/utils';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import message from 'antd/es/message';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { NavType } from '@/components/Mobile/MobLayout/constant';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface HackathonInfoProp {
  hackathon: HackathonType;
}

const HackathonInfo: React.FC<HackathonInfoProp> = ({ hackathon }) => {
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  const { mobileNavModalToggleOpenHandle } = useGlobalStore(
    useShallow((state) => ({
      mobileNavModalToggleOpenHandle: state.mobileNavModalToggleOpenHandle
    }))
  );
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { voteData, setVoteData, judgeInfo, view, remainingVotes } = useContext(HackathonVoteContext);
  const [loading, setLoading] = useState(false);
  const { getStepIndex } = useDealHackathonData();
  const isCanSubmit = useMemo(() => {
    const isReview = getStepIndex(hackathon) < 2;
    return voteData.reduce((pre, cur) => pre + cur.vote, 0) && isReview;
  }, [voteData, hackathon]);
  const votesPercent = useMemo(() => {
    return {
      [HackathonTypeVotesRoleType.USER]: decimalCountPercent(
        judgeInfo?.roleVoted?.[HackathonTypeVotesRoleType.USER] / judgeInfo.totalVotes,
        2
      ),
      [HackathonTypeVotesRoleType.JUDGE]: decimalCountPercent(
        judgeInfo?.roleVoted?.[HackathonTypeVotesRoleType.JUDGE] / judgeInfo.totalVotes,
        2
      )
    };
  }, [judgeInfo]);

  const handleSubmit = () => {
    if (!userInfo) {
      mobileNavModalToggleOpenHandle.setNavType(NavType.AUTH);
      mobileNavModalToggleOpenHandle.toggleOpen();
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

  return (
    <div className="mt-[-2rem]  flex flex-col  gap-[1.25rem] text-neutral-off-black">
      <Link
        href={`${MenuLink.EXPLORE_HACKATHON}/${hackathon.alias}`}
        className="flex items-center justify-between gap-[1.25rem] rounded-[8px] bg-neutral-white p-[1rem] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
      >
        <h1 className="text-h3-mob ">{hackathon.name}</h1>
        <LuChevronRight size={24} className="flex-shrink-0" />
      </Link>
      <div className="body-s-bold w-fit rounded-[.5rem] border-[.125rem] border-status-success-dark px-[.75rem] py-[.25rem] uppercase text-status-success-dark">
        {t('hackathonVoting.submissionsReview')}
      </div>

      <div>
        <div className="body-s mb-[.25rem] text-neutral-medium-gray">{t('hackathonVoting.votingCloseIn')}</div>
        <CountDown time={hackathon.timeline?.rewardTime} countItemClassName={'bg-neutral-white'} />
      </div>
      {judgeInfo?.projects?.length > 0 && (
        <div>
          <div className="body-s mb-[.25rem] text-neutral-medium-gray">{t('hackathonVoting.votingProjects')}</div>
          <div className="flex items-center gap-[.5rem]">
            <div className="flex pl-[10px]">
              {judgeInfo?.projects.slice(0, 6)?.map((v, i) => (
                <div
                  key={i}
                  className="relative ml-[-10px] h-[42px] w-[42px] overflow-hidden rounded-[50%] border border-neutral-white"
                >
                  <Image src={v.logo} alt={v.name} fill className="object-contain"></Image>
                </div>
              ))}
            </div>

            <p className="body-s">{`${judgeInfo?.projects.length} ${t('navbar.learn.projects')}`}</p>
          </div>
        </div>
      )}
      <div className="body-s flex flex-wrap gap-[1.25rem_2.5rem] text-neutral-off-black">
        <div>
          <p className="text-neutral-medium-gray">Judging Mode</p>
          <p>{judgeInfo?.judge?.judgeMode === 'judges' ? 'Judges Only' : 'Users + Judges'}</p>
        </div>
        <div>
          <p className="text-neutral-medium-gray">Voting Mode</p>
          <p>{judgeInfo?.judge?.voteMode === 'fixed' ? 'Fixed Votes' : 'Project Scoring'}</p>
        </div>
        <div>
          <p className="text-neutral-medium-gray">Voting Track</p>
          <p>{judgeInfo?.judge?.rewardName}</p>
        </div>
      </div>

      {userInfo && judgeInfo?.isJudge && (
        <>
          <div>
            <div className="body-s mb-[.25rem] text-neutral-medium-gray">{t('hackathonVoting.yourVotingRole')}</div>
            <div className="flex gap-[.75rem]">
              <div
                className={`flex flex-1 flex-col items-center gap-[.25rem] rounded-[.5rem] border px-[.5rem] py-[.375rem] ${judgeInfo?.voteRole === HackathonTypeVotesRoleType.USER ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
              >
                <div className="body-s flex items-center">
                  <RoleUserIcon
                    color={
                      judgeInfo?.voteRole === HackathonTypeVotesRoleType.USER ? 'black' : 'var(--neutral-rich-gray)'
                    }
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p>{t('hackathonVoting.user')}</p>
                  <div className={`caption-10pt text-neutral-rich-gray`}>
                    {votesPercent[HackathonTypeVotesRoleType.USER]} {t('hackathonVoting.votes')}
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-1 flex-col items-center gap-[.25rem] rounded-[.5rem] border px-[.5rem] py-[.375rem] ${judgeInfo?.voteRole === HackathonTypeVotesRoleType.JUDGE ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
              >
                <div className="body-s flex items-center">
                  <RoleJugleIcon
                    color={
                      judgeInfo?.voteRole === HackathonTypeVotesRoleType.JUDGE ? 'black' : 'var(--neutral-rich-gray)'
                    }
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p>{t('hackathonVoting.judge')}</p>
                  <div className={`caption-10pt text-neutral-rich-gray`}>
                    {votesPercent[HackathonTypeVotesRoleType.JUDGE]} {t('hackathonVoting.votes')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${view === ViewValue.AGENDA && 'hidden'}`}>
            <div className="mb-[.25rem] flex items-center justify-between ">
              <div className="body-s text-neutral-medium-gray">{t('hackathonVoting.yourVotesToday')}</div>
            </div>
            <div className={`my-[.25rem] flex rounded-[8px] bg-yellow-extra-light px-[1.5rem] py-[.5rem]`}>
              {judgeInfo?.judge?.voteMode === 'fixed' && (
                <div className="flex-1 border-r border-neutral-light-gray text-center">
                  <p className="body-l-bold text-neutral-off-black">{remainingVotes}</p>
                  <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.remainingVotes')}</p>
                </div>
              )}
              {judgeInfo?.judge?.judgeMode === 'judges' && judgeInfo?.judge?.voteMode === 'score' ? (
                <div className="flex-1 text-center">
                  <p className="body-l-bold text-neutral-off-black">{judgeInfo?.judge?.judgeProjectVote}</p>
                  <p className="caption-12pt text-neutral-medium-gray">{'MAX Votes Per Project'}</p>
                </div>
              ) : (
                <div className="flex-1 text-center">
                  <p className="body-l-bold text-neutral-off-black">{judgeInfo?.totalVotes}</p>
                  <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.totalVotes')}</p>
                </div>
              )}
            </div>
            <p className="body-xs pt-[.625rem] text-neutral-medium-gray">{t('hackathonVoting.voteTips')}</p>
          </div>
        </>
      )}

      {judgeInfo?.isJudge && (
        <div
          className={`flex gap-[.75rem] ${view === ViewValue.AGENDA && 'fixed bottom-[2rem] left-[1.25rem] z-[2] w-[calc(100vw-2.5rem)]'}`}
        >
          <div
            className={`flex-center h-[3rem] w-[3rem] rounded-[50%] border transition-all ${isCanSubmit ? 'cursor-pointer border-neutral-black bg-transparent text-neutral-black hover:scale-[1.1]' : 'cursor-not-allowed border-neutral-light-gray bg-neutral-light-gray text-neutral-medium-gray'}`}
            onClick={() => setVoteData([])}
          >
            <MdOutlineRefresh size={24} />
          </div>
          <Button
            loading={loading}
            className={`button-text-m h-[3rem] flex-1 uppercase ${isCanSubmit ? 'bg-yellow-primary text-neutral-off-black' : 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray hover:scale-[1]'}`}
            onClick={() => {
              if (!isCanSubmit) return;
              handleSubmit();
            }}
          >
            {t('hackathonVoting.confirmVote')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default HackathonInfo;
