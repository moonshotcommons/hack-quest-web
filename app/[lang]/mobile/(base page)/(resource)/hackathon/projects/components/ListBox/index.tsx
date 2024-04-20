'use client';
import React, { useContext, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { PageInfoType, SearchParamsType } from '../..';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Select from '@/components/Common/Select';
import { useRequest } from 'ahooks';
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
      {searchParams.keyword ? (
        <p className="text-h3 text-center text-neutral-black">
          <span>{`${total} ${t('resultsFor')} `}</span>
          <span className="text-neutral-medium-gray">{`“${searchParams.keyword}”`}</span>
        </p>
      ) : (
        <div className="">
          <Select
            name=""
            state="default"
            options={tracks}
            defaultValue={searchParams.tracks.split(',')?.[0] || ''}
            className="h-[3rem]"
            onChange={(val) => {
              searchList({
                ...searchParams,
                tracks: val as string
              });
            }}
          />
          <div className="mt-[1rem] flex items-center justify-between">
            <div
              className="body-s flex  items-center gap-[.625rem] text-neutral-medium-gray"
              onClick={() => {
                searchList({
                  ...searchParams,
                  apolloDay: !searchParams.apolloDay
                });
              }}
            >
              <Checkbox
                checked={!!searchParams.apolloDay}
                outClassNames="border-neutral-medium-gray w-[1.375rem] h-[1.375rem]"
              />
              <div className="whitespace-nowrap">{t('projects.apolloDayonly')}</div>
            </div>
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
                  <PiSortAscendingBold size={20} />
                </span>
                <span className="body-s">{t('courses.sortBy')}</span>
              </div>
              {hoverSort && (
                <motion.ul
                  {...animateProps}
                  className="absolute -bottom-[4px]  right-0 z-[99] w-fit min-w-[160px] rounded-[10px] border border-neutral-light-gray bg-neutral-white py-4 shadow-sm"
                >
                  {projectSort.map((option) => {
                    return (
                      <li
                        key={option.value}
                        className="body-m flex cursor-pointer items-center justify-between px-3 py-2 text-neutral-black hover:bg-neutral-off-white"
                        onClick={() => {}}
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
          </div>
        </div>
      )}

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
    </div>
  );
};

export default ListBox;
