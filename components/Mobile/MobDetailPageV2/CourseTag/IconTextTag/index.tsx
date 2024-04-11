'use client';
import { FC, ReactNode, useContext } from 'react';
import { IconTextTagType, tagConfig } from './constant';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';

interface IconTextTagProps {
  type: IconTextTagType;
  icon?: ReactNode;
  text?: ReactNode;
}

const IconTextTag: FC<IconTextTagProps> = (props) => {
  const { type, icon: propIcon, text: propText, ...rest } = props;

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);

  const icon = propIcon ?? tagConfig[type].icon;
  const text = propText ?? t(tagConfig[type].text);
  return (
    <div className="flex items-center gap-2" {...rest}>
      {icon}
      <span className="body-s">{text}</span>
    </div>
  );
};

export default IconTextTag;
