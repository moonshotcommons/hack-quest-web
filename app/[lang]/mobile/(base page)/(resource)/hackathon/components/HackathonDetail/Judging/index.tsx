import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import BaseImage from '@/components/Common/BaseImage';
import { InfoIcon } from 'lucide-react';
import { judgeModeLabel, voteModeLabel } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/data';
import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import { createEditor } from '@wangeditor/editor';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';

interface DetailJugingProp {
  hackathon: HackathonType;
}

const DetailJuging: React.FC<DetailJugingProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <EditBox
      title={'hackathonDetail.judge'}
      type={HackathonEditModalType.JUDGE}
      className="flex flex-col gap-[24px] rounded-[0] border-none bg-transparent p-0"
    >
      {hackathon.judge?.map((judge, i) => (
        <div
          className="body-s flex flex-col gap-[24px] overflow-hidden rounded-[24px] border border-neutral-light-gray bg-neutral-white p-[20px]"
          key={i}
        >
          <div className="body-l-bold text-neutral-rich-gray">{judge?.rewardName}</div>
          {judge?.disableJudge ? (
            <div className="body-s flex justify-center gap-1 rounded-2xl bg-neutral-off-white p-4 text-neutral-medium-gray">
              <InfoIcon size={16} className="relative top-[.125rem]" />
              <span>HackQuest voting and judging system will not be applied to this track.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-[.75rem]">
              <div className="flex flex-col gap-[.75rem] [&>div]:flex [&>div]:items-center [&>div]:justify-between">
                <div>
                  <p className="text-neutral-medium-gray">{t('hackathonDetail.judgingCriteria')}</p>

                  {judge?.criteria.type === TEXT_EDITOR_TYPE ? (
                    <div
                      className="reset-editor-style-mob mt-[0.25rem] whitespace-pre-line text-neutral-rich-gray"
                      dangerouslySetInnerHTML={{
                        __html: createEditor({ content: judge?.criteria?.content || [] }).getHtml()
                      }}
                    ></div>
                  ) : (
                    <div className="reset-editor-style-mob mt-[4px] whitespace-pre-line text-neutral-rich-gray">
                      {judge?.criteria?.replaceAll('\\n', '\n')}
                    </div>
                  )}
                </div>
                {judge?.judgeMode && (
                  <div>
                    <p className="text-neutral-medium-gray">{'Judging Mode'}</p>
                    <p className="mt-[0.25rem] text-neutral-off-black">
                      {judgeModeLabel[judge.judgeMode as keyof typeof judgeModeLabel] || ''}
                    </p>
                  </div>
                )}
                {judge?.voteMode && (
                  <div>
                    <p className="text-neutral-medium-gray">{'Voting Mode'}</p>
                    <p className="mt-[0.25rem] text-neutral-off-black">
                      {voteModeLabel[judge.voteMode as keyof typeof voteModeLabel] || ''}
                    </p>
                  </div>
                )}

                {judge?.judgeTotalVote > 0 && (
                  <div>
                    <p className="text-neutral-medium-gray">{'Each Judge’s Votes'}</p>
                    <p className="mt-[0.25rem] text-neutral-off-black">{judge.judgeTotalVote}</p>
                  </div>
                )}
                {judge?.judgeProjectVote > 0 && (
                  <div>
                    <p className="text-neutral-medium-gray">{'MAX Votes Per Project Per User/Judge'}</p>
                    <p className="mt-[0.25rem] text-neutral-off-black">{judge.judgeProjectVote}</p>
                  </div>
                )}

                {judge?.votesProportion?.[0] > 0 && (
                  <div>
                    <p className="text-neutral-medium-gray">{t('hackathonDetail.totalUserVotes')}</p>
                    <p className="mt-[0.25rem] text-neutral-off-black">{`${judge?.votesProportion?.[0] ?? 0}%`}</p>
                  </div>
                )}
                {judge?.votesProportion?.[1] > 0 && (
                  <div>
                    <p className="text-neutral-medium-gray">{t('hackathonDetail.totalJudgeVotes')}</p>
                    <p className="mt-[0.25rem] text-neutral-off-black">{`${judge?.votesProportion?.[1] ?? 0}%`}</p>
                  </div>
                )}

                {judge.projectJudgeCount > 0 && (
                  <div>
                    <p className="text-neutral-medium-gray">{'Judges Needed for Each Project'}</p>
                    <p className="mt-[0.25rem] text-neutral-off-black">{judge.projectJudgeCount}</p>
                  </div>
                )}
              </div>
              {judge?.judgeAccounts?.length > 0 && (
                <div>
                  <p className="text-neutral-medium-gray">{t('hackathonDetail.judgingAccounts')}</p>
                  <div className="body-m mt-[0.25rem] flex flex-wrap gap-x-[2.5rem] gap-y-[.75rem] text-neutral-off-black">
                    {judge?.judgeAccounts?.map((v, i) => (
                      <div key={i} className="flex items-center gap-[12px]">
                        <BaseImage src={v.avatar} alt={v.nickname} className="h-[2rem] w-[2rem] rounded-[50%]" />
                        <span>{v.nickname}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </EditBox>
  );
};

export default DetailJuging;
