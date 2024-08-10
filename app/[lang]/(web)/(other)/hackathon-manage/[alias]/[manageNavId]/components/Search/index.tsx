import SortBy from '@/components/Web/Business/SortBy';
import React, { useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { MultiSelect, MultiSelectOption } from '../../../../components/MultiSelect';
import { InformationDataType, SelectType } from '../../../../constants/type';

export interface SectorType {
  value: any;
  options: MultiSelectOption[];
  name: string;
  key: string;
  type?: 'select' | 'checkbox';
}
interface SearchProp {
  sorts: SelectType[];
  sort: string;
  handleSearch: (key: 'sort' | 'keyword', value: string) => void;
  tableInformation: string[];
  setTableInformation?: (values: string[]) => void;
  informationData?: InformationDataType[];
  sectors?: SectorType[];
}

const Search: React.FC<SearchProp> = ({
  sorts,
  sort,
  handleSearch,
  tableInformation,
  setTableInformation,
  informationData,
  sectors
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
        {informationData && setTableInformation && (
          <MultiSelect
            type="checkbox"
            value={tableInformation}
            options={informationData}
            name="Information"
            onSelect={setTableInformation}
          />
        )}

        {sectors?.map((v) => (
          <MultiSelect
            key={v.key}
            value={v.value}
            options={v.options}
            name={v.name}
            onSelect={(sec) => {
              handleSearch(v.key as any, sec as any);
            }}
          />
        ))}
      </div>
      <div className="body-s flex h-[46px] w-[400px] items-center rounded-[56px] border border-neutral-light-gray bg-neutral-white px-[20px] text-neutral-off-black">
        <span className="flex-shrink-0">
          <BiSearch size={24} />
        </span>
        <input
          type="text"
          onInput={changeInput}
          className="flex-1 border-none pl-[10px] outline-none"
          placeholder="Search for name"
        />
      </div>
    </div>
  );
};

export default Search;
