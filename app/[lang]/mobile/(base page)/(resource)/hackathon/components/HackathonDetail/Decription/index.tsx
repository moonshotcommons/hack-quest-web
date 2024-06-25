import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface DescriptionProp {
  hackathon: HackathonType;
}

const Description: React.FC<DescriptionProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <EditBox title={'hackathonDetail.description'} className="border-none bg-transparent p-0">
      <div className="body-s whitespace-pre-line text-neutral-rich-gray">{hackathon.info?.description}</div>
    </EditBox>
  );
};

export default Description;
