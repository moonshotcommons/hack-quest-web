'use client';
import React, { useEffect, useRef, useState } from 'react';
import GlossaryHeader from './GlossaryHeader';
import NoData from './NoData';
import MenuLink from '@/constants/MenuLink';
import { BlogType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import FilterLetter from './FilterLetter';
import FilterTrack from './FilterTrack';
import GlossaryList, { GlossaryListType, OffsetTopsType } from './GlossaryList';
import BlogFooter from '../../blog/components/BlogFooter';
import { getSearchParamsUrl } from '@/helper/utils';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import { LetterDataType } from '../constants/type';
import { Transition } from '@headlessui/react';
import BackTop from './BackTop';

interface GlossaryPageProp {
  galossaryList: BlogType[];
  searchParams: { keyword?: string; category?: string };
}

const GlossaryPage: React.FC<GlossaryPageProp> = ({ galossaryList, searchParams }) => {
  const [list, setList] = useState<GlossaryListType[]>([]);
  const [filterTracks, setFilterTracks] = useState<string[]>([]);
  const [tracks, setTracks] = useState<string[]>([]);
  const [letter, setLetter] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const scrollTimeOut = useRef<NodeJS.Timeout | null>(null);
  const stickyTimeOut = useRef<NodeJS.Timeout | null>(null);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
  const [letterData, setLetterData] = useState<LetterDataType[]>([]);
  const isOnScroll = useRef(false);
  const [letterOffsetTop, setLetterOffsetTop] = useState(0);
  const letterClick = (val: string) => {
    setLetter(val);
    const index = letterData.findIndex((v) => v.letter === val);
    boxRef.current?.scrollTo({
      top: offsetTops[index].offsetTop
    });
    isOnScroll.current = true;
    setTimeout(() => {
      isOnScroll.current = false;
    }, 100);
  };

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

  const trackClick = (val: string) => {
    const newTracks = ~tracks.indexOf(val) ? tracks.filter((v) => v !== val) : [...tracks, val];
    getTrackList(newTracks);
    isOnScroll.current = true;
    setTimeout(() => {
      isOnScroll.current = false;
    }, 100);
    // const url = getSearchParamsUrl(
    //   {
    //     category: newTracks.join(',')
    //   },
    //   MenuLink.GLOSSARY
    // );
    // router.push(url);
  };
  const getTrackList = (newTracks: string[]) => {
    setTracks(newTracks);
    if (!newTracks.length) {
      dealList(galossaryList);
    } else {
      let newList = galossaryList.filter((v) => v.tracks.some((vv) => newTracks.includes(vv)));
      dealList(newList);
    }
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
  const onScroll = () => {
    const boxScrollTop = boxRef.current?.scrollTop || 0;
    if (!stickyTimeOut.current) {
      stickyTimeOut.current = setTimeout(() => {
        stickyTimeOut.current = null;
        setIsSticky(boxScrollTop >= letterOffsetTop - 1);
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

  const handleBackTop = () => {
    boxRef.current?.scrollTo({
      top: 0
    });
    setLetter(letterData[0].letter);
  };
  useEffect(() => {
    const newTracks = searchParams.category?.split(',') || [];
    getTrackList(newTracks);
  }, [galossaryList, searchParams]);

  useEffect(() => {
    const offsetTop = letterRef.current?.offsetTop || 0;
    setLetterOffsetTop(offsetTop);
  }, []);

  return (
    <div ref={boxRef} className="scroll-wrap-y relative h-full" onScroll={onScroll}>
      <div className="container mx-auto">
        <GlossaryHeader keyword={searchParams.keyword || ''} />
      </div>

      {!searchParams.keyword && (
        <div
          className={`sticky left-0 top-0 z-[10] w-full ${isSticky ? 'bg-neutral-off-white pb-[20px] shadow-[0_0px_4px_0_rgba(0,0,0,0.25)]' : ''}`}
          ref={letterRef}
        >
          {letterData.length > 0 && (
            <FilterLetter letterData={letterData} letterClick={letterClick} isSticky={isSticky} letter={letter} />
          )}

          <FilterTrack filterTracks={filterTracks} tracks={tracks} trackClick={trackClick} />
        </div>
      )}
      <div className="container  mx-auto  pb-[70px]">
        {searchParams.keyword ? (
          <div className="body-xl mb-[40px] text-center text-neutral-black">
            {galossaryList.length} Results for
            <span className="pl-[4px] text-neutral-medium-gray">“{searchParams.keyword}”</span>
          </div>
        ) : null}
        {list.length > 0 ? (
          <GlossaryList list={list} setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)} />
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
