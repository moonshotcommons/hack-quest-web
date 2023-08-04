import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Sphere from '@/public/images/mission-center/sphere.png';
import {
  milestonesTab,
  milestonesData,
  MilestonesTab,
  MilestonesData
} from '../data';

function Milestones() {
  const [curTabId, setCurTabId] = useState(milestonesTab[0].id);
  const milestonesRef = useRef<HTMLDivElement | null>(null);
  const isClickScroll = useRef(false);
  const [typeIdHeight, setTypeIdHeight] = useState<Record<string, any>>({});
  const boxHeightInfo = useRef<{ h: number; mb: number }>({
    h: 52,
    mb: 12
  });
  const renderTabLabel = (item: MilestonesTab, index: number) => {
    const { id, label } = item;
    return id === curTabId ? (
      <div className="relative text-mission-center-basics font-next-book-bold h-full pb-5">
        <span>{`</ ${label} >`}</span>
        <span className="absolute left-0 bottom-0 w-full h-1 bg-mission-center-tab-active rounded-[11px]"></span>
      </div>
    ) : (
      <div className="h-full pb-5">{label}</div>
    );
  };

  const renderTitle = (item: MilestonesData) => {
    const { typeId, title, totalQuest } = item;
    return typeId !== 1 ? title : `Complete ${totalQuest} Syntax`;
  };

  const changeCurTabId = (id: number) => {
    if (id === curTabId) return;
    setCurTabId(id);
    isClickScroll.current = true;
    (milestonesRef.current as HTMLDivElement).scrollTop = typeIdHeight[id].y;
  };

  const handleScroll = () => {
    if (isClickScroll.current) return;
    const scrollHeight = milestonesRef.current?.scrollTop || 0;
    for (let id in typeIdHeight) {
      if (scrollHeight - typeIdHeight[id].height < 0) {
        setCurTabId(Number(id));
        break;
      }
    }
  };

  const throttle = (fn: () => void) => {
    let throttleTimer: NodeJS.Timeout | null = null;
    let startTime = +new Date();
    const waitTime = 100;
    return function () {
      var curTime = +new Date();
      var remaining = waitTime - (curTime - startTime);
      throttleTimer && clearTimeout(throttleTimer);
      if (remaining > 0) {
        throttleTimer = setTimeout(fn, remaining);
      } else {
        startTime = curTime;
      }
    };
  };

  useEffect(() => {
    const heightInfo: Record<string, any> = {};
    let height = 0,
      y = 0;
    milestonesTab.map((tab: MilestonesTab) => {
      const { id } = tab;
      const len = milestonesData.filter(
        (data: MilestonesData) => data.typeId === id
      )?.length;
      height =
        height + (boxHeightInfo.current.h + boxHeightInfo.current.mb) * len;
      const h = {
        height,
        y
      };
      y = y + (boxHeightInfo.current.h + boxHeightInfo.current.mb) * len;
      heightInfo[id] = h;
    });
    setTypeIdHeight(heightInfo);
    (milestonesRef.current as any).onscrollend = () => {
      isClickScroll.current = false;
    };
  }, []);
  return (
    <div className="bg-mission-center-box h-[328px] rounded-[20px] px-[28px] py-9 flex flex-col relative">
      <div className="flex items-center justify-between w-full mb-[26px]">
        <span className="text-[16px] font-next-book-bold">Milestones</span>
        <div className="flex item-center relative border-b border-mission-center-b-tab">
          {milestonesTab.map((item: MilestonesTab, index: number) => (
            <div
              key={item.id}
              className={`${
                index ? 'ml-[40px]' : ''
              } text-mission-center-tab cursor-pointer  h-full`}
              onClick={() => changeCurTabId(item.id)}
            >
              {renderTabLabel(item, index)}
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex-1 overflow-auto transition-all no-scrollbar"
        ref={milestonesRef}
        onScroll={throttle(handleScroll)}
        style={{
          scrollBehavior: 'smooth'
        }}
      >
        {milestonesData.map((item: MilestonesData) => (
          <div
            key={item.id}
            className="flex items-center bg-mission-center-tab-data text-mission-center-tab-data-color rounded-[20px] overflow-hidden pr-[6px]"
            style={{
              height: `${boxHeightInfo.current.h}px`,
              marginBottom: `${boxHeightInfo.current.mb}px`
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="162"
              height="55"
              className="text-mission-center-tab-svg"
              viewBox="0 0 162 55"
              fill="currentColor"
            >
              <path
                d="M0 20C0 8.95431 8.9543 0 20 0H161.5L147.255 53H20C8.95431 55 0 44.0457 0 33V20Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                className="text-mission-center-tab-svg-color"
                d="M117.891 0C116.921 20.0334 109.508 38.3759 97.6798 53H20C8.95431 60 0 44.0457 0 33V20C0 8.95431 8.9543 0 20 0H117.891Z"
                fill="currentColor"
              />
            </svg>
            <div className="flex-row-center flex-1 justify-between pl-[10px]">
              <div className="w-[19%]">{renderTitle(item)}</div>
              <div className="flex-row-center">
                <Image
                  src={Sphere}
                  alt="sphere"
                  width={20}
                  height={20}
                  unoptimized
                />
                <span className="ml-1">{item.integral}</span>
              </div>
              <div className="flex-row-center w-[37%]">
                <div className="w-[82%] bg-mission-center-schedule rounded-[12px] overflow-hidden h-3 mr-[12px]">
                  <div
                    className="bg-mission-center-schedule-active h-full rounded-[12px]"
                    style={{
                      width: `${(item.comQuest / item.totalQuest) * 100}%`
                    }}
                  ></div>
                </div>
                <span className="w-[13%]">{`${item.comQuest}/${item.totalQuest}`}</span>
              </div>
              <div className="w-[17%] h-10 flex justify-end">
                {item.status === 'claim' ? (
                  <button className="base-btn w-[63%] bg-mission-center-tab-btn-claimed-bg text-mission-center-tab-btn-claimed-color">
                    Claim
                  </button>
                ) : (
                  <button className="base-btn bg-mission-center-tab-btn-start-bg text-mission-center-tab-btn-start-color border border-mission-center-tab-btn-start-border">
                    Start Learning
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-mission-center-tab-box-shadow absolute bottom-9 left-0 w-full h-[30px] pointer-events-none"></div>
    </div>
  );
}

export default Milestones;
