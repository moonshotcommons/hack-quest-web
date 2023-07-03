import ConceptLearningCard from '@/components/Card/ConceptLearning';
import HackathonCard from '@/components/Card/Hackathon';
import LearningTracksCard from '@/components/Card/LearningTracks';
import SyntaxCard from '@/components/Card/Syntax';

import Title from '@/components/Common/Title';
import { CardType, TabType } from '@/constants/enum';

import { SliderContainer } from '@/components/Common/SliderContainer';
import { NextPage } from 'next';
import Link from 'next/link';
import uuid from 'uuid';
import Tab, { TabItem } from '@/components/Common/Tab';
import { useEffect, useMemo, useState } from 'react';
import TeaserCard from '@/components/Card/Teaser';
import GuidedProjectCard from '@/components/Card/GuidedProject';
interface CourseType {
  id: string;
  type: CardType;
  title: string;
  tags?: string[];
  label?: string;
  description?: string;
  totalTime?: number;
  courseCount?: number;
  completed?: number;
  cover?: string;
}

interface CoursesProps {
  nowCards: CourseType[];
  syntaxCards: CourseType[];
  tracksCards: CourseType[];
  teaserCards: CourseType[];
  guidedProjectCards: CourseType[];
  conceptCards: CourseType[];
}

const renderCard = (card: CourseType) => {
  switch (card.type) {
    case CardType.CONCEPT_LEARNING:
      return (
        <Link href={`/concept/${card.id}`}>
          <ConceptLearningCard
            title={card.title}
            tags={card.tags || []}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
            cover={card.cover || ''}
          ></ConceptLearningCard>
        </Link>
      );
    case CardType.HACKATHON:
      return (
        <Link href={`/hackathon/${card.id}`}>
          <HackathonCard
            title={card.title}
            tags={card.tags || []}
          ></HackathonCard>
        </Link>
      );
    case CardType.SYNTAX:
      return (
        <Link href={`/syntax/${card.id}`}>
          <SyntaxCard
            title={card.title}
            tags={card.tags || []}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
          ></SyntaxCard>
        </Link>
      );
    case CardType.LEARNING_TRACKS:
      return (
        <Link href={`/learning-track/${card.id}`}>
          <LearningTracksCard
            title={card.title}
            tags={card.tags || []}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
          ></LearningTracksCard>
        </Link>
      );
    case CardType.TEASER:
      return (
        <Link href={`/teaser/${card.id}`}>
          <TeaserCard
            title={card.title}
            label={card.label || ''}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
          ></TeaserCard>
        </Link>
      );
    case CardType.GUIDED_PROJECT:
      return (
        <Link href={`/guided-project/${card.id}`}>
          <GuidedProjectCard
            title={card.title}
            tags={card.tags || []}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
          ></GuidedProjectCard>
        </Link>
      );
  }
};

const Courses: NextPage<CoursesProps> = (props) => {
  const {
    nowCards,
    syntaxCards,
    tracksCards,
    teaserCards,
    guidedProjectCards,
    conceptCards
  } = props;
  const tabs: TabItem[] = [
    {
      title: '</ Syntax >',
      type: TabType.SYNTAX
    },
    {
      title: 'Guided Project',
      type: TabType.GUIDED_PROJECT
    },
    {
      title: 'Concept Learning',
      type: TabType.CONCEPT_LEARNING
    },
    {
      title: 'Teaser',
      type: TabType.TEASER
    }
  ];

  const [selectTab, setSelectTab] = useState<TabType>(tabs[0].type);
  const [selectCards, setSelectCards] = useState<CourseType[]>([]);

  const onSelect = (item: TabItem) => {
    setSelectTab(item.type);
  };

  const renderCards = useMemo(() => {
    switch (selectTab) {
      case TabType.SYNTAX:
        return syntaxCards?.map((card, index) => {
          return <div key={index}>{renderCard(card)}</div>;
        });
      case TabType.GUIDED_PROJECT:
        return guidedProjectCards?.map((card, index) => {
          return <div key={index}>{renderCard(card)}</div>;
        });
      case TabType.CONCEPT_LEARNING:
        return conceptCards?.map((card, index) => {
          return <div key={index}>{renderCard(card)}</div>;
        });
      case TabType.TEASER:
        return teaserCards?.map((card, index) => {
          return <div key={index}>{renderCard(card)}</div>;
        });
    }
  }, [selectTab, syntaxCards, conceptCards, guidedProjectCards, teaserCards]);

  return (
    <>
      <Title className="font-bold">{'</Trending Now>'}</Title>
      <SliderContainer>
        <div className="flex w-[114rem] h-[17.625rem] gap-[3.25rem] items-end">
          {nowCards?.map((card, index) => {
            return <div key={index}>{renderCard(card)}</div>;
          })}
        </div>
      </SliderContainer>
      <Title className="font-bold">{'</Learning Tracks>'}</Title>
      <SliderContainer>
        <div className="flex h-[17.625rem] gap-[3.25rem] items-end">
          {tracksCards?.map((card, index) => {
            return <div key={index}>{renderCard(card)}</div>;
          })}
        </div>
      </SliderContainer>
      <div className="mt-[2.875rem]">
        <Tab tabs={tabs} onSelect={onSelect} defaultSelect={selectTab}></Tab>
      </div>

      <div className="flex flex-wrap gap-[3.25rem] mt-10">{renderCards}</div>
    </>
  );
};

