import { AiOutlineAppstore } from 'react-icons/ai';
import { FiAlertCircle, FiFileText, FiLink } from 'react-icons/fi';
import { RxChatBubble } from 'react-icons/rx';
import { PressNav } from './type';
import HackquestLogo from '@/public/images/press-kit/hackquest_log.png';
import DiscordLogo from '@/public/images/press-kit/discord_log.png';
import TwitterLogo from '@/public/images/press-kit/twitter_log.png';
import TelegramLogo from '@/public/images/press-kit/telegram_logo.png';
import { HACKQUEST_DISCORD, HACKQUEST_TWITTER, HACKQUEST_TELEGRAM } from '@/constants/links';

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

export const articlesData = [
  {
    title: 'HackQuest co-hosts ETH Shanghai hackathon 2023 with Moonshot Commons and Mask Network',
    time: 'June 24, 2023',
    link: 'https://cointelegraph.com/press-releases/hackquest-co-hosts-eth-shanghai-hackathon-2023-with-moonshot-commons-and-mask-network',
    descrption:
      'Taking place this summer, the ETH Shanghai hackathon will unite a diverse community of intellectuals and developers worldwide, showcasing their talents and groundbreaking innovations in the field of crypto technology. ',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fe022b1ab-8625-4f9f-8f97-117dba25c979%2F22f9bf0651e645fe6f6fe90288c71ee8.jpg?id=e6bd28c4-0cf6-4637-9fee-d0d92db19783&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Gen Z Web3 builder community Moonshot Commons launches winter hackathon',
    time: 'December 19, 2022',
    link: 'https://cointelegraph.com/press-releases/gen-z-web3-builder-community-moonshot-commons-launches-winter-hackathon',
    descrption:
      'Following the success of hosting one of the largest Web3 hackathons six months ago, Moonshot Commons launched its winter hackathon themed “Rethink, Restate, and Recharge” on Dec. 17, 2022.',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fimages.cointelegraph.com%2Fcdn-cgi%2Fimage%2Fformat%3Dauto%2Conerror%3Dredirect%2Cquality%3D90%2Cwidth%3D717%2Fhttps%3A%2F%2Fs3.cointelegraph.com%2Fstorage%2Fuploads%2Fview%2F1df32e3e8868723ec3d8f877c5029b87.jpg?id=6b55f2dd-309a-41fa-b21b-304ee381264d&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Mantle Network Launches Mantle Learn With HackQuest to Onboard Web2 Developers to Web3',
    time: 'December 13, 2023',
    link: 'https://decrypt.co/209615/mantle-network-launches-mantle-learn-with-hackquest-to-onboard-web2-developers-to-web3',
    descrption:
      "Combining Mantle Network’s technical prowess and HackQuest's interactive learning modules and built-in IDE, Mantle Learn is set to catapult the accessibility and quality of Web3 developer education.",
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F5ff63d9d-c864-4c9e-a85a-aad702754371%2Fmantle_learn_x_mantle_1702442663bf4H5BAlqf-gID_7.webp?id=5915bf81-d9fa-4a52-956f-12f676e3cc05&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title:
      'SevenX Ventures Launches Nitro Hackathon with HackQuest, MUD, DOJO, and Moonshot Commons, Focusing on Fully On-Chain Gaming and Web3+AI Applications',
    time: 'August 24, 2023',
    link: 'https://thedefiant.io/sevenx-ventures-launches-nitro-hackathon-with-hackquest-mud-dojo-and-moonshot-commons-focusing-on-fully-on-chain-gaming-and-web3ai-applications',
    descrption:
      'The Nitro Hackathon is the result of a collaboration between pioneers in the field. Moonshot Commons, one of the largest APAC Developer and Founder communities, and HackQuest, a Web3 developer education platform, have also joined forces as co-hosts of the Nitro Hackathon.',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F48be37fe-98b9-4866-82fb-570bcf4d3920%2F1nwbq-ii4rc.jpg?id=f9080299-a334-4721-a0e0-1bdc9f449453&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Solana Foundation, BackPack, Moonshot Commons, and HackQuest Co-host Developer Meetup in Chengdu',
    time: 'August 24, 2023',
    link: 'https://thedefiant.io/solana-foundation-backpack-moonshot-commons-and-hackquest-co-host-developer-meetup-in-chengdu',
    descrption:
      'The partnership aims to support the Solana Foundation in building a thriving developer ecosystem in the Asia-Pacific region by organizing both online and offline developer activities. This remarkable collaboration sets the stage for a promising future, signaling significant advancements in blockchain technology and innovation in the APAC region as a whole.',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F7de08ee5-b176-42fa-b19f-d870af90eab1%2Fdtoow-bf4yj.jpg?id=f6957da0-36fb-4895-9634-af935cf4a84c&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'LightLink Hosts Inaugural APAC Hackathon with HackQuest and Moonshot Commons Ahead of Token Launch',
    time: 'February 13, 2024',
    link: 'https://thedefiant.io/lightlink-hosts-inaugural-apac-hackathon-with-hackquest-and-moonshot-commons-ahead-of-token-launch',
    descrption:
      "LightLink's inaugural APAC hackathon with HackQuest and Moonshot Commons signifies LightLink’s pledge to provide a collaborative environment for developers and to continue enhancing the evolving blockchain landscape.",
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fdd011eae-bf37-43ae-b0f4-77fff922c510%2Ft8pzd-ek62u.jpg?id=2b1c97ad-b362-4728-92bf-a450dbac9a87&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Mantle Network Launches Mantle Learn With HackQuest to Onboard Web2 Developers to Web3',
    time: 'December 13, 2023',
    link: 'https://thedefiant.io/mantle-network-launches-mantle-learn-with-hackquest-to-onboard-web2-developers-to-web3',
    descrption:
      "Combining Mantle Network’s technical prowess and HackQuest's interactive learning modules and built-in IDE, Mantle Learn is set to catapult the accessibility and quality of Web3 developer education.",
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fed119018-724b-4cde-8cd6-ca64b773ef8e%2Fdyxpd-zpmtw.jpg?id=c1d55119-411a-499c-86eb-781881591475&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: '一文速览登月工坊第七期 Apollo Day 22 个入选项目',
    time: 'January 18, 2023',
    link: 'https://www.techflowpost.com/article/detail_11238.html',
    descrption: '登月工坊 2022/2023 Web3冬季黑客松 Apollo Day 成功举办，共 22 个项目脱颖而出进入 Moonshot Apollo Day。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F522335bd-91b7-4739-af9b-0de2bcf800a1%2FTechFlow.jpg?id=1ee55cb1-9fe9-49f9-a537-bd243f3ebb3b&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Moonshot Commons 登月工坊完成种子轮融资，Hash Global 等参投',
    time: 'September 22, 2022',
    link: 'https://www.techflowpost.com/newsletter/detail_22752.html',
    descrption:
      '科技创客社区 Moonshot Commons 登月工坊（原 Moonshot Factory）完成种子轮融资，具体融资金额未披露，Hash Global、HashKey、真格基金、知春资本、ChainIDE、拾象科技、RSS3、Paeonia Ventures 以及个人投资者星球日报创始人 Mandy、IOSG Ventures 创始合伙人 Jocy Lin 等参投。本轮融资将用于拓展校园网络及产品化的尝试。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F522335bd-91b7-4739-af9b-0de2bcf800a1%2FTechFlow.jpg?id=1ee55cb1-9fe9-49f9-a537-bd243f3ebb3b&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: '登月 Moonshot Web3 Hackathon 报名全面开启',
    time: 'November 6, 2022',
    link: 'https://www.techflowpost.com/newsletter/detail_23509.html',
    descrption:
      '登月 2022 Web3 冬季黑客松报名于今日正式开启，本次黑客松由登月工坊 Moonshot Commons、香港科技大学加密金融实验室、Blockchain Academy、IOSG Ventures、RSS3、Aspecta、Ethsign 等联合发起，将于 2022 年 12月19日至2023 年1 月9日进行。为所有热爱 Web3、拥有创造力的海内外 GenZ 提供一个实现自己的想法、快速试错的机会和展示的空间。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F522335bd-91b7-4739-af9b-0de2bcf800a1%2FTechFlow.jpg?id=1ee55cb1-9fe9-49f9-a537-bd243f3ebb3b&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Web3 教育平台 HackQuest 宣布完成 110 万美元 Pre-seed 融资，STEPN、Gitcoin联创等参投',
    time: 'February 24, 2024',
    link: 'https://www.techflowpost.com/newsletter/detail_41388.html',
    descrption:
      'Web3 教育平台 HackQuest 完成宣布完成110 万美元 Pre-seed 融资，StepN 母公司 Find Satoshi Lab，HashKey Capital，ByteTrade Lab，Outlier Ventures，Hash Global，OnePiece Labs，Gitcoin 联合创始人 Scott Moore，Signum Capital 合伙人 YY 等参投，并获得 Open Campus OCX 支持。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F522335bd-91b7-4739-af9b-0de2bcf800a1%2FTechFlow.jpg?id=1ee55cb1-9fe9-49f9-a537-bd243f3ebb3b&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Mantle Network与Web3教育平台HackQuest合作推出Mantle Learn',
    time: 'December 12, 2023',
    link: 'https://www.techflowpost.com/newsletter/detail_35631.html',
    descrption:
      'Layer 2公链Mantle Network宣布与Web3教育平台HackQuest合作推出“Mantle Learn”，并同时将在HackQuest上推出“Mantle Learning Track”，旨在教授开发者如何编写Solidity程序、了解Mantle Network的基础概念、部署技术等内容',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F522335bd-91b7-4739-af9b-0de2bcf800a1%2FTechFlow.jpg?id=1ee55cb1-9fe9-49f9-a537-bd243f3ebb3b&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: '登月Moonshot Web3 Hackathon报名今日开启',
    time: 'November 6, 2022',
    link: 'https://www.odaily.news/newsflash/303959',
    descrption:
      '登月2022 Web3冬季黑客松报名于今日正式开启，将于2022年12月19日至2023年1月9日进行。本次黑客松由登月工坊Moonshot Commons、香港科技大学加密金融实验室、Blockchain Academy、IOSG Ventures、RSS3、Aspecta、Ethsign等联合发起。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F1a5c1fb2-9aed-493d-8fcf-c9a826b745ce%2F2YQby7Cz_400x400.png?id=1219fa0e-8e2c-486a-9033-9a2798afdc31&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'ETHShanghai 2023 Hackathon获奖团队公布',
    time: 'July 7, 2023',
    link: 'https://www.odaily.news/newsflash/328887',
    descrption:
      'ETHShanghai 2023 Online Hackathon于7月7日结束，本次黑客松由Mask Network、ChainIDE、THUBA、Moonshot Commons登月工坊等联合举办。本次黑客松收到400多位来自全球Hackers报名，最终共入选20只团队。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F1a5c1fb2-9aed-493d-8fcf-c9a826b745ce%2F2YQby7Cz_400x400.png?id=1219fa0e-8e2c-486a-9033-9a2798afdc31&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: '开发者教育平台HackQuest获得跨链独角兽公司Axelar基金会资助，将开展开发者教育合作',
    time: 'September 6, 2023',
    link: 'https://www.odaily.news/newsflash/334813',
    descrption:
      'Web3开发者教育平台HackQuest及开发者社区Moonshot Commons登月工坊获得跨链互操作协议独角兽公司Axelar基金会资助，将共同开展开发者教育合作。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F1a5c1fb2-9aed-493d-8fcf-c9a826b745ce%2F2YQby7Cz_400x400.png?id=1219fa0e-8e2c-486a-9033-9a2798afdc31&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'HashKey Capital和HackQuest将共同举办HashKey Portfolio Demo Day',
    time: 'October 20, 2023',
    link: 'https://www.odaily.news/newsflash/339167',
    descrption:
      'HashKey Capital宣布将于10月25日与Web3教育平台HackQuest、开发者社区Moonshot Commons登月工坊等共同举办HashKey Portfolio Demo Day III。来自Infrastructure、MiddleWare赛道的8个HashKey Portfolio Projects将进行线上路演，包括OpenCoord、DataverseOS、Aethir、Burnt（Xion）、ChainSafe Gaming、Sygma、Smart Token Labs等。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F1a5c1fb2-9aed-493d-8fcf-c9a826b745ce%2F2YQby7Cz_400x400.png?id=1219fa0e-8e2c-486a-9033-9a2798afdc31&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Moonshot Commons登月工坊完成种子轮融资，Hash Global等参投',
    time: 'September 12, 2022',
    link: 'https://www.odaily.news/newsflash/298501',
    descrption:
      ' 科技创客社区Moonshot Commons登月工坊（原Moonshot Factory）完成种子轮融资，具体融资金额未披露，Hash Global、HashKey、真格基金、知春资本、ChainIDE、拾象科技、RSS3、Paeonia Ventures以及个人投资者星球日报创始人Mandy、IOSG Ventures创始合伙人Jocy Lin等参投。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F1a5c1fb2-9aed-493d-8fcf-c9a826b745ce%2F2YQby7Cz_400x400.png?id=1219fa0e-8e2c-486a-9033-9a2798afdc31&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Mask Network联合Hack Quest、 Moonshot Commons登月工坊共同主办以太坊上海线上黑客松2023',
    time: 'May 29, 2023',
    link: 'https://www.odaily.news/newsflash/324943',
    descrption:
      ' 以太坊上海筹委会成员Mask Network、Hack Quest、Moonshot Commons登月工坊，将在2023以太坊上海峰会期间共同主办以太坊上海黑客松线上部分。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F1a5c1fb2-9aed-493d-8fcf-c9a826b745ce%2F2YQby7Cz_400x400.png?id=1219fa0e-8e2c-486a-9033-9a2798afdc31&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'HackQuest及Moonshot Commons登月工坊与Solana Foundation达成开发者生态建设合作',
    time: 'August 14, 2023',
    link: 'https://www.odaily.news/newsflash/332665',
    descrption:
      'Web3开发者教育平台HackQuest及Web3开发者社区Moonshot Commons登月工坊宣布与Solana Foundation达成开发者生态与社区合作。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F1a5c1fb2-9aed-493d-8fcf-c9a826b745ce%2F2YQby7Cz_400x400.png?id=1219fa0e-8e2c-486a-9033-9a2798afdc31&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Viction与Web3开发者教育平台HackQuest及登月工坊达成开发者生态官方合作',
    time: 'November 30, 2023',
    link: 'https://www.odaily.news/newsflash/344420',
    descrption:
      'Layer1区块链Viction（原TomoChain）宣布创始人社区Moonshot Commons登月工坊及Web3开发者教育平台HackQuest将作为Viction Horizon黑客松华语区官方合作伙伴，双方将共同拓展开发者生态并联合举办线上AMA等活动，所有登月工坊社区项目将受邀参加黑客松。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: '一文梳理ETHShanghai 2023黑客松20个获奖项目',
    time: 'July 21, 2023',
    link: 'https://www.odaily.news/post/5188533',
    descrption:
      '本届 ETHShanghai 由 Mask Network、 Moonshot Commons 登月工坊、 ChainIDE 和 THUBA 清华区块链协会等核心成员共同筹办。整个活动汇集了近 600 名开发者，涵盖了来自全球范围内、尤其以亚洲为主的开发者和建设者。两周内一共有 84 个团队进行组队，其项目在 Gitcoin 的黑客松平台 Buidlbox.io 上创建。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: '登月工坊第七期Apollo Day22个入选项目一览',
    time: 'January 18, 2023',
    link: 'https://www.odaily.news/post/5184532',
    descrption:
      '共 22 个项目脱颖而出进入 Moonshot Apollo Day。本次黑客松由港科大 Crypto Fintech Lab、Blockchiain Academy、Aspecta、RSS3、KCC、Zettablock、IOSG 等联合举办，共收到全球 216 个项目报名，其中 50 支团队入选进入黑客松 Workshops，最后共 22 支团队进入最后的登月 Apollo Day 向大众展示他们的成果。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: '一文速览首批Mask Grant 18个获选项目',
    time: 'November 25, 2022',
    link: 'https://www.odaily.news/post/5183398',
    descrption:
      'Mask Network 作为赞助方和合作方参与了 2022 年 Moonshot Web 3 Summer Hackathon，见证了 523 个团队报名参加，最终 25 个团队在 South Park Commons NYC.2 中演示了他们的产品。Moonshot 将帮助 Mask Network 不断扩大其在早期创业者中的影响力，并帮助 Mask Network 持续接触到每一代年轻人中的杰出创业想法。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: '一周融资速递 | 43家项目获投；已披露融资总额约为4.36亿美元（9.12-9.18）',
    time: 'September 19, 2022',
    link: 'https://www.odaily.news/post/5181817',
    descrption:
      '9月12日，科技创客社区Moonshot Commons登月工坊（原Moonshot Factory）完成种子轮融资，具体融资金额未披露，Hash Global、HashKey、真格基金、知春资本、ChainIDE、拾象科技、RSS3、Paeonia Ventures以及个人投资者星球日报创始人Mandy、IOSG Ventures创始合伙人Jocy Lin等参投。本轮融资将用于拓展校园网络及产品化的尝试。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Viction 宣布与 Web3 开发者教育平台 HackQuest 及登月工坊达成开发者生态官方合作',
    time: 'November 30, 2023',
    link: 'https://www.chaincatcher.com/article/2107328',
    descrption:
      'Layer1 区块链 Viction（原 TomoChain）宣布创始人社区 Moonshot Commons 登月工坊及 Web3 开发者教育平台 HackQuest 将作为 Viction Horizon 黑客松华语区官方合作伙伴，双方将共同拓展开发者生态并联合举办线上 AMA 等活动，所有登月工坊社区项目将受邀参加黑客松。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'SevenX Ventures 与 HackQuest、MUD、DOJO、 Moonshot Commons 联合发起黑客松，聚焦全链游戏和 Web3 + AI 应用',
    time: 'August 24, 2023',
    link: 'https://www.chaincatcher.com/article/2100050',
    descrption:
      '该活动将围绕“全链游戏”和“ Web3 + AI 应用”两个主题。据悉，黑客松将于 8 月 25 日正式开始，并于 9 月 12 日进行演示与闭幕。此外，黑客松由 Moonshot Commons、HackQuest、Dojo 和 MUD 共同主办。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: '科技创客社区 Moonshot Commons 登月工坊完成种子轮融资，真格基金等参投',
    time: 'September 11, 2022',
    link: 'https://www.chaincatcher.com/article/2079404',
    descrption:
      '科技创客社区 Moonshot Commons 登月工坊（原 Moonshot Factory）完成种子轮融资，具体融资金额未披露，Hash Global、HashKey、真格基金、知春资本、ChainIDE、拾象科技、RSS3、Paeonia Ventures 以及个人投资者星球日报创始人Mandy、IOSG Ventures创始合伙人Jocy Lin等参投。本轮融资将用于拓展校园网络及产品化的尝试。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'LightLink 将与 HackQuest 联合举办 LightLink 亚太黑客松',
    link: '',
    time: 'December 19, 2023',
    descrption:
      'Layer 2 公链 LightLink 宣布将联合 Web3 教育平台 HackQuest 及开发者社区 Moonshot Commons 登月工坊共同于线上举办 LightLink APAC Hackathon: Gasless GameStorm 并举办线下 Hacker House。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: '登月工坊 Moonshot Web3 Hackathon Apollo Day 将于 6.26 日举行',
    time: 'June 24, 2022',
    link: 'https://www.chaincatcher.com/article/2075786',
    descrption:
      '据悉，本次登月工坊 Web 3 Hackathon 由中国、新加坡、美国等地 50 余家生态基金、VC、媒体支持。Mask Network 创始人 Suji Yan 及 Hash Global 创始人 James Shen 将作为 Keynote Speaker 进行讲话。经纬中国、今日资本、火凤资本、真格基金、Sharding Capital、知春资本等基金合伙人将出席 Apollo Day。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Web3 教育平台 HackQuest 宣布完成 110 万美元 Pre-seed 融资，STEPN、Gitcoin 联创等参投',
    time: 'February 24, 2024',
    link: 'https://www.chaincatcher.com/article/2115027',
    descrption:
      'Web3 教育平台 HackQuest 完成宣布完成110 万美元 Pre-seed 融资，StepN 母公司 Find Satoshi Lab，HashKey Capital，ByteTrade Lab，Outlier Ventures，Hash Global，OnePiece Labs，Gitcoin 联合创始人 Scott Moore，Signum Capital 合伙人 YY 等参投，并获得 Open Campus OCX 支持。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Mantle Network 宣布与 Web3 教育平台 HackQuest 合作推出 “Mantle Learn”',
    time: 'December 12, 2023',
    link: 'https://www.chaincatcher.com/article/2108371',
    descrption:
      'Layer 2 公链 Mantle Network 宣布与 Web3 教育平台  HackQuest   合作推出 Mantle Learn ，并同时将在 HackQuest 上推出 “Mantle Learning Track”，旨在教授开发者如何编写 Solidity 程序、了解 Mantle Network 的基础概念、部署技术等内容。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Web3 教育平台 HackQuest 将与 404DAO 共同举办 Web3ATL 黑客松',
    time: 'October 11, 2023',
    link: 'https://www.chaincatcher.com/article/2103433',
    descrption:
      'Web3 教育平台 HackQuest 将与 404DAO 于乔治亚州亚特兰大共同举办 Web3ATL 黑客松。本次黑客松由 Arbitrum Stylus、Chainlink、Revest Finance、Hedera 等赞助，将分为 Stylus Track、Solidity Sprint、Chainlink Track、Revest Finance 等四条赛道。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'NEAR 基金会与 Outlier Ventures 宣布首批 NEAR Base Camp 加速器七家参与公司',
    time: 'September 19, 2023',
    link: 'https://www.chaincatcher.com/article/2102002',
    descrption:
      'NEAR 基金会与 Outlier Ventures 官方发布NEAR Base Camp 加速器首批参与公司名单，分别是 Glass、HackQuest、Meteor Wallet、Quidli、QSTN、Shred Spots 和 V-Art。被选中的七家公司正在努力建设具有现实世界实用案例的项目，吸引 Web2 用户和公司，同时以新颖的方式利用 Web3 增强网络体验。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fb2ad492e-4df3-4ef1-b59a-3aa129215545%2Fimages.jpg?id=f42aa540-39d9-43a9-804a-029e717e47bd&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title:
      'Manta Network announced today that Moonshot Commons (Moonshot) is among the first to join Manta Network as an Ecosystem Incubation Partner.',
    time: 'April 7, 2023',
    link: 'https://www.binance.com/en/feed/post/392085',
    descrption:
      'Manta Network announced today that Moonshot Commons (Moonshot) is among the first to join Manta Network as an Ecosystem Incubation Partner.',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fpublic.bnbstatic.com%2Fimage%2Fpgc%2F202304%2Fd65e50e5119b8891de1e3bfebc7db7ab.jpg?id=4fdb471a-a306-4293-8fa4-4213371f3b57&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'HackQuest and Moonshot Commons partner with Solana Foundation',
    time: 'Mar 29, 2024',
    link: 'https://www.theblockbeats.info/tw/flash/103315',
    descrption:
      "Enhance the developer ecosystem and community cooperation by focusing on building Solana's developer ecosystem in the Asia-Pacific, through both online and offline events, to foster growth and innovation in the Web3 community, providing resources to expand the developer ecosystem, and advancing blockchain technology on the Solana platform.",
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F1a0bb5c5-953e-4ceb-8679-604a17096c73%2Fimages_(2).png?id=ff283818-fd35-41d7-b39c-a89306997776&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Moonshot Commons登月工坊完成種子輪融資，Hash Global等參投',
    time: 'September 11, 2022',
    link: 'https://www.theblockbeats.info/tw/flash/103315',
    descrption:
      '9 月 12 日，科技創客社區 Moonshot Commons 登月工坊（原 Moonshot Factory）完成種子輪融資，具體融資金額未披露，Hash Global、HashKey、真格基金、知春資本、ChainIDE、拾象科技、RSS3、Paeonia Ventures 以及個人投資者星球日報創始人 Mandy、IOSG Ventures 創始合夥人 Jocy Lin 等參投。本輪融資將用於拓展校園網絡及產品化的嘗試。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Ffe3ba248-df51-4ca9-a100-c4898a0e91a1%2Fi4el9P5L_400x400.jpg?id=9c025b18-c54b-4a68-8bfd-e3a426d32184&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Hackers Shine: Moonshot Commons Web3 Hackathon Concludes Successfully',
    time: 'February 10, 2023',
    link: 'https://hackernoon.com/hackers-shine-moonshot-commons-web3-hackathon-concludes-successfully',
    descrption:
      'The winter hackathon was the 7th Hackathon that Moonshot Commons has hosted, as the Web3 builder community celebrates its second anniversary in January. Speaking on the occasion, the founding team said, “even amidst crypto winter, Moonshot is still determined to support smart, scrappy, and globally-minded builders, founders, and researchers in the crypto space.”',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F4ce6d2d9-b869-428f-9b22-fe359107b21e%2F2ng37-f1o9d.jpg?id=dcc424ec-8a30-40a9-a2e9-7ca680249c68&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Moonshot Commons Raises Seed Funding Round',
    time: 'October 31, 2022',
    link: 'https://www.finsmes.com/2022/10/moonshot-commons-raises-seed-funding-round.html',
    descrption:
      'The company intends to use the funds to invest in its global community by curating events such as Mafia Mastermind Sessions (past speakers include founders of StepN, EthSign, DODO, Mask Network, RSS3, etc.), bi-annual Hackathons and Apollo Demo Day, and more.',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F430f1ea6-a4b8-4c11-903a-6f233dd45580%2Fmoonshot-commons.jpeg?id=4745acb0-3fa1-4d31-b201-f876a714fb98&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title:
      'SevenX Ventures Launches Nitro Hackathon with HackQuest, MUD, DOJO, and Moonshot Commons, Focusing on Fully On-Chain Gaming and Web3+AI Applications',
    time: 'August 24, 2023',
    link: 'https://chainwire.org/2023/08/24/sevenx-ventures-launches-nitro-hackathon-with-hackquest-mud-dojo-and-moonshot-commons-focusing-on-fully-on-chain-gaming-and-web3ai-applications/',
    descrption:
      'The hackathon will kick off on August 25th and conclude with a Demo Day on September 12th. The hackathon is co-hosted by Moonshot Commons, HackQuest, Dojo, and MUD.',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2Fcfd98e7a-34e4-4d53-aa08-8b1a15374d17%2FSevenXNitroHackathon_Image1_1692891687cmMTRueAwu.jpg?id=45a9a23e-0686-40b3-9c12-29b0749ec940&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title:
      'Moonshot Commons Raised Seed Round from HashKey Capital to “break geo-barriers” for the next Gen-Z founders in Web3',
    time: 'October 29, 2022',
    link: 'https://www.businesswire.com/news/home/20221027006217/en/Moonshot-Commons-Raised-Seed-Round-from-HashKey-Capital-to-%E2%80%9Cbreak-geo-barriers%E2%80%9D-for-the-next-Gen-Z-founders-in-Web3',
    descrption:
      'Founded by Wharton, Vassar engineering students, Moonshot Commons has recently raised a seed round to “break geo-barriers” for the next Gen-Z founders in Web3. More than 10 top-tier investors and funds participated in this round, including HashKey Capital, Hash Global, Mask Network, IoTex, ChainIDE, Paeonia Ventures, RSS3; in addition to the founders of IOSG, ODaily, and more.',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F1b40329f-e2fa-4964-9549-9e970d9b8dbe%2Fimages_(1).png?id=c236b990-0f16-4d8c-9264-b909d4cdd948&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'HackQuest, Moonshot Commons and Solana Foundation reached developer ecological construction cooperation',
    time: 'August 14, 2023',
    link: 'https://www.coinlive.com/news-flash/201197',
    descrption:
      'Web3 developer education platform HackQuest and Web3 developer community Moonshot Commons Moonshot Workshop announced a developer ecology and community cooperation with Solana Foundation. ',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F8bc1f1a1-97fd-4213-8bb8-3537d38a92a1%2Fimages.png?id=b724f329-0f0b-4b64-a907-5dee9901944b&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title:
      'Web3 education platform HackQuest completed US$1.1 million in Pre-Seed financing, with participation from STEPN, Gitcoin, etc.',
    time: 'February 24, 2024',
    link: 'https://www.coinlive.com/news-flash/449568',
    descrption:
      'Web3 education platform HackQuest announced the completion of $1.1 million in Pre-Seed financing, with STEPN parent company Find Satoshi Lab, HashKey Capital, ByteTrade Lab, Outlier Ventures, Hash Global, OnePiece Labs, Gitcoin co-founder Scott Moore, and Signum Capital as partners People such as YY participated in the investment and received support from Open Campus OCX.',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F8bc1f1a1-97fd-4213-8bb8-3537d38a92a1%2Fimages.png?id=b724f329-0f0b-4b64-a907-5dee9901944b&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
  },
  {
    title: 'Web3教育平台HackQuest完成110万美元Pre-Seed融资，STEPN、Gitcoin联创等参投',
    time: 'February 24, 2024',
    link: 'https://www.odaily.news/newsflash/355793',
    descrption:
      'Web3 教育平台 HackQuest 宣布完成 110 万美元 Pre-Seed 融资，STEPN 母公司 Find Satoshi Lab、HashKey Capital、ByteTrade Lab、Outlier Ventures、Hash Global、OnePiece Labs、Gitcoin 联合创始人 Scott Moore、Signum Capital 合伙人 YY 等参投，并获得 Open Campus OCX 支持。',
    img: 'https://moonshotcommons.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F40ad2819-285a-4795-a80f-f6a1f2a4d3bf%2F933773c7-79d4-4b80-94b1-d6ae773646b0%2F2YQby7Cz_400x400.png?id=fb2dcc8a-00d3-44f7-9033-9af8ca7cf1f7&table=block&spaceId=40ad2819-285a-4795-a80f-f6a1f2a4d3bf&width=2000&userId=&cache=v2'
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
    img: HackquestLogo,
    link: 'https://hackquest.io',
    name: 'HackQuest'
  },
  {
    img: DiscordLogo,
    link: HACKQUEST_DISCORD,
    name: 'Discord'
  },
  {
    img: TwitterLogo,
    link: HACKQUEST_TWITTER,
    name: 'Twitter'
  },
  {
    img: TelegramLogo,
    link: HACKQUEST_TELEGRAM,
    name: 'Telegram'
  }
];

export const contactData = [
  {
    id: 1,
    title: 'Emails',
    content: ['founder@hackquest.io', 'founders@moonshotcommons.com']
  }
];
