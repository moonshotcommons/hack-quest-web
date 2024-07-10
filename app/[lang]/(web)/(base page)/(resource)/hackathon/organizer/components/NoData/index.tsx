import React, { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';

interface NoDataProp {
  curTab: HackathonStatusType;
}

const NoData: React.FC<NoDataProp> = ({ curTab }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="body-l pt-[40px] text-center text-neutral-black">
      {t('organizer.empty', {
        type: t(`organizer.${curTab}`)
      })}
    </div>
  );
};

export default NoData;
