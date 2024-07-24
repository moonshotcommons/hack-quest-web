import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef
} from 'react';
import { TbArrowsCross, TbLayoutGrid } from 'react-icons/tb';
import { MdOutlineViewAgenda } from 'react-icons/md';
import { BsGrid3X2 } from 'react-icons/bs';
import { PiSortAscendingBold } from 'react-icons/pi';
import { BiSearch } from 'react-icons/bi';
import { useDebounceFn, useRequest } from 'ahooks';
import { motion } from 'framer-motion';
import { animateProps, hackathonVoteProjectSort } from '../../../../../constants/data';
import { GoCheck } from 'react-icons/go';
import FilterSelect from '@/components/Web/Business/CourseFilterList/FilterSelect';
import webApi from '@/service';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { errorMessage } from '@/helper/ui';
import { FilterItemType } from '@/components/Web/Business/CourseFilterList/type';
import { HackathonVoteContext, ViewValue } from '../../../../../constants/type';

export interface SearchType {
  keyword: string;
  sort: string;
  // prizeTrack: string;
  tracks: string;
}
interface FilterProp {
  hackathon: HackathonType;
  handleSearch: (search: SearchType) => void;
  handleRandom: VoidFunction;
}

export interface FilterRef {
  handleReset: VoidFunction;
}

const Filter: ForwardRefRenderFunction<FilterRef, FilterProp> = ({ hackathon, handleSearch, handleRandom }, ref) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [keyword, setKeyword] = useState('');
  const { view, setView } = useContext(HackathonVoteContext);
  const inputTimer = useRef<NodeJS.Timeout | null>(null);
  const [hoverSort, setHoverSort] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterItemType[]>([]);
  const [tracks, setTracks] = useState<Record<string, any>>();
  const [sort, setSort] = useState(hackathonVoteProjectSort[0].value);
  const {} = useRequest(
    async () => {
      // const prizeTracks = await webApi.resourceStationApi.getHackathonPrizeTracks(hackathon.id);
      const projectTracks = await webApi.resourceStationApi.getProjectTracksDict({
        hackathonId: hackathon.id
      });
      // const prizeTrackFilter = {
      //   filterName: t('hackathonVoting.prizeTrack'),
      //   filterField: 'prizeTrack',
      //   options: prizeTracks.map((v) => ({
      //     name: v,
      //     value: v,
      //     isSelect: false
      //   }))
      // };
      const projectTrackFilter = {
        filterName: t('hackathonVoting.projectTrack'),
        filterField: 'tracks',
        options: projectTracks.map((v) => ({
          name: v,
          value: v,
          isSelect: false
        }))
      };
      return [projectTrackFilter];
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
  useImperativeHandle(ref, () => {
    return {
      handleReset() {
        const keyword = '';
        const newFilters = filters.map((v) => {
          v.options.map((f) => {
            f.isSelect = false;
          });
          return v;
        });
        const tracks = changeFilter(newFilters);
        setTracks(tracks);
        setKeyword(keyword);
        handleSearch({
          // prizeTrack: tracks?.prizeTrack?.join(',') || '',
          tracks: tracks?.tracks?.join(',') || '',
          sort,
          keyword
        });
      }
    };
  });
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
        // prizeTrack: tracks?.prizeTrack?.join(',') || '',
        tracks: tracks?.tracks?.join(',') || '',
        sort,
        keyword: val
      });
    }, 600);
  };
  const handleFilter = (filters: FilterItemType[]) => {
    const tracks = changeFilter(filters);
    setTracks(tracks);
    handleSearch({
      // prizeTrack: tracks?.prizeTrack?.join(',') || '',
      tracks: tracks?.tracks?.join(',') || '',
      sort,
      keyword
    });
  };

  const changeFilter = (filters: FilterItemType[]) => {
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
    return tracks;
  };
  const handleSort = (sort: string) => {
    setSort(sort);
    handleSearch({
      // prizeTrack: tracks?.prizeTrack?.join(',') || '',
      tracks: tracks?.tracks?.join(',') || '',
      sort,
      keyword
    });
  };
  const handleView = (view: ViewValue) => {
    setView(view);
  };

  useEffect(() => {
    handleSearch({
      // prizeTrack: tracks?.prizeTrack?.join(',') || '',
      tracks: tracks?.tracks?.join(',') || '',
      sort,
      keyword
    });
  }, []);

  return (
    <div className="w-full">
      <div className="mb-[16px] flex justify-between">
        <div className="body-l flex h-[28px] items-center [&>div]:flex [&>div]:h-full [&>div]:cursor-pointer [&>div]:items-center [&>div]:rounded-[8px] [&>div]:px-[6px] [&>div]:transition-all">
          <div
            className=" relative z-[99] hover:scale-[1.1]"
            onMouseEnter={() => {
              mouseLeaveSort.cancel();
              setHoverSort(true);
            }}
            onMouseLeave={mouseLeaveSort}
          >
            <PiSortAscendingBold />
            {hoverSort && (
              <motion.ul
                {...animateProps}
                className="absolute -bottom-[4px]  left-0 z-[99] overflow-hidden rounded-[10px] border border-neutral-light-gray bg-neutral-white py-[4px] shadow-sm"
              >
                {hackathonVoteProjectSort.map((option) => {
                  return (
                    <li
                      key={option.value}
                      className={`body-m flex w-[200px] cursor-pointer items-center justify-between whitespace-nowrap px-3 py-2 text-neutral-black hover:bg-neutral-off-white `}
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
          <p className="mx-[2px] h-full w-[1px] bg-neutral-light-gray"></p>
          <div className="mr-[32px] hover:scale-[1.1]" onClick={handleRandom}>
            <TbArrowsCross />
          </div>
          <div
            className={`hover:scale-[1.1] ${view === ViewValue.AGENDA ? 'bg-neutral-white text-neutral-off-black' : 'text-neutral-medium-gray'}`}
            onClick={() => handleView(ViewValue.AGENDA)}
          >
            <MdOutlineViewAgenda />
          </div>
          <div
            className={`hover:scale-[1.1] ${view === ViewValue.GRID ? 'bg-neutral-white text-neutral-off-black' : 'text-neutral-medium-gray'}`}
            onClick={() => handleView(ViewValue.GRID)}
          >
            <TbLayoutGrid />
          </div>
          <p className="mx-[2px] h-full w-[1px] bg-neutral-light-gray"></p>
          <div
            className={`hover:scale-[1.1] ${view === ViewValue.CALENDAR ? 'bg-neutral-white text-neutral-off-black' : 'text-neutral-medium-gray'}`}
            onClick={() => handleView(ViewValue.CALENDAR)}
          >
            <BsGrid3X2 />
          </div>
        </div>
        <div className="flex h-[42px] w-[394px]  items-center overflow-hidden rounded-[56px] border border-neutral-light-gray bg-neutral-white px-[20px]">
          <BiSearch size={16} className="cursor-pointer" />
          <input
            className="flex-1 border-none bg-transparent pl-[8px] outline-none"
            placeholder={t('searchPlaceholder')}
            value={keyword}
            onChange={(e) => {
              handleKeyword(e.target.value);
            }}
          />
        </div>
      </div>
      <FilterSelect filters={filters} updateFilters={handleFilter}></FilterSelect>
    </div>
  );
};

export default forwardRef(Filter);
