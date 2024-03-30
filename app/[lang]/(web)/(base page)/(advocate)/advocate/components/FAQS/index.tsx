'use client';
import DiscordIcon from '@/components/Common/Icon/Discord';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import { HACKQUEST_DISCORD, HACKQUEST_TWITTER } from '@/constants/links';
import { cn } from '@/helper/utils';
import Link from 'next/link';
import { FC, useState } from 'react';

interface FAQSProps {}

const FAQData = [
  {
    problem: 'I am currently an advocate for other communities. Am I still eligible to be an advocate for HackQuest? ',
    answer:
      'Absolutely! You can be an advocate for us while running other communities. We welcome collaborations across communities as well.'
  },
  {
    problem: 'Do I have to be a Web 3.0 developer to be qualified as an advocate?',
    answer:
      'No! You don’t have to be a developer or work full-time in web3 at all to be an advocate. As long as you’re passionate about Web 3.0 and like to empower others and organize events, you’re more than welcome to apply. In fact, we are launching other career tracks outside of smart contract development soon. Stay tuned!'
  },
  {
    problem: 'What can I get from being an advocate?',
    answer:
      'At HackQuest, we offer a comprehensive benefit package to our advocates. There are monetary benefits for the task you complete (yes you are not doing unpaid work), meeting with Web 3.0 industry leaders, turning your proposed events into reality, unique opportunities to convert into a fellow, intern, or even full-time employee at HackQuest, and so much more!'
  },
  {
    problem: 'What do I need to prepare for events? Do I have to prepare materials by myself?',
    answer: `No need to sweat about prepping! We provide swags for you to use. All you need to do is to write down your ideas in a proposal and submit them to us, so we can help you to make it real.`
  },
  {
    problem: 'What is the time commitment of an advocate?',
    answer: `It’s entirely up to you! Most advocates do extras and stay active. However, the base requirements as an advocate should take ~3-5 hours per month.`
  }
];

const FAQS: FC<FAQSProps> = (props) => {
  const [expendIndex, setExpendIndex] = useState<number[]>([]);
  return (
    <div className="container mx-auto flex max-w-[1280px] justify-between gap-20 py-[6.25rem]">
      <div className="flex w-[400px] max-w-[400px] flex-col gap-10">
        <p className="text-h2 capitalize text-neutral-off-black">FAQs</p>
        <p className="body-l tracking-tighter text-neutral-medium-gray">
          For more questions, join our Discord / Telegram and DM your question directly!
        </p>
        <div className="flex items-center gap-8">
          <Link
            href={HACKQUEST_DISCORD}
            className="cursor-pointer hover:scale-[1.1]"
            // onClick={() => {
            //   BurialPoint.track('landing-discord按钮点击');
            // }}
          >
            <span className="text-text-default-color">
              <DiscordIcon color={'#131313'} />
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
              <TwitterIcon color={'#131313'} />
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
                <p className="body-l-bold text-neutral-rich-gray">{item.problem}</p>
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

              <p className={cn(`body-s text-neutral-rich-gray`, expendIndex.includes(index) ? 'block' : 'hidden')}>
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQS;
