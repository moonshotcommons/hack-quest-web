import React, { useEffect, useState } from 'react';
import CourseFilter from './CourseFilter';
import CourseList from './CourseList';
import { sort, courseType, experienceLevel, initFilter } from './data';
import webApi from '@/service';
import { CourseResponse } from '@/service/webApi/course/type';

export interface FilterType {
  sort: string;
  courseType: string[];
  experienceLevel: string[];
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

  const [list, setList] = useState<CourseResponse[]>([]);
  const [runNum, setRunNum] = useState(0);

  const changeFilter = (newFilter: FilterType) => {
    setFilter({ ...newFilter });
  };

  const initList = () => {
    getCourseList().then((newList) => {
      setList([...(newList as CourseResponse[])]);
    });
  };

  const getCourseList = () => {
    return new Promise(async (resolve) => {
      const list = await webApi.courseApi.getCourseListBySearch(filter);
      resolve(list);
    });
  };

  useEffect(() => {
    initList();
  }, [filter]);

  useEffect(() => {
    if (loadNum > runNum) {
      setRunNum(loadNum);
      getCourseList().then((newList) => {
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
