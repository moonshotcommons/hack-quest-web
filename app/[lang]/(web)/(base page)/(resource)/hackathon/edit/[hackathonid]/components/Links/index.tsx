import React, { useContext, useMemo } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonEditModalType } from '../../constants/type';

interface LinksProp {
  hackathon: HackathonType;
}

const Links: React.FC<LinksProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const links = useMemo(() => {
    const keys = Object.keys(hackathon.links?.links) || [];
    const ls = keys.map((v) => ({
      label: v,
      value: hackathon.links?.links?.[v]
    }));
    return ls || [];
  }, [hackathon]);
  return (
    <EditBox title={'hackathonDetail.links'} type={HackathonEditModalType.LINKS}>
      <div className="body-m flex flex-col gap-[24px] text-neutral-medium-gray">
        <div className="flex flex-wrap gap-x-[80px] gap-y-[24px]">
          <div>
            <p>{t('hackathonDetail.yourContactEmail')}</p>
            <p className="mt-[4px] text-neutral-off-black">{hackathon.links?.email}</p>
          </div>
          <div>
            <p>{t('hackathonDetail.linkToCodeOfConduct')}</p>
            <p className="mt-[4px] text-neutral-off-black">Use HackQuest’s standard code of conduct</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-[80px] gap-y-[24px]">
          {links.map((v) => (
            <div key={v.value}>
              <p className="capitalize">{v.label}</p>
              <p className="mt-[4px] text-neutral-off-black">{v.value}</p>
            </div>
          ))}
        </div>
      </div>
    </EditBox>
  );
};

export default Links;
