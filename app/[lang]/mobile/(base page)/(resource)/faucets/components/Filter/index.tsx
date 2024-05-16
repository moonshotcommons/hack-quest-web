'use client';
import React from 'react';
import { SearchParamsType } from '../../page';
import Button from '@/components/Common/Button';
import { IoAdd, IoClose } from 'react-icons/io5';
import { useRouter } from 'next-nprogress-bar';
import { getSearchParamsUrl } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';
import { faucetsFilterData } from '@/app/[lang]/(web)/(base page)/(resource)/faucets/constants/data';

interface FilterProp {
  searchParams: SearchParamsType;
}

const Filter: React.FC<FilterProp> = ({ searchParams }) => {
  const router = useRouter();
  function changeSearchInfo(type: string, track: string) {
    const searchTracks = searchParams.type?.split(',') || [];
    const tracks =
      type === 'add' ? [...searchTracks, track].join(',') : searchTracks.filter((v) => v !== track).join(',');
    const searchInfo = {
      type: tracks
    };
    const url = getSearchParamsUrl(searchInfo, MenuLink.FAUCETS);
    router.push(url);
  }
  return (
    <div className="body-m text-neutral-off-black">
      <span>Network Filter</span>
      <div className="mt-[.5rem] flex items-center justify-between">
        {faucetsFilterData.map((v) => {
          return searchParams.type?.includes(v.value) ? (
            <Button
              key={v.value}
              type="primary"
              icon={<IoClose size={16} />}
              iconPosition="right"
              onClick={() => changeSearchInfo('remove', v.value)}
              className={`body-s h-[2.125rem] px-[.75rem]  text-neutral-off-black `}
            >
              {v.label}
            </Button>
          ) : (
            <Button
              key={v.value}
              ghost
              icon={<IoAdd size={20} />}
              iconPosition="right"
              onClick={() => changeSearchInfo('add', v.value)}
              className={`body-s h-[2.125rem] border-neutral-off-black px-[.75rem]  text-neutral-off-black`}
            >
              {v.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
