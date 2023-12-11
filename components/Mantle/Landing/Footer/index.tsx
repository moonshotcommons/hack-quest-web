import { goToLogin } from '@/helper/utils';
import { FC } from 'react';

interface FooterProps {}

//移动端目前只能跳转外链  跳转内链弹框<TipsModal />
const partnerList = [
  {
    name: 'HACKQUEST',
    links: [
      {
        title: 'LEARNING TRACK',
        url: ''
      },
      {
        title: 'ELECTIVES',
        url: ''
      },
      {
        title: 'CAMPAIGNS',
        url: ''
      },
      {
        title: 'MISSIONS',
        url: ''
      }
    ]
  },
  {
    name: 'SOCIAL MEDIA',
    links: [
      {
        title: 'DISCORD',
        url: 'https://discord.com/invite/hWd9M8mCQh'
      },
      {
        title: 'X',
        url: 'https://twitter.com/HackQuest_'
      },
      {
        title: 'INSTAGRAM',
        url: 'https://www.instagram.com/_hackquest/'
      }
    ]
  },
  {
    name: 'RESOURCES',
    links: [
      {
        title: 'HACKATHON',
        url: 'https://www.hackquest.io/resource-station/hackathon'
      }
      // {
      //   title: 'NEWS',
      //   url: ''
      // },
      // {
      //   title: 'MARKET',
      //   url: ''
      // },
      // {
      //   title: 'ARTICLES',
      //   url: ''
      // },
      // {
      //   title: 'PODCAST',
      //   url: ''
      // },
      // {
      //   title: 'COMMUNITY',
      //   url: ''
      // }
    ]
  }
];

const Footer: FC<FooterProps> = (props) => {
  return (
    <div className="w-full slab:px-[20px] bg-[#0B0B0B]">
      <div className="container mx-auto py-[120px] flex justify-between gap-x-[300px] slab:flex-col slab:gap-[60px]">
        <div className="flex gap-x-[15px]">
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.8799 5.13106L29.8741 5.13683C33.0412 8.30756 35 12.6829 35 17.5L34.2299 34.232L17.5004 35C13.8718 35 10.5011 33.8957 7.70616 32.0047C6.79576 31.3887 5.94645 30.6893 5.1692 29.9173L5.17497 29.9115C1.97905 26.7372 1.5095e-07 22.3416 2.08685e-07 17.5L0.770115 0.767963L17.5004 3.60602e-06C20.5911 3.64287e-06 23.4943 0.801086 26.0142 2.20708C27.4369 3.00091 28.7375 3.98758 29.8806 5.13177L29.8799 5.13106Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27 17.5C27 23.0987 22.9137 27 17.5 27C12.0863 27 8 23.0987 8 17.5C8 11.9013 12.0863 8 17.5 8C22.9137 8 27 11.9013 27 17.5Z"
              fill="#0B0B0B"
            />
          </svg>
          <span className="text-[21px] font-medium text-white leading-[160%] tracking-[0.42px] whitespace-nowrap">
            HackQuest 2023
          </span>
        </div>
        <div className="lg:flex-1 flex justify-between  slab:flex-col slab:gap-[100px]">
          {partnerList.map((item) => {
            return (
              <div key={item.name} className="text-white">
                <div className="text-[24px] slab:text-[20px] font-bold leading-[125%] tracking-[0.48px] whitespace-nowrap">
                  {item.name}
                </div>
                <ul className="mt-[40px] flex flex-col gap-y-[7px] text-[21px] slab:text-[16px] leading-[160%] tracking-[0.42px]">
                  {item.links.map((link, index) => {
                    return (
                      <li
                        key={index}
                        className="hover:underline whitespace-nowrap cursor-pointer"
                        onClick={() => {
                          if (item.name === 'HACKQUEST') {
                            goToLogin();
                          } else {
                            window.open(link.url);
                          }
                        }}
                      >
                        {link.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
