import React, { useContext, useMemo } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonEditModalType } from '../../../constants/type';

interface SubmissionProp {
  hackathon: HackathonType;
}

const Submission: React.FC<SubmissionProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const submission = useMemo(() => {
    const sub = hackathon.info?.submission || {};
    const Additions = sub.Additions?.filter((v) => v.selected)
      .map((v) => (v.optional ? `${v.type}(Optional)` : v.type))
      .join(' / ');
    const BasicInfo = sub.BasicInfo?.filter((v) => v.selected)
      .map((v) => (v.optional ? `${v.type}(Optional)` : v.type))
      .join(' / ');
    const ProjectDetail = sub.ProjectDetail?.filter((v) => v.selected)
      .map((v) => (v.optional ? `${v.type}(Optional)` : v.type))
      .join(' / ');
    const Videos = sub.Videos?.filter((v) => v.selected)
      .map((v) => (v.optional ? `${v.type}(Optional)` : v.type))
      .join(' / ');
    return {
      Additions,
      BasicInfo,
      ProjectDetail,
      Videos
    };
  }, [hackathon]);

  return (
    <EditBox title={'hackathonDetail.submission'} type={HackathonEditModalType.SUBMISSION}>
      <div className="body-m flex flex-col gap-[24px] text-neutral-medium-gray">
        <div className="flex flex-wrap gap-x-[80px] gap-y-[24px]">
          <div>
            <p>{t('hackathonDetail.projectDetail')}</p>
            <p className="mt-[4px] text-neutral-off-black">{submission.ProjectDetail}</p>
          </div>
          <div>
            <p>{t('hackathonDetail.additions')}</p>
            <p className="mt-[4px] text-neutral-off-black">{submission.Additions}</p>
          </div>
          <div>
            <p>{t('hackathonDetail.basicInfo')}</p>
            <p className="mt-[4px] text-neutral-off-black">{submission.BasicInfo}</p>
          </div>
          <div>
            <p>{t('hackathonDetail.videos')}</p>
            <p className="mt-[4px] text-neutral-off-black">{submission.Videos}</p>
          </div>
        </div>
      </div>
    </EditBox>
  );
};

export default Submission;
