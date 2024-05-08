'use client';
import React from 'react';
import { SearchParamsType } from '../../page';
import { faucetsFilterData } from '../../constants/data';
import Button from '@/components/Common/Button';
import { IoAdd, IoClose } from 'react-icons/io5';
import { useRouter } from 'next-nprogress-bar';
import { getSearchParamsUrl } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';

interface FilterProp {
  searchParams: SearchParamsType;
}

const Filter: React.FC<FilterProp> = ({ searchParams }) => {
  const router = useRouter();
  function changeSearchInfo(type: string, track: string) {
    const searchTracks = searchParams.track?.split(',') || [];
    const tracks =
      type === 'add' ? [...searchTracks, track].join(',') : searchTracks.filter((v) => v !== track).join(',');
    const searchInfo = {
      track: tracks
    };
    const url = getSearchParamsUrl(searchInfo, MenuLink.FAUCETS);
    router.push(url);
  }
  return (
    <div className="body-l flex items-center gap-[20px] text-neutral-off-black">
      <span>Network Filter</span>
      <div className="flex items-center gap-[16px]">
        {faucetsFilterData.map((v) => {
          return searchParams.track?.includes(v.value) ? (
            <Button
              key={v.value}
              type="primary"
              icon={<IoClose size={20} />}
              iconPosition="right"
              onClick={() => changeSearchInfo('remove', v.value)}
              className={`body-l h-[45px] px-[20px]  text-neutral-off-black `}
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
              className={`body-l h-[45px] border-neutral-off-black px-[20px]  text-neutral-off-black`}
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
