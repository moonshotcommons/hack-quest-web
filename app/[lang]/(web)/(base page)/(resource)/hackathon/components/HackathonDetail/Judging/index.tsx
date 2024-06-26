import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import BaseImage from '@/components/Common/BaseImage';
import { HackathonEditModalType } from '../../../constants/type';

interface JudgingProp {
  hackathon: HackathonType;
}

const Judging: React.FC<JudgingProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <EditBox title={'hackathonDetail.judging'} type={HackathonEditModalType.JUDGING}>
      <div className="body-m flex flex-col gap-[24px]">
        <div>
          <p className="text-neutral-medium-gray">{t('hackathonDetail.judgingCriteria')}</p>
          <div className="mt-[4px] whitespace-pre-line text-neutral-rich-gray">{hackathon.judge?.resource}</div>
        </div>
        <div className="flex gap-[80px]">
          <div>
            <p className="text-neutral-medium-gray">{t('totalUserVotes')}</p>
            <p className="mt-[4px] text-neutral-off-black">{`${hackathon.judge?.votesProportion?.[0] ?? 0}%`}</p>
          </div>
          <div>
            <p className="text-neutral-medium-gray">{t('totalJudgeVotes')}</p>
            <p className="mt-[4px] text-neutral-off-black">{`${hackathon.judge?.votesProportion?.[1] ?? 0}%`}</p>
          </div>
        </div>
        <div>
          <p className="text-neutral-medium-gray">{t('hackathonDetail.judgingAccounts')}</p>
          <div className="body-m mt-[4px] flex flex-wrap gap-x-[40px] gap-y-[12px] text-neutral-off-black">
            {hackathon.judge.judgeAccounts.map((v, i) => (
              <div key={i} className="flex items-center gap-[12px]">
                <BaseImage src={v.avatar} alt={v.nickname} className="h-[50px] w-[50px] rounded-[50%]" />
                <span>{v.nickname}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EditBox>
  );
};

export default Judging;
