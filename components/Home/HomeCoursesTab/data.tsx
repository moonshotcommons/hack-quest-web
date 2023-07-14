import { CourseType } from '@/service/webApi/course/type';
import ConceptLearningCard from '@/components/Card/ConceptLearning';
import HackathonCard from '@/components/Card/Hackathon';
import LearningTracksCard from '@/components/Card/LearningTracks';
import SyntaxCard from '@/components/Card/Syntax';
import GuidedProjectCard from '@/components/Card/GuidedProject';
import TeaserCard from '@/components/Card/Teaser';

export const tabData = [
  {
    title: 'Free Teaser Course',
    type: CourseType.TEASER,
    description:
      'Start your journey with teaser course and have a taste of Web3 in 15 minutes – no signups or logins required',
    cards: [
      {
        id: '48515515-7471-4bdc-95d8-cffdf0c54895',
        name: 'Deploy Your Fungible Token',
        description:
          'Deploy our own token in Ethereum in 15 minutes! Then you may send your token to anyone and check your balance in wallet',
        type: CourseType.TEASER,
        level: 'BEGINNER',
        duration: 15,
        unitCount: 4
      },
      {
        id: '367475c3-1bd0-40e3-9a6d-e0fe220b030c',
        name: 'Deploy Your NFT',
        description:
          'Deploy your own NFT using Remix and check them on OpenSea',
        type: CourseType.TEASER,
        level: 'BEGINNER',
        duration: 15,
        unitCount: 6
      }
    ]
  },
  {
    title: 'Syntax Learning',
    type: CourseType.SYNTAX,
    description: `Learn the no.1 Web3 programming language in bite-sized, 3-5 mins' lessons friendly to all levels`,
    cards: [
      {
        id: '2e2f1305-a5a2-4f24-8ae7-d6b46228824a',
        name: 'Solidity 101 - English',
        description:
          'This is the first intro-level course on Solidity programming. We assume limited CS background and no web3 experience of students. ',
        type: CourseType.SYNTAX,
        level: 'BEGINNER',
        duration: 90,
        unitCount: 7
      },
      {
        id: '12714c18-cf3f-4946-9cf7-e6ec49e59e26',
        name: 'Solidity 101 - 中文',
        description:
          '这是第一门关于 Solidity 编程的入门课程。 我们假设学生的 CS 背景有限且没有 web3 经验。',
        type: CourseType.SYNTAX,
        level: 'BEGINNER',
        duration: 90,
        unitCount: 7
      }
    ]
  },
  {
    title: 'Guided Project ',
    type: CourseType.GUIDED_PROJECT,
    description:
      'Build projects that changed ETH landscape step-by-step and deploy in your favorite ecosystem',
    cards: [
      {
        id: 'e3703f91-a445-400e-a84b-c053d280d0c7',
        name: 'Fungible Token',
        description:
          'Here we will write our first project which is a fungible token that users could mint, check balance, and transfer.',
        type: CourseType.GUIDED_PROJECT,
        level: 'BEGINNER',
        duration: 90,
        unitCount: 7
      },
      {
        id: 'a141a4c3-c125-4bb1-b7a8-3627dd107b8b',
        name: 'NFT - Part 1',
        description:
          'The first part of our NFT contract, including mint NFT, query NFT by tokenId and query tokens by owner. ',
        type: 'GUIDED_PROJECT',
        level: 'BEGINNER',
        duration: 75,
        unitCount: 5
      }
    ]
  },
  {
    title: 'Learning Track',
    type: CourseType.LEARNING_TRACKS,
    description:
      'Dive deep into your favorite ecosystem through an official end-to-end learning journey. Mint a learning certificate, claim tokens, and qualify for airdrops!',
    cards: [
      {
        id: '0',
        type: CourseType.LEARNING_TRACKS,
        name: 'Web 3.0 Programming Advanced',
        level: ['Advanced'],
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        duration: 6700,
        unitCount: 5
      },
      {
        id: '1',
        type: CourseType.LEARNING_TRACKS,
        name: 'Web 3.0 Programming Advanced',
        level: ['Advanced'],
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        duration: 600,
        unitCount: 5
      }
    ]
  },
  {
    title: 'Concept Learning',
    type: CourseType.CONCEPT,
    description:
      'Reimagine lengthy and jargon-packed blog posts with HackQuest concept learning. Chat with Vitalik and explore Blockchain concepts like ledger, hash, and node in a fun, interactive, and quirky way.',
    cards: [
      {
        id: '7cb64544-9a0e-4b2a-839c-58a915cfb4d9',
        name: '稳定币',
        description:
          '稳定币是加密世界的一个不可或缺的部分，今天就让我们深入的了解一下到底什么事稳定币。',
        type: 'CONCEPT',
        level: 'BEGINNER',
        duration: 20,
        unitCount: 1
      }
    ]
  }
];

export const renderCard = (card: any) => {
  switch (card.type) {
    case CourseType.CONCEPT:
      return (
        <ConceptLearningCard
          title={card.name}
          tags={card.level || []}
          description={card.description || ''}
          duration={card.duration || 0}
          unitCount={card.unitCount || 0}
          progress={0}
          cover={'/images/card/ConceptLearning/cover.svg'}
        ></ConceptLearningCard>
      );
    case CourseType.HACKATHON:
      return (
        <HackathonCard name={card.name} tags={card.level || []}></HackathonCard>
      );
    case CourseType.SYNTAX:
      return (
        <SyntaxCard
          name={card.name}
          tags={card.level || []}
          description={card.description || ''}
          duration={card.duration || 0}
          unitCount={card.unitCount || 0}
          progress={0}
        ></SyntaxCard>
      );
    case CourseType.LEARNING_TRACKS:
      return (
        <LearningTracksCard
          name={card.name}
          tags={card.level || []}
          description={card.description || ''}
          duration={card.duration || 0}
          courseCount={card.unitCount || 0}
          progress={0}
        ></LearningTracksCard>
      );
    case CourseType.TEASER:
      return (
        <TeaserCard
          name={card.name}
          description={card.description || ''}
          duration={card.duration || 0}
          unitCount={card.unitCount || 0}
          progress={0}
        ></TeaserCard>
      );
    case CourseType.GUIDED_PROJECT:
      return (
        <GuidedProjectCard
          name={card.name}
          tags={card.level || []}
          description={card.description || ''}
          duration={card.duration || 0}
          unitCount={card.unitCount || 0}
          progress={0}
        ></GuidedProjectCard>
      );
  }
};
