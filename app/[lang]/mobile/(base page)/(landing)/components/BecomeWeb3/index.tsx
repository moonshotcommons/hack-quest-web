import Image from 'next/image';
import { FC } from 'react';

const verticalCardData = [
  {
    image: '/images/landing/vertical_card_1.png',
    title: 'Earn official certificates co-issued by leading Web3 ecosystems and HackQuest',
    description:
      'HackQuest partners with leading ecosystems such as Solana and Mantle, making us the only place where you can earn on-chain certificates issued directly by your favorite ecosystems.'
  },
  {
    image: '/images/landing/vertical_card_2.png',
    title: 'Follow zero-to-hero learning paths',
    description:
      'No matter where you are in the Web3 development journey, we can help you to advance with our three learning paths, 10+ syntax courses, and 30+ guided projects. All HackQuest courses are built following Universal Design of Learning (UDL), meaning they are accessible and inclusive for all learners, regardless of abilities or learning styles.'
  }
];

const horizontalCardData = [
  {
    image: '/images/landing/horizontal_card_1.png',
    title: 'Deploy to L1L2s in minutes',
    description:
      'Say bye to hours of software installations before learning! Our embedded browser-IDE empowers you to write, edit, test, and deploy, all within the platform, without the need for any additional software installations.'
  },
  {
    image: '/images/landing/horizontal_card_2.png',
    title: 'Learn beyond traditional courses',
    description:
      'Wondering what to do after the courses? Your journey continues with real-world application and activities. Keep engaged, inspired, and connected with us through hackathons, meet-ups, and blogs.'
  }
];

const BecomeWeb3: FC<{}> = (props) => {
  return (
    <div className="mx-auto w-full px-5 py-10">
      <div className="mx-auto flex flex-col items-center gap-3 text-center">
        <p className="body-s-bold text-[.75rem] uppercase text-neutral-rich-gray">Why us</p>
        <h2 className="text-h2 text-[1.375rem]">Become a Web3 👩🏻‍💻👨🏽‍💻 </h2>
        <p className="body-l text-[.75rem] text-neutral-medium-gray">
          Kickstart your Web3 learning journey with <span className="font-bold">100% FREE</span> courses built by
          experts, certified by leading ecosystems, and supported by a variety of post-learning resources!
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        {verticalCardData.map((item, index) => {
          return (
            <div key={index} className="flex w-full flex-col gap-4 rounded-[1rem] bg-neutral-white p-4">
              <div className="relative h-[12.6875rem] w-full">
                <Image src={item.image} fill alt="hackquest" className="object-contain"></Image>
              </div>
              <h3 className="text-h4-mob text-neutral-off-black">{item.title}</h3>
              <p className="body-xs text-neutral-medium-gray">{item.description}</p>
            </div>
          );
        })}
        {horizontalCardData.map((item, index) => {
          return (
            <div key={index} className="flex w-full flex-col gap-4 rounded-[1rem] bg-neutral-white p-4">
              <div className="relative h-[12.6875rem] w-full">
                <Image src={item.image} fill alt="hackquest" className="object-contain"></Image>
              </div>
              <h3 className="text-h4-mob text-neutral-off-black">{item.title}</h3>
              <p className="body-l body-xs text-neutral-medium-gray">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BecomeWeb3;