Courses.displayName = 'Courses';

Courses.getInitialProps = (context) => {
  return {
    nowCards: [
      {
        id: uuid?.v4() || '0',
        type: CardType.SYNTAX,
        title: 'Introduction to programming',
        tags: ['Beginner'],
        description:
          'This course covers the most basic concepts in programming using Solidity as an example.',
        totalTime: 129600,
        courseCount: 5,
        completed: 58320
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.HACKATHON,
        title: 'Moonshot 2023 Summer Hackathon',
        tags: ['All Tracks', 'Solidity', 'ZK'],
        signUpStart: Date.now(),
        signUpEnd: Date.now() * 60 * 60 * 60,
        eventStart: Date.now(),
        eventEnd: Date.now() * 60 * 60 * 60,
        grantSize: '200K'
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.LEARNING_TRACKS,
        title: 'Web 3.0 Programming Advanced',
        tags: ['Advanced'],
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        totalTime: 129600,
        courseCount: 5,
        completed: 0
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.CONCEPT_LEARNING,
        title: 'What is Bitcoin',
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        totalTime: 129600,
        completed: 0,
        cover: '/images/card/ConceptLearning/cover.svg'
      }
    ],
    syntaxCards: [
      {
        id: uuid?.v4() || '0',
        type: CardType.SYNTAX,
        title: 'Introduction to programming',
        tags: ['Beginner'],
        description:
          'This course covers the most basic concepts in programming using Solidity as an example.',
        totalTime: 129600,
        courseCount: 5,
        completed: 0
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.SYNTAX,
        title: 'Introduction to programming',
        tags: ['Beginner'],
        description:
          'This course covers the most basic concepts in programming using Solidity as an example.',
        totalTime: 129600,
        courseCount: 5,
        completed: 94165
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.SYNTAX,
        title: 'Introduction to programming',
        tags: ['Beginner'],
        description:
          'This course covers the most basic concepts in programming using Solidity as an example.',
        totalTime: 129600,
        courseCount: 5,
        completed: 0
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.SYNTAX,
        title: 'Introduction to programming',
        tags: ['Beginner'],
        description:
          'This course covers the most basic concepts in programming using Solidity as an example.',
        totalTime: 129600,
        courseCount: 5,
        completed: 58320
      }
    ],
    tracksCards: [
      {
        id: uuid?.v4() || '0',
        type: CardType.LEARNING_TRACKS,
        title: 'Web 3.0 Programming Advanced',
        tags: ['Advanced'],
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        totalTime: 129600,
        courseCount: 5,
        completed: 0
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.LEARNING_TRACKS,
        title: 'Web 3.0 Programming Advanced',
        tags: ['Advanced'],
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        totalTime: 129600,
        courseCount: 5,
        completed: 999
      }
    ],
    teaserCards: [
      {
        id: uuid?.v4() || '0',
        type: CardType.TEASER,
        title: 'Deploy Coin',
        label: 'Free teaser course',
        description: 'Create your own token in just 10 mins! ',
        totalTime: 129600,
        courseCount: 5,
        completed: 0
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.TEASER,
        title: 'Deploy Coin',
        label: 'Free teaser course',
        description: 'Create your own token in just 10 mins! ',
        totalTime: 129600,
        courseCount: 5,
        completed: 0
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.TEASER,
        title: 'Deploy Coin',
        label: 'Free teaser course',
        description: 'Create your own token in just 10 mins! ',
        totalTime: 129600,
        courseCount: 5,
        completed: 0
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.TEASER,
        title: 'Deploy Coin',
        label: 'Free teaser course',
        description: 'Create your own token in just 10 mins! ',
        totalTime: 129600,
        courseCount: 5,
        completed: 0
      }
    ],
    guidedProjectCards: [
      {
        id: uuid?.v4() || '0',
        type: CardType.GUIDED_PROJECT,
        title: 'Web 3.0 Programming Advanced',
        tags: ['Advanced'],
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        totalTime: 129600,
        courseCount: 5,
        completed: 0
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.GUIDED_PROJECT,
        title: 'Web 3.0 Programming Advanced',
        tags: ['Advanced'],
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        totalTime: 129600,
        courseCount: 5,
        completed: 999
      }
    ],
    conceptCards: [
      {
        id: uuid?.v4() || '0',
        type: CardType.CONCEPT_LEARNING,
        title: 'What is Bitcoin',
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        totalTime: 129600,
        completed: 0,
        cover: '/images/card/ConceptLearning/cover.svg'
      },
      {
        id: uuid?.v4() || '0',
        type: CardType.CONCEPT_LEARNING,
        title: 'What is Bitcoin',
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        totalTime: 129600,
        completed: 0,
        cover: '/images/card/ConceptLearning/cover.svg'
      }
    ]
  };
};

export default Courses;
