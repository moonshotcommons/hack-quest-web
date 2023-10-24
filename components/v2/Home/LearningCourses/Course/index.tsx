import Loading from '@/components/v2/Common/Loading';
import webApi from '@/service';
import { CourseResponse, ProcessType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useEffect, useState } from 'react';
import CourseBox from './CourseBox';
import LearningTrackList from './LearningTrackList';
import NoData from './NoData';
import { courseTab } from './data';
import Tab from '@/components/v2/Tab';
import { TabListType } from '@/components/v2/Tab/type';

function Course() {
  const [curTab, setCurTab] = useState<ProcessType>(ProcessType.IN_PROCESS);
  const [loading, setLoading] = useState(false);
  const [courseListData, setCourseListData] = useState<
    Record<ProcessType, CourseResponse[]>
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
      const res = await webApi.courseApi.getCourseListBySearch({
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
      <Tab tabList={courseTab} curTab={curTab} changeTab={changeTab} />
      <Loading loading={loading}>
        {!courseListData[curTab].length &&
        !learningTrackListData[curTab].length ? (
          <NoData curTab={curTab} />
        ) : (
          <>
            <LearningTrackList list={learningTrackListData[curTab]} />
            <CourseBox list={courseListData[curTab]} curTab={curTab} />
          </>
        )}
      </Loading>
    </>
  );
}

export default Course;
