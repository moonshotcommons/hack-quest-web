import Checkbox from '@/components/Common/Checkbox';
import Radio from '@/components/Common/Radio';
import React from 'react';
import { ALL, ParamType, FilterDataType, FilterType } from './type';
import { deepClone } from '@/helper/utils';
import { BiSearch } from 'react-icons/bi';

export const dealFilterParam = (param: FilterDataType[]) => {
  if (!param.length) return {};

  const paramObj: any = {};
  param.map((v: FilterDataType) => {
    paramObj[v.value] = v.filterList
      .filter((filter: ParamType) => filter.checked && filter.value !== ALL)
      .map((filter: ParamType) => filter.value)
      .join(',');
  });
  return paramObj;
};
interface SearchFilterProps {
  searchParam: FilterDataType[];
  changeParam: (param: any) => void;
  changeInputValue?: (value: string) => void;
  isShowResult?: boolean;
  resultsLen?: number;
  isShowInput?: boolean;
  inputValue?: string;
}
const SearchFilter: React.FC<SearchFilterProps> = ({
  searchParam,
  changeParam,
  changeInputValue,
  isShowResult = false,
  resultsLen = 0,
  isShowInput = false,
  inputValue
}) => {
  const changeFilterParam = (i: number, j: number) => {
    const newSearchParam = deepClone(searchParam);
    const { type } = newSearchParam[i];
    const { checked, value } = newSearchParam[i].filterList[j];
    switch (type) {
      case FilterType.RADIO:
        if (checked) return;
        newSearchParam[i].filterList.map((v: ParamType) => (v.checked = false));
        newSearchParam[i].filterList[j].checked = true;
        break;
      case FilterType.CHECKBOX:
        if (value === ALL) {
          newSearchParam[i].filterList.map((v: ParamType) => (v.checked = !checked));
        } else {
          newSearchParam[i].filterList[j].checked = !checked;
          isAllChecked(newSearchParam, i);
        }
        break;
    }
    changeParam(newSearchParam);
  };

  const isAllChecked = (newSearchParam: FilterDataType[], i: number) => {
    const filterList = newSearchParam[i].filterList;
    const AllIndex = filterList.findIndex((v: ParamType) => v.value === ALL);
    const checkedLen = filterList.filter((v: ParamType) => v.value !== ALL && v.checked).length;
    if (checkedLen === filterList.length - 1) {
      filterList[AllIndex].checked = true;
    } else {
      filterList[AllIndex].checked = false;
    }
  };

  const clearParam = () => {
    const newSearchParam = deepClone(searchParam);
    changeInputValue?.('');
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

  const changeInput = (e: any) => {
    const value = e.target.value;
    changeInputValue?.(value);
  };

  return (
    <div className="w-[272px] text-electives-filter-color ">
      <div className="mb-[15px] flex items-center justify-between border-b border-electives-filter-border-color pb-[6px]">
        {isShowResult && <span className="body-xl-bold leading-[24px]">{resultsLen} Results</span>}
        {isShowInput && (
          <div className="flex-row-center body-l ">
            <BiSearch />
            <input
              type="text"
              placeholder="search"
              className="ml-[5px] bg-[transparent] outline-none "
              value={inputValue}
              onInput={changeInput}
            />
          </div>
        )}
        <span className="cursor-pointer underline" onClick={() => clearParam()}>
          Clear
        </span>
      </div>
      <div>
        {searchParam.map((v: FilterDataType, i: number) => (
          <div key={i}>
            <div className="body-xl-bold mb-[15px]">{v.title}</div>
            <div className="mb-10">
              {v.filterList.map((filter: ParamType, j: number) => (
                <div
                  key={j}
                  className="mb-[10px] flex cursor-pointer items-center"
                  onClick={() => changeFilterParam(i, j)}
                >
                  {renderType(i, j)}
                  <span className="body-l pl-[15px]">{filter.label}</span>
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
