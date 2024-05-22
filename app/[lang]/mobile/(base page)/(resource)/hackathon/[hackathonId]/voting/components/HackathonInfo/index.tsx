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
import RoleAdvocateIcon from '@/components/Common/Icon/RoleAdvocate';
import RoleJugleIcon from '@/components/Common/Icon/RoleJugle';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { HackathonVoteContext, ViewValue } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { decimalCount } from '@/helper/utils';
import webApi from '@/service';
import { message } from 'antd';
import { errorMessage } from '@/helper/ui';

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
  const { initProjects, voteData, setVoteData, view } = useContext(HackathonVoteContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [loading, setLoading] = useState(false);
  const isCanSubmit = useMemo(() => {
    return voteData.reduce((pre, cur) => pre + cur.vote, 0);
  }, [voteData]);
  const votesPercent = useMemo(() => {
    const vote = {
      [HackathonTypeVotesRoleType.USER]: hackathon.votes[HackathonTypeVotesRoleType.USER] || 0,
      [HackathonTypeVotesRoleType.ADVOCATE]: hackathon.votes[HackathonTypeVotesRoleType.ADVOCATE] || 0,
      [HackathonTypeVotesRoleType.JUDGE]: hackathon.votes[HackathonTypeVotesRoleType.JUDGE] || 0
    };
    const total = Object.keys(vote).reduce((pre, key) => vote[key as HackathonTypeVotesRoleType] + pre, 0);
    return {
      [HackathonTypeVotesRoleType.USER]: decimalCount(vote[HackathonTypeVotesRoleType.USER] / total, 4) * 100 + '%',
      [HackathonTypeVotesRoleType.ADVOCATE]:
        decimalCount(vote[HackathonTypeVotesRoleType.ADVOCATE] / total, 4) * 100 + '%',
      [HackathonTypeVotesRoleType.JUDGE]: decimalCount(vote[HackathonTypeVotesRoleType.JUDGE] / total, 4) * 100 + '%'
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

  return (
    <div className="mt-[-2rem]  flex flex-col  gap-[1.25rem] text-neutral-off-black">
      <Link
        href={`${MenuLink.HACKATHON}/${hackathon.id}`}
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
        <CountDown time={hackathon.rewardTime} countItemClassName={'bg-neutral-white'} />
      </div>
      {initProjects?.length > 0 && (
        <div>
          <div className="body-s mb-[.25rem] text-neutral-medium-gray">{t('hackathonVoting.votingProjects')}</div>
          <div className="flex items-center gap-[.5rem]">
            <div className="flex pl-[10px]">
              {initProjects.slice(0, 6)?.map((v, i) => (
                <div
                  key={i}
                  className="relative ml-[-10px] h-[42px] w-[42px] overflow-hidden rounded-[50%] border border-neutral-white"
                >
                  <Image src={v.thumbnail} alt={v.name} fill className="object-contain"></Image>
                </div>
              ))}
            </div>

            <p className="body-s">{`${initProjects.length} ${t('navbar.learn.projects')}`}</p>
          </div>
        </div>
      )}

      {userInfo && hackathon.participation && (
        <>
          <div>
            <div className="body-s mb-[.25rem] text-neutral-medium-gray">{t('hackathonVoting.yourVotingRole')}</div>
            <div className="flex gap-[.75rem]">
              <div
                className={`flex flex-1 flex-col items-center gap-[.25rem] rounded-[.5rem] border px-[.5rem] py-[.375rem] ${hackathon.participation.voteRole === HackathonTypeVotesRoleType.USER ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
              >
                <div className="body-s flex items-center">
                  <RoleUserIcon
                    color={
                      hackathon.participation.voteRole === HackathonTypeVotesRoleType.USER
                        ? 'black'
                        : 'var(--neutral-rich-gray)'
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
                className={`flex flex-1 flex-col items-center gap-[.25rem] rounded-[.5rem] border px-[.5rem] py-[.375rem] ${hackathon.participation.voteRole === HackathonTypeVotesRoleType.ADVOCATE ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
              >
                <div className="body-s flex items-center">
                  <RoleAdvocateIcon
                    color={
                      hackathon.participation.voteRole === HackathonTypeVotesRoleType.ADVOCATE
                        ? 'black'
                        : 'var(--neutral-rich-gray)'
                    }
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p>{t('hackathonVoting.advocate')}</p>
                  <div className={`caption-10pt text-neutral-rich-gray`}>
                    {votesPercent[HackathonTypeVotesRoleType.ADVOCATE]} {t('hackathonVoting.votes')}
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-1 flex-col items-center gap-[.25rem] rounded-[.5rem] border px-[.5rem] py-[.375rem] ${hackathon.participation.voteRole === HackathonTypeVotesRoleType.JUDGE ? 'border-neutral-off-black text-neutral-off-black' : 'border-neutral-light-gray bg-neutral-light-gray text-neutral-rich-gray opacity-[0.3]'}`}
              >
                <div className="body-s flex items-center">
                  <RoleJugleIcon
                    color={
                      hackathon.participation.voteRole === HackathonTypeVotesRoleType.JUDGE
                        ? 'black'
                        : 'var(--neutral-rich-gray)'
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
              <div className="caption-10pt text-neutral-medium-gray">{t('hackathonVoting.refreshEveryday')}</div>
            </div>
            <div className={`my-[.25rem] flex rounded-[8px] bg-yellow-extra-light px-[1.5rem] py-[.5rem]`}>
              <div className="flex-1 border-r border-neutral-light-gray text-center">
                <p className="body-l-bold text-neutral-off-black">{hackathon.participation.remainingVote}</p>
                <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.remainingVotes')}</p>
              </div>
              <div className="flex-1 text-center">
                <p className="body-l-bold text-neutral-off-black">{hackathon.participation.totalVote}</p>
                <p className="caption-12pt text-neutral-medium-gray">{t('hackathonVoting.totalVotes')}</p>
              </div>
            </div>
            <p className="body-xs pt-[.625rem] text-neutral-medium-gray">{t('hackathonVoting.voteTips')}</p>
          </div>
        </>
      )}

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
    </div>
  );
};

export default HackathonInfo;
