import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import HackathonRenderer from '../../HackathonRenderer';

interface ThemeResourceProp {
  hackathon: HackathonType;
  type: 'theme' | 'resource';
}

const ThemeResource: React.FC<ThemeResourceProp> = ({ hackathon, type }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  if (!hackathon.info?.sections?.[type]) return null;
  return (
    <EditBox title={`hackathonDetail.${type}`} className="border-none bg-transparent p-0">
      <HackathonRenderer content={hackathon.info?.sections?.[type]} />
    </EditBox>
  );
};

export default ThemeResource;
