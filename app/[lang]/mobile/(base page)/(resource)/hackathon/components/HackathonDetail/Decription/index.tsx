import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import HackathonRenderer from '../../HackathonRenderer';

interface DescriptionProp {
  hackathon: HackathonType;
}

const Description: React.FC<DescriptionProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <EditBox title={'hackathonDetail.description'} className="border-none bg-transparent p-0">
      {typeof hackathon.info?.description === 'string' ? (
        <div className="body-s whitespace-pre-line text-neutral-rich-gray">{hackathon.info?.description}</div>
      ) : (
        <HackathonRenderer content={hackathon.info?.description} />
      )}
    </EditBox>
  );
};

export default Description;
