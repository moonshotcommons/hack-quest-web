'use client';
import React, { ReactNode, useEffect, useState } from 'react';
// swiper@6.8.4
import { Swiper } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, SwiperOptions } from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Autoplay, Pagination]);

interface SwiperContainerProp {
  style?: StyleSheet;
  children: ReactNode;
  setting?: SwiperOptions;
}

const SwiperContainer: React.FC<SwiperContainerProp> = ({ style, children, setting: set }) => {
  const [setting, setSetting] = useState<SwiperOptions>({
    loop: true,
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: true
    },
    pagination: {
      clickable: true
    }
  });

  useEffect(() => {
    setSetting({
      ...setting,
      ...set
    });
  }, [set]);
  return (
    <>
      <Swiper style={{ width: '100%', paddingBottom: '1.25rem', ...style }} {...setting}>
        {children}
      </Swiper>
      <style jsx global>
        {`
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
        `}
      </style>
    </>
  );
};

export default SwiperContainer;
