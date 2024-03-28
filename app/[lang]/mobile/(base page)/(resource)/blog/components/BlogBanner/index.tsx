'use client';
import React, { useEffect, useRef, useState } from 'react';
import { PiSortAscendingBold, PiSortDescendingBold } from 'react-icons/pi';
import { BiSearch, BiCheck } from 'react-icons/bi';
import { BlogSearchType } from '@/service/webApi/resourceStation/type';
import { useRouter } from 'next/navigation';
import { cloneDeep } from 'lodash-es';
import Link from 'next/link';
import Select from '@/components/Common/Select';
import { searchTabData, sortData } from '../../constants/data';
import { FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getSearchParamsUrl } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';
import { HiArrowLongRight } from 'react-icons/hi2';

interface BannerProp {
  searchParams: BlogSearchType;
}

const BlogBanner: React.FC<BannerProp> = ({ searchParams }) => {
  const router = useRouter();
  const [searchInfo, setSearchInfo] = useState<BlogSearchType>({});
  const [inputVisible, setInputVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isInit = useRef(true);

  function changeSearchInfo(searchInfo: BlogSearchType) {
    const url = getSearchParamsUrl(searchInfo, MenuLink.BLOG);
    router.push(url);
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
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    if (timeOut.current) clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      changeSearchInfo({
        ...searchInfo,
        keyword: newKeyword
      });
    }, 1000);
  };

  const changeInputVisible = () => {
    setInputVisible(!inputVisible);
    setKeyword('');
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
    setSearchInfo(newSearchInfo);
    setKeyword(newSearchInfo.keyword);
    setInputVisible(!!newSearchInfo.keyword);
    setTimeout(() => {
      isInit.current = false;
    }, 1000);
  }, [searchParams]);

  useEffect(() => {
    if (inputVisible && !isInit.current) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  return (
    <>
      <div className="body-l relative z-[10]  flex flex-col gap-[1rem] bg-neutral-off-white px-[1.25rem] py-[1.875rem] text-neutral-off-black">
        <h1 className="text-h2-mob">Blog</h1>
        <p className="body-s w-full text-neutral-rich-gray">
          Explore our Web3 Blog – your hub for news, events, and study notes!
          Contribute your insights, shaping the conversation in the world of
          decentralized tech.
        </p>

        <Link
          className="caption-14pt relative flex w-fit  items-center gap-[6px] text-neutral-off-black"
          href="https://xsxo494365r.typeform.com/to/RwN08ht9"
          target="_blank"
        >
          <span>Contribute Blogs to HackQuest</span>
          <HiArrowLongRight size={16}></HiArrowLongRight>
          <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-[5px] bg-yellow-dark"></div>
        </Link>

        <div className="relative mt-[.75rem] flex h-[48px] w-full items-center">
          <div
            tabIndex={0}
            className={`flex-center relative h-[3rem] w-[3rem] cursor-pointer  rounded-full ${
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
              <div className="body-s absolute bottom-[-5.625rem] left-0 overflow-hidden rounded-[10px] bg-neutral-off-white text-neutral-black shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                {sortData.map((v) => (
                  <div
                    key={v.value}
                    onClick={() => changeSort(v.value)}
                    className={`flex h-[40px] items-center px-[20px] ${
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
          <div className="ml-[.0625rem] mr-[.9375rem] flex-1">
            <Select
              label=""
              name=""
              state="default"
              className="body-m h-[48px] border-neutral-light-gray bg-neutral-white"
              placeholder="Please select"
              defaultValue={searchInfo.category}
              options={searchTabData}
              onChange={(value) => {
                changeSearch(value as string);
              }}
            ></Select>
          </div>
          <motion.div
            animate={inputVisible ? 'open' : 'closed'}
            className="absolute h-full overflow-hidden "
            variants={{
              open: { width: '100%' },
              closed: { width: 0 }
            }}
          >
            <input
              type="text"
              className="body-m h-full w-full rounded-[1.5rem] bg-neutral-white pl-[1.375rem]  outline-none"
              placeholder="Search"
              value={keyword}
              onInput={changeInput}
            />
          </motion.div>
          {inputVisible ? (
            <div
              className="flex-center absolute right-[1.375rem] top-0 h-full w-[1.5rem]"
              onClick={changeInputVisible}
            >
              <FiX size={24} />
            </div>
          ) : (
            <div onClick={() => setInputVisible(true)}>
              <BiSearch size={24} />
            </div>
          )}
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 z-[9] h-full w-full bg-neutral-black opacity-50 ${
          !keyword && inputVisible ? 'block' : 'hidden'
        }`}
      ></div>
    </>
  );
};

export default BlogBanner;
