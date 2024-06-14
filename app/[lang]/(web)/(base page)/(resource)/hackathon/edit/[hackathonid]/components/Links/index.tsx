import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface LinksProp {
  hackathon: HackathonType;
}

const Links: React.FC<LinksProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <EditBox title={'hackathonDetail.links'}>
      <div className="body-m flex flex-col gap-[24px] text-neutral-medium-gray">
        <div className="flex justify-between">
          <div>
            <p>{t('hackathonDetail.yourContactEmail')}</p>
            <p className="mt-[4px] text-neutral-off-black">abcdefg@gmail.com</p>
          </div>
          <div>
            <p>{t('hackathonDetail.linkToCodeOfConduct')}</p>
            <p className="mt-[4px] text-neutral-off-black">Use HackQuest’s standard code of conduct</p>
          </div>
          <div>
            <p>{t('hackathonDetail.discord')}</p>
            <p className="mt-[4px] text-neutral-off-black">abcdefghijksssssss</p>
          </div>
        </div>
      </div>
    </EditBox>
  );
};

export default Links;
