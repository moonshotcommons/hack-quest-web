'use client';
import React, { useContext, useMemo } from 'react';
import { pressKitNavData } from '../../constants/data';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';

interface PressKitSidebarProp {}

const PressKitSidebar: React.FC<PressKitSidebarProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.PRESS_KIT);
  const { pressKitId } = useParams();
  const pId = useMemo(() => {
    return pressKitNavData.some((nav) => nav.id === pressKitId) ? pressKitId : pressKitNavData[0].id;
  }, [pressKitId]);
  return (
    <div className="scroll-wrap-y text-neutral-medium-graybody-l h-full w-[296px] bg-neutral-off-white py-[27px] shadow-[2px_0_4px_0_rgba(0,0,0,0.12)]">
      {pressKitNavData.map((nav) => (
        <Link key={nav.id} href={`${MenuLink.PRESS_KIT}/${nav.id}`}>
          <div
            className={`flex h-[53px]  items-center gap-[8px] overflow-hidden rounded-l-[5px] border-l-[8px] pl-[40px] ${pId === nav.id ? 'border-yellow-dark bg-neutral-white text-neutral-black' : 'border-transparent text-neutral-medium-gray'}`}
          >
            {nav.icon}
            <span>{t(nav.label)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PressKitSidebar;
