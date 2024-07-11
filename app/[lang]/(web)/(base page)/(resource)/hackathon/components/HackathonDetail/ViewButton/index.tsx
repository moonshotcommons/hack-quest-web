import React, { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { HackathonType } from '@/service/webApi/resourceStation/type';

interface ViewButtonProp {
  hackathon: HackathonType;
}

const ViewButton: React.FC<ViewButtonProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <Link href={`${MenuLink.EXPLORE_HACKATHON}/${hackathon.alias}`} className="block">
      <Button type="primary" className="button-text-l h-[60px] w-full uppercase">
        {t('hackathonDetail.proceedToPreview')}
      </Button>
    </Link>
  );
};

export default ViewButton;
