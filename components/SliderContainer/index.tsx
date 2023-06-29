import React, { useMemo, useState, useRef, useLayoutEffect, useEffect } from 'react'
import type { ReactElement } from 'react'

import useResizeObserver from '@/hooks/useResizeObserver'
import LeftArrowIcon from '../Icon/LeftArrow'
import RightArrowIcon from '../Icon/RightArrow'

export interface SliderContainerProps {
  width?: number | string
  children: ReactElement
}

const LEFT = 'left'
const RIGHT = 'right'

export const SliderContainer: React.FC<SliderContainerProps> = ({ width = 'inherit', children }) => {
  const listRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const containerWidth = useResizeObserver(containerRef)
  const [listWidth, setListWidth] = useState(0)
  const [translateX, setTranslateX] = useState(0)

  const cache = useRef(containerWidth)

  useEffect(() => {
    if (containerWidth > cache.current && translateX < 0 && listWidth - Math.abs(translateX) - containerWidth <= 0) {
      const distance = containerWidth - cache.current
      setTranslateX(cur => cur + distance)
    }
    // 更新缓存
    cache.current = containerWidth
  }, [containerWidth, translateX, listWidth])

  useLayoutEffect(() => {
    setListWidth((listRef.current as HTMLDivElement).clientWidth)
  }, [children])

  const [leftArrowVisible, rightArrowVisible] = useMemo(() => {
    let leftArrowVisible,
      rightArrowVisible = false

    if (listWidth - Math.abs(translateX) - containerWidth > 0) {
      rightArrowVisible = true
    }

    if (translateX < 0) {
      leftArrowVisible = true
    }

    return [leftArrowVisible, rightArrowVisible]
  }, [listWidth, translateX, containerWidth])

  const handleArrowClick = (direction: string) => {
    if (direction === LEFT) {
      const leftSpaceWidth = Math.abs(translateX)
      if (leftSpaceWidth > containerWidth) {
        setTranslateX(cur => cur + containerWidth)
      } else {
        setTranslateX(cur => cur + leftSpaceWidth)
      }
    }

    if (direction === RIGHT) {
      const rightSpaceWidth = listWidth - Math.abs(translateX) - containerWidth
      if (rightSpaceWidth > containerWidth) {
        setTranslateX(cur => cur - containerWidth)
      } else {
        setTranslateX(cur => cur - rightSpaceWidth)
      }
    }
  }

  return (
    <div ref={containerRef} className={`flex overflow-hidden relative w-auto h-auto`}>
      {leftArrowVisible && (
        <>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 arrow z-50" onClick={() => handleArrowClick(LEFT)}>
            <LeftArrowIcon></LeftArrowIcon>
          </div>
          <div className="absolute w-20 h-full top-0 -left-4 bg-gradient-to-l from-transparent to-black  z-40 select-none"></div>
        </>
      )}
      <div
        ref={listRef}
        className="flex items-center transition-transform"
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        {children}
      </div>
      {rightArrowVisible && (
        <>
          <div className="absolute w-20 h-full top-0 -right-4 bg-gradient-to-r from-transparent to-black"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 arrow z-50" onClick={() => handleArrowClick(RIGHT)}>
            <RightArrowIcon></RightArrowIcon>
          </div>
        </>
      )}
    </div>
  )
}
