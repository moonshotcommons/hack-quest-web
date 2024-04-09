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
    <div className="container mx-auto max-w-[1280px] pt-[6.25rem]">
      <div className="mx-auto flex w-[50rem] flex-col items-center gap-3 text-center">
        <p className="body-s-bold uppercase text-neutral-rich-gray">{t('BecomeWeb3.Why us')}</p>
        <h2 className="text-h2">{t('BecomeWeb3.Become a Web3')} </h2>
        <p className="body-l text-neutral-medium-gray">
          {t('BecomeWeb3.Kickstart Web3 learning journey')}{' '}
          <span className="font-bold">{t('BecomeWeb3.fullFree')}</span> {t('BecomeWeb3.postLearnResource')}
        </p>
      </div>
      <div className="mt-[3.75rem] flex flex-col gap-[2rem]">
        {verticalCardData.map((item, index) => {
          return (
            <div key={index} className="flex w-full gap-[60px] rounded-[24px] bg-neutral-white p-6">
              <div className="relative h-[20.125rem] w-[31.25rem]">
                <Image src={item.image} fill alt="hackquest" className="object-contain"></Image>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-6">
                <h3 className="text-h3 text-neutral-off-black">{t(`BecomeWeb3.${item.title as any}`)}</h3>
                <p className="body-l text-neutral-medium-gray">{t(`BecomeWeb3.${item.description as any}`)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-[2rem] flex gap-[2rem]">
        {horizontalCardData.map((item, index) => {
          return (
            <div key={index} className="flex w-full flex-1 flex-col gap-[1.5rem] rounded-[24px] bg-neutral-white p-6">
              <div className="relative h-[23.125rem] w-[36rem]">
                <Image src={item.image} fill alt="hackquest" className="object-contain"></Image>
              </div>
              <h3 className="text-h3 text-neutral-off-black">{t(`BecomeWeb3.${item.title as any}`)}</h3>
              <p className="body-l text-neutral-medium-gray">{t(`BecomeWeb3.${item.description as any}`)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BecomeWeb3;
