import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface ApplicationProp {
  hackathon: HackathonType;
}

const Application: React.FC<ApplicationProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <EditBox title={'hackathonDetail.application'}>
      <div className="body-m flex flex-col gap-[24px] text-neutral-medium-gray">
        <div className="flex gap-[80px]">
          <div>
            <p>{t('hackathonDetail.applicationType')}</p>
            <p className="mt-[4px] text-neutral-off-black">Solo or Group</p>
          </div>
          <div>
            <p>{t('hackathonDetail.minTeamSize')}</p>
            <p className="mt-[4px] text-neutral-off-black">1</p>
          </div>
          <div>
            <p>{t('hackathonDetail.maxTeamSize')}</p>
            <p className="mt-[4px] text-neutral-off-black">4</p>
          </div>
        </div>
        <div className="flex gap-[80px]">
          <div>
            <p>{t('hackathonDetail.about')}</p>
            <p className="mt-[4px] text-neutral-off-black">First and Last Name / Bio (Optional)</p>
          </div>
          <div>
            <p>{t('hackathonDetail.onlineProfiles')}</p>
            <p className="mt-[4px] text-neutral-off-black">GitHub</p>
          </div>
          <div>
            <p>{t('hackathonDetail.contact')}</p>
            <p className="mt-[4px] text-neutral-off-black">Email</p>
          </div>
        </div>
      </div>
    </EditBox>
  );
};

export default Application;
