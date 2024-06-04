'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { PageInfoType, SearchParamsType } from '../..';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { useDebounceFn } from 'ahooks';
import webApi from '@/service';
import Checkbox from '@/components/Common/Checkbox';
import MenuLink from '@/constants/MenuLink';
import { GoCheck } from 'react-icons/go';
import { projectSort } from '../../../constants/data';
import { animateProps } from '@/components/Common/DropDownMotion/type';
import { motion } from 'framer-motion';
import { PiSortAscendingBold } from 'react-icons/pi';
import ProjectCard from '@/components/Web/Business/ProjectCard';
import Pagination from '@/components/Common/Pagination';
import { SearchIcon, XIcon } from 'lucide-react';
import { MultiSelect } from './multi-select';
import { useQueries } from '@tanstack/react-query';

interface ListBoxProp {
  list: ProjectType[];
  searchParams: SearchParamsType;
  total: number;
  pageInfo: PageInfoType;
  defaultValue?: string;
  onSearch?: (value: string) => void;
  searchList: (search: SearchParamsType) => void;
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
  const { lang } = useContext(LangContext);
  const [searchValue, setSearchValue] = useState('');
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const [hoverSort, setHoverSort] = useState<boolean>(false);

  useEffect(() => {
    setSearchValue(defaultValue);
  }, [defaultValue]);

  const { run: mouseLeaveSort } = useDebounceFn(
    () => {
      setHoverSort(false);
    },
    { wait: 100 }
  );

  const [{ data: tracks }, { data: prizeTracks }] = useQueries({
    queries: [
      {
        queryKey: ['tracks'],
        queryFn: () => webApi.resourceStationApi.getProjectTracksDict()
      },
      {
        queryKey: ['prizeTracks'],
        queryFn: () => webApi.resourceStationApi.fetchHackathonPrizeTracks()
      }
    ]
  });

  return (
    <div className="flex w-full flex-col pb-[80px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[40px]">
          <div
            className="relative h-fit"
            onMouseEnter={() => {
              mouseLeaveSort.cancel();
              setHoverSort(true);
            }}
            onMouseLeave={mouseLeaveSort}
          >
            <div className="relative flex cursor-pointer items-center gap-[10px] rounded-[24px] px-[16px] py-[6px] text-neutral-off-black hover:bg-neutral-light-gray hover:text-neutral-medium-gray">
              <span>
                <PiSortAscendingBold size={32} />
              </span>
              <span className="body-l">{t('courses.sortBy')}</span>
            </div>
            {hoverSort && (
              <motion.ul
                {...animateProps}
                className="absolute -bottom-[4px] left-0 z-[99] rounded-[10px] border border-neutral-light-gray bg-neutral-white py-4 shadow-sm"
              >
                {projectSort.map((option) => {
                  return (
                    <li
                      key={option.value}
                      className={`body-m flex cursor-pointer items-center justify-between gap-[52px] whitespace-nowrap px-3 py-2 text-neutral-black hover:bg-neutral-off-white ${option.value === searchParams.createdAt && 'bg-neutral-off-white'}`}
                      onClick={() => {
                        searchList({
                          ...searchParams,
                          createdAt: option.value
                        });
                      }}
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
            className="body-m flex cursor-pointer items-center gap-[10px] text-neutral-medium-gray"
            onClick={() => {
              searchList({
                ...searchParams,
                winner: !searchParams.winner
              });
            }}
          >
            <Checkbox checked={!!searchParams.winner} outClassNames="border-neutral-medium-gray w-[26px] h-[26px]" />
            <div className="whitespace-nowrap">{t('projects.winner')}</div>
          </div>
        </div>
        <div className="flex w-[670px] items-center gap-3 rounded-full border border-neutral-light-gray bg-neutral-white px-5 py-3">
          <SearchIcon />
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
              <XIcon />
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 flex gap-2 self-start">
        <MultiSelect queryKey="prizeTrack" name="Prize Track" options={prizeTracks} />
        <MultiSelect queryKey="track" name="Hackathon Track" options={tracks} />
      </div>
      <div className="my-10 flex w-full flex-wrap gap-x-[20px] gap-y-[40px]">
        {list?.map((project) => (
          <div className="w-[calc((100%-60px)/4)]" key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center">
        {total > pageInfo.limit && (
          <Pagination
            page={pageInfo.page}
            total={Math.ceil(total / pageInfo.limit)}
            urlPrefix={`${MenuLink.PROJECTS}/p/`}
          ></Pagination>
        )}
      </div>
    </div>
  );
};

export default ListBox;
