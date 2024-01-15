import Loading from '@/components/Common/Loading';
import webApi from '@/service';
import {
  ProjectCourseType,
  ProcessType,
  CourseDataType
} from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useEffect, useState } from 'react';
import CourseBox from './CourseBox';
import LearningTrackList from './LearningTrackList';
import NoData from './NoData';
import { courseTab } from './data';
import Tab from '@/components/Web/Business/Tab';
import { TabListType } from '@/components/Web/Business/Tab/type';
import { ElectiveListDataType } from '@/service/webApi/elective/type';

function MyCourses() {
  const [curTab, setCurTab] = useState<ProcessType>(ProcessType.IN_PROCESS);
  const [loading, setLoading] = useState(false);
  const [courseListData, setCourseListData] = useState<
    Record<ProcessType, ProjectCourseType[]>
  >({
    [ProcessType.IN_PROCESS]: [],
    [ProcessType.COMPLETED]: []
  });
  const [learningTrackListData, setLearningTrackListData] = useState<
    Record<ProcessType, LearningTrackDetailType[]>
  >({
    [ProcessType.IN_PROCESS]: [],
    [ProcessType.COMPLETED]: []
  });
  const getCourseList = () => {
    return new Promise(async (resolve) => {
      const res = await webApi.courseApi.getCourseListBySearch<
        ElectiveListDataType | CourseDataType
      >({
        status: curTab
      });
      const newData = {
        ...courseListData,
        [curTab]: res.data
      };
      setCourseListData(newData);
      resolve(false);
    });
  };
  const getLearningTrackList = () => {
    return new Promise(async (resolve) => {
      const list = await webApi.learningTrackApi.getLearningTracks({
        status: curTab
      });
      const newData = {
        ...learningTrackListData,
        [curTab]: list
      };
      setLearningTrackListData(newData);
      resolve(true);
    });
  };
  const changeTab = (tab: TabListType) => {
    setCurTab(tab.value as ProcessType);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([getCourseList(), getLearningTrackList()]).finally(() => {
      setLoading(false);
    });
  }, [curTab]);
  return (
    <>
      <h2 className="text-[#131313] text-4xl font-next-poster-Bold tracking-[2.4px] mb-5">
        My Courses
      </h2>
      <Tab
        tabList={courseTab}
        curTab={curTab}
        changeTab={changeTab}
        className="pb-10"
      />
      <Loading loading={loading}>
        {!courseListData[curTab].length &&
        !learningTrackListData[curTab].length ? (
          <NoData curTab={curTab} />
        ) : (
          <div className="flex flex-col gap-y-10">
            <LearningTrackList list={learningTrackListData[curTab]} />
            <CourseBox
              list={courseListData[curTab]}
              curTab={curTab}
              title="Practices"
            />
            {/* <CourseBox
              list={courseListData[curTab]}
              curTab={curTab}
              title="Electives"
            /> */}
          </div>
        )}
      </Loading>
    </>
  );
}

export default MyCourses;
