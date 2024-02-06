'use client';

import Checkbox from '@/components/Common/Checkbox';
import Radio from '@/components/Common/Radio';
import React, { useEffect, useRef, useState } from 'react';
import { ALL, ParamType, FilterDataType, FilterType } from './type';
import { deepClone } from '@/helper/utils';
import { BiSearch } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { useRequest } from 'ahooks';
import webApi from '@/service';

export const dealFilterParam = (param: FilterDataType[]) => {
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
  searchParams: { keyword: string } & Record<string, string>;
  filterData: FilterDataType[];
  urlPrefix: string;
}
const SearchFilter: React.FC<SearchFilterProps> = ({
  searchParams,
  filterData,
  urlPrefix
}) => {
  const router = useRouter();
  const [searchParam, setSearchParam] = useState<FilterDataType[]>(
    deepClone(filterData)
  );
  const [inputValue, setInputValue] = useState(searchParams.keyword || '');
  const timeOut = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeOut.current) clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      applySearchInfo();
    }, 300);
  }, [inputValue]);

  function applySearchInfo(searchParam: FilterDataType[] = []) {
    const url = new URL(urlPrefix, window.location.href);
    for (const filter of searchParam) {
      const value = filter.value;
      if (!value) continue;
      url.searchParams.append(filter.title, value);
    }
    router.push(url.toString());
  }

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
          newSearchParam[i].filterList.map(
            (v: ParamType) => (v.checked = !checked)
          );
        } else {
          newSearchParam[i].filterList[j].checked = !checked;
          isAllChecked(newSearchParam, i);
        }
        break;
    }
    setSearchParam(newSearchParam);
    applySearchInfo();
  };

  const isAllChecked = (newSearchParam: FilterDataType[], i: number) => {
    const filterList = newSearchParam[i].filterList;
    const AllIndex = filterList.findIndex((v: ParamType) => v.value === ALL);
    const checkedLen = filterList.filter(
      (v: ParamType) => v.value !== ALL && v.checked
    ).length;
    filterList[AllIndex].checked = checkedLen === filterList.length - 1;
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
    setSearchParam(newSearchParam);
    applySearchInfo();
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
    setInputValue(value);
  };

  const {} = useRequest(async () => {
    const res = await webApi.resourceStationApi.getProjectTracksDict();
    const tracksDict = res.map((v: string) => ({
      label: v,
      value: v,
      checked: true
    }));
    const newSearchParam = deepClone(searchParam);
    newSearchParam[2].filterList =
      newSearchParam[2].filterList.concat(tracksDict);
    setSearchParam(newSearchParam);
  });

  return (
    <div className="w-[272px] text-electives-filter-color ">
      <div className="mb-[15px] flex items-center justify-between border-b border-electives-filter-border-color pb-[6px]">
        <div className="flex-row-center text-[18px] ">
          <BiSearch />
          <input
            type="text"
            placeholder="search"
            className="ml-[5px] bg-[transparent] outline-none "
            value={inputValue}
            onInput={changeInput}
          />
        </div>
        <span className="cursor-pointer underline" onClick={() => clearParam()}>
          Clear
        </span>
      </div>
      <div>
        {searchParam.map((v: FilterDataType, i: number) => (
          <div key={i}>
            <div className="mb-[15px] font-next-book-bold text-[24px]">
              {v.title}
            </div>
            <div className="mb-10">
              {v.filterList.map((filter: ParamType, j: number) => (
                <div
                  key={j}
                  className="mb-[10px] flex cursor-pointer items-center"
                  onClick={() => changeFilterParam(i, j)}
                >
                  {renderType(i, j)}
                  <span className="pl-[15px] text-[18px]">{filter.label}</span>
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
