'use client';
import DiscordIcon from '@/components/Common/Icon/Discord';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import { HACKQUEST_DISCORD, HACKQUEST_TWITTER } from '@/constants/links';
import { cn } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { Lang, TransNs } from '@/i18n/config';
import Link from 'next/link';
import { FC, useState } from 'react';

interface FAQSProps {
  lang: Lang;
}

const FAQData = [
  {
    problem: 'faq-question1',
    answer: 'faq-answer1'
  },
  {
    problem: 'faq-question2',
    answer: 'faq-answer2'
  },
  {
    problem: 'faq-question3',
    answer: 'faq-answer3'
  },
  {
    problem: 'faq-question4',
    answer: 'faq-answer4'
  }
];

const FAQS: FC<FAQSProps> = ({ lang }) => {
  const { t } = useTranslation(lang, TransNs.LANDING);
  const [expendIndex, setExpendIndex] = useState<number[]>([]);
  return (
    <div className="flex w-full flex-col gap-10 px-5 py-10">
      <div className="flex w-fit flex-col">
        <p className="text-h2 text-[1.375rem] capitalize text-neutral-off-black">{t('FAQS.FAQs')}</p>
        <p className="body-xs mt-5 text-neutral-medium-gray"> {t('FAQS.Can’t find what you’re looking for')}</p>
        <div className="mt-[.625rem] flex items-center gap-4">
          <Link
            href={HACKQUEST_DISCORD}
            className="cursor-pointer hover:scale-[1.1]"
            // onClick={() => {
            //   BurialPoint.track('landing-discord按钮点击');
            // }}
          >
            <span className="text-text-default-color">
              <DiscordIcon color={'#131313'} isMobile />
            </span>
          </Link>
          <Link
            href={HACKQUEST_TWITTER}
            className="cursor-pointer hover:scale-[1.1]"
            // onClick={() => {
            //   BurialPoint.track('landing-推特按钮点击');
            // }}
          >
            <span className="text-text-default-color">
              <TwitterIcon color={'#131313'} isMobile />
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-1  flex-col">
        {FAQData.map((item, index) => {
          return (
            <div
              className={cn(
                `relative flex flex-col gap-5 py-5`,
                index !== FAQData.length - 1 ? 'bottom-line' : '',
                index === 0 ? 'pt-0' : ''
              )}
              key={index}
            >
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => {
                  if (expendIndex.includes(index)) {
                    setExpendIndex(expendIndex.filter((i) => i !== index));
                  } else {
                    setExpendIndex(expendIndex.concat(index));
                  }
                }}
              >
                <p className="body-m-bold text-neutral-rich-gray">{t(`FAQS.${item.problem}` as any)}</p>
                <span className="cursor-pointer">
                  {!expendIndex.includes(index) && (
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 12.8574C22 13.4097 21.5523 13.8574 21 13.8574H13V21.8574C13 22.4097 12.5523 22.8574 12 22.8574C11.4477 22.8574 11 22.4097 11 21.8574V13.8574H3C2.44772 13.8574 2 13.4097 2 12.8574C2 12.3051 2.44772 11.8574 3 11.8574H11V3.85742C11 3.30514 11.4477 2.85742 12 2.85742C12.5523 2.85742 13 3.30514 13 3.85742V11.8574H21C21.5523 11.8574 22 12.3051 22 12.8574Z"
                        fill="#231F20"
                      />
                    </svg>
                  )}
                  {expendIndex.includes(index) && (
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 12.8574C22 13.4097 21.5523 13.8574 21 13.8574H3C2.44772 13.8574 2 13.4097 2 12.8574C2 12.3051 2.44772 11.8574 3 11.8574H21C21.5523 11.8574 22 12.3051 22 12.8574Z"
                        fill="#231F20"
                      />
                    </svg>
                  )}
                </span>
              </div>

              <p className={cn(`body-xs text-neutral-rich-gray`, expendIndex.includes(index) ? 'block' : 'hidden')}>
                {t(`FAQS.${item.answer}` as any)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQS;
