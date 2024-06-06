'use client';

import * as React from 'react';
import Image from 'next/image';
import { message } from 'antd';
import { MoveRightIcon } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useMediaQuery } from '@/hooks/dom/use-media-query';
import { useUserStore } from '@/store/zustand/userStore';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { SearchForm } from './search-form';
import { useSubmitModal } from '../submit/store';
import { SubmitMobilePortal } from '../submit/mobile';
import { SubmitWebModal } from '../submit/web';

export function PageLayoutHeader() {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.IDEA_BANK);
  const { onOpen } = useSubmitModal();
  const isLargeScreen = useMediaQuery('(min-width: 640px)');

  const { userInfo, setAuthModalOpen } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen
    }))
  );

  function onClick() {
    if (!userInfo) {
      setAuthModalOpen(true);
      message.warning('Please login first!');
      return;
    }
    onOpen();
  }

  return (
    <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
      <div className="w-full px-5 sm:mt-7 sm:max-w-[50rem] sm:px-0">
        <h1 className="headline-h2-mob sm:headline-h2 text-neutral-black">{t('title')}</h1>
        <p className="body-l my-5 hidden text-neutral-rich-gray sm:block">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida mollis mattis. Morbi eget tempor
          augue. Aenean lacus nisl, volutpat sed nunc et, ornare egestas augue.{' '}
        </p>
        <button
          className="relative inline-flex items-center justify-center gap-2 text-neutral-black outline-none after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-yellow-dark after:content-['']"
          onClick={onClick}
        >
          <span className="body-s sm:body-m">{t('submit_an_idea')}</span>
          <MoveRightIcon size={16} />
        </button>
        <SearchForm />
      </div>
      <div className="relative hidden h-[20.625rem] w-[25.625rem] sm:block">
        <Image src="/images/idea-bank/idea-bank-cover.png" alt="idea bank" fill />
      </div>
      <div className="relative h-[7.5rem] w-[13.625rem] self-end sm:hidden">
        <Image src="/images/idea-bank/idea-bank-m-cover.png" alt="idea bank" fill />
      </div>
      {isLargeScreen && <SubmitWebModal />}
      {!isLargeScreen && <SubmitMobilePortal />}
    </div>
  );
}
