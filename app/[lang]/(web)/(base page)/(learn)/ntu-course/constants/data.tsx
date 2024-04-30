import speakersAvatar1 from '@/public/images/learn/speaker_avatar1.png';
import speakersAvatar2 from '@/public/images/learn/speaker_avatar2.png';
import speakersAvatar3 from '@/public/images/learn/speaker_avatar3.png';
import speakersAvatar4 from '@/public/images/learn/speaker_avatar4.png';
import speakersAvatar5 from '@/public/images/learn/speaker_avatar5.png';
import speakersAvatar6 from '@/public/images/learn/speaker_avatar6.png';
import speakersAvatar7 from '@/public/images/learn/speaker_avatar7.png';
import speakersAvatar8 from '@/public/images/learn/speaker_avatar8.png';
import speakersAvatar9 from '@/public/images/learn/speaker_avatar9.png';
import speakersAvatar10 from '@/public/images/learn/speaker_avatar10.png';
import speakersAvatar11 from '@/public/images/learn/speaker_avatar11.png';
import speakersAvatar12 from '@/public/images/learn/speaker_avatar12.png';
import speakersAvatar13 from '@/public/images/learn/speaker_avatar13.png';
import speakersAvatar14 from '@/public/images/learn/speaker_avatar14.png';
import MorphLogo from '@/public/images/learn/Morph_logo.png';
import OpenCampusLogo from '@/public/images/learn/Open_Campus_logo.png';
import ByteTradeLabLogo from '@/public/images/learn/ByteTrade_Lab_logo.png';
import SolanaFoundationLogo from '@/public/images/learn/Solana_Foundation_logo.png';
import MaskNetworkLogo from '@/public/images/learn/Mask_Network_logo.png';
import MoonshotCommonsLogo from '@/public/images/learn/Moonshot_Commons_logo.png';
import { FaDiscord, FaTelegram, FaWhatsapp } from 'react-icons/fa6';

export const titleTxtData = [
  'ntuCourse.title.overview',
  'ntuCourse.title.classTime',
  'ntuCourse.title.enrollment',
  'ntuCourse.title.syllabus',
  'ntuCourse.title.meetTheGuestSpeakers',
  'ntuCourse.title.meetTheSponsors',
  'ntuCourse.title.courseDescription'
];

export const overviewData = {
  name: 'Ideating and Building in Web3 MOOC',
  time: '6.5/21/2024 - 8/6/2024 (12 sessions)',
  format: 'Hybrid (In-person at NTU and Online on Zoom link)',
  discussionGroups: [
    {
      name: 'Discord',
      icon: (size = 24) => <FaDiscord color="#5865F2" size={size} />,
      link: ''
    },
    {
      name: 'Telegram',
      icon: (size = 24) => <FaTelegram color="#2AABEE" size={size} />,
      link: ''
    },
    {
      name: 'WhatsApp',
      icon: (size = 24) => <FaWhatsapp color="#25D366" size={size} />,
      link: ''
    }
  ],
  registerLink: ''
};

export const classTimeData = {
  class: '9:30-11 am SGT / 8:30-10 pm EST Every Tuesday from 5/21-8/13/2024',
  discussionMentorship: '11:00-11:30 am SGT / 10-10:30 pm EST'
};

