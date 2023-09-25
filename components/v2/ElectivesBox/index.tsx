import React, { useEffect, useState } from 'react';
import CourseFilter from './CourseFilter';
import CourseList from './CourseList';
import { initPageInfo, ParamType, initParam } from './data';
import webApi from '@/service';
import { CourseResponse } from '@/service/webApi/course/type';
import Loading from '../Common/Loading';

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
  const [searchParam, setSearchParam] = useState<any>({ ...initParam });
  const [pageInfo, setPageInfo] = useState<PageInfoType>(initPageInfo);
  const [list, setList] = useState<CourseResponse[]>([]);
  const [runNum, setRunNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const changeParam = (newFilter: ParamType) => {
    setSearchParam({ ...newFilter });
  };

  const initList = () => {
    getCourseList(initPageInfo).then((newList) => {
      setList([...(newList as CourseResponse[])]);
    });
  };

  const getCourseList = (pInfo: PageInfoType) => {
    setPageInfo({ ...pInfo });
    const newFilter: any = {};
    for (let key in searchParam) {
      if (key === 'sort') {
        newFilter[key] = searchParam[key]?.find(
          (v: ParamType) => v.checked
        )?.value;
      } else {
        const item = searchParam[key].filter(
          (v: ParamType) => v.value !== 'ALL'
        );
        const filterItem = item
          ?.filter((v: ParamType) => v.checked)
          ?.map((v: ParamType) => v.value)
          .join(',');
        if (filterItem.length) newFilter[key] = filterItem;
      }
    }
    return new Promise(async (resolve) => {
      setLoading(true);
      const res = await webApi.courseApi.getCourseListBySearch({
        ...newFilter,
        ...pInfo
      });
      setLoading(false);
      setTotal(res.total);
      resolve(res.data);
    });
  };

  useEffect(() => {
    initList();
  }, [searchParam]);

  useEffect(() => {
    if (loadNum > runNum && list.length < total) {
      console.info(loadNum);
      setRunNum(loadNum);
      getCourseList({
        ...pageInfo,
        page: pageInfo.page + 1
      }).then((newList) => {
        const l = [...list, ...(newList as CourseResponse[])];
        setList(l);
        if (l.length >= total) setNoMore();
      });
    }
  }, [loadNum]);
  return (
    <Loading loading={loading}>
      <div className="flex justify-between gap-10">
        <CourseFilter
          changeParam={changeParam}
          searchParam={searchParam}
          len={total}
        />
        <CourseList list={list} />
      </div>
    </Loading>
  );
};

export default SelectiveCoursesBox;
