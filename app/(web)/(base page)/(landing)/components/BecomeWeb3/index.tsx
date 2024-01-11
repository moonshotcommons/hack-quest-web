import Image from 'next/image';
import { FC } from 'react';

const verticalCardData = [
  {
    image: '/images/landing/vertical_card_1.png',
    title:
      'Earn official certificates co-issued by leading Web3 ecosystems and HackQuest',
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
    <div className="container mx-auto pt-[6.25rem]">
      <div className="flex flex-col gap-3 items-center text-center w-[50rem] mx-auto">
        <p className="body-s-bold uppercase text-neutral-rich-gray">Why us</p>
        <h2 className="text-h2">Become a Web3 👩🏻‍💻👨🏽‍💻 </h2>
        <p className="body-l text-neutral-medium-gray">
          Kickstart your Web3 learning journey with{' '}
          <span className="font-bold">100% FREE</span> courses built by experts,
          certified by leading ecosystems, and supported by a variety of
          post-learning resources!
        </p>
      </div>
      <div className="flex flex-col gap-[2rem] mt-[3.75rem]">
        {verticalCardData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex gap-[60px] w-full bg-neutral-white rounded-[24px] p-6"
            >
              <div className="w-[31.25rem] h-[20.125rem] relative">
                <Image
                  src={item.image}
                  fill
                  alt="hackquest"
                  className="object-contain"
                ></Image>
              </div>
              <div className="flex flex-1 flex-col gap-6 justify-center">
                <h3 className="text-h3 text-neutral-off-black">{item.title}</h3>
                <p className="body-l text-neutral-medium-gray">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-[2rem] mt-[2rem]">
        {horizontalCardData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col flex-1 gap-[1.5rem] w-full bg-neutral-white rounded-[24px] p-6"
            >
              <div className="w-[36rem] h-[23.125rem] relative">
                <Image
                  src={item.image}
                  fill
                  alt="hackquest"
                  className="object-contain"
                ></Image>
              </div>
              <h3 className="text-h3 text-neutral-off-black">{item.title}</h3>
              <p className="body-l text-neutral-medium-gray">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BecomeWeb3;
