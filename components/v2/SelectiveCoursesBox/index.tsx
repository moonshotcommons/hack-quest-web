import React, { useEffect, useState } from 'react';
import CourseFilter from './CourseFilter';
import CourseList from './CourseList';
import { sort, courseType, experienceLevel } from './data';

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
  const [filter, setFilter] = useState<FilterType>({
    sort: sort[0].value,
    courseType: [courseType[0].value],
    experienceLevel: [experienceLevel[0].value]
  });

  const [list, setList] = useState<any>([]);
  const [runNum, setRunNum] = useState(0);

  const changeFilter = (newFilter: FilterType) => {
    setFilter({ ...newFilter });
  };

  const getList = () => {
    return new Promise((resolve) => {
      const newData = Array.from({ length: 12 });
      resolve(newData);
    });
  };

  useEffect(() => {
    getList().then((newList) => {
      setList(newList);
    });
  }, []);

  useEffect(() => {
    if (loadNum > runNum) {
      setRunNum(loadNum);
      getList().then((newList: any) => {
        setList([...list, ...newList]);
      });
    }
  }, [loadNum]);
  return (
    <div className="flex justify-between gap-10">
      <CourseFilter changeFilter={changeFilter} filter={filter} />
      <CourseList list={list} />
    </div>
  );
};

export default SelectiveCoursesBox;
