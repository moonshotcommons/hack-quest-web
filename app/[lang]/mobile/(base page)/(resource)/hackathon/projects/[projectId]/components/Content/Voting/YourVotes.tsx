import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useMemo, useState } from 'react';
import Image from 'next/image';
import ArrowUp from '@/public/images/hackathon/arrow_up.svg';
import ArrowUpActive from '@/public/images/hackathon/arrow_up_active.svg';
import ArrowDown from '@/public/images/hackathon/arrow_down.svg';
import ArrowDownActive from '@/public/images/hackathon/arrow_down_active.svg';
import { MdOutlineRefresh } from 'react-icons/md';
import Button from '@/components/Common/Button';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { message } from 'antd';

interface YourVotesProp {
  project: ProjectType;
  hackathon: HackathonType;
}

const YourVotes: React.FC<YourVotesProp> = ({ project, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [voteCount, setVoteCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const remainingVotes = useMemo(() => {
    const remaining = hackathon?.participation?.remainingVote || 50;
    return remaining - voteCount;
  }, [voteCount]);
  const handleCount = (count: number, set?: boolean) => {
    const c = set ? count : voteCount + count;
    setVoteCount(c);
  };
  const handleSubmit = () => {
    setLoading(true);
    webApi.resourceStationApi
      .hackathonVoteSubmit(hackathon.id, [
        {
          projectId: project.id,
          vote: voteCount
        }
      ])
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
    <div className="">
      <p className="body-s mb-[.25rem] text-neutral-medium-gray">{`${t('hackathonVoting.yourVotes')} for ${project.name}`}</p>
      <div className="rounded-[.5rem] bg-neutral-white p-[.75rem] text-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="mb-[.75rem] flex w-full items-center gap-[24px]">
            <div className={`flex w-[2rem] justify-center`}>
              <div
                className={`relative h-[1.25rem] w-[1.25rem] flex-shrink-0 cursor-pointer overflow-hidden rounded-[.125rem]`}
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
              className={`body-xs flex h-[2.875rem] flex-1 items-center overflow-hidden rounded-[.5rem] border border-neutral-light-gray bg-neutral-white`}
            >
              <input
                className={`body-m w-full  text-center  outline-none `}
                value={voteCount}
                onChange={(e) => {
                  let value = e.target.value;
                  // 使用正则表达式匹配输入的值，判断是否为非负整数
                  if (!/^\d*$/.test(value)) return;
                  let v = value === '' ? '' : Number(value);
                  if ((v as number) > remainingVotes + voteCount) v = remainingVotes + voteCount;
                  setVoteCount(v as number);
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setVoteCount(0);
                  }
                }}
              />
            </div>
            <div className={`flex w-[2rem] justify-center`}>
              <div
                className={`relative h-[1.25rem] w-[1.25rem] flex-shrink-0 cursor-pointer overflow-hidden rounded-[.125rem]`}
                onClick={() => {
                  if (!remainingVotes) return;
                  handleCount(1);
                }}
              >
                <Image
                  src={!remainingVotes ? ArrowUp : ArrowUpActive}
                  fill
                  alt={'handle-up'}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center text-neutral-off-black">
            <span
              className={`underline-s w-[2rem] cursor-pointer text-center uppercase`}
              onClick={() => {
                if (!remainingVotes && !voteCount) return;
                handleCount(1, true);
              }}
            >
              {t('min')}
            </span>
            <p className={`body-s flex-1 text-center text-neutral-medium-gray `}>{t('hackathonVoting.youVoted')}</p>
            <span
              className={`underline-s w-[2rem] cursor-pointer text-center uppercase`}
              onClick={() => {
                handleCount(remainingVotes + voteCount, true);
              }}
            >
              {t('max')}
            </span>
          </div>
        </div>
        <div className="mt-[.75rem] flex gap-[.5rem]">
          <div
            className={`flex-center h-[3rem] w-[3rem] rounded-[50%] border transition-all ${voteCount ? 'cursor-pointer border-neutral-black bg-transparent text-neutral-black hover:scale-[1.1]' : 'cursor-not-allowed border-neutral-light-gray bg-neutral-light-gray text-neutral-medium-gray'}`}
            onClick={() => setVoteCount(0)}
          >
            <MdOutlineRefresh size={24} />
          </div>
          <Button
            loading={loading}
            className={`button-text-m h-[3rem] flex-1 uppercase ${voteCount ? 'bg-yellow-primary text-neutral-off-black' : 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray hover:scale-[1]'}`}
            onClick={() => {
              if (!voteCount) return;
              handleSubmit();
            }}
          >
            {t('hackathonVoting.confirmVote')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YourVotes;
