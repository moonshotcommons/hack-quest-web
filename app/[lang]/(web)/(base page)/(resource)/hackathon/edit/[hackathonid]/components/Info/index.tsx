import React, { useContext } from 'react';
import EditBox from '../EditBox';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';

interface InfoProp {
  hackathon: HackathonType;
}

const Info: React.FC<InfoProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <EditBox title={'hackathonDetail.info'}>
      <div className="body-m flex flex-col gap-[24px] text-neutral-off-black">
        <div>
          <h1 className="text-h3">{hackathon.name}</h1>
          <p className="text-neutral-rich-gray">{hackathon.address}</p>
        </div>
        <div className="flex gap-[40px]">
          <div>
            <p className="text-neutral-medium-gray">{t('hackathonDetail.hostBy')}</p>
            <p>{hackathon.hosts?.[0].name}</p>
          </div>
          <div>
            <p className="text-neutral-medium-gray">{t('hackathonDetail.hackathonMode')}</p>
            <p>{hackathon.name}</p>
          </div>
        </div>
        <div>
          <p className="text-neutral-medium-gray">{t('hackathonDetail.venue')}</p>
          <p>{hackathon.name}</p>
        </div>
        <div>
          <p className="text-neutral-medium-gray">{t('description')}</p>
          <p className="text-neutral-rich-gray">{hackathon.name}</p>
        </div>
      </div>
    </EditBox>
  );
};

export default Info;
