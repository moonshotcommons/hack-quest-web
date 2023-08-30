import React from 'react';
import { sort, courseType, experienceLevel } from '../data';
import Radio from '@/components/v2/Common/Radio';
import Checkbox from '@/components/v2/Common/Checkbox';
import { FilterType } from '..';

interface CourseFilterProps {
  changeFilter: (filter: FilterType) => void;
  filter: FilterType;
}
const CourseFilter: React.FC<CourseFilterProps> = ({
  filter,
  changeFilter
}) => {
  const changeSort = (sort: string) => {
    changeFilter({ ...filter, sort });
  };
  const changeTypeOrLevel = (
    checked: boolean,
    value: string,
    type: 'courseType' | 'experienceLevel'
  ) => {
    const newFilter = { ...filter };
    if (!checked) {
      newFilter[type] = filter[type].filter((v) => v !== value);
    } else {
      newFilter[type].push(value);
    }
    changeFilter({ ...newFilter });
  };
  return (
    <div className="text-selective-courses-filter-color w-[272px] ">
      <div className="flex mb-[15px] items-center justify-between border-b border-selective-courses-filter-border-color pb-[15px]">
        <span className="text-[24px] leading-[24px] font-next-book-bold">
          200 Results
        </span>
        <span className="cursor-pointer underline">Clear Filters</span>
      </div>
      <div>
        <div className="font-next-book-bold text-[24px] mb-[15px]">Sort by</div>
        <div className="mb-10">
          {sort.map((sort) => (
            <div key={sort.value} className="mb-[10px] ">
              <label className="flex items-center cursor-pointer">
                <Radio
                  parentValue={filter.sort}
                  value={sort.value}
                  radioName={'sort'}
                  onChange={changeSort}
                />
                <span className="text-[18px] ml-[15px]">{sort.label}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="font-next-book-bold text-[24px] mb-[15px]">
          Course type
        </div>
        <div className="mb-10">
          {courseType.map((type) => (
            <div key={type.value} className="mb-[10px] ">
              <label className="flex items-center cursor-pointer">
                <Checkbox
                  checked={!!~filter.courseType.indexOf(type.value)}
                  onChange={(checked) =>
                    changeTypeOrLevel(checked, type.value, 'courseType')
                  }
                />
                <span className="text-[18px] ml-[15px]">{type.label}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="font-next-book-bold text-[24px] mb-[15px]">
          Experience level
        </div>
        <div>
          {experienceLevel.map((type) => (
            <div key={type.value} className="mb-[10px] ">
              <label className="flex items-center cursor-pointer">
                <Checkbox
                  checked={!!~filter.experienceLevel.indexOf(type.value)}
                  onChange={(checked) =>
                    changeTypeOrLevel(checked, type.value, 'experienceLevel')
                  }
                />
                <span className="text-[18px] ml-[15px]">{type.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
