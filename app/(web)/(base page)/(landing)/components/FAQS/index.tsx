'use client';
import DiscordIcon from '@/components/Common/Icon/Discord';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import { cn } from '@/helper/utils';
import Link from 'next/link';
import { FC, useState } from 'react';

interface FAQSProps {}

const FAQData = [
  {
    problem:
      'How many hours of learning are needed for beginners to earn a certificate?',
    answer:
      'Depending on the learning paths, most students spend between eight to twenty hours to finish all the course materials and earn the certificate. '
  },
  {
    problem:
      'Is it possible to enroll in a course if I have no prior coding knowledge?',
    answer:
      'Depending on the learning paths, most students spend between eight to twenty hours to finish all the course materials and earn the certificate. '
  },
  {
    problem:
      'Is there any overlap between courses in learning track and electives?',
    answer:
      'Depending on the learning paths, most students spend between eight to twenty hours to finish all the course materials and earn the certificate. '
  },
  {
    problem: 'Are all courses and post-learning support free?',
    answer:
      'Depending on the learning paths, most students spend between eight to twenty hours to finish all the course materials and earn the certificate. '
  },
  {
    problem: 'Where do I ask for help?',
    answer:
      'Depending on the learning paths, most students spend between eight to twenty hours to finish all the course materials and earn the certificate. '
  }
];

const FAQS: FC<FAQSProps> = (props) => {
  const [expendIndex, setExpendIndex] = useState<number[]>([]);
  return (
    <div className="py-[6.25rem] container mx-auto flex justify-between gap-20">
      <div className="w-fit flex flex-col gap-10">
        <p className="text-h2 text-neutral-off-black capitalize">FAQs</p>
        <p className="body-l text-neutral-medium-gray tracking-tighter">
          Can’t find what you’re looking for? Reach out to us!
        </p>
        <div className="flex gap-8 items-center">
          <Link
            href={'https://discord.gg/KkAJHPqywn'}
            className="hover:scale-[1.1] cursor-pointer"
            // onClick={() => {
            //   BurialPoint.track('landing-discord按钮点击');
            // }}
          >
            <span className="text-text-default-color">
              <DiscordIcon color={'#131313'} />
            </span>
          </Link>
          <Link
            href={'https://x.com/hackquest_?s=21&t=kYetGSBybf-ssFBo7GodGA'}
            className="hover:scale-[1.1] cursor-pointer"
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
              className={`py-5 flex flex-col gap-5 relative ${
                index !== FAQData.length - 1 ? 'bottom-line' : ''
              }`}
              key={index}
            >
              <div
                className="flex justify-between items-center"
                onClick={() => {
                  if (expendIndex.includes(index)) {
                    setExpendIndex(expendIndex.filter((i) => i !== index));
                  } else {
                    setExpendIndex(expendIndex.concat(index));
                  }
                }}
              >
                <p className="body-l-bold text-neutral-rich-gray">
                  {item.problem}
                </p>
                <span className="cursor-pointer">
                  {!expendIndex.includes(index) && (
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 12.8574C22 13.4097 21.5523 13.8574 21 13.8574H13V21.8574C13 22.4097 12.5523 22.8574 12 22.8574C11.4477 22.8574 11 22.4097 11 21.8574V13.8574H3C2.44772 13.8574 2 13.4097 2 12.8574C2 12.3051 2.44772 11.8574 3 11.8574H11V3.85742C11 3.30514 11.4477 2.85742 12 2.85742C12.5523 2.85742 13 3.30514 13 3.85742V11.8574H21C21.5523 11.8574 22 12.3051 22 12.8574Z"
                        fill="#231F20"
                      />
                    </svg>
                  )}
                  {expendIndex.includes(index) && (
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 12.8574C22 13.4097 21.5523 13.8574 21 13.8574H3C2.44772 13.8574 2 13.4097 2 12.8574C2 12.3051 2.44772 11.8574 3 11.8574H21C21.5523 11.8574 22 12.3051 22 12.8574Z"
                        fill="#231F20"
                      />
                    </svg>
                  )}
                </span>
              </div>

              <p
                className={cn(
                  `body-s text-neutral-rich-gray`,
                  expendIndex.includes(index) ? 'block' : 'hidden'
                )}
              >
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
