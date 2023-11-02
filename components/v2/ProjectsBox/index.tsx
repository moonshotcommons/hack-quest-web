import React, { useEffect, useState } from 'react';
import { initPageInfo, filterData } from './data';
import webApi from '@/service';
import Loading from '../Common/Loading';
import ProjectsList from './ProjectsList';
import { deepClone } from '@/helper/utils';
import SearchFilter, { dealFilterParam } from '@/components/v2/SearchFilter';
import { FilterDataType } from '@/components/v2/SearchFilter/type';
import { ProjectType } from '@/service/webApi/resourceStation/project/type';

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
  const [list, setList] = useState<ProjectType[]>([]);
  const [runNum, setRunNum] = useState(0);
  const [total, setTotal] = useState(0);

  const changeParam = (newSearchParam: FilterDataType[]) => {
    setSearchParam(newSearchParam);
  };

  const initList = () => {
    getProjectList(initPageInfo).then((newList) => {
      setApiStatus('init');
      setList([...(newList as ProjectType[])]);
    });
  };

  const getProjectList = (pInfo: PageInfoType) => {
    setApiStatus('loading');
    setPageInfo({ ...pInfo });
    const newFilter = dealFilterParam(searchParam);
    return new Promise(async (resolve) => {
      const res = await webApi.project.getProjectsList({
        ...newFilter,
        ...pInfo,
        keyword: inputValue
      });
      setTotal(res.total);
      resolve(res.data);
    });
  };

  useEffect(() => {
    initList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, inputValue]);

  useEffect(() => {
    if (
      loadNum > runNum &&
      list.length < total &&
      total > 0 &&
      apiStatus === 'init'
    ) {
      setRunNum(loadNum);
      getProjectList({
        ...pageInfo,
        page: pageInfo.page + 1
      }).then((newList) => {
        const l = [...list, ...(newList as ProjectType[])];
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
