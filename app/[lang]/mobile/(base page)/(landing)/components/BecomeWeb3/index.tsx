import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import Image from 'next/image';
import { FC } from 'react';

const verticalCardData = [
  {
    image: '/images/landing/vertical_card_1.png',
    title: 'Earn official certificates',
    description: 'Earn official certificates description'
  },
  {
    image: '/images/landing/vertical_card_2.png',
    title: 'Follow zero-to-hero learning paths',
    description: 'Follow zero-to-hero learning paths description'
  }
];

const horizontalCardData = [
  {
    image: '/images/landing/horizontal_card_1.png',
    title: 'Deploy to L1L2s in minutes',
    description: 'Deploy to L1L2s in minutes description'
  },
  {
    image: '/images/landing/horizontal_card_2.png',
    title: 'Learn beyond traditional courses',
    description: 'Learn beyond traditional courses description'
  }
];

const BecomeWeb3: FC<{ lang: Lang }> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LANDING);
  return (
    <div className="mx-auto w-full px-5 py-10">
      <div className="mx-auto flex flex-col items-center gap-3 text-center">
        <p className="body-s-bold text-[.75rem] uppercase text-neutral-rich-gray">{t('BecomeWeb3.Why us')}</p>
        <h2 className="text-h2 text-[1.375rem]">{t('BecomeWeb3.Become a Web3')} </h2>
        <p className="body-l text-[.75rem] text-neutral-medium-gray">
          {t('BecomeWeb3.Kickstart Web3 learning journey')}{' '}
          <span className="font-bold">{t('BecomeWeb3.fullFree')}</span> {t('BecomeWeb3.postLearnResource')}
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        {verticalCardData.map((item, index) => {
          return (
            <div key={index} className="flex w-full flex-col gap-4 rounded-[1rem] bg-neutral-white p-4">
              <div className="relative h-[12.6875rem] w-full">
                <Image src={item.image} fill alt="hackquest" className="object-contain"></Image>
              </div>
              <h3 className="text-h4-mob text-neutral-off-black">{t(`BecomeWeb3.${item.title as any}`)}</h3>
              <p className="body-xs text-neutral-medium-gray">{t(`BecomeWeb3.${item.description as any}`)}</p>
            </div>
          );
        })}
        {horizontalCardData.map((item, index) => {
          return (
            <div key={index} className="flex w-full flex-col gap-4 rounded-[1rem] bg-neutral-white p-4">
              <div className="relative h-[12.6875rem] w-full">
                <Image src={item.image} fill alt="hackquest" className="object-contain"></Image>
              </div>
              <h3 className="text-h4-mob text-neutral-off-black">{t(`BecomeWeb3.${item.title as any}`)}</h3>
              <p className="body-l body-xs text-neutral-medium-gray">{t(`BecomeWeb3.${item.description as any}`)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BecomeWeb3;
