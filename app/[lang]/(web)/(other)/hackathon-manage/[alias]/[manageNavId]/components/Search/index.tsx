import SortBy from '@/components/Web/Business/SortBy';
import React, { useRef } from 'react';
import { applicationInformationData, hackathonSortData } from '../../../../constants/data';
import { BiSearch } from 'react-icons/bi';
import { MultiSelect } from '../../../../components/MultiSelect';
import { InformationDataType, SelectType } from '../../../../constants/type';

interface SearchProp {
  sorts: SelectType[];
  sort: string;
  handleSearch: (key: 'sort' | 'keyword', value: string) => void;
  tableInformation: string[];
  setTableInformation: (values: string[]) => void;
  informationData: InformationDataType[];
}

const Search: React.FC<SearchProp> = ({
  sorts,
  sort,
  handleSearch,
  tableInformation,
  setTableInformation,
  informationData
}) => {
  const timeOut = useRef<NodeJS.Timeout | null>(null);

  const changeInput = (e: any) => {
    const newKeyword = e.target.value;
    if (timeOut.current) clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      handleSearch('keyword', newKeyword);
    }, 1000);
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-[20px]">
        <SortBy
          updateSort={(sort: string) => {
            handleSearch('sort', sort);
          }}
          curSort={sort}
          sorts={sorts}
        />
        <MultiSelect
          type="checkbox"
          value={tableInformation}
          options={informationData}
          name="Information"
          onSelect={setTableInformation}
        />
      </div>
      <div className="body-s flex h-[46px] w-[400px] items-center rounded-[56px] border border-neutral-light-gray bg-neutral-white px-[20px] text-neutral-off-black">
        <span className="flex-shrink-0">
          <BiSearch size={24} />
        </span>
        <input
          type="text"
          onInput={changeInput}
          className="flex-1 border-none pl-[10px] outline-none"
          placeholder="Search for name, country, email, etc..."
        />
      </div>
    </div>
  );
};

export default Search;
