import Image from 'next/image';
import { FC } from 'react';

interface DifferenceAdvocateProps {}

const dataList = [
  {
    title: 'Be the Face of HackQuest',
    description:
      'Bring HackQuest’s mission to life in your local community - rallying around our captivating vision and invite more frens to join 🚀'
  },
  {
    title: 'Organize Events',
    description:
      'Spark exciting online and IRL HackQuest events - meetups, hackathons, co-learning camps... let’s BUIDL together 🛠️'
  },
  {
    title: 'Educate the Community',
    description:
      'Share learning journey in public and educate the world about Web3 and HackQuest through posts, articles, videos, workshops... educate and inspire ✨'
  },
  {
    title: 'Create an Inclusive Culture',
    description:
      'Welcome all new members with open arms - answer questions, address feedback, provide guidance... regardless of their background and skill level 🙌'
  }
];

const DifferenceAdvocate: FC<DifferenceAdvocateProps> = (props) => {
  return (
    <div className="container mx-auto mt-[100px] flex flex-col items-center">
      <h2 className="text-h2 text-neutral-off-black">
        Make a Difference as an Advocate 💪
      </h2>
      <div className="mt-[3.75rem] flex items-center justify-between gap-20">
        <Image
          src={'/images/advocate/difference_advocate.webp'}
          alt="hackquest"
          width={600}
          height={600}
        ></Image>
        <ul className="flex-1">
          {dataList.map((item, index) => {
            return (
              <li
                key={item.title}
                className={
                  index !== 0
                    ? 'mt-8 border-t border-dashed border-neutral-black pt-8'
                    : ''
                }
              >
                <p className="body-xl-bold pl-3 text-neutral-off-black">
                  {item.title}
                </p>
                <p className="body-s mt-3 pl-3 text-neutral-medium-gray">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DifferenceAdvocate;
