import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonEditModalType } from '../../constants/type';

interface SubmissionProp {
  hackathon: HackathonType;
}

const Submission: React.FC<SubmissionProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <EditBox title={'hackathonDetail.submission'} type={HackathonEditModalType.SUBMISSION}>
      <div className="body-m flex flex-col gap-[24px] text-neutral-medium-gray">
        <div className="flex flex-wrap gap-x-[80px] gap-y-[80px]">
          <div>
            <p>{t('hackathonDetail.projectDetail')}</p>
            <p className="mt-[4px] text-neutral-off-black">One-Line Intro / Detailed Intro</p>
          </div>
          <div>
            <p>{t('hackathonDetail.additions')}</p>
            <p className="mt-[4px] text-neutral-off-black">Github & Open Source / Fundraising Status (Optional)</p>
          </div>
        </div>
      </div>
    </EditBox>
  );
};

export default Submission;
