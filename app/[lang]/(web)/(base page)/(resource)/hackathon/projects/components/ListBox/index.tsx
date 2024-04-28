'use client';
import React, { useContext, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { PageInfoType, SearchParamsType } from '../..';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Select from '@/components/Common/Select';
import { useDebounceFn, useRequest } from 'ahooks';
import { OptionType } from '@/components/Common/Select/type';
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

interface ListBoxProp {
  list: ProjectType[];
  searchParams: SearchParamsType;
  total: number;
  pageInfo: PageInfoType;
  searchList: (search: SearchParamsType) => void;
}

const ListBox: React.FC<ListBoxProp> = ({ list, searchParams, total, pageInfo, searchList }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [tracks, setTracks] = useState<OptionType[]>([]);

  const [hoverSort, setHoverSort] = useState<boolean>(false);

  const { run: mouseLeaveSort } = useDebounceFn(
    () => {
      setHoverSort(false);
    },
    { wait: 100 }
  );
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
    <div className="flex w-full flex-col gap-[40px] pb-[80px]">
      {searchParams.keyword ? (
        <p className="text-h3 text-center text-neutral-black">
          <span>{`${total} ${t('resultsFor')} `}</span>
          <span className="text-neutral-medium-gray">{`“${searchParams.keyword}”`}</span>
        </p>
      ) : (
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[40px]">
            <Select
              name=""
              state="default"
              options={tracks}
              defaultValue={searchParams.tracks.split(',')?.[0] || ''}
              className="h-[48px]"
              onChange={(val) => {
                searchList({
                  ...searchParams,
                  tracks: val as string
                });
              }}
            />
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
                className="absolute -bottom-[4px]  right-0 z-[99] rounded-[10px] border border-neutral-light-gray bg-neutral-white py-4 shadow-sm"
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
        </div>
      )}

      <div className="flex w-full flex-wrap gap-x-[20px] gap-y-[40px]">
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
