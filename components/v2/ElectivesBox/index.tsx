import React, { useEffect, useState } from 'react';
import CourseFilter from './CourseFilter';
import CourseList from './CourseList';
import { initFilter, initPageInfo } from './data';
import webApi from '@/service';
import { CourseResponse } from '@/service/webApi/course/type';

export type FilterType = Record<string, any>;
// export interface FilterType {
//   sort: string;
//   courseType: string[];
//   experienceLevel: string[];
// }
interface PageInfoType {
  page: number;
  limit: number;
}
interface SelectiveCoursesBoxProps {
  loadNum: number;
  setNoMore: VoidFunction;
}
const SelectiveCoursesBox: React.FC<SelectiveCoursesBoxProps> = ({
  loadNum,
  setNoMore
}) => {
  const [filter, setFilter] = useState<FilterType>(initFilter);
  const [pageInfo, setPageInfo] = useState<PageInfoType>(initPageInfo);
  const [list, setList] = useState<CourseResponse[]>([]);
  const [runNum, setRunNum] = useState(0);
  // const [loading, setLoading] = useState(true);

  const changeFilter = (newFilter: FilterType) => {
    setFilter({ ...newFilter });
  };

  const initList = () => {
    getCourseList(initPageInfo).then((newList) => {
      setList([...(newList as CourseResponse[])]);
    });
  };

  const getCourseList = (pInfo: PageInfoType) => {
    setPageInfo({ ...pInfo });
    const newFilter: any = {};
    for (let key in filter) {
      const f = filter[key] as string[];
      if (typeof f === 'object') {
        if (!~f.indexOf('ALL')) {
          newFilter[key] = f.join(',');
        }
      } else {
        newFilter[key] = f;
      }
    }
    return new Promise(async (resolve) => {
      const list = await webApi.courseApi.getCourseListBySearch({
        ...newFilter,
        ...pInfo
      });
      if (!list.length) setNoMore();
      // setLoading(false);
      resolve(list);
    });
  };

  useEffect(() => {
    initList();
  }, [filter]);

  useEffect(() => {
    if (loadNum > runNum) {
      setRunNum(loadNum);
      getCourseList({
        ...pageInfo,
        page: pageInfo.page + 1
      }).then((newList) => {
        setList([...list, ...(newList as CourseResponse[])]);
      });
    }
  }, [loadNum]);
  return (
    <div className="flex justify-between gap-10">
      <CourseFilter
        changeFilter={changeFilter}
        filter={filter}
        len={list.length}
      />
      <CourseList list={list} />
    </div>
  );
};

export default SelectiveCoursesBox;
