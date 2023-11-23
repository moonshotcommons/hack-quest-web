import React, { useEffect, useRef, useState } from 'react';
import CourseList from './CourseList';
import { initPageInfo, filterData } from './data';
import webApi from '@/service';
import { CourseResponse } from '@/service/webApi/course/type';
import Loading from '../Common/Loading';
import SearchFilter, { dealFilterParam } from '@/components/v2/SearchFilter';
import { FilterDataType } from '@/components/v2/SearchFilter/type';
import { deepClone } from '@/helper/utils';

interface PageInfoType {
  page: number;
  limit: number;
}
interface SelectiveCoursesBoxProps {
  loadNum: number;
  setApiStatus: (status: string) => void;
  apiStatus: string;
}
const SelectiveCoursesBox: React.FC<SelectiveCoursesBoxProps> = ({
  loadNum,
  setApiStatus,
  apiStatus
}) => {
  const [searchParam, setSearchParam] = useState<FilterDataType[]>(
    deepClone(filterData)
  );
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [pageInfo, setPageInfo] = useState<PageInfoType>(initPageInfo);
  const [inputValue, setInputValue] = useState('');
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
        ...pInfo,
        keyword: inputValue
      });
      setTotal(res.total);
      resolve(res.data);
    });
  };
  useEffect(() => {
    if (timeOut.current) clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      initList();
    }, 300);
  }, [inputValue]);

  useEffect(() => {
    initList();
  }, [searchParam]);

  useEffect(() => {
    if (
      loadNum > runNum &&
      list.length < total &&
      total > 0 &&
      apiStatus === 'init'
    ) {
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
          inputValue={inputValue as string}
        />
        <CourseList list={list} />
      </div>
    </Loading>
  );
};

export default SelectiveCoursesBox;
