'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { PageInfoType, SearchParamsType } from '../..';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { useToggle } from 'ahooks';
import Checkbox from '@/components/Common/Checkbox';
import MenuLink from '@/constants/MenuLink';
import { GoCheck } from 'react-icons/go';
import { animateProps } from '@/components/Common/DropDownMotion/type';
import { motion } from 'framer-motion';
import { PiSortAscendingBold } from 'react-icons/pi';
import Pagination from '@/components/Common/Pagination';
import { projectSort } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/data';
import MobProjectCard from '@/components/Mobile/MobProjectCard';
import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { FilterModal } from './filter-modal';

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

  const [hoverSort, setHoverSort] = useState<boolean>(false);

  useEffect(() => {
    setSearchValue(defaultValue);
  }, [defaultValue]);

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
                        className={`body-m flex cursor-pointer items-center justify-between gap-[2.5rem] whitespace-nowrap px-3 py-2 text-neutral-black hover:bg-neutral-off-white ${option.value === searchParams.sort && 'bg-neutral-off-white'}`}
                        onClick={() => {
                          searchList({
                            ...searchParams,
                            sort: option.value
                          });
                        }}
                      >
                        <span>{t(option.label)}</span>
                        {option.value === searchParams.sort && (
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
          <button
            className="flex h-8 min-w-[140px] items-center justify-center rounded-full border border-neutral-black p-3 text-xs uppercase text-neutral-black outline-none"
            onClick={filterModalActions.toggle}
          >
            <SlidersHorizontalIcon size={16} />
            <span className="ml-2">Filters</span>
          </button>
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
      <FilterModal open={filterModalVisible} onClose={filterModalActions.toggle} />
    </div>
  );
};

export default ListBox;
