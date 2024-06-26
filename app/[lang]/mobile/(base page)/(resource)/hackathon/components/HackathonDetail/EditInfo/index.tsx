import React, { useContext } from 'react';
import EditBox from '../EditBox';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { HackathonEditModalType } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface EditInfoProp {
  hackathon: HackathonType;
}

const EditInfo: React.FC<EditInfoProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <EditBox title={'hackathonDetail.info'} type={HackathonEditModalType.INFO}>
      <div className="body-m flex flex-col gap-[24px] text-neutral-off-black">
        <div>
          <h1 className="text-h3">{hackathon.name}</h1>
          <p className="text-neutral-rich-gray">{hackathon.info?.intro}</p>
        </div>
        <div className="flex gap-[40px]">
          <div>
            <p className="text-neutral-medium-gray">{t('hackathonDetail.hostBy')}</p>
            <p>{hackathon.info?.host}</p>
          </div>
          <div>
            <p className="text-neutral-medium-gray">{t('hackathonDetail.hackathonMode')}</p>
            <p>{hackathon.info?.mode}</p>
          </div>
        </div>
        {hackathon.info?.address && (
          <div>
            <p className="text-neutral-medium-gray">{t('hackathonDetail.venue')}</p>
            <p>{hackathon.info?.address}</p>
          </div>
        )}
        <div>
          <p className="text-neutral-medium-gray">{t('description')}</p>
          <p className="text-neutral-rich-gray">{hackathon.info?.description}</p>
        </div>
      </div>
    </EditBox>
  );
};

export default EditInfo;
