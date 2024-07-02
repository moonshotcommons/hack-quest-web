import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { separationNumber } from '@/helper/utils';

interface JudgingProp {
  hackathon: HackathonType;
}

const Judging: React.FC<JudgingProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <EditBox title={'hackathonDetail.judging'}>
      <div className="body-m flex flex-col gap-[24px]">
        <div>
          <p className="text-neutral-medium-gray">{t('hackathonDetail.judgingCriteria')}</p>
          <div className="mt-[4px] whitespace-pre-line text-neutral-rich-gray">sdsdssdsdsdsd</div>
        </div>
        <div className="flex gap-[80px]">
          {hackathon.votes?.USER > 0 && (
            <div>
              <p className="text-neutral-medium-gray">{t('totalUserVotes')}</p>
              <p className="mt-[4px] text-neutral-off-black">{separationNumber(hackathon.votes?.USER)}</p>
            </div>
          )}
          {hackathon.votes?.ADVOCATE > 0 && (
            <div>
              <p className="text-neutral-medium-gray">{t('totalAdvocateVotes')}</p>
              <p className="mt-[4px] text-neutral-off-black">{separationNumber(hackathon.votes?.ADVOCATE)}</p>
            </div>
          )}
          {hackathon.votes?.JUDGE > 0 && (
            <div>
              <p className="text-neutral-medium-gray">{t('totalJudgeVotes')}</p>
              <p className="mt-[4px] text-neutral-off-black">{separationNumber(hackathon.votes?.JUDGE)}</p>
            </div>
          )}
        </div>
        <div>
          <p className="text-neutral-medium-gray">{t('hackathonDetail.judgingAccounts')}</p>
          <div className="mt-[4px] flex flex-wrap gap-[40px] text-neutral-off-black">
            <span>abcdefg@gmail.com</span> <span>abcdefg@gmail.com</span>
          </div>
        </div>
      </div>
    </EditBox>
  );
};

export default Judging;
