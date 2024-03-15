import Image from 'next/image';
import { ReactNode } from 'react';

type EmojiType = 'cn' | 'pt' | 'sg' | 'us';

const EmojiText = ({
  type,
  children
}: {
  type: EmojiType;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="relative h-4 w-4">
        <Image src={`/images/emoji/${type}.png`} fill alt="type"></Image>
      </div>{' '}
      {children}
    </div>
  );
};

export const topDataList = [
  {
    title: 'ETH Shanghai',
    image: '/images/advocate/community_IRL/community_IRL_top_01.webp',
    date: 'June 25, 2023 → July 7, 2023',
    place: <EmojiText type="cn">Shanghai, China</EmojiText>
  },
  {
    title: 'Solana Chengdu Developer Meetup',
    image: '/images/advocate/community_IRL/community_IRL_top_02.webp',
    date: 'August 12, 2023',
    place: <EmojiText type="cn">Chengdu, China</EmojiText>
  },
  {
    title: 'Nitro Hackathon & New Trends Summit',
    image: '/images/advocate/community_IRL/community_IRL_top_03.webp',
    date: 'Aug 25, 2023 → Sep 12, 2023',
    place: <EmojiText type="sg">Online & Singapore</EmojiText>
  },
  {
    title: 'Permissionless',
    image: '/images/advocate/community_IRL/community_IRL_top_04.webp',
    date: 'Sep 9, 2023 → Sep 13, 2023',
    place: <EmojiText type="us">Austin, TX, USA</EmojiText>
  },
  {
    title: 'Axelar Co-learning camp',
    image: '/images/advocate/community_IRL/community_IRL_top_05.webp',
    date: 'Sep 1, 2023 → Sep 14, 2023',
    place: <EmojiText type="cn">Online & Shanghai</EmojiText>
  },
  {
    title: 'ETH Chicago',
    image: '/images/advocate/community_IRL/community_IRL_top_06.webp',
    date: 'Sep 15, 2023 → Sep 17, 2023',
    place: <EmojiText type="us">Chicago, IL, USA</EmojiText>
  },
  {
    title: 'Solana HangZhou Hacker House',
    image: '/images/advocate/community_IRL/community_IRL_top_07.webp',
    date: 'Sep 18, 2023 → Sep 23, 2023',
    place: <EmojiText type="cn">HangZhou, China</EmojiText>
  }
];

export const bottomDataList = [
  {
    title: 'NEAR Ignite the Future',
    image: '/images/advocate/community_IRL/community_IRL_bottom_01.webp',
    date: 'September 21, 2023',
    place: <EmojiText type="us">New York, NY, USA</EmojiText>
  },
  {
    title: 'Web3ATL',
    image: '/images/advocate/community_IRL/community_IRL_bottom_02.webp',
    date: 'Nov 3, 2023 → Nov 5, 2023',
    place: <EmojiText type="us">Atlanta, GA</EmojiText>
  },
  {
    title: 'NEARCON',
    image: '/images/advocate/community_IRL/community_IRL_bottom_03.webp',
    date: 'Nov 7, 2023 → Nov 10, 2023',
    place: <EmojiText type="pt">Lisbon, Portugal</EmojiText>
  },
  {
    title: 'Solana HyperDrive Hackathon',
    image: '/images/advocate/community_IRL/community_IRL_bottom_04.webp',
    date: 'November 21, 2023',
    place: <EmojiText type="cn">Online</EmojiText>
  },
  {
    title: 'Solana Chengdu Afternoon Tea Party',
    image: '/images/advocate/community_IRL/community_IRL_bottom_05.webp',
    date: 'November 25, 2023',
    place: <EmojiText type="cn">Chengdu, China</EmojiText>
  },
  {
    title: 'LightLink APAC Hackathon & Hacker House',
    image: '/images/advocate/community_IRL/community_IRL_bottom_06.webp',
    date: 'Dec 13, 2023 → Jan 5, 2024',
    place: <EmojiText type="cn">ChengDu, China</EmojiText>
  },
  {
    title: 'Solana Hangzhou Meet-up',
    image: '/images/advocate/community_IRL/community_IRL_bottom_07.webp',
    date: 'December 24, 2023',
    place: <EmojiText type="cn">HangZhou, China</EmojiText>
  }
];
