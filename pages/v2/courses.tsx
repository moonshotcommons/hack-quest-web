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
import { increment } from '@/store/redux/modules/course';
import { useDispatch, useSelector, shallowEqual, useStore } from 'react-redux';
import { CourseResponse, CourseType } from '@/service/webApi/course/type';
import { getCourseLink } from '@/helper/utils';
import { useRouter } from 'next/router';
import { useScrollToElement } from '@/hooks/useDomHooks/useScrollToElement';
import { coursesTabs } from '@/constants';
import { renderCourseCard, renderLearningTrackCard } from '@/helper/renderCard';
import webApi from '@/service';
import { useGetLearningTracks } from '@/hooks/useLearningTrackHooks/useLearningTracks';
import {
  useGetCourses,
  useLoadCourseList
} from '@/hooks/useCoursesHooks/useGetCourses';
import CourseSkeleton from '@/components/CourseSkeleton';

const trendingNowIds = [
  '2e2f1305-a5a2-4f24-8ae7-d6b46228824a',
  '12714c18-cf3f-4946-9cf7-e6ec49e59e26',
  'e3703f91-a445-400e-a84b-c053d280d0c7',
  '7cb64544-9a0e-4b2a-839c-58a915cfb4d9',
  '48515515-7471-4bdc-95d8-cffdf0c54895'
];

interface CoursesProps {
  nowCards: CourseResponse[];
  syntaxCards: CourseResponse[];
  tracksCards: CourseResponse[];
  teaserCards: CourseResponse[];
  guidedProjectCards: CourseResponse[];
  conceptCards: CourseResponse[];
}

const Courses: NextPage<CoursesProps> = (props) => {
  // const { nowCards } = props;

  const router = useRouter();
  const { courseType } = router.query;
  const hashCourseTypeRef = useRef<HTMLElement>();

  const { waitingLoadCourseList } = useLoadCourseList();
  useScrollToElement(hashCourseTypeRef.current, courseType as CourseType);

  const courseList = useGetCourses();

  const { learningTracks, loading: learningTracksLoading } =
    useGetLearningTracks();

  const [selectTab, setSelectTab] = useState<CourseType>(
    (courseType as CourseType) || coursesTabs[0].type
  );

  const onSelect = (item: TabItem) => {
    setSelectTab(item.type);
  };

  const nowCards = useMemo(() => {
    return courseList.filter((course) => {
      return trendingNowIds.includes(course.id);
    });
  }, [courseList]);

  const SelectCourseCards = useMemo(() => {
    const filterCourseList = courseList?.filter(
      (course) => course.type === selectTab
    );

    return (
      <>
        <CourseSkeleton hideSkeleton={!waitingLoadCourseList}>
          {filterCourseList.map((card, index) => {
            return <div key={index}>{renderCourseCard(card)}</div>;
          })}
        </CourseSkeleton>
      </>
    );
  }, [selectTab, courseList, waitingLoadCourseList]);

  // useEffect(() => {
  //   dispatch(getCourseList());
  // }, [dispatch]);

  return (
    <>
      <Title className="font-bold">{'</Trending Now>'}</Title>
      <SliderContainer>
        <div className="flex h-[17.625rem] gap-[3.25rem] items-end">
          <CourseSkeleton hideSkeleton={!waitingLoadCourseList}>
            {nowCards?.map((course, index) => {
              return <div key={index}>{renderCourseCard(course)}</div>;
            })}
          </CourseSkeleton>
        </div>
      </SliderContainer>
      <Title className="font-bold">{'</Learning Tracks>'}</Title>
      <SliderContainer>
        <div className="flex h-[17.625rem] gap-[3.25rem] items-end">
          <CourseSkeleton hideSkeleton={!learningTracksLoading}>
            {learningTracks?.map((learningTrack, index) => {
              return (
                <div key={index}>{renderLearningTrackCard(learningTrack)}</div>
              );
            })}
          </CourseSkeleton>
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
