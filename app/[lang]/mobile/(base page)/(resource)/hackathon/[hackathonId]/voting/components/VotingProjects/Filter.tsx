import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TbAdjustmentsHorizontal, TbArrowsCross } from 'react-icons/tb';
import { MdOutlineViewAgenda, MdViewHeadline } from 'react-icons/md';
import { PiSortAscendingBold } from 'react-icons/pi';
import { BiSearch } from 'react-icons/bi';
import { useDebounceFn, useRequest } from 'ahooks';
import { motion } from 'framer-motion';
import { GoCheck } from 'react-icons/go';
import webApi from '@/service';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { errorMessage } from '@/helper/ui';
import { FilterItemType } from '@/components/Web/Business/CourseFilterList/type';
import { HackathonVoteContext, ViewValue } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';
import {
  animateProps,
  hackathonVoteProjectSort
} from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/data';
import FilterModal, { FilterModalRef } from '@/components/Mobile/MobCourseFilterList/FilterModal';

export interface SearchType {
  keyword: string;
  sort: string;
  prizeTrack: string;
  tracks: string;
}
interface FilterProp {
  hackathon: HackathonType;
  handleSearch: (search: SearchType) => void;
  handleRandom: VoidFunction;
}

const Filter: React.FC<FilterProp> = ({ hackathon, handleSearch, handleRandom }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [keyword, setKeyword] = useState('');
  const { view, setView } = useContext(HackathonVoteContext);
  const inputTimer = useRef<NodeJS.Timeout | null>(null);
  const [hoverSort, setHoverSort] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterItemType[]>([]);
  const [tracks, setTracks] = useState<Record<string, any>>();
  const [sort, setSort] = useState(hackathonVoteProjectSort[0].value);

  const filterModalInstance = useRef<FilterModalRef>(null);

  const {} = useRequest(
    async () => {
      const prizeTracks = await webApi.resourceStationApi.getHackathonPrizeTracks(hackathon.id);
      const projectTracks = await webApi.resourceStationApi.getProjectTracksDict();
      const prizeTrackFilter = {
        filterName: t('hackathonVoting.prizeTrack'),
        filterField: 'prizeTrack',
        options: prizeTracks.map((v) => ({
          name: v,
          value: v,
          isSelect: false
        }))
      };
      const projectTrackFilter = {
        filterName: t('hackathonVoting.projectTrack'),
        filterField: 'tracks',
        options: projectTracks.map((v) => ({
          name: v,
          value: v,
          isSelect: false
        }))
      };
      return [prizeTrackFilter, projectTrackFilter];
    },
    {
      onSuccess(filter) {
        setFilters(filter);
      },
      onError(error) {
        errorMessage(error);
      }
    }
  );
  const { run: mouseLeaveSort } = useDebounceFn(
    () => {
      setHoverSort(false);
    },
    { wait: 100 }
  );
  const handleKeyword = (val: string) => {
    setKeyword(val);
    if (inputTimer.current) clearTimeout(inputTimer.current);
    inputTimer.current = setTimeout(() => {
      handleSearch({
        prizeTrack: tracks?.prizeTrack?.join(',') || '',
        tracks: tracks?.projectTrack?.join(',') || '',
        sort,
        keyword: val
      });
    }, 600);
  };
  const handleFilter = (filters: FilterItemType[]) => {
    setFilters(filters);
    let tracks: any = {};
    filters.forEach((v) => {
      tracks[v.filterField] = [];
      v.options.forEach((f) => {
        if (f.isSelect) {
          tracks[v.filterField].push(f.value);
        }
      });
    });
    setTracks(tracks);
    console.info(tracks);
    handleSearch({
      prizeTrack: tracks?.prizeTrack?.join(',') || '',
      tracks: tracks?.projectTrack?.join(',') || '',
      sort,
      keyword
    });
  };
  const handleSort = (sort: string) => {
    setSort(sort);
    handleSearch({
      prizeTrack: tracks?.prizeTrack?.join(',') || '',
      tracks: tracks?.projectTrack.join(',') || '',
      sort,
      keyword
    });
  };
  const handleView = (view: ViewValue) => {
    setView(view);
  };

  useEffect(() => {
    handleSearch({
      prizeTrack: tracks?.prizeTrack?.join(',') || '',
      tracks: tracks?.projectTrack?.join(',') || '',
      sort,
      keyword
    });
  }, []);

  return (
    <div className="w-full">
      <div className="mb-[1rem] flex h-[2.625rem] items-center overflow-hidden rounded-[3.5rem] border border-neutral-light-gray bg-neutral-white px-[1.25rem]">
        <BiSearch size={16} className="cursor-pointer" />
        <input
          className="body-m border-none bg-transparent pl-[.5rem] outline-none"
          placeholder={t('searchPlaceholder')}
          value={keyword}
          onChange={(e) => {
            handleKeyword(e.target.value);
          }}
        />
      </div>
      <div className="body-l mb-[1rem] flex h-[1.75rem] items-center gap-[.75rem]">
        <div className="flex w-[4.5rem]">
          <div
            tabIndex={1}
            className="relative z-[2] flex h-full flex-1 items-center rounded-[.5rem] px-[.5rem] "
            onClick={() => {
              mouseLeaveSort.cancel();
              setHoverSort(true);
            }}
            onBlur={mouseLeaveSort}
          >
            <PiSortAscendingBold />
            {hoverSort && (
              <motion.ul
                {...animateProps}
                className="absolute -bottom-[4px]  left-0 z-[2] overflow-hidden rounded-[10px] border border-neutral-light-gray bg-neutral-white py-[4px] shadow-sm"
              >
                {hackathonVoteProjectSort.map((option) => {
                  return (
                    <li
                      key={option.value}
                      className={`body-m flex cursor-pointer items-center justify-between gap-[52px] whitespace-nowrap px-3 py-2 text-neutral-black hover:bg-neutral-off-white `}
                      onClick={() => {
                        handleSort(option.value);
                      }}
                    >
                      <span>{t(option.label)}</span>
                      {sort === option.value && (
                        <span>
                          <GoCheck size={20} />
                        </span>
                      )}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </div>
          <div className="flex h-full flex-1 items-center rounded-[.5rem] px-[.5rem] " onClick={handleRandom}>
            <TbArrowsCross />
          </div>
        </div>
        <div
          className="button-text-s flex h-[2.125rem] flex-1 items-center justify-center gap-[0.75rem] rounded-[1.0625rem] border border-neutral-off-black"
          onClick={() => filterModalInstance.current?.open()}
        >
          <TbAdjustmentsHorizontal size={14} />
          <span className="uppercase">{t('courses.filter')}</span>
        </div>
        <div className="flex h-full w-[4.5rem] overflow-hidden rounded-[.5rem] bg-neutral-light-gray">
          <div
            className={`flex h-full flex-1 items-center rounded-[.5rem] px-[.5rem] ${view === ViewValue.AGENDA ? 'bg-neutral-white text-neutral-off-black' : 'text-neutral-medium-gray'}`}
            onClick={() => handleView(ViewValue.AGENDA)}
          >
            <MdOutlineViewAgenda />
          </div>
          <div
            className={`flex h-full flex-1 items-center rounded-[.5rem] px-[.5rem]  ${view === ViewValue.CALENDAR ? 'bg-neutral-white text-neutral-off-black' : 'text-neutral-medium-gray'}`}
            onClick={() => handleView(ViewValue.CALENDAR)}
          >
            <MdViewHeadline />
          </div>
        </div>
      </div>

      <FilterModal ref={filterModalInstance} filters={filters} updateFilters={handleFilter}></FilterModal>
    </div>
  );
};

export default Filter;
