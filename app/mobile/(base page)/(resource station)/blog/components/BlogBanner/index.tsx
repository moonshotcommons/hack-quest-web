'use client';
import React, { useEffect, useRef, useState } from 'react';
import { PiSortAscendingBold, PiSortDescendingBold } from 'react-icons/pi';
import { BiSearch, BiCheck } from 'react-icons/bi';
import { BlogSearchType } from '@/service/webApi/resourceStation/type';
import { useRouter } from 'next/navigation';
import { cloneDeep } from 'lodash-es';
import Link from 'next/link';
import Button from '@/components/Common/Button';
import Select from '@/components/Common/Select';
import { searchTabData, sortData } from '../../constants/data';

interface BannerProp {
  searchParams: BlogSearchType;
}

const BlogBanner: React.FC<BannerProp> = ({ searchParams }) => {
  const router = useRouter();
  const [searchInfo, setSearchInfo] = useState<BlogSearchType>({});
  const [inputVisible, setInputVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyWord, setKeyWord] = useState('');

  function changeSearchInfo(searchInfo: BlogSearchType) {
    const url = new URL('/blog', window.location.href);
    for (const key in searchInfo) {
      const value = searchInfo[key as keyof typeof searchInfo];
      if (!value) continue;
      url.searchParams.append(key, value);
    }
    router.push(url.toString());
  }

  const changeSearch = (val: string) => {
    if (val === searchInfo.category) return;
    changeSearchInfo({
      ...searchInfo,
      category: val
    });
  };
  const changeSort = (sort: string) => {
    setSortVisible(false);
    if (sort === searchInfo.sort) return;
    changeSearchInfo({
      ...searchInfo,
      sort
    });
  };
  const changeInput = (e: any) => {
    const keyword = e.target.value;
    if (timeOut.current) clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      setKeyWord(keyword);
      changeSearchInfo({
        ...searchInfo,
        keyword
      });
    }, 300);
  };

  const changeInputVisible = () => {
    setInputVisible(!inputVisible);
    setKeyWord('');
    changeSearchInfo({
      ...searchInfo,
      keyword: ''
    });
  };

  useEffect(() => {
    const newSearchInfo = cloneDeep(searchParams);
    newSearchInfo.sort = newSearchInfo.sort || sortData[0].value;
    newSearchInfo.category = newSearchInfo.category || searchTabData[0].value;
    newSearchInfo.keyword = newSearchInfo.keyword || '';
    const { category } = newSearchInfo;
    const index = searchTabData.findIndex((v) => v.value === category);
    setCurrentIndex(index);
    setSearchInfo(newSearchInfo);
    !newSearchInfo.keyword && setInputVisible(false);
  }, [searchParams]);

  return (
    <>
      <div className="text-neutral-off-black px-[1.25rem] py-[1.875rem]  bg-neutral-white body-l relative z-[10] flex flex-col gap-[1rem]">
        <p className="text-h2-mob">BLOG</p>
        <p className="body-s text-neutral-rich-gray w-full">
          Explore our Web3 Blog – your hub for news, events, and study notes!
          Contribute your insights, shaping the conversation in the world of
          decentralized tech.
        </p>
        <Link
          href="https://xsxo494365r.typeform.com/to/RwN08ht9"
          target="_blank"
          className="w-fit"
        >
          <Button
            type="primary"
            className="w-[10.3125rem] h-[3rem] button-text-m"
          >
            CONTRIBUTE
          </Button>
        </Link>
        <div className="w-full mt-[.75rem] h-[48px] flex items-center relative">
          <div
            tabIndex={0}
            className={`cursor-pointer relative w-[3rem] h-[3rem] flex-center  rounded-full ${
              sortVisible
                ? 'bg-neutral-light-gray text-neutral-medium-gray'
                : 'text-neutral-black'
            }`}
            onClick={() => setSortVisible(!sortVisible)}
            onBlur={() => {
              setTimeout(() => {
                setSortVisible(false);
              }, 0);
            }}
          >
            {searchInfo.sort === sortData[0].value ? (
              <PiSortAscendingBold size={24} />
            ) : (
              <PiSortDescendingBold size={24} />
            )}

            {sortVisible && (
              <div className="absolute bottom-[-5.625rem] left-0 rounded-[10px] bg-neutral-off-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] text-neutral-black body-s overflow-hidden">
                {sortData.map((v) => (
                  <div
                    key={v.value}
                    onClick={() => changeSort(v.value)}
                    className={`h-[40px] flex items-center px-[20px] ${
                      searchInfo.sort === v.value ? 'bg-neutral-light-gray' : ''
                    }`}
                  >
                    <div className="mr-[30px] whitespace-nowrap">{v.label}</div>
                    {searchInfo.sort === v.value && <BiCheck size={24} />}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 ml-[.0625rem] mr-[.9375rem]">
            <Select
              label=""
              name=""
              state="default"
              className="bg-neutral-off-white border-neutral-off-white body-m"
              placeholder="Please select"
              defaultValue={searchInfo.category}
              options={searchTabData}
              onChange={(value) => {
                changeSearch(value as string);
              }}
            ></Select>
          </div>

          <div>
            <BiSearch size={24} />
          </div>
        </div>
      </div>
      <div
        className={`fixed w-full h-full left-0 top-0 bg-neutral-black opacity-50 z-[9] ${
          !keyWord && inputVisible ? 'block' : 'hidden'
        }`}
      ></div>
    </>
  );
};

export default BlogBanner;
