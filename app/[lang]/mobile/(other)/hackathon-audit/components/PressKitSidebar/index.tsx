'use client';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { motion } from 'framer-motion';
import { usePressKitStore } from '@/store/zustand/pressKitStore';
import { useShallow } from 'zustand/react/shallow';
import { pressKitNavData } from '@/app/[lang]/(web)/(base page)/(more)/press-kit/constants/data';
import { HiArrowLongRight } from 'react-icons/hi2';
import { cn } from '@/helper/utils';
import useGetHeight from '@/hooks/dom/useGetHeight';

interface PressKitSidebarProp {}

const PressKitSidebar: React.FC<PressKitSidebarProp> = () => {
  const { lang } = useContext(LangContext);
  const { pageHeight } = useGetHeight();
  const { t } = useTranslation(lang, TransNs.PRESS_KIT);
  const { pressKitId } = useParams();
  const { sidebarOpen, setSidebarOpen } = usePressKitStore(
    useShallow((state) => {
      return {
        sidebarOpen: state?.sidebarOpen,
        setSidebarOpen: state?.setSidebarOpen
      };
    })
  );
  const pId = useMemo(() => {
    return pressKitNavData.some((nav) => nav.id === pressKitId) ? pressKitId : pressKitNavData[0].id;
  }, [pressKitId]);

  return (
    <div className="absolute left-0 top-16 w-full" style={{ height: pageHeight }}>
      <motion.div
        animate={{
          backgroundColor: sidebarOpen ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)'
        }}
        className="fixed left-0 top-16 z-[98] h-full w-full bg-neutral-white"
        style={{ height: pageHeight }}
      />
      <motion.div
        className={cn(
          'fixed -left-[76%] top-16 z-[99] flex h-full w-[76%] flex-col justify-between bg-neutral-off-white py-10 shadow-[2px_0px_4px_0px_rgba(0,0,0,0.12)]'
        )}
        style={{ height: pageHeight }}
        animate={{
          left: sidebarOpen ? '0' : '-77%'
        }}
      >
        <div className="">
          {pressKitNavData.map((nav) => (
            <Link key={nav.id} href={`${MenuLink.PRESS_KIT}/${nav.id}`}>
              <div
                className={`flex h-[53px] items-center gap-[.5rem] overflow-hidden rounded-l-[.3125rem] border-l-[.5rem] pl-[.75rem] ${pId === nav.id ? 'border-yellow-dark bg-neutral-white text-neutral-black' : 'border-transparent text-neutral-medium-gray'}`}
                onClick={() => setSidebarOpen(false)}
              >
                {nav.icon}
                <span>{t(nav.label)}</span>
              </div>
            </Link>
          ))}
        </div>

        <Link href={'/'} className="mb-[.9375rem] flex w-full justify-center">
          <div className="body-s flex items-center gap-[.375rem] text-neutral-black">
            <div className="relative">
              <span>{t('goToHackQuest')}</span>
              <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[.125rem] bg-yellow-dark"></div>
            </div>
            <HiArrowLongRight size={14}></HiArrowLongRight>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default PressKitSidebar;
