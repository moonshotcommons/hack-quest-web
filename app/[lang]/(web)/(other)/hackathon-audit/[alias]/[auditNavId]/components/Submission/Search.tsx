import SortBy from '@/components/Web/Business/SortBy';
import React, { useRef, useState } from 'react';
import { submissionInformationData, applicationSortData } from '../../../../constants/data';
import { BiSearch } from 'react-icons/bi';
import { MultiSelect, MultiSelectOption } from '../../../../components/MultiSelect';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';

interface SearchProp {
  sort: string;
  sectors: string[];
  handleSearch: (key: 'sort' | 'keyword' | 'sectors', value: any) => void;
  tableInformation: string[];
  setTableInformation: (values: string[]) => void;
}

const Search: React.FC<SearchProp> = ({ sort, handleSearch, tableInformation, setTableInformation, sectors }) => {
  const { hackathon } = useHackathonAuditStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [sectorOptions, setSectorOptions] = useState<MultiSelectOption[]>([]);
  const changeInput = (e: any) => {
    const newKeyword = e.target.value;
    if (timeOut.current) clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      handleSearch('keyword', newKeyword);
    }, 1000);
  };

  const {} = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getProjectTracksDict({
        hackathonId: hackathon?.id as string
      });
      return res;
    },
    {
      onSuccess(res) {
        const newSectorOptions = res.map((v) => ({
          label: v,
          value: v
        }));
        setSectorOptions(newSectorOptions);
      }
    }
  );

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-[20px]">
        <SortBy
          updateSort={(sort: string) => {
            handleSearch('sort', sort);
          }}
          curSort={sort}
          sorts={applicationSortData}
        />
        <MultiSelect
          type="checkbox"
          value={tableInformation}
          options={submissionInformationData}
          name="Information"
          onSelect={setTableInformation}
        />
        <MultiSelect
          value={sectors}
          options={sectorOptions}
          name="Sector"
          onSelect={(sec) => {
            handleSearch('sectors', sec);
          }}
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
