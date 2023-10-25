import React, { useEffect, useState } from 'react';
import { initPageInfo, initParam, filterData } from './data';
import webApi from '@/service';
import { CourseResponse } from '@/service/webApi/course/type';
import Loading from '../Common/Loading';
import SearchFilter from '@/components/v2/SearchFilter';
import ProjectsList from './ProjectsList';
import { deepClone } from '@/helper/utils';
import { FilterDataType } from '../SearchFilter/type';

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
  const [pageInfo, setPageInfo] = useState<PageInfoType>(initPageInfo);
  const [list, setList] = useState<CourseResponse[]>([]);
  const [runNum, setRunNum] = useState(0);
  const [total, setTotal] = useState(0);

  const changeParam = (newSearchParam: FilterDataType[]) => {
    setSearchParam(newSearchParam);
  };

  const initList = () => {
    // getCourseList(initPageInfo).then((newList) => {
    //   setApiStatus('init');
    //   setList([...(newList as CourseResponse[])]);
    // });
  };

  const getCourseList = (pInfo: PageInfoType) => {
    // setApiStatus('loading');
    // setPageInfo({ ...pInfo });
    // const newFilter: any = {};
    // for (let key in searchParam) {
    //   if (key === 'sort') {
    //     newFilter[key] = searchParam[key]?.find(
    //       (v: ParamType) => v.checked
    //     )?.value;
    //   } else {
    //     const item = searchParam[key].filter(
    //       (v: ParamType) => v.value !== 'ALL'
    //     );
    //     const filterItem = item
    //       ?.filter((v: ParamType) => v.checked)
    //       ?.map((v: ParamType) => v.value)
    //       .join(',');
    //     if (filterItem.length) newFilter[key] = filterItem;
    //   }
    // }
    // return new Promise(async (resolve) => {
    //   const res = await webApi.courseApi.getCourseListBySearch({
    //     ...newFilter,
    //     ...pInfo
    //   });
    //   setTotal(res.total);
    //   resolve(res.data);
    // });
  };

  useEffect(() => {
    initList();
  }, [searchParam]);

  useEffect(() => {
    // if (loadNum > runNum && list.length < total && apiStatus === 'init') {
    //   setRunNum(loadNum);
    //   getCourseList({
    //     ...pageInfo,
    //     page: pageInfo.page + 1
    //   }).then((newList) => {
    //     const l = [...list, ...(newList as CourseResponse[])];
    //     setList(l);
    //     if (l.length >= total) {
    //       setApiStatus('noMre');
    //     } else {
    //       setApiStatus('init');
    //     }
    //   });
    // }
  }, [loadNum]);
  return (
    <Loading loading={apiStatus === 'loading'}>
      <div className="flex justify-between gap-10">
        <SearchFilter
          searchParam={searchParam}
          changeParam={changeParam}
          len={total}
        />
        <ProjectsList list={list} />
      </div>
    </Loading>
  );
};

export default ProjectsBox;
