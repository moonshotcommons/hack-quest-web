import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const cardData = [
  {
    title: 'Join Hackathons',
    description:
      'We love hackathons and organize 20+ a year! Apply what you learned by building exciting projects with like-minded enthusiasts around the 🌎',
    image: '/images/landing/community_card_01.png',
    buttonText: 'Explore Hackathons',
    link: '/hackathon'
  },
  {
    title: 'Read and Write Blogs',
    description:
      'We love sharing! Founder secrets, VC analyses, research reports... Read topics beyond coding and share what you learned with the community 📚',
    image: '/images/landing/community_card_02.png',
    buttonText: 'View Blogs',
    link: '/blog'
  },
  {
    title: 'Attend Events',
    description:
      'We love meeting new frens online & IRL! Join our next meet-up, AMA, co-learning camp, or else. You might meet life-long frens here 😉',
    image: '/images/landing/community_card_03.png',
    buttonText: 'View Events',
    link: 'https://moonshotcommons.notion.site/HackQuest-Past-Events-0a39befe0cd643559443d73e945fe0e1?pvs=4'
  },
  {
    title: 'Apply to Join',
    description:
      'We are always looking for talents! Interested in Web3 and want to help more people succeed? Apply to join our rapidly growing family 🙌',
    image: '/images/landing/community_card_04.png',
    buttonText: 'Join Us',
    link: 'https://xsxo494365r.typeform.com/to/p5cEH74M'
  }
];

const CommunityIntroduction: FC<{}> = (props) => {
  return (
    <div className="mt-[2.375rem] w-full px-5 py-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="body-s-bold text-[.75rem] uppercase text-neutral-rich-gray">{`what’s next`}</p>
        <h2 className="text-h2-mob">We Support Beyond 📖</h2>
        <p className="body-xs text-neutral-medium-gray">
          Your learning does not end with courses. Engage with our rapidly
          growing Web3 community!
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-10">
        {cardData.map((item, index) => {
          return (
            <div key={index} className="flex h-fit w-full flex-col gap-6">
              <div className="relative h-[12.5rem] w-full overflow-hidden rounded-[.5rem]">
                <Image
                  src={item.image}
                  alt="hackquest"
                  fill
                  className="object-cover"
                ></Image>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-h4-mob text-neutral-off-black">
                  {item.title}
                </h4>
                <p className="body-xs text-neutral-medium-gray">
                  {item.description}
                </p>
                <Link
                  href={item.link}
                  target="_blank"
                  className="body-xs-bold flex cursor-pointer items-center gap-2"
                >
                  <span className="relative after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-yellow-primary">
                    {item.buttonText}
                  </span>
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 2.57129L8.5 6.1007L3.5 9.63011"
                      stroke="#0B0B0B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityIntroduction;
