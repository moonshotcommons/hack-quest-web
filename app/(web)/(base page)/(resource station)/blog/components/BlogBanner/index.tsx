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

interface BannerProp {}

const BlogBanner: React.FC<BannerProp> = () => {
  const router = useRouter();
  const searchInfo = {
    keyword: '',
    category: searchTabData[0].value,
    sort: sortData[0].value
  };
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
    const { category } = searchInfo;
    const index = searchTabData.findIndex((v) => v.value === category);
    setCurrentIndex(index);
  }, [searchInfo]);

  return (
    <div
      className="h-[487px] text-[#fff] font-next-book  pt-[60px] pb-[40px]"
      style={{
        backgroundColor: '#0B0B0B',
        backgroundImage: `url(${BlogBannerBg.src})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto h-full flex flex-col justify-between">
        <div>
          <p className="text-[42px] leading-[67px] tracking-[0.84px] font-next-book-bold">
            BLOG
          </p>
          <p className="w-[528px] text-[21px] leading-[33px] tracking-[0.42px]">
            Explore our Web3 Blog – your hub for news, events, and study notes!
            Contribute your insights, shaping the conversation in the world of
            decentralized tech.
          </p>
        </div>
        <div className="w-full h-[60px] px-[30px] rounded-[100px] bg-[#3E3E3E] flex items-center justify-between">
          {!inputVisible && (
            <div className="flex items-center gap-[30px]">
              <div
                tabIndex={0}
                className={`cursor-pointer relative px-[20px] py-[6px] rounded-[100px] ${
                  sortVisible ? 'bg-[#f4f4f4] text-[#0b0b0b]' : ''
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
                  <div className="absolute bottom-[-100px] left-0 rounded-[10px] border border-[var(--neutral-medium-gray)] bg-[#fff] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] text-[#0b0b0b] text-[14px] overflow-hidden">
                    {sortData.map((v) => (
                      <div
                        key={v.value}
                        onClick={() => changeSort(v.value)}
                        className={`h-[40px] flex items-center px-[20px] ${
                          searchInfo.sort === v.value ? 'bg-[#F4F4F4]' : ''
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
                className="text-[18px] flex items-center"
                type={'BLOG_FILTER'}
                currentIndex={currentIndex}
              >
                {searchTabData.map((v) => (
                  <div
                    key={v.value}
                    className={`${
                      v.value !== 'empty'
                        ? `px-[20px] py-[7px] rounded-[100px] cursor-pointer relative ${
                            searchInfo.category === v.value
                              ? 'text-[#0b0b0b]'
                              : ''
                          }`
                        : 'w-[30px] h-[41px]'
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
              inputVisible ? 'justify-between flex-1' : ''
            }`}
          >
            {inputVisible ? (
              <>
                <input
                  type="text"
                  className="flex-1 h-[38px] text-[24px] bg-[transparent] outline-none"
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
                className="flex items-center  cursor-pointer"
              >
                <span className="mr-[6px] text-[24px]">Search</span>
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
