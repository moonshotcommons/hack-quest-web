import React, { useEffect, useState } from 'react';
import { initPageInfo, filterData } from './data';
import webApi from '@/service';
import { CourseResponse } from '@/service/webApi/course/type';
import Loading from '../Common/Loading';
import ProjectsList from './ProjectsList';
import { deepClone } from '@/helper/utils';
import SearchFilter, { dealFilterParam } from '@/components/v2/SearchFilter';
import { FilterDataType } from '@/components/v2/SearchFilter/type';

interface PageInfoType {
  page: number;
  limit: number;
}
interface ProjectsBoxProps {
  loadNum: number;
  setApiStatus: (status: string) => void;
  apiStatus: string;
}
const ProjectsBox: React.FC<ProjectsBoxProps> = ({
  loadNum,
  setApiStatus,
  apiStatus
}) => {
  const [searchParam, setSearchParam] = useState<FilterDataType[]>(
    deepClone(filterData)
  );
  const [inputValue, setInputValue] = useState('');
  const [pageInfo, setPageInfo] = useState<PageInfoType>(initPageInfo);
  const [list, setList] = useState<CourseResponse[]>([]);
  const [runNum, setRunNum] = useState(0);
  const [total, setTotal] = useState(0);

  const changeParam = (newSearchParam: FilterDataType[]) => {
    setSearchParam(newSearchParam);
  };

  const initList = () => {
    getCourseList(initPageInfo).then((newList) => {
      setApiStatus('init');
      setList([...(newList as CourseResponse[])]);
    });
  };

  const getCourseList = (pInfo: PageInfoType) => {
    setApiStatus('loading');
    setPageInfo({ ...pInfo });
    const newFilter = dealFilterParam(searchParam);
    return new Promise(async (resolve) => {
      const res = await webApi.courseApi.getCourseListBySearch({
        ...newFilter,
        ...pInfo
      });
      setTotal(res.total);
      resolve(res.data);
    });
  };

  useEffect(() => {
    initList();
  }, [searchParam, inputValue]);

  useEffect(() => {
    if (loadNum > runNum && list.length < total && apiStatus === 'init') {
      setRunNum(loadNum);
      getCourseList({
        ...pageInfo,
        page: pageInfo.page + 1
      }).then((newList) => {
        const l = [...list, ...(newList as CourseResponse[])];
        setList(l);
        if (l.length >= total) {
          setApiStatus('noMre');
        } else {
          setApiStatus('init');
        }
      });
    }
  }, [loadNum]);
  return (
    <Loading loading={apiStatus === 'loading'}>
      <div className="flex justify-between gap-10">
        <SearchFilter
          searchParam={searchParam}
          changeParam={changeParam}
          changeInputValue={(value) => setInputValue(value)}
          isShowInput={true}
        />
        <ProjectsList list={list} />
      </div>
    </Loading>
  );
};

export default ProjectsBox;
