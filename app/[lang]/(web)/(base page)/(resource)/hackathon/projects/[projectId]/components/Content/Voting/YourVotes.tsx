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
import message from 'antd/es/message';

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
      <p className="body-s mb-[4px] text-neutral-medium-gray">{`${t('hackathonVoting.yourVotes')} for ${project.name}`}</p>
      <div className="rounded-[8px] bg-neutral-white p-[24px] text-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)]">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="mb-[12px] flex w-full items-center gap-[24px]">
            <div className={`flex w-[32px] justify-center`}>
              <div
                className={`relative h-[20px] w-[20px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[2px]`}
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
              className={`body-xs flex h-[46px] flex-1 items-center overflow-hidden rounded-[8px] border border-neutral-light-gray bg-neutral-white`}
            >
              <input
                className={`body-s w-full text-center  outline-none `}
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
            <div className={`flex w-[32px] justify-center`}>
              <div
                className={`relative h-[20px] w-[20px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[2px]`}
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
              className={`underline-s w-[32px] cursor-pointer text-center uppercase`}
              onClick={() => {
                if (!remainingVotes && !voteCount) return;
                handleCount(1, true);
              }}
            >
              {t('min')}
            </span>
            <p className={`body-s flex-1 text-center text-neutral-medium-gray `}>{t('hackathonVoting.youVoted')}</p>
            <span
              className={`underline-s w-[32px] cursor-pointer text-center uppercase`}
              onClick={() => {
                handleCount(remainingVotes + voteCount, true);
              }}
            >
              {t('max')}
            </span>
          </div>
        </div>
        <div className="mt-[12px] flex gap-[8px]">
          <div
            className={`flex-center h-[48px] w-[48px] rounded-[50%] border transition-all ${voteCount ? 'cursor-pointer border-neutral-black bg-transparent text-neutral-black hover:scale-[1.1]' : 'cursor-not-allowed border-neutral-light-gray bg-neutral-light-gray text-neutral-medium-gray'}`}
            onClick={() => setVoteCount(0)}
          >
            <MdOutlineRefresh size={24} />
          </div>
          <Button
            loading={loading}
            className={`button-text-m h-[48px] flex-1 uppercase ${voteCount ? 'bg-yellow-primary text-neutral-off-black' : 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray hover:scale-[1]'}`}
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
