import ConceptLearningCard from '@/components/Card/ConceptLearning';
import HackathonCard from '@/components/Card/Hackathon';
import LearningTracksCard from '@/components/Card/LearningTracks';
import SyntaxCard from '@/components/Card/Syntax';
import GuidedProjectCard from '@/components/Card/GuidedProject';
import TeaserCard from '@/components/Card/Teaser';

import Title from '@/components/Common/Title';
import { CardType, TabType } from '@/constants/enum';
import { SliderContainer } from '@/components/Common/SliderContainer';
import { NextPage } from 'next';
import Link from 'next/link';
import uuid from 'uuid';
import Tab, { TabItem } from '@/components/Common/Tab';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { GetServerSideProps } from 'next';
import wrapper, { AppDispatch, AppRootState } from '@/store/redux';
import { getCourseList, increment } from '@/store/redux/modules/course';
import { useDispatch, useSelector, shallowEqual, useStore } from 'react-redux';
import { CourseResponse, CourseType } from '@/service/webApi/course/type';
import { getCourseLink } from '@/helper/utils';
import { useRouter } from 'next/router';
import { useScrollToElement } from '@/hooks/useScrollToElement';
import { coursesTabs } from '@/constants';
import { renderCourseCard, renderLearningTrackCard } from '@/helper/renderCard';
import webApi from '@/service';
import { useGetLearningTracks } from '@/hooks/useLearningTrackHooks/useLearningTracks';

interface CoursesProps {
  nowCards: CourseResponse[];
  syntaxCards: CourseResponse[];
  tracksCards: CourseResponse[];
  teaserCards: CourseResponse[];
  guidedProjectCards: CourseResponse[];
  conceptCards: CourseResponse[];
}

const Courses: NextPage<CoursesProps> = (props) => {
  const { nowCards } = props;

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { courseType } = router.query;
  const hashCourseTypeRef = useRef<HTMLElement>();

  useScrollToElement(hashCourseTypeRef.current, courseType as CourseType);

  const { courseList } = useSelector((rootState: AppRootState) => {
    return {
      courseList: rootState.course.courseList
    };
  }, shallowEqual);

  const { learningTracks } = useGetLearningTracks();

  const [selectTab, setSelectTab] = useState<CourseType>(
    (courseType as CourseType) || coursesTabs[0].type
  );

  const onSelect = (item: TabItem) => {
    setSelectTab(item.type);
  };

  const SelectCourseCards = useMemo(() => {
    const filterCourseList = courseList?.filter(
      (course) => course.type === selectTab
    );

    return (
      <>
        {filterCourseList.map((card, index) => {
          return <div key={index}>{renderCourseCard(card)}</div>;
        })}
      </>
    );
  }, [selectTab, courseList]);

  useEffect(() => {
    dispatch(getCourseList());
  }, [dispatch]);

  return (
    <>
      <Title className="font-bold">{'</Trending Now>'}</Title>
      <SliderContainer>
        <div className="flex w-[114rem] h-[17.625rem] gap-[3.25rem] items-end">
          {nowCards?.map((course, index) => {
            return <div key={index}>{renderCourseCard(course)}</div>;
          })}
        </div>
      </SliderContainer>
      <Title className="font-bold">{'</Learning Tracks>'}</Title>
      <SliderContainer>
        <div className="flex h-[17.625rem] gap-[3.25rem] items-end">
          {learningTracks?.map((learningTrack, index) => {
            return (
              <div key={index}>{renderLearningTrackCard(learningTrack)}</div>
            );
          })}
        </div>
      </SliderContainer>
      <div ref={hashCourseTypeRef as any}>
        <div className="mt-[2.875rem]">
          <Tab
            tabs={coursesTabs}
            onSelect={onSelect}
            defaultSelect={selectTab}
          ></Tab>
        </div>
        <div className="flex flex-wrap gap-[3.25rem] mt-10">
          {SelectCourseCards}
        </div>
      </div>
    </>
  );
};

Courses.displayName = 'Courses';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      // 1.触发一个异步的action来发起网络请求, 拿到搜索建议并存到redex中
      // await store.dispatch(getCourseList());
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
              type: CourseType.LEARNING_TRACK,
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
