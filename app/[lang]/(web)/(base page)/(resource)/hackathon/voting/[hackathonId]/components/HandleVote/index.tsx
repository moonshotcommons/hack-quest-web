import React, { useContext, useMemo } from 'react';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import Image from 'next/image';
import ArrowUp from '@/public/images/hackathon/arrow_up.svg';
import ArrowUpActive from '@/public/images/hackathon/arrow_up_active.svg';
import ArrowDown from '@/public/images/hackathon/arrow_down.svg';
import ArrowDownActive from '@/public/images/hackathon/arrow_down_active.svg';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { cloneDeep } from 'lodash-es';
import { isMobile } from 'react-device-detect';
import { HackathonVoteContext, ViewValue } from '../../../../constants/type';
import VoteTickIcon from '@/components/Web/Business/VoteTickIcon';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { NavType } from '@/components/Mobile/MobLayout/constant';
interface HandleVoteProp {
  view: ViewValue;
  project: ProjectType;
}

const HandleVote: React.FC<HandleVoteProp> = ({ view, project }) => {
  const { userInfo, setAuthModalOpen, setAuthType } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen,
      setAuthType: state.setAuthType
    }))
  );
  const { mobileNavModalToggleOpenHandle } = useGlobalStore(
    useShallow((state) => ({
      mobileNavModalToggleOpenHandle: state.mobileNavModalToggleOpenHandle
    }))
  );
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setVoteData, voteData, remainingVotes, judgeInfo } = useContext(HackathonVoteContext);
  const isShowTick = useMemo(() => {
    return judgeInfo?.judge?.judgeMode === 'judges' && judgeInfo?.judge?.voteMode === 'score';
  }, [judgeInfo]);

  const voteCount = useMemo(() => {
    return voteData.find((v) => v.projectId === project.id)?.vote || 0;
  }, [voteData, project]);

  const otherCount = useMemo(() => {
    const otherVotes = voteData.filter((v) => v.projectId !== project.id);
    return otherVotes.reduce((pre, cur) => pre + cur.vote, 0);
  }, [voteData, project]);
  const remainingCount = useMemo(() => {
    const projectLeftVote = project?.projectLeftVote || 0;
    const remaining = remainingVotes - otherCount;
    const remainCount = judgeInfo?.judge?.voteMode === 'fixed' ? Math.min(remaining, projectLeftVote) : projectLeftVote;
    return remainCount - voteCount < 0 ? 0 : remainCount - voteCount;
  }, [otherCount, project, judgeInfo, voteCount, remainingVotes]);

  const openLoginModal = () => {
    if (isMobile) {
      mobileNavModalToggleOpenHandle.setNavType(NavType.AUTH);
      mobileNavModalToggleOpenHandle.toggleOpen();
    } else {
      setAuthType(AuthType.LOGIN);
      setAuthModalOpen(true);
    }
  };
  const handleCount = (count: number, set?: boolean) => {
    if (!userInfo) {
      openLoginModal();
      return;
    }
    const c = set ? count : voteCount + count;
    changeVote(c);
  };

  const changeVote = (count: number) => {
    const index = voteData.findIndex((v) => v.projectId === project?.id);
    if (index < 0) {
      const voteInfo = {
        vote: count,
        projectId: project?.id
      };
      setVoteData([...voteData, voteInfo]);
    } else {
      const newVoteData = cloneDeep(voteData);
      newVoteData[index].vote = count;
      setVoteData(newVoteData);
    }
  };

  return (
    <div
      className={`flex h-full w-full flex-col gap-[.25rem] ${!userInfo && 'cursor-pointer'}`}
      onClick={() => {
        if (!userInfo) {
          openLoginModal();
        }
      }}
    >
      {isShowTick && (
        <div className="flex flex-wrap gap-[.25rem]">
          {project?.judgesVoteStats?.map((v) => (
            <VoteTickIcon key={v.userId} type={v.vote === 0 ? 'notVoted' : v.isMe ? 'self' : 'other'} />
          ))}
        </div>
      )}
      <div
        className={`flex h-full w-full flex-1 flex-col justify-between rounded-[.5rem] bg-neutral-off-white p-[.75rem] ${!userInfo && 'pointer-events-none'}`}
      >
        <div className="flex w-full items-center gap-[1.5rem]">
          <div className={`flex justify-center ${view === ViewValue.AGENDA ? 'w-[2rem]' : 'w-[1.4375rem]'}`}>
            <div
              className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[2px] ${view === ViewValue.AGENDA ? 'h-[1.25rem] w-[1.25rem]' : 'h-[.875rem] w-[.875rem]'} ${!voteCount ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => {
                if (!voteCount) return;
                handleCount(-1);
              }}
            >
              <Image
                src={voteCount > 0 ? ArrowDownActive : ArrowDown}
                fill
                alt={'handle-up'}
                className="object-cover"
              />
            </div>
          </div>

          <div
            className={`flex flex-1 items-center overflow-hidden rounded-[.5rem] border border-neutral-light-gray bg-neutral-white ${view === ViewValue.AGENDA ? 'body-s h-[2.875rem]' : 'body-xs h-[1.6875rem]'}`}
          >
            <input
              className={`w-full text-center  outline-none `}
              value={voteCount}
              onChange={(e) => {
                let value = e.target.value;
                // 使用正则表达式匹配输入的值，判断是否为非负整数
                if (!/^\d*$/.test(value)) return;
                let v = value === '' ? '' : Number(value);
                if ((v as number) > remainingCount + voteCount) v = remainingCount + voteCount;
                changeVote(v as number);
              }}
              onBlur={(e) => {
                if (!e.target.value) {
                  changeVote(0);
                }
              }}
            />
          </div>
          <div className={`flex justify-center ${view === ViewValue.AGENDA ? 'w-[2rem]' : 'w-[1.4375rem]'}`}>
            <div
              className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[.125rem] ${view === ViewValue.AGENDA ? 'h-[1.25rem] w-[1.25rem]' : 'h-[.875rem] w-[.875rem]'}`}
              onClick={() => {
                if (!remainingCount) return;
                handleCount(1);
              }}
            >
              <Image src={!remainingCount ? ArrowUp : ArrowUpActive} fill alt={'handle-up'} className="object-cover" />
            </div>
          </div>
        </div>
        <div className="flex items-center text-neutral-off-black">
          <span
            className={`cursor-pointer text-center uppercase ${view === ViewValue.AGENDA ? 'underline-s w-[2rem]' : 'caption-10pt w-[1.4375rem] underline'}`}
            onClick={() => {
              if (!remainingCount && !voteCount) return;
              handleCount(1, true);
            }}
          >
            {t('min')}
          </span>
          <p
            className={`flex-1 text-center text-neutral-medium-gray ${view === ViewValue.AGENDA ? 'body-s ' : 'caption-10pt '}`}
          >
            {t('hackathonVoting.youVoted')}
          </p>
          <span
            className={`cursor-pointer text-center uppercase ${view === ViewValue.AGENDA ? 'underline-s w-[2rem]' : 'caption-10pt w-[1.4375rem] underline'}`}
            onClick={() => {
              if (!remainingCount) return;
              handleCount(remainingCount + voteCount, true);
            }}
          >
            {t('max')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HandleVote;
