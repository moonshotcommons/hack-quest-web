import Checkbox from '@/components/v2/Common/Checkbox';
import Radio from '@/components/v2/Common/Radio';
import React from 'react';
import { ParamType, SearchParamType, FilterDataType, FilterType } from './type';

interface SearchFilterProps {
  changeParam: (param: any) => void;
  searchParam: SearchParamType;
  len: number;
  filterData: FilterDataType[];
  isShowResult?: boolean;
}
const SearchFilter: React.FC<SearchFilterProps> = ({
  searchParam,
  changeParam,
  len,
  filterData
}) => {
  const changeFilter = () => {};
  const changeSort = (sortValue: string) => {
    // const sort = searchParam.sort;
    // sort.map((v) => {
    //   if (v.value !== sortValue) {
    //     v.checked = false;
    //   } else {
    //     v.checked = true;
    //   }
    // });
    // changeParam({ ...searchParam, sort });
  };
  const changeTypeOrLevel = (i: number, type: 'type' | 'level') => {
    // const newSearchParam = { ...searchParam };
    // const checked = newSearchParam[type][i].checked;
    // newSearchParam[type][i].checked = !checked;
    // if (!i) {
    //   newSearchParam[type].map((v) => (v.checked = !checked));
    // } else {
    //   const notAllSearchParam = newSearchParam[type].slice(1);
    //   newSearchParam[type][0].checked = notAllSearchParam.every(
    //     (v) => v.checked
    //   );
    // }
    // changeParam({ ...newSearchParam });
  };

  const clearParam = () => {
    // const newSearchParam = { ...searchParam };
    // for (let key in newSearchParam) {
    //   if (key === 'sort') {
    //     newSearchParam[key].map((v: ParamType) => (v.checked = false));
    //     newSearchParam[key][0].checked = true;
    //   } else {
    //     newSearchParam[key as 'type' | 'level'].map(
    //       (v: ParamType) => (v.checked = true)
    //     );
    //   }
    // }
    // changeParam({ ...newSearchParam });
  };
  const renderType = (type: FilterType, item: ParamType) => {
    switch (type) {
      case FilterType.RADIO:
        return (
          <Radio
            checked={item.checked}
            onChange={() => changeSort(item.value)}
          />
        );
      case FilterType.CHECKBOX:
        return (
          <Checkbox
            checked={item.checked}
            // onChange={() => }
          />
        );
    }
  };
  return (
    <div className="text-electives-filter-color w-[272px] ">
      <div className="flex mb-[15px] items-center justify-between border-b border-electives-filter-border-color pb-[15px]">
        <span className="text-[24px] leading-[24px] font-next-book-bold">
          {len} Results
        </span>
        <span className="cursor-pointer underline" onClick={() => clearParam()}>
          Clear Filters
        </span>
      </div>
      <div>
        {filterData.map((v: FilterDataType, i: number) => (
          <div key={i}>
            <div className="font-next-book-bold text-[24px] mb-[15px]">
              {v.title}
            </div>
            <div className="mb-10">
              {v.filterList.map((filter) => (
                <div
                  key={filter.value}
                  className="mb-[10px] flex items-center cursor-pointer"
                >
                  {renderType(v.type, filter)}
                  <span
                    className="text-[18px] ml-[15px]"
                    onClick={() => changeFilter()}
                  >
                    {filter.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
