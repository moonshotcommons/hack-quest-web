import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import Image from 'next/image';
import React from 'react';
import CaseCover1 from '@/public/images/resource/case_cover1.png';
import CaseCover2 from '@/public/images/resource/case_cover2.png';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { joinPartnerLink } from '@/app/[lang]/(web)/(base page)/(resource)/partners/constants/data';

interface PartnerCaseProp {
  lang: Lang;
}

const PartnerCase: React.FC<PartnerCaseProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="flex flex-col gap-[5rem]">
      <div>
        <div className="relative z-[2] px-[1.25rem]">
          <div className="flex h-[13.75rem] flex-col justify-between rounded-[1rem] bg-neutral-white  px-[1.25rem] py-[1.5rem] shadow-[0_0_16px_0_rgba(0,0,0,0.12)]">
            <div>
              <p className="text-h2-mob mb-[1.25rem] text-center text-neutral-off-black">
                {t('partners.becomeOurPartner')}🤝
              </p>
              <p className="body-s text-center text-neutral-rich-gray">{t('partners.caseDesc1')}</p>
            </div>
            <Link href={joinPartnerLink} target="_blank">
              <Button
                ghost
                className="button-text-s h-[2.125rem] w-full border-neutral-black p-0 uppercase text-neutral-black"
              >
                {t('partners.becomeOurPartner')}
              </Button>
            </Link>
          </div>
        </div>
        <div className=" relative mt-[-2.5rem] h-0  overflow-hidden pt-[57.81%]">
          <Image src={CaseCover1} alt="case-cover" fill className="object-cover" />
        </div>
      </div>

      <div>
        <div className="relative z-[2] px-[1.25rem]">
          <div className="flex h-[13.75rem] flex-col justify-between rounded-[1rem] bg-neutral-white  px-[1.25rem] py-[1.5rem] shadow-[0_0_16px_0_rgba(0,0,0,0.12)]">
            <div>
              <p className="text-h2-mob mb-[1.25rem] text-center text-neutral-off-black">{t('partners.caseTitle2')}</p>
              <p className="body-s text-center text-neutral-rich-gray">{t('partners.caseDesc2')}</p>
            </div>
            <Link href={MenuLink.EVENTS}>
              <Button
                ghost
                className="button-text-s h-[2.125rem] w-full border-neutral-black p-0 uppercase text-neutral-black"
              >
                {t('partners.caseButton2')}
              </Button>
            </Link>
          </div>
        </div>
        <div className=" relative mt-[-2.5rem] h-0  overflow-hidden pt-[57.81%]">
          <Image src={CaseCover2} alt="case-cover" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default PartnerCase;
