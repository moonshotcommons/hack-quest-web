import { AiOutlineAppstore } from 'react-icons/ai';
import { FiAlertCircle, FiFileText, FiLink } from 'react-icons/fi';
import { RxChatBubble } from 'react-icons/rx';
import { PressNav } from './type';

export const pressKitNavData = [
  {
    id: PressNav.ABOUT,
    label: PressNav.ABOUT,
    icon: <FiAlertCircle />
  },
  {
    id: PressNav.ARTICLES,
    label: PressNav.ARTICLES,
    icon: <FiFileText />
  },
  {
    id: PressNav.LOGOS,
    label: PressNav.LOGOS,
    icon: <AiOutlineAppstore />
  },
  {
    id: PressNav.LINKS,
    label: PressNav.LINKS,
    icon: <FiLink />
  },
  {
    id: PressNav.CONTACT,
    label: PressNav.CONTACT,
    icon: <RxChatBubble />
  }
];

export const aboutData = [];

export const ArticlesData = [
  {
    id: 1,
    title: 'HackQuest co-hosts ETH Shanghai hackathon 2023 with Moonshot Commons and Mask Network',
    img: '',
    descrption:
      'Taking place this summer, the ETH Shanghai hackathon will unite a diverse community of intellectuals and developers worldwide, showcasing their talents and groundbreaking innovations in the field of crypto technology. ',
    time: 'June 24, 2023',
    link: 'https://cointelegraph.com/press-releases/hackquest-co-hosts-eth-shanghai-hackathon-2023-with-moonshot-commons-and-mask-network'
  },
  {
    id: 2,
    title: 'Gen Z Web3 builder community Moonshot Commons launches winter hackathon',
    img: '',
    descrption:
      'Following the success of hosting one of the largest Web3 hackathons six months ago, Moonshot Commons launched its winter hackathon themed “Rethink, Restate, and Recharge” on Dec. 17, 2022.',
    time: 'December 19, 2022',
    link: 'https://cointelegraph.com/press-releases/gen-z-web3-builder-community-moonshot-commons-launches-winter-hackathon'
  },
  {
    id: 3,
    title: 'Mantle Network Launches Mantle Learn With HackQuest to Onboard Web2 Developers to Web3',
    img: '',
    descrption:
      "Combining Mantle Network’s technical prowess and HackQuest's interactive learning modules and built-in IDE, Mantle Learn is set to catapult the accessibility and quality of Web3 developer education.",
    time: 'December 13, 2023',
    link: 'https://decrypt.co/209615/mantle-network-launches-mantle-learn-with-hackquest-to-onboard-web2-developers-to-web3'
  },
  {
    id: 4,
    title:
      'SevenX Ventures Launches Nitro Hackathon with HackQuest, MUD, DOJO, and Moonshot Commons, Focusing on Fully On-Chain Gaming and Web3+AI Applications',
    img: '',
    descrption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    time: 'Jan 02, 2023'
  },
  {
    id: 5,
    title: 'Articles',
    img: '',
    descrption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    time: 'Jan 02, 2023'
  },
  {
    id: 6,
    title: 'Articles',
    img: '',
    descrption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    time: 'Jan 02, 2023'
  }
];

export const logosData = [
  {
    id: 1,
    name: 'Logo Name',
    img: ''
  },
  {
    id: 2,
    name: 'Logo Name',
    img: ''
  },
  {
    id: 3,
    name: 'Logo Name',
    img: ''
  },
  {
    id: 4,
    name: 'Logo Name',
    img: ''
  },
  {
    id: 5,
    name: 'Logo Name',
    img: ''
  },
  {
    id: 6,
    name: 'Logo Name',
    img: ''
  }
];

export const linksData = [
  {
    id: 1,
    img: '',
    path: 'http://hackquest.com',
    name: 'Discord'
  },
  {
    id: 2,
    img: '',
    path: 'http://hackquest.com',
    name: 'Discord'
  },
  {
    id: 3,
    img: '',
    path: 'http://hackquest.com',
    name: 'Discord'
  }
];

export const contactData = [
  {
    id: 1,
    title: 'Press Inquiries',
    content: ['Robin Halpern', 'VP & Head of Investor Relations'],
    path: 'abcd@hackquest.com'
  },
  {
    id: 2,
    title: 'Investor Relations',
    content: ['Robin Halpern', 'VP & Head of Investor Relations'],
    path: 'abcd@hackquest.com'
  }
];
