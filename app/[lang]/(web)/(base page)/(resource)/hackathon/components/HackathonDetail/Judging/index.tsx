import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import BaseImage from '@/components/Common/BaseImage';
import { HackathonEditModalType } from '../../../constants/type';
import { judgeModeLabel, voteModeLabel } from '../../../constants/data';
import { InfoIcon } from 'lucide-react';

interface DetailJugingProp {
  hackathon: HackathonType;
}

const DetailJuging: React.FC<DetailJugingProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  console.log(hackathon.judge);
  return (
    <EditBox
      title={'hackathonDetail.judge'}
      type={HackathonEditModalType.JUDGE}
      className="flex flex-col gap-[24px] rounded-[0] border-none bg-transparent p-0"
    >
      {hackathon.judge?.map((judge, i) => (
        <div
          className="body-m flex flex-col gap-[24px] overflow-hidden rounded-[24px] border border-neutral-light-gray bg-neutral-white p-[20px]"
          key={i}
        >
          <div className="body-l-bold text-neutral-rich-gray">{judge?.rewardName}</div>
          {judge?.disableJudge ? (
            <div className="flex items-center justify-center gap-1 rounded-2xl bg-neutral-off-white p-4 text-sm text-neutral-medium-gray">
              <InfoIcon size={16} />
              <span>HackQuest voting and judging system will not be applied to this track.</span>
            </div>
          ) : (
            <>
              <div>
                <p className="text-neutral-medium-gray">{t('hackathonDetail.judgingCriteria')}</p>
                <div className="mt-[4px] whitespace-pre-line text-neutral-rich-gray">
                  {judge?.criteria?.replaceAll('\\n', '\n')}
                </div>
              </div>
              <div className="flex flex-wrap gap-x-[80px] gap-y-[24px]">
                {judge?.judgeMode && (
                  <div>
                    <p className="text-neutral-medium-gray">{'Judging Mode'}</p>
                    <p className="mt-[4px] text-neutral-off-black">
                      {judgeModeLabel[judge.judgeMode as keyof typeof judgeModeLabel] || ''}
                    </p>
                  </div>
                )}
                {judge?.voteMode && (
                  <div>
                    <p className="text-neutral-medium-gray">{'Voting Mode'}</p>
                    <p className="mt-[4px] text-neutral-off-black">
                      {voteModeLabel[judge.voteMode as keyof typeof voteModeLabel] || ''}
                    </p>
                  </div>
                )}

                {judge?.judgeTotalVote > 0 && (
                  <div>
                    <p className="text-neutral-medium-gray">{'Each Judge’s Votes'}</p>
                    <p className="mt-[4px] text-neutral-off-black">{judge.judgeTotalVote}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-x-[80px] gap-y-[24px]">
                {judge?.judgeProjectVote > 0 && (
                  <div>
                    <p className="text-neutral-medium-gray">{'MAX Votes Per Project Per User/Judge'}</p>
                    <p className="mt-[4px] text-neutral-off-black">{judge.judgeProjectVote}</p>
                  </div>
                )}

                {judge?.votesProportion?.[0] > 0 && (
                  <div>
                    <p className="text-neutral-medium-gray">{t('hackathonDetail.totalUserVotes')}</p>
                    <p className="mt-[4px] text-neutral-off-black">{`${judge?.votesProportion?.[0] ?? 0}%`}</p>
                  </div>
                )}
                {judge?.votesProportion?.[1] > 0 && (
                  <div>
                    <p className="text-neutral-medium-gray">{t('hackathonDetail.totalJudgeVotes')}</p>
                    <p className="mt-[4px] text-neutral-off-black">{`${judge?.votesProportion?.[1] ?? 0}%`}</p>
                  </div>
                )}

                {judge.projectJudgeCount > 0 && (
                  <div>
                    <p className="text-neutral-medium-gray">{'Judges Needed for Each Project'}</p>
                    <p className="mt-[4px] text-neutral-off-black">{judge.projectJudgeCount}</p>
                  </div>
                )}
              </div>
              {judge?.judgeAccounts?.length > 0 && (
                <div>
                  <p className="text-neutral-medium-gray">{t('hackathonDetail.judgingAccounts')}</p>
                  <div className="body-m mt-[4px] flex flex-wrap gap-x-[40px] gap-y-[12px] text-neutral-off-black">
                    {judge?.judgeAccounts?.map((v, i) => (
                      <div key={i} className="flex items-center gap-[12px]">
                        <BaseImage src={v.avatar} alt={v.nickname} className="h-[50px] w-[50px] rounded-[50%]" />
                        <span>{v.nickname}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </EditBox>
  );
};

export default DetailJuging;
