'use client';
import React, { useContext } from 'react';
import { titleTxtData } from '../../constants/data';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { LaunchDetailContext } from '../../constants/type';
import { OffsetTopsType } from '../Content';

interface NavProp {
  handleClickAnchor: (index: number) => void;
  curAnchorIndex: number;
  offsetTops: OffsetTopsType[];
}

const Nav: React.FC<NavProp> = ({ handleClickAnchor, curAnchorIndex, offsetTops }) => {
  const { launchInfo } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="body-l sticky left-0 top-0 w-[325px] pr-[20px] ">
      {titleTxtData.map((v, i) => (
        <Link key={i} href={`${MenuLink.LAUNCH}/${launchInfo.id}#${offsetTops[i]?.title}`}>
          <div
            onClick={() => handleClickAnchor(i)}
            className={`mb-[4px] flex h-[42px] cursor-pointer items-center overflow-hidden rounded-l-[8px] border-l-[9px]  pl-[28px] ${i === curAnchorIndex ? 'border-yellow-primary bg-neutral-white text-neutral-black' : 'border-transparent text-neutral-medium-gray'}`}
          >
            {t(v)}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Nav;
