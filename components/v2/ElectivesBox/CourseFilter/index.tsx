import Checkbox from '@/components/v2/Common/Checkbox';
import Radio from '@/components/v2/Common/Radio';
import React from 'react';
import {
  courseType,
  experienceLevel,
  sort,
  initParam,
  ParamType,
  SearchParamType
} from '../data';

interface CourseFilterProps {
  changeParam: (param: any) => void;
  searchParam: SearchParamType;
  len: number;
}
const CourseFilter: React.FC<CourseFilterProps> = ({
  searchParam,
  changeParam,
  len
}) => {
  const changeSort = (sortValue: string) => {
    const sort = searchParam.sort;
    sort.map((v) => {
      if (v.value !== sortValue) {
        v.checked = false;
      } else {
        v.checked = true;
      }
    });
    changeParam({ ...searchParam, sort });
  };
  const changeTypeOrLevel = (i: number, type: 'type' | 'level') => {
    const newSearchParam = { ...searchParam };
    const checked = newSearchParam[type][i].checked;
    newSearchParam[type][i].checked = !checked;
    if (!i) {
      newSearchParam[type].map((v) => (v.checked = !checked));
    } else {
      const notAllSearchParam = newSearchParam[type].slice(1);
      newSearchParam[type][0].checked = notAllSearchParam.every(
        (v) => v.checked
      );
    }
    changeParam({ ...newSearchParam });
  };
  return (
    <div className="text-electives-filter-color w-[272px] ">
      <div className="flex mb-[15px] items-center justify-between border-b border-electives-filter-border-color pb-[15px]">
        <span className="text-[24px] leading-[24px] font-next-book-bold">
          {len} Results
        </span>
        <span
          className="cursor-pointer underline"
          onClick={() => changeParam(initParam)}
        >
          Clear Filters
        </span>
      </div>
      <div>
        <div className="font-next-book-bold text-[24px] mb-[15px]">Sort by</div>
        <div className="mb-10">
          {sort.map((sort) => (
            <div
              key={sort.value}
              className="mb-[10px] flex items-center cursor-pointer"
            >
              <Radio
                checked={sort.checked}
                onChange={() => changeSort(sort.value)}
              />
              <span
                className="text-[18px] ml-[15px]"
                onClick={() => changeSort(sort.value)}
              >
                {sort.label}
              </span>
            </div>
          ))}
        </div>
        <div className="font-next-book-bold text-[24px] mb-[15px]">
          Course type
        </div>
        <div className="mb-10">
          {courseType.map((type, i) => (
            <div
              key={type.value}
              className="mb-[10px] flex items-center cursor-pointer "
            >
              <Checkbox
                checked={type.checked}
                onChange={() => changeTypeOrLevel(i, 'type')}
              />
              <span
                className="text-[18px] ml-[15px]"
                onClick={() => changeTypeOrLevel(i, 'type')}
              >
                {type.label}
              </span>
            </div>
          ))}
        </div>
        <div className="font-next-book-bold text-[24px] mb-[15px]">
          Experience level
        </div>
        <div>
          {experienceLevel.map((level, i) => (
            <div
              key={level.value}
              className="mb-[10px] flex items-center cursor-pointer"
            >
              <Checkbox
                checked={level.checked}
                onChange={() => changeTypeOrLevel(i, 'level')}
              />
              <span
                className="text-[18px] ml-[15px]"
                onClick={() => changeTypeOrLevel(i, 'level')}
              >
                {level.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
