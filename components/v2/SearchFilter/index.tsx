import Checkbox from '@/components/v2/Common/Checkbox';
import Radio from '@/components/v2/Common/Radio';
import React from 'react';
import { ALL, ParamType, FilterDataType, FilterType } from './type';
import { deepClone } from '@/helper/utils';

interface SearchFilterProps {
  searchParam: FilterDataType[];
  changeParam: (param: any) => void;
  len: number;
  isShowResult?: boolean;
}
const SearchFilter: React.FC<SearchFilterProps> = ({
  searchParam,
  changeParam,
  len
}) => {
  const changeFilterParam = (i: number, j: number) => {
    const newsearchParam = deepClone(searchParam);
    const { type } = newsearchParam[i];
    const { checked, value } = newsearchParam[i].filterList[j];
    switch (type) {
      case FilterType.RADIO:
        if (checked) return;
        newsearchParam[i].filterList.map((v: ParamType) => (v.checked = false));
        newsearchParam[i].filterList[j].checked = true;
        break;
      case FilterType.CHECKBOX:
        if (value === ALL) {
          newsearchParam[i].filterList.map(
            (v: ParamType) => (v.checked = !checked)
          );
        } else {
          newsearchParam[i].filterList[j].checked = !checked;
          isAllChecked(newsearchParam, i);
        }
        break;
    }
    changeParam(newsearchParam);
  };

  const isAllChecked = (newsearchParam: FilterDataType[], i: number) => {
    const filterList = newsearchParam[i].filterList;
    const AllIndex = filterList.findIndex((v: ParamType) => v.value === ALL);
    const checkedLen = filterList.filter(
      (v: ParamType) => v.value !== ALL && v.checked
    ).length;
    if (checkedLen === filterList.length - 1) {
      filterList[AllIndex].checked = true;
    } else {
      filterList[AllIndex].checked = false;
    }
  };

  const clearParam = () => {
    const newSearchParam = deepClone(searchParam);
    newSearchParam.map((v: FilterDataType) => {
      switch (v.type) {
        case FilterType.RADIO:
          v.filterList.map((filter: ParamType) => {
            filter.checked = false;
          });
          v.filterList[0].checked = true;
          break;
        case FilterType.CHECKBOX:
          v.filterList.map((filter: ParamType) => {
            filter.checked = true;
          });
      }
    });
    changeParam(newSearchParam);
  };
  const renderType = (i: number, j: number) => {
    const { type } = searchParam[i];
    const checked = searchParam[i].filterList[j].checked;
    switch (type) {
      case FilterType.RADIO:
        return <Radio checked={checked} />;
      case FilterType.CHECKBOX:
        return <Checkbox checked={checked} />;
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
        {searchParam.map((v: FilterDataType, i: number) => (
          <div key={i}>
            <div className="font-next-book-bold text-[24px] mb-[15px]">
              {v.title}
            </div>
            <div className="mb-10">
              {v.filterList.map((filter: ParamType, j: number) => (
                <div
                  key={j}
                  className="mb-[10px] flex items-center cursor-pointer"
                  onClick={() => changeFilterParam(i, j)}
                >
                  {renderType(i, j)}
                  <span className="text-[18px] pl-[15px]">{filter.label}</span>
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
