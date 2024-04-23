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

export const aboutData = [
  {
    title: 'About HackQuest',
    content: [
      'At Moonshot Commons’ Web3 Fireside Chat #22, HashKey Demo Day AMA, we invited speakers from leading infrastructure and middleware projects: Zooey, Co-founder and CEO of Dataverse; Mathew Sweezey, Chief Strategy Officer at Smart Layer; Burnt Banksy, Founder of Burnt (XION); Nicolas Biagosch, Co-initiator of the Q protocol; Mark Rydon, CEO and Co-founder of Aethir, and Greg, Chief Product Officer at ChainSafe.',
      'HashKey Capital is a leading institutional asset manager focused on blockchain technology and digital assets since 2015.'
    ]
  },
  {
    title: 'HackQuest',
    content: ['Therefore, to setup a liquidity pool we just need to:'],
    ul: [
      'After we defined the basic contract, we will set up our liquidity pool.',
      'Assign the token’s address when deploying the contract.',
      'Keep track of the amount of the tokens.'
    ]
  }
];

export const ArticlesData = [
  {
    id: 1,
    title: 'Articles',
    img: '',
    descrption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    time: 'Jan 02, 2023'
  },
  {
    id: 2,
    title: 'Articles',
    img: '',
    descrption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    time: 'Jan 02, 2023'
  },
  {
    id: 3,
    title: 'Articles',
    img: '',
    descrption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
    time: 'Jan 02, 2023'
  },
  {
    id: 4,
    title: 'Articles',
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