export const syllabusData = [
  {
    name: 'Web3 Fundamentals',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Introduction to Blockchain and Smart Contracts - A Technical Perspective',
    time: '',
    description: '',
    speaker: 'Dr. Li Yi, School of Computer Science and Engineering, NTU',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Web2 to Web3: A Developer’s Guide',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Web3 Landscape (I): Infrastructure',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Web3 Landscape (II): DeFi',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Web3 Landscape (III): NFT, GameFi',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'How to Find a Good Idea',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Protocol and Product Design',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Cross-Chain Future: Smart Contract and Interoperability',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'AI in Web3',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Fintech in Web3',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Pitching and Fundraising',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'User Research, Discovery, and Validation',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Incentive Design and Tokenomics',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Web3 Pricing and Business Models',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Go-to-Market / Go-to-Community Strategies',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  },
  {
    name: 'Legal and Regulatory',
    time: '',
    description: '',
    speaker: '',
    video: '',
    slide: '',
    expand: false
  }
];

export const guestSpeakersData = [
  {
    showMore: false,
    name: 'Scott Moore',
    img: speakersAvatar1,
    description:
      "Scott is the Co-Founder at Gitcoin, an internet-native community focused on building and funding digital public goods. He's also an active steward for other public goods focused DAOs including ENS, Gnosis Safe, and Optimism."
  },
  {
    showMore: false,
    name: 'Sergey Gorbunov',
    img: speakersAvatar2,
    description:
      'Sergey is the Co-Founder and Chief Executive Officer of Axelar and an Assistant Professor at the University of Waterloo. He was previously a founding team member at Algorand. He received his Ph.D. from MIT, where he was a Microsoft Ph.D. fellow. His Ph.D. dissertation was on designing cryptographic tools for the cloud using lattice-based cryptography.'
  },
  {
    showMore: false,
    name: 'Harry Kalodner',
    img: speakersAvatar3,
    description:
      'Harry Kalodner is the Co-Founder and Chief Technology Officer at Offchain Labs where he leads the engineering team. Before the company he attended Princeton as a PhD candidate where his research explored economics, anonymity, and incentive compatibility of cryptocurrencies. When not up at 3:00am writing code, Harry occasionally sleeps.'
  },
  {
    showMore: false,
    name: 'Yat Siu',
    img: speakersAvatar4,
    description:
      'Yat is the Co-founder and Executive Chairman of Animoca Brands, a global leader in blockchain and gaming, behind the games The Sandbox, Crazy Kings and Crazy Defense Heroes. Yat Siu is also the founder and CEO of Outblaze, a tech conglomerate specialising in cloud, gaming, and smartphone software.'
  },
  {
    showMore: false,
    name: 'Jonah Lau',
    img: speakersAvatar5,
    description:
      'Jonah is the Head of Product at Animoca Brands and Open Campus, a community-led protocol building a decentralized education ecosystem with products such as Open Campus ID, Publisher NFTs, OC Accelerator, and OC Alliance. Previously, Jonah served as the Product Lead at Magic Eden, SVP of Product at Crypto.com, and co-founder of Clickful (exited in 2019). He attended The London School of Economics and Political Science (LSE).'
  },
  {
    showMore: false,
    name: 'Mohamed Ezeldin',
    img: speakersAvatar6,
    description:
      "Mo is the Head of Tokenomics at Animoca Brands. A mathematician by training, Mo's passion is building tomorrow's economies today, through tokenisation and developing new economical and governance based frameworks and has been working deep in tokenomics space since 2018 and founded the tokenomics department at Animoca Brands on early 2021. Mo leads a global team that has driven dozens of projects for Animoca Brands and their portfolio companies including ApeCoin, Open Campus, Life Beyond, Grapes, and OMA3."
  },
  {
    showMore: false,
    id: '7',
    name: 'Austin Griffith',
    img: speakersAvatar7,
    description: `Austin works for the Ethereum Foundation focusing on developer onboarding, mentoring, and tooling. Dubbed by Vitalik "The Quadratic Freelancer,” Austin funds his own personal income by founding BuidlGuidl, Scaffold-ETH, SpeedRunEthereum, eth.build, and many other cool projects.`
  },
  {
    showMore: false,
    name: 'Azeem Khan',
    img: speakersAvatar8,
    description: `Azeem is the Co-founder of the Ethereum Layer 2, Morph. Celebrated as one of the "2023 Faces of Crypto Philanthropy" by The Giving Block, Azeem's contributions to philanthropy in the crypto sector are widely acknowledged. He's also a consultant to the UNICEF Crypto Fund and is working closely with Mercy Corps on Gaza relief efforts.`
  },
  {
    showMore: false,
    name: 'Anna Yuan',
    img: speakersAvatar9,
    description:
      'Anna is the Growth Lead, Stablecoins and International Markets of Solana Foundation, where she focuses on stablecoins and international markets and works with centralized exchanges, market makers, fiat ramps, and issuers to increase stablecoin accessibility and liquidity. Previously, Anna was the Chief of Staff at Sino-Canada School and a McKinsey consultant. She holds an MBA from Harvard Business School and a BA from the University of Chicago.'
  },
  {
    showMore: false,
    name: 'Jaime Burke',
    img: speakersAvatar10,
    description:
      'As an early investor in Bitcoin and Ether, Jamie went ‘all in’ during 2013 founding Outlier Ventures, Europe’s 1st venture fund and platform dedicated to blockchain and Web 3. Since then, he has grown OV to the leading global Web3 accelerator and founder community (by volume) and most active Web3 investor globally by volume of investments. The team has built a portfolio including industry-defining projects such as Brave Browser, Fetch.ai, Ocean Protocol, DIA Data, Enigma / Secret Network.'
  },
  {
    showMore: false,
    name: 'Suji Yan',
    img: speakersAvatar11,
    description:
      'Suji is the Founder of Mask Network. He studied computer engineering at University of Illinois Urbana-Champaign (UIUC). Dropping out of university at the age of 20, Suji in 2017 founded the decentralized social network Mask Network, which has become a leader in the vibrant decentralized social network ecosystem. In 2022, Suji founded Bonfire Union as a venture arm to strategically invest in decentralized social networks, infrastructure, and creative contents with the goal of making Web3 more accessible to all. Suji is also a firm believer in supporting communities. He has made sizable donations to universities and NGOs such as UIUC, Shanghai JiaoTong University, and RadicalxChange to support related research and events.'
  },
  {
    showMore: false,
    name: 'Dr. Michael Yuan',
    img: speakersAvatar12,
    description:
      'Dr. Michael Yuan is the Founder of Gaianet, a decentralized GenAI agents network, and an advisor at ByteTrade. A astrophysicist (with a PhD focused on blackhole research from the University of Texas) by training, Dr. Yuan has always been a scientist at heart. In recent years, his research has focused on digital health, incorporating lifestyle, behavioral, and genomic insights to improve clinical practices. His research is funded by prestigious organizations including the National Institutes of Health and the Center for Medicare and Medicaid Innovation. Aside from research and academic papers, Dr. Yuan is also the author of 6 books and over 40 published articles. Previously, Dr. Yuan was the founder of a digital health research firm called Ringful Health, whose pioneering work has received national media acclaim from the Wall Street Journal, New York Times, and Los Angeles Times.'
  },
  {
    showMore: false,
    name: 'Dr. Li Yi',
    img: speakersAvatar13,
    description:
      'Dr. Li Yi is an associate professor in the School of Computer Science and Engineering at the Nanyang Technological University (NTU). He studies the security, reliability, and sustainability of modern software systems. His research interests now focus on two areas: (1) sustainability of evolving software systems and (2) security and reliability of decentralized applications running on top of blockchains. Before joining NTU, I was a postdoc at Harvard University (hosted by Jelani Nelson), a postdoc at the Max-Planck Institute for Informatics in Saarbruecken, Germany and a research fellow at the Simons Institute for the Theory of Computing at UC Berkeley. He received a PhD in computer science and engineering from the University of Michigan in 2013 and a BEng from the ACM Class of Shanghai Jiaotong University in 2008.'
  },
  {
    showMore: false,
    name: 'Dr. Ernie Teo',
    img: speakersAvatar14,
    description:
      'Dr. Ernie Teo is a Senior Lecturer in the Nanyang Business School at the Nanyang Technological University (NTU). He received his PhD in Economics and Game Theory from UNSW Australia in 2008. He has held teaching roles at both NTU and NUS. Shifting his trajectory towards industry involvement in 2016, Dr. Ernie Teo took on the role of Research Scientist at the IBM Center for Blockchain Innovation in Singapore. During this phase, he collaborated with various corporate clients on diverse blockchain initiatives. In a remarkable step, he co-founded Dedoco in 2020 — an enterprise application company harnessing blockchain technology. Notably, this endeavour secured an impressive $7.4 million in funding, with investment from the Temasek-backed Vertex Ventures.'
  }
];

export const sponsorsData = [
  {
    showMore: false,
    name: 'Morph',
    img: MorphLogo,
    description:
      'Morph is a Layer 2 consumer blockchain that combines Optimistic and ZK roll-up technologies, providing efficient scaling and security for value-driven decentralized applications (dApps). Its features, including a Decentralized Sequencer Network and Responsive Validity Proof system, aim to ensure scalable, secure, and cost-effective Layer 2 transactions while countering issues like MEV dominance.'
  },
  {
    showMore: false,
    name: 'Open Campus',
    img: OpenCampusLogo,
    description:
      'Open Campus is a DAO and community-led protocol building a decentralized education ecosystem. Open Campus is building the decentralized infrastructure for education through EDU Chain, the first L3 blockchain built for education. EDU Chain is bringing the five trillion-dollar education industry to the blockchain, launching a vibrant DApp ecosystem that reimagines what Learn-to-Earn means. This platform elegantly links learning experiences with earning opportunities, making every step of the journey trackable on the blockchain.'
  },
  {
    showMore: false,
    name: 'ByteTrade Lab',
    img: ByteTradeLabLogo,
    description:
      'ByteTrade Lab, headquartered in Singapore, is backed by Susquehanna International Group (SIG) Asia Venture Capital Fund and some other leading institutional investors including INCE Capital, BAI Capital, Sky9 Capital and NGC Ventures with a recent 50 Million USD Series-A fundraising in June 2022. At ByteTrade, we are actively building our Web3.0Operating System (OS) based on an open Blockchain-EdgeNode-Client (BEC) architecture, a decentralized version of the original full stack internet protocols, that would massively adopt users and decentralized internet applications to Web 3.0 and ultimately return data ownership back to users. Apart from being a Web3.0 OS builder, ByteTrade is also actively involved in incubating and early stage investing of Web 3.0 projects to build our Web3 OS Ecosystem. We aim to enable the builders of Web 3.0 by providing a variety of resources to them including but not limited to: technology expertise, product definition, business planning, GTM strategies and funding.'
  },
  {
    showMore: false,
    name: 'Solana Foundation',
    img: SolanaFoundationLogo,
    description:
      'The Solana Foundation is a non-profit organization located in Zug, Switzerland dedicated to the decentralization, growth, and security of the Solana network. Solana is a proof of stake blockchain built for mass adoption: Fast, composable, green, and globally distributed.'
  },
  {
    showMore: false,
    name: 'Mask Network',
    img: MaskNetworkLogo,
    description:
      'Mask Network build the bridge between Web 2.0 (Platforms such as Twitter) and Web 3.0 - By letting users send encrypted messages to friends, send and receive cryptocurrency and share files, and interact with DApps, all on a decentralized level. Mask Network offers the ability to fund Gitcoin grant campaigns directly from Twitter, as well as plansto offer p2p payments and decentralized storage functionality. It is a decentralized portal that also allows users to use DApps like crypto payments, decentralized finance, decentralized storage, e-commerce (digital goods/NFTs) and decentralized organizations (DAO) over the top of existing social networks without migrating, creating what is referred to as a decentralized Applet (DApplet) ecosystem.'
  },
  {
    showMore: false,
    id: '6',
    name: 'Moonshot Commons',
    img: MoonshotCommonsLogo,
    description:
      'HQed in HK and NYC, Moonshot Commons is a global community for Web3 founders to learn, build, and scale. Within two years, Moonshot community members have raised $110m+ from VCs — with many more launching soon!'
  }
];

export const courseDescriptionData = {
  text: `Web3 has evolved explosively from a nascent concept to an irresistible frontier of entrepreneurship. As decentralized technologies mature into the building blocks for open metaverse economies, smart contract platforms raised over $50 billion in 2022 alone. New unicorn projects now launch monthly across NFTs, digital identity, tokenized fan engagement, governance design, and composable DeFi.\n With web3 inhabiting the cutting edge, immense opportunities await those armed with the right applied blockchain skillsets and community-centric mindsets. Through exposure to successful entrepreneurs, and venture capitalists, as well as an overview of open challenges in the industry, we hope to equip those seeking to conceive and actualize ventures natively built for user ownership.`
};
