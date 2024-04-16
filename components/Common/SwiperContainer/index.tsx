'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { SwiperOptions } from 'swiper/types';
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';

interface SwiperContainerProp {
  style?: StyleSheet;
  children: ReactNode;
  setting?: SwiperOptions;
  isNavigation?: boolean;
  isSimulateTouch?: boolean;
}

const SwiperContainer: React.FC<SwiperContainerProp> = ({
  style,
  children,
  setting: set,
  isNavigation = false,
  isSimulateTouch = true
}) => {
  const [setting, setSetting] = useState<SwiperOptions>({
    modules: [Navigation, Pagination, Scrollbar],
    loop: true,
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: true
    },
    spaceBetween: 10,
    simulateTouch: isSimulateTouch,
    pagination: {
      clickable: true
    },
    navigation: isNavigation
  });
  useEffect(() => {
    setSetting({
      ...setting,
      ...set
    });
  }, [set]);

  return (
    <>
      <Swiper style={{ width: '100%', paddingBottom: '1.25rem', ...style }} {...setting} className="group">
        {children}
        {isNavigation ? (
          <>
            <div className="absolute left-[10px] top-[50%] z-[10] hidden h-[35px] w-[35px] translate-y-[-50%] items-center justify-center rounded-[50%] bg-[rgba(211,211,211,0.7)] text-[rgba(11,11,11,0.7)] group-hover:flex">
              <HiArrowLongLeft size={20}></HiArrowLongLeft>
            </div>
            <div className="absolute right-[10px] top-[50%] z-[10] hidden h-[35px] w-[35px] translate-y-[-50%] items-center justify-center rounded-[50%] bg-[rgba(211,211,211,0.7)] text-[rgba(11,11,11,0.7)] group-hover:flex">
              <HiArrowLongRight size={20}></HiArrowLongRight>
            </div>
          </>
        ) : null}
      </Swiper>

      <style jsx global>
        {`
          .swiper-container {
            outline: none;
          }
          .swiper-pagination.swiper-pagination-bullets {
            bottom: -0.375rem;
          }
          .swiper-pagination-bullet {
            width: 0.5rem;
            height: 0.5rem;
            background: var(--neutral-medium-gray);
          }
          .swiper-pagination-bullet-active {
            background: var(--neutral-rich-gray);
          }
          @media screen and (min-width: 1024px) {
            .swiper-pagination-bullet {
              width: 4px;
              height: 4px;
            }
          }
          .swiper-button-prev,
          .swiper-button-next {
            z-index: 11;
          }
          .swiper-button-prev::after,
          .swiper-button-next::after {
            opacity: 0;
          }
        `}
      </style>
    </>
  );
};

export default SwiperContainer;
