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
import { useCallback, useEffect, useMemo, useState } from 'react';
import TeaserCard from '@/components/Card/Teaser';
import GuidedProjectCard from '@/components/Card/GuidedProject';
import type { GetServerSideProps } from 'next';
import wrapper, { AppDispatch, AppRootState } from '@/store/redux';
import { getCourseList, increment } from '@/store/redux/modules/course';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { CourseResponse, CourseType } from '@/service/webApi/course/type';
import { getCourseLink } from '@/helper/utils';

interface CoursesProps {
  nowCards: CourseResponse[];
  syntaxCards: CourseResponse[];
  tracksCards: CourseResponse[];
  teaserCards: CourseResponse[];
  guidedProjectCards: CourseResponse[];
  conceptCards: CourseResponse[];
}

const renderCard = (card: CourseResponse) => {
  switch (card.type) {
    case CourseType.CONCEPT:
      return (
        <Link href={`${getCourseLink(CourseType.CONCEPT)}/${card.id}`}>
          <ConceptLearningCard
            title={card.name}
            tags={card.level || []}
            description={card.description || ''}
            duration={card.duration || 0}
            unitCount={card.unitCount || 0}
            progress={card.progress || 0}
            cover={'/images/card/ConceptLearning/cover.svg'}
          ></ConceptLearningCard>
        </Link>
      );
    case CourseType.HACKATHON:
      return (
        <Link href={`${getCourseLink(CourseType.HACKATHON)}/${card.id}`}>
          <HackathonCard
            name={card.name}
            tags={card.level || []}
          ></HackathonCard>
        </Link>
      );
    case CourseType.SYNTAX:
      return (
        <Link href={`${getCourseLink(CourseType.SYNTAX)}/${card.id}`}>
          <SyntaxCard
            name={card.name}
            tags={card.level || []}
            description={card.description || ''}
            duration={card.duration || 0}
            unitCount={card.unitCount || 0}
            progress={card.progress || 0}
          ></SyntaxCard>
        </Link>
      );
    case CourseType.LEARNING_TRACKS:
      return (
        <Link href={`${getCourseLink(CourseType.LEARNING_TRACKS)}/${card.id}`}>
          <LearningTracksCard
            name={card.name}
            tags={card.level || []}
            description={card.description || ''}
            duration={card.duration || 0}
            unitCount={card.unitCount || 0}
            progress={card.progress || 0}
          ></LearningTracksCard>
        </Link>
      );
    case CourseType.TEASER:
      return (
        <Link href={`${getCourseLink(CourseType.TEASER)}/${card.id}`}>
          <TeaserCard
            name={card.name}
            description={card.description || ''}
            duration={card.duration || 0}
            unitCount={card.unitCount || 0}
            progress={card.progress || 0}
          ></TeaserCard>
        </Link>
      );
    case CourseType.GUIDED_PROJECT:
      return (
        <Link href={`${getCourseLink(CourseType.GUIDED_PROJECT)}/${card.id}`}>
          <GuidedProjectCard
            name={card.name}
            tags={card.level || []}
            description={card.description || ''}
            duration={card.duration || 0}
            unitCount={card.unitCount || 0}
            progress={card.progress || 0}
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
      title: 'Syntax',
      type: CourseType.SYNTAX
    },
    {
      title: 'Guided Project',
      type: CourseType.GUIDED_PROJECT
    },
    {
      title: 'Concept',
      type: CourseType.CONCEPT
    },
    {
      title: 'Teaser',
      type: CourseType.TEASER
    }
  ];

  const { courseList, count } = useSelector((rootState: AppRootState) => {
    return {
      courseList: rootState.course.courseList,
      count: rootState.course.count
    };
  }, shallowEqual);
  const dispatch: AppDispatch = useDispatch();
  const [selectTab, setSelectTab] = useState<CourseType>(tabs[0].type);
  const [selectCards, setSelectCards] = useState<CourseType[]>([]);

  const onSelect = (item: TabItem) => {
    setSelectTab(item.type);
  };

  const renderCards = useMemo(() => {
    const filterCourseList = courseList?.filter(
      (course) => course.type === selectTab
    );

    return (
      <>
        {filterCourseList.map((card, index) => {
          return <div key={index}>{renderCard(card)}</div>;
        })}
      </>
    );
  }, [selectTab, courseList]);

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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      // 1.触发一个异步的action来发起网络请求, 拿到搜索建议并存到redex中
      await store.dispatch(getCourseList());
      // 2.发起网络请求获取其他数据，通过返回props传递
      return {
        props: {
          nowCards: [
            {
              id: uuid?.v4() || '0',
              type: CourseType.SYNTAX,
              name: 'Introduction to programming',
              level: ['Beginner'],
              description:
                'This course covers the most basic concepts in programming using Solidity as an example.',
              duration: 234,
              unitCount: 5,
              progress: 0.6866
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.HACKATHON,
              name: 'Moonshot 2023 Summer Hackathon',
              level: ['All Tracks', 'Solidity', 'ZK']
              // signUpStart: Date.now(),
              // signUpEnd: Date.now() * 60 * 60 * 60,
              // eventStart: Date.now(),
              // eventEnd: Date.now() * 60 * 60 * 60,
              // grantSize: '200K'
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.LEARNING_TRACKS,
              name: 'Web 3.0 Programming Advanced',
              level: ['Advanced'],
              description:
                'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
              duration: 6464,
              unitCount: 5,
              progress: 0
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.CONCEPT,
              name: 'What is Bitcoin',
              description:
                'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
              duration: 600,
              progress: 0
            }
          ],
          syntaxCards: [
            {
              id: uuid?.v4() || '0',
              type: CourseType.SYNTAX,
              name: 'Introduction to programming',
              level: ['Beginner'],
              description:
                'This course covers the most basic concepts in programming using Solidity as an example.',
              duration: 600,
              unitCount: 5,
              progress: 0
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.SYNTAX,
              name: 'Introduction to programming',
              level: ['Beginner'],
              description:
                'This course covers the most basic concepts in programming using Solidity as an example.',
              duration: 600,
              unitCount: 5,
              progress: 0.94165
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.SYNTAX,
              name: 'Introduction to programming',
              level: ['Beginner'],
              description:
                'This course covers the most basic concepts in programming using Solidity as an example.',
              duration: 600,
              unitCount: 5,
              progress: 0
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.SYNTAX,
              name: 'Introduction to programming',
              level: ['Beginner'],
              description:
                'This course covers the most basic concepts in programming using Solidity as an example.',
              duration: 600,
              unitCount: 5,
              progress: 0.68
            }
          ],
          tracksCards: [
            {
              id: uuid?.v4() || '0',
              type: CourseType.LEARNING_TRACKS,
              name: 'Web 3.0 Programming Advanced',
              level: ['Advanced'],
              description:
                'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
              duration: 6700,
              unitCount: 5,
              progress: 0
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.LEARNING_TRACKS,
              name: 'Web 3.0 Programming Advanced',
              level: ['Advanced'],
              description:
                'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
              duration: 600,
              unitCount: 5,
              progress: 0.999
            }
          ],
          teaserCards: [
            {
              id: uuid?.v4() || '0',
              type: CourseType.TEASER,
              name: 'Deploy Coin',
              description: 'Create your own token in just 10 mins! ',
              duration: 6700,
              unitCount: 5,
              progress: 0
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.TEASER,
              name: 'Deploy Coin',
              description: 'Create your own token in just 10 mins! ',
              duration: 600,
              unitCount: 5,
              progress: 0
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.TEASER,
              name: 'Deploy Coin',
              description: 'Create your own token in just 10 mins! ',
              duration: 600,
              unitCount: 5,
              progress: 0
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.TEASER,
              name: 'Deploy Coin',
              description: 'Create your own token in just 10 mins! ',
              duration: 600,
              unitCount: 5,
              progress: 0
            }
          ],
          guidedProjectCards: [
            {
              id: uuid?.v4() || '0',
              type: CourseType.GUIDED_PROJECT,
              name: 'Web 3.0 Programming Advanced',
              level: ['Advanced'],
              description:
                'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
              duration: 600,
              unitCount: 5,
              progress: 0
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.GUIDED_PROJECT,
              name: 'Web 3.0 Programming Advanced',
              level: ['Advanced'],
              description:
                'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
              duration: 600,
              unitCount: 5,
              progress: 999
            }
          ],
          conceptCards: [
            {
              id: uuid?.v4() || '0',
              type: CourseType.CONCEPT,
              name: 'What is Bitcoin',
              description:
                'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
              duration: 600,
              progress: 0,
              cover: '/images/card/ConceptLearning/cover.svg'
            },
            {
              id: uuid?.v4() || '0',
              type: CourseType.CONCEPT,
              name: 'What is Bitcoin',
              description:
                'Basic concepts in programming of Solidity. Topics include: variables, functions, flow control, error handling, data structure.',
              duration: 600,
              progress: 0,
              cover: '/images/card/ConceptLearning/cover.svg'
            }
          ]
        }
      };
    };
  });

export default Courses;
