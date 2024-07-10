import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonEditContext, HackathonEditModalType } from '../../../constants/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface LinksProp {
  hackathon: HackathonType;
}

const Links: React.FC<LinksProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getLinks } = useDealHackathonData();
  const links = getLinks(hackathon);
  const { navs } = useContext(HackathonEditContext);
  if (!navs.some((v) => v.value !== 'links')) return null;
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
            <p className="mt-[4px] text-neutral-off-black">{hackathon.links?.website}</p>
          </div>
        </div>
        {links.length > 0 && (
          <div className="flex flex-wrap gap-x-[80px] gap-y-[24px]">
            {links.map((v, i) => (
              <div key={i}>
                <p className="capitalize">{v.label}</p>
                <p className="mt-[4px] text-neutral-off-black">{v.link}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </EditBox>
  );
};

export default Links;
