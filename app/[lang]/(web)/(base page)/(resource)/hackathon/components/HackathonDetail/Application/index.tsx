import React, { useContext, useMemo } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonEditModalType } from '../../../constants/type';

interface ApplicationProp {
  hackathon: HackathonType;
}

const Application: React.FC<ApplicationProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const application = useMemo(() => {
    const app = hackathon.info?.application || {};
    const ApplicationType = app?.ApplicationType || {};
    const About = app.About.filter((v) => v.selected)
      .map((v) => (v.optional ? `${v.type}(Optional)` : v.type))
      .join(' / ');
    const OnlineProfiles = app.OnlineProfiles.filter((v) => v.selected)
      .map((v) => (v.optional ? `${v.type}(Optional)` : v.type))
      .join(' / ');
    const Contact = app.Contact.filter((v) => v.selected)
      .map((v) => (v.optional ? `${v.type}(Optional)` : v.type))
      .join(' / ');
    return {
      ApplicationType,
      About,
      OnlineProfiles,
      Contact
    };
  }, [hackathon]);
  return (
    <EditBox title={'hackathonDetail.application'} type={HackathonEditModalType.APPLICATION}>
      <div className="body-m flex flex-col gap-[24px] text-neutral-medium-gray">
        <div className="flex gap-[80px]">
          <div>
            <p>{t('hackathonDetail.applicationType')}</p>
            <p className="mt-[4px] text-neutral-off-black">{application.ApplicationType?.property?.type}</p>
          </div>
          <div>
            <p>{t('hackathonDetail.minTeamSize')}</p>
            <p className="mt-[4px] text-neutral-off-black">{application.ApplicationType?.property?.minSize}</p>
          </div>
          <div>
            <p>{t('hackathonDetail.maxTeamSize')}</p>
            <p className="mt-[4px] text-neutral-off-black">{application.ApplicationType?.property?.maxSize}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-[80px] gap-y-[24px]">
          <div>
            <p>{t('hackathonDetail.about')}</p>
            <p className="mt-[4px] text-neutral-off-black">{application.About}</p>
          </div>
          <div>
            <p>{t('hackathonDetail.onlineProfiles')}</p>
            <p className="mt-[4px] text-neutral-off-black">{application.OnlineProfiles}</p>
          </div>
          <div>
            <p>{t('hackathonDetail.contact')}</p>
            <p className="mt-[4px] text-neutral-off-black">{application.Contact}</p>
          </div>
        </div>
      </div>
    </EditBox>
  );
};

export default Application;
