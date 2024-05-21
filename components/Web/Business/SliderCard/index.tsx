'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { ReactNode, useContext, useRef, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { ChangeState, ScrollContainer } from '@/components/Common/ScrollContainer';
import Pagination from './Pagination';
import Navigation from './Navigation';
import Link from 'next/link';

interface SliderCardProp {
  title: string;
  viewLink?: string;
  renderItem: (width: number) => ReactNode;
  isMobile?: boolean;
}

function SliderCard({ title, viewLink, renderItem, isMobile = false }: SliderCardProp) {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="w-full py-[60px]" ref={containerRef}>
      <div className="mb-[1.875rem] flex items-center justify-between gap-[1.25rem]">
        <div className={`flex-1 text-neutral-off-black ${isMobile ? 'text-h3-mob' : 'text-h3 '}`}>{title}</div>
        {viewLink && (
          <Link href={viewLink} className="flex flex-shrink-0 items-center gap-[7px]">
            <span>{t('viewAll')}</span>
            <BsArrowRight size={12}></BsArrowRight>
          </Link>
        )}
      </div>
      <div>
        <div className="group relative">
          <div className={`${!isMobile && 'hidden group-hover:block'}`}>
            <Navigation isMobile={isMobile} changeState={scrollContainerState} />
          </div>
          <ScrollContainer ref={scrollContainerRef} gap={0} onChange={(state: any) => setScrollContainerState(state)}>
            <div className="flex">{renderItem(containerRef.current?.offsetWidth as number)}</div>
          </ScrollContainer>
        </div>

        <div className="mt-[30px]">
          <Pagination isMobile={isMobile} changeState={scrollContainerState} />
        </div>
      </div>
    </div>
  );
}

export default SliderCard;
