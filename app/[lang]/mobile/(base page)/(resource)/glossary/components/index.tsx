'use client';
import React, { useEffect, useRef, useState } from 'react';
import GlossaryHeader from './GlossaryHeader';
import NoData from './NoData';
import MenuLink from '@/constants/MenuLink';
import { BlogType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import GlossaryList, { GlossaryListType, OffsetTopsType } from './GlossaryList';
import FilterLetter from './FilterLetter';
import FilterTrack from './FilterTrack';
import useGetHeight from '@/hooks/dom/useGetHeight';
import BackTop from './BackTop';
import { Transition } from '@headlessui/react';
import BlogFooter from '../../blog/components/BlogFooter';
import { getSearchParamsUrl } from '@/helper/utils';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { LetterDataType } from '@/app/[lang]/(web)/(base page)/(resource)/glossary/constants/type';

interface GlossaryPageProp {
  galossaryList: BlogType[];
  searchParams: { keyword?: string; category?: string };
}

const GlossaryPage: React.FC<GlossaryPageProp> = ({ searchParams = {}, galossaryList }) => {
  const [list, setList] = useState<GlossaryListType[]>([]);
  const [filterTracks, setFilterTracks] = useState<string[]>([]);
  const [tracks, setTracks] = useState<string[]>([]);
  const [letter, setLetter] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTimeOut = useRef<NodeJS.Timeout | null>(null);
  const stickyTimeOut = useRef<NodeJS.Timeout | null>(null);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
  const [letterData, setLetterData] = useState<LetterDataType[]>([]);
  const { pageHeight } = useGetHeight();
  const [isSticky, setIsSticky] = useState(false);
  const isOnScroll = useRef(false);
  const [trackOffsetTop, setTrackOffsetTop] = useState(0);
  const {} = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getGlossaryTracks();
      return res;
    },
    {
      onSuccess(res) {
        setFilterTracks(res);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );
  const letterClick = (val: string) => {
    setLetter(val);
    const index = letterData.findIndex((v) => v.letter === val);
    isOnScroll.current = true;
    boxRef.current?.scrollTo({
      top: offsetTops[index].offsetTop
    });
    setTimeout(() => {
      isOnScroll.current = false;
    }, 10);
  };
  const trackClick = (val: string) => {
    const newTracks = ~tracks.indexOf(val) ? tracks.filter((v) => v !== val) : [...tracks, val];
    setTracks(newTracks);
    if (!newTracks.length) {
      dealList(galossaryList);
    } else {
      let newList = galossaryList.filter((v) => v.tracks.some((vv) => newTracks.includes(vv)));
      dealList(newList);
    }
    isOnScroll.current = true;
    setTimeout(() => {
      isOnScroll.current = false;
    }, 10);
    // const url = getSearchParamsUrl(
    //   {
    //     category: newTracks.join(',')
    //   },
    //   MenuLink.GLOSSARY
    // );
    // router.push(url);
  };
  const getTrackList = () => {
    const newTracks = searchParams.category?.split(',') || [];
    setTracks(newTracks);
    dealList(galossaryList);
  };
  const dealList = (gList: BlogType[]) => {
    let newGlossaryList: GlossaryListType[] = [];
    let letters: LetterDataType[] = [];
    const url = getSearchParamsUrl(
      {
        category: searchParams.category
      },
      MenuLink.GLOSSARY
    );
    gList.forEach((v) => {
      const firstLetter = v.title.charAt(0).toUpperCase();
      if (/\w/.test(firstLetter)) {
        if (!letters.some((v) => v.letter === firstLetter)) {
          letters.push({
            letter: firstLetter,
            url: `${url}#glossary-${firstLetter}`
          });
          const obj = {
            letter: firstLetter,
            list: [v]
          };
          newGlossaryList.push(obj);
        } else {
          const index = newGlossaryList.findIndex((g) => g.letter === firstLetter);
          newGlossaryList[index].list.push(v);
        }
      }
    });
    setLetter(letters[0]?.letter || '');
    setLetterData(letters);
    setList(newGlossaryList);
  };
  const handleBackTop = () => {
    boxRef.current?.scrollTo({
      top: 0
    });
  };
  const onScroll = () => {
    const boxScrollTop = boxRef.current?.scrollTop || 0;
    if (!stickyTimeOut.current) {
      stickyTimeOut.current = setTimeout(() => {
        stickyTimeOut.current = null;
        setIsSticky(boxScrollTop >= trackOffsetTop - 1);
      }, 150);
    }
    if (!letterData.length || scrollTimeOut.current || isOnScroll.current) return;
    scrollTimeOut.current = setTimeout(() => {
      scrollTimeOut.current = null;
      for (let i = 0; i < offsetTops.length; i++) {
        if (boxScrollTop >= offsetTops[offsetTops.length - 1].offsetTop) {
          setLetter(offsetTops[offsetTops.length - 1].letter);
          break;
        } else if (boxScrollTop >= offsetTops[i].offsetTop && boxScrollTop < offsetTops[i + 1].offsetTop) {
          setLetter(offsetTops[i].letter);
          break;
        }
      }
    }, 150);
  };
  useEffect(() => {
    getTrackList();
  }, [galossaryList]);

  useEffect(() => {
    const offsetTop = trackRef.current?.offsetTop || 0;
    setTrackOffsetTop(offsetTop);
  }, []);

  return (
    <div
      ref={boxRef}
      className={`scroll-wrap-y no-scrollbar ${!list.length ? 'flex flex-col' : ''}`}
      style={{ height: pageHeight }}
      onScroll={onScroll}
    >
      <GlossaryHeader keyword={searchParams.keyword || ''} />
      {!searchParams.keyword && (
        <>
          {letterData.length > 0 && (
            <FilterLetter letterData={letterData} letterClick={letterClick} letter={letter} isSticky={isSticky} />
          )}

          <div
            ref={trackRef}
            className={`sticky left-0 top-0 z-[10] w-full  ${isSticky ? 'bg-neutral-off-white py-[.9375rem] shadow-[0_0px_4px_0_rgba(0,0,0,0.25)]' : 'mt-[1.75rem] '}`}
          >
            <FilterTrack filterTracks={filterTracks} tracks={tracks} trackClick={trackClick} />
          </div>
        </>
      )}
      <div className={`px-[1.25rem] pb-[2.5rem] ${!list.length ? 'flex-1' : ''}`}>
        {searchParams.keyword ? (
          <div className="body-m mb-[2.5rem] text-center text-neutral-black">
            {galossaryList.length} Results for
            <span className="pl-[4px] text-neutral-medium-gray">“{searchParams.keyword}”</span>
          </div>
        ) : null}
        {list.length > 0 ? (
          <div className={`${!searchParams.keyword && letterData.length > 0 ? 'w-[calc(100%-0.9375rem)]' : 'w-full'}`}>
            <GlossaryList list={list} setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)} />
          </div>
        ) : (
          <NoData href={MenuLink.GLOSSARY} keyword={searchParams.keyword}></NoData>
        )}
      </div>
      {list.length === 0 || searchParams.keyword ? <BlogFooter from={ResourceFrom.GLOSSARY} /> : null}
      <Transition show={isSticky} appear>
        <BackTop handleBackTop={handleBackTop} />
      </Transition>
    </div>
  );
};

export default GlossaryPage;
