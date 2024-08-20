import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import Image from 'next/image';
import React from 'react';
import CaseCover1 from '@/public/images/resource/case_cover1.png';
import CaseCover2 from '@/public/images/resource/case_cover2.png';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { joinPartnerLink } from '../../constants/data';

interface PartnerCaseProp {
  lang: Lang;
}

const PartnerCase: React.FC<PartnerCaseProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="container mx-auto flex flex-col gap-[120px]">
      <div className="relative h-0 pt-[34.78%]">
        <div className="absolute bottom-0 left-0 z-[1] mt-[40px] w-[55%]">
          <div className="relative h-0  overflow-hidden rounded-[32px] pt-[57.81%]">
            <Image src={CaseCover1} alt="case-cover" fill className="object-cover" />
          </div>
        </div>
        <div className="absolute right-0 top-0 z-[2] w-[49%]">
          <div className="relative  h-0  rounded-[32px] bg-neutral-white pt-[59.7%] shadow-[0_0_16px_0_rgba(0,0,0,0.12)]">
            <div className="absolute left-0 top-0 flex h-full  w-full flex-col justify-between px-[40px] py-[60px] ">
              <div>
                <p className="text-h2 mb-[20px] text-neutral-off-black">{t('partners.becomeOurPartner')}🤝</p>
                <p className="body-l text-neutral-rich-gray">{t('partners.caseDesc1')}</p>
              </div>
              <Link href={joinPartnerLink} target="_blank">
                <Button
                  ghost
                  className="button-text-l h-[60px] w-[270px] border-neutral-black p-0 uppercase text-neutral-black"
                >
                  {t('partners.becomeOurPartner')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-0 pt-[34.78%]">
        <div className="absolute bottom-0 right-0 z-[1] mt-[40px] w-[55%]">
          <div className="relative h-0  overflow-hidden rounded-[32px] pt-[57.81%]">
            <Image src={CaseCover2} alt="case-cover" fill className="object-cover" />
          </div>
        </div>
        <div className="absolute  left-0 top-0 z-[2] w-[49%]">
          <div className="relative  h-0  rounded-[32px] bg-neutral-white pt-[59.7%] shadow-[0_0_16px_0_rgba(0,0,0,0.12)]">
            <div className="absolute left-0 top-0 flex h-full  w-full flex-col justify-between px-[40px] py-[60px] ">
              <div>
                <p className="text-h2 mb-[20px] text-neutral-off-black">{t('partners.caseTitle2')}🤝</p>
                <p className="body-l text-neutral-rich-gray">{t('partners.caseDesc2')}</p>
              </div>
              <Link href={MenuLink.EVENTS}>
                <Button
                  ghost
                  className="button-text-l h-[60px] w-[270px] border-neutral-black p-0 uppercase text-neutral-black"
                >
                  {t('partners.caseButton2')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerCase;
