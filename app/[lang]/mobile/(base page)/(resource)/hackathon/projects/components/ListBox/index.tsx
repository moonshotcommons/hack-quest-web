'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { PageInfoType, SearchParamsType } from '../..';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Select from '@/components/Common/Select';
import { useRequest, useToggle } from 'ahooks';
import { OptionType } from '@/components/Common/Select/type';
import webApi from '@/service';
import Checkbox from '@/components/Common/Checkbox';
import MenuLink from '@/constants/MenuLink';
import { GoCheck } from 'react-icons/go';
import { animateProps } from '@/components/Common/DropDownMotion/type';
import { motion } from 'framer-motion';
import { PiSortAscendingBold } from 'react-icons/pi';
import Pagination from '@/components/Common/Pagination';
import { projectSort } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/data';
import MobProjectCard from '@/components/Mobile/MobProjectCard';
import { SearchIcon, XIcon } from 'lucide-react';

interface ListBoxProp {
  list: ProjectType[];
  searchParams: SearchParamsType;
  total: number;
  pageInfo: PageInfoType;
  defaultValue?: string;
  searchList: (search: SearchParamsType) => void;
  onSearch?: (value: string) => void;
}

const ListBox: React.FC<ListBoxProp> = ({
  list,
  searchParams,
  total,
  pageInfo,
  defaultValue = '',
  searchList,
  onSearch
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filterModalVisible, filterModalActions] = useToggle(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [tracks, setTracks] = useState<OptionType[]>([]);

  const [hoverSort, setHoverSort] = useState<boolean>(false);

  useEffect(() => {
    setSearchValue(defaultValue);
  }, [defaultValue]);

  const {} = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getProjectTracksDict();
      return res;
    },
    {
      onSuccess(res) {
        const newTracks = res?.map((v) => ({
          label: v,
          value: v
        }));
        setTracks([
          {
            label: 'All Tracks',
            value: ''
          },
          ...newTracks
        ]);
      }
    }
  );
  return (
    <div className="pb-[3.75rem]">
      <div className="mt-10">
        <div className="flex w-full items-center gap-2 rounded-full border border-neutral-light-gray bg-neutral-white px-5 py-3">
          <SearchIcon size={20} />
          <input
            className="w-full bg-transparent text-base outline-none placeholder:text-neutral-medium-gray"
            placeholder={t('searchPlaceholder')}
            value={searchValue}
            onInput={(e) => {
              const value = (e.target as HTMLInputElement).value;
              setSearchValue(value);
              if (timeOut.current) clearTimeout(timeOut.current);
              timeOut.current = setTimeout(() => {
                onSearch?.(value);
              }, 1000);
            }}
          />
          {!!searchValue && (
            <span
              className="cursor-pointer"
              onClick={() => {
                setSearchValue('');
                onSearch?.('');
              }}
            >
              <XIcon size={20} />
            </span>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              tabIndex={0}
              className="relative h-fit"
              onClick={() => setHoverSort(!hoverSort)}
              onBlur={() => setHoverSort(false)}
            >
              <div
                className={`relative flex cursor-pointer items-center gap-[.25rem] rounded-[1.5rem] px-[.75rem] py-[.25rem] text-neutral-off-black ${hoverSort && 'bg-neutral-light-gray text-neutral-medium-gray '}`}
              >
                <span>
                  <PiSortAscendingBold size={24} />
                </span>
              </div>
              {hoverSort && (
                <motion.ul
                  {...animateProps}
                  className="absolute -bottom-[4px] left-0 z-[99] rounded-[.625rem] border border-neutral-light-gray bg-neutral-white py-4 shadow-sm"
                >
                  {projectSort.map((option) => {
                    return (
                      <li
                        key={option.value}
                        className={`body-m flex cursor-pointer items-center justify-between gap-[2.5rem] whitespace-nowrap px-3 py-2 text-neutral-black hover:bg-neutral-off-white ${option.value === searchParams.createdAt && 'bg-neutral-off-white'}`}
                        onClick={() => {}}
                      >
                        <span>{t(option.label)}</span>
                        {option.value === searchParams.createdAt && (
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
            <div
              className="body-s flex  items-center gap-[.625rem] text-neutral-medium-gray"
              onClick={() => {
                searchList({
                  ...searchParams,
                  winner: !searchParams.winner
                });
              }}
            >
              <Checkbox
                checked={!!searchParams.winner}
                outClassNames="border-neutral-medium-gray w-[1.375rem] h-[1.375rem]"
              />
              <div className="whitespace-nowrap">{t('projects.winner')}</div>
            </div>
          </div>
          {/* <button
            className="flex min-w-36 items-center justify-center rounded-full border border-neutral-black p-3 text-xs uppercase text-neutral-black outline-none"
            onClick={filterModalActions.toggle}
          >
            <SlidersHorizontalIcon size={16} />
            <span className="ml-2">Filters</span>
          </button> */}
          <Select
            name=""
            state="default"
            options={tracks}
            defaultValue={searchParams.tracks.split(',')?.[0] || ''}
            className="h-[2.125rem]"
            onChange={(val) => {
              searchList({
                ...searchParams,
                tracks: val as string
              });
            }}
          />
        </div>
      </div>
      <div className="mt-[1.75rem] flex w-full flex-col gap-[1rem]">
        {list?.map((project) => (
          <div className="w-full" key={project.id}>
            <MobProjectCard project={project} />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center pt-[1.75rem]">
        {total > pageInfo.limit && (
          <Pagination
            page={pageInfo.page}
            total={Math.ceil(total / pageInfo.limit)}
            urlPrefix={`${MenuLink.PROJECTS}/p/`}
          ></Pagination>
        )}
      </div>
      {/* <Modal open={filterModalVisible} onClose={filterModalActions.toggle} className="w-full">
        <div className="relative w-full rounded-2xl bg-neutral-white px-5 py-8">
          <button className="absolute right-4 top-4 outline-none">
            <XIcon size={20} onClick={filterModalActions.toggle} />
          </button>
          <h2 className="text-base font-bold">Hackathon Track</h2>
          <div>
            {tracks.map((track) => (
              <div key={track.value}>
                <Checkbox checked={true} outClassNames="border-neutral-medium-gray w-[1.375rem] h-[1.375rem]" />
              </div>
            ))}
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default ListBox;
