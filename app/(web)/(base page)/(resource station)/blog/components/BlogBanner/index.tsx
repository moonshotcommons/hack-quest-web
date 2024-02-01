'use client';

import React, { useEffect, useRef, useState } from 'react';
import BlogBannerBg from '@/public/images/blog/blog_banner_bg.png';
import { PiSortAscendingBold, PiSortDescendingBold } from 'react-icons/pi';
import { BiSearch, BiCheck } from 'react-icons/bi';
import { searchTabData, sortData } from '../../constants/data';
import { FiX } from 'react-icons/fi';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { BlogSearchType } from '@/service/webApi/resourceStation/type';
import { useRouter } from 'next/navigation';
import { cloneDeep } from 'lodash-es';

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
      changeSearchInfo({
        ...searchInfo,
        keyword
      });
    }, 300);
  };

  const changeInputVisible = () => {
    setInputVisible(!inputVisible);
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
    <div
      className="h-[487px] pb-[40px] pt-[60px]  text-neutral-white"
      style={{
        backgroundColor: '#0B0B0B',
        backgroundImage: `url(${BlogBannerBg.src})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto flex h-full flex-col justify-between">
        <div>
          <p className="text-h2">BLOG</p>
          <p className="body-l w-[528px]">
            Explore our Web3 Blog – your hub for news, events, and study notes!
            Contribute your insights, shaping the conversation in the world of
            decentralized tech.
          </p>
        </div>
        <div className="flex h-[60px] w-full items-center justify-between rounded-[100px] bg-neutral-rich-gray px-[30px]">
          {!inputVisible && (
            <div className="flex items-center gap-[30px]">
              <div
                tabIndex={0}
                className={`relative cursor-pointer rounded-[100px] px-[20px] py-[6px] ${
                  sortVisible ? 'bg-neutral-off-white text-neutral-black' : ''
                }`}
                onClick={() => setSortVisible(!sortVisible)}
                onBlur={() => {
                  setTimeout(() => {
                    setSortVisible(false);
                  }, 0);
                }}
              >
                {searchInfo.sort === sortData[0].value ? (
                  <PiSortAscendingBold size={32} />
                ) : (
                  <PiSortDescendingBold size={32} />
                )}

                {sortVisible && (
                  <div className="body-s absolute bottom-[-100px] left-0 overflow-hidden rounded-[10px] border border-[var(--neutral-medium-gray)] bg-neutral-white text-neutral-black shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                    {sortData.map((v) => (
                      <div
                        key={v.value}
                        onClick={() => changeSort(v.value)}
                        className={`flex h-[40px] items-center px-[20px] ${
                          searchInfo.sort === v.value
                            ? 'bg-neutral-off-white'
                            : ''
                        }`}
                      >
                        <div className="mr-[30px] whitespace-nowrap">
                          {v.label}
                        </div>
                        {searchInfo.sort === v.value && <BiCheck size={24} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <SlideHighlight
                className="body-l flex items-center"
                type={'BLOG_FILTER'}
                currentIndex={currentIndex}
              >
                {searchTabData.map((v, i) => (
                  <div
                    key={v.value}
                    className={`${
                      v.value !== 'empty'
                        ? `relative cursor-pointer rounded-[100px] px-[20px] py-[7px] ${
                            searchInfo.category === v.value
                              ? 'text-neutral-black'
                              : ''
                          }`
                        : 'h-[41px] w-[30px]'
                    }`}
                    style={
                      v.value === 'empty'
                        ? {
                            background:
                              'linear-gradient(to left, #3E3E3E 14px,#fff 1px,#3E3E3E 15px)'
                          }
                        : {}
                    }
                    onClick={(e) => {
                      if (v.value === 'empty') {
                        e.stopPropagation();
                        return;
                      }
                      changeSearch(v.value);
                    }}
                  >
                    {v.label}
                  </div>
                ))}
              </SlideHighlight>
            </div>
          )}
          <div
            className={` flex items-center ${
              inputVisible ? 'flex-1 justify-between' : ''
            }`}
          >
            {inputVisible ? (
              <>
                <input
                  type="text"
                  className="body-xl h-[38px] flex-1 bg-[transparent] outline-none"
                  placeholder="Search"
                  onInput={changeInput}
                />
                <FiX
                  size={32}
                  className="cursor-pointer"
                  onClick={changeInputVisible}
                />
              </>
            ) : (
              <div
                onClick={() => setInputVisible(true)}
                className="flex cursor-pointer  items-center"
              >
                <span className="body-xl mr-[6px]">Search</span>
                <BiSearch size={32} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
