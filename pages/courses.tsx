import ConceptLearningCard from '@/components/Card/ConceptLearning';
import HackathonCard from '@/components/Card/Hackathon';
import LearningTracksCard from '@/components/Card/LearningTracks';
import SyntaxCard from '@/components/Card/Syntax';

import Title from '@/components/Common/Title';
import { CardType } from '@/constants/enum';

import { SliderContainer } from '@/components/Common/SliderContainer';
import { NextPage } from 'next';

interface CourseType {
  type: CardType;
  title: string;
  tags?: string[];
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
}

const Courses: NextPage<CoursesProps> = (props) => {
  const { nowCards, syntaxCards, tracksCards } = props;

  const renderCard = (card: CourseType) => {
    switch (card.type) {
      case CardType.CONCEPT_LEARNING:
        return (
          <ConceptLearningCard
            title={card.title}
            tags={card.tags || []}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
            cover={card.cover || ''}
          ></ConceptLearningCard>
        );
      case CardType.HACKATHON:
        return (
          <HackathonCard
            title={card.title}
            tags={card.tags || []}
          ></HackathonCard>
        );
      case CardType.SYNTAX:
        return (
          <SyntaxCard
            title={card.title}
            tags={card.tags || []}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
          ></SyntaxCard>
        );
      case CardType.LEARNING_TRACKS:
        return (
          <LearningTracksCard
            title={card.title}
            tags={card.tags || []}
            description={card.description || ''}
            totalTime={card.totalTime || 0}
            courseCount={card.courseCount || 0}
            completed={card.completed || 0}
          ></LearningTracksCard>
        );
    }
  };

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
      <div className="relative flex gap-[5rem] items-center h-16 top-line bottom-line mt-[2.875rem]">
        <div className="absolute -top-2 left-0 h-1 w-[4.8125rem] rounded-xl bg-gradient-to-t from-[#0891D5] to-[#38C1A5]"></div>
        <h2 className={`text-[#F1F1F1] font-next-poster-Bold text-base`}>
          {'</ Syntax >'}
        </h2>
        <h2
          className={`text-[#F1F1F1] font-next-poster-Thin font-thin text-base`}
        >
          {'Guided Project'}
        </h2>
        <h2
          className={`text-[#F1F1F1] font-next-poster-Thin font-thin text-base`}
        >
          {'Concept Learning'}
        </h2>
        <h2
          className={`text-[#F1F1F1] font-next-poster-Thin font-thin text-base`}
        >
          {'Teaser'}
        </h2>
      </div>
      <div className="flex flex-wrap gap-[3.25rem] mt-10">
        {syntaxCards?.map((card, index) => {
          return <div key={index}>{renderCard(card)}</div>;
        })}
      </div>
    </>
  );
};

Courses.displayName = 'Courses';

Courses.getInitialProps = (context) => {
  return {
    nowCards: [
      {
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
        type: CardType.LEARNING_TRACKS,
        title: 'Web 3.0 Programming Advanced',
        tags: ['Advanced'],
        description:
          'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
        totalTime: 129600,
        courseCount: 5,
        completed: 999
      }
    ]
  };
};

export default Courses;
