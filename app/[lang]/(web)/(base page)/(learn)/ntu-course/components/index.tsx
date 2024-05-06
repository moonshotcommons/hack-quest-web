'use client';
import React, { useRef, useState } from 'react';
import { OffsetTopsType } from '../constants/type';
import Content from './Content';
import Nav from './Nav';

interface NtuCoursePageProp {}

const NtuCoursePage: React.FC<NtuCoursePageProp> = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [curAnchorIndex, setCurAnchorIndex] = useState(0);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
  const isOnScoll = useRef(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const handleClickAnchor = (index: number) => {
    setCurAnchorIndex(index);
    isOnScoll.current = true;
    boxRef.current?.scrollTo({
      top: offsetTops[index]?.offsetTop || 0
    });
    setTimeout(() => {
      isOnScoll.current = false;
    }, 10);
  };
  const handleScoll = () => {
    if (isOnScoll.current) return;
    const scrollTop = boxRef.current?.scrollTop || 0;
    timeOut.current = setTimeout(() => {
      timeOut.current = null;
      for (let i = 0; i < offsetTops.length; i++) {
        if (scrollTop >= offsetTops[offsetTops.length - 1].offsetTop) {
          setCurAnchorIndex(offsetTops.length - 1);
          break;
        } else if (scrollTop >= offsetTops[i].offsetTop && scrollTop < offsetTops[i + 1].offsetTop) {
          setCurAnchorIndex(i);
          break;
        }
      }
    }, 150);
  };
  return (
    <div className="scroll-wrap-y h-full bg-neutral-off-white py-[40px]" ref={boxRef} onScroll={handleScoll}>
      <div className="container  mx-auto flex">
        <div className="relative">
          <Nav curAnchorIndex={curAnchorIndex} offsetTops={offsetTops} handleClickAnchor={handleClickAnchor} />
        </div>
        <Content setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)} />
      </div>
    </div>
  );
};

export default NtuCoursePage;
