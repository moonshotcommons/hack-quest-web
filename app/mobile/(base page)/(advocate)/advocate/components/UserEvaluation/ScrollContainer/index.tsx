'use client';
import {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import BScroll from '@better-scroll/core';
import { useInterval } from 'ahooks';
interface ScrollContainerProps {
  className?: string;
  children: ReactNode;
  dir?: 'left' | 'right';
  interval?: number;
  /** 允许hover暂停，移出继续, 默认false */
  allowPausing?: boolean;
}

export interface ScrollContainerRef {
  stop: () => void;
  continue: () => void;
}

const ScrollContainer: ForwardRefRenderFunction<
  ScrollContainerRef,
  ScrollContainerProps
> = ({ className, children, dir = 'left', allowPausing = false }, ref) => {
  const scrollContainerInstance = useRef<HTMLDivElement>(null);
  const contentInstance = useRef<HTMLDivElement>(null);
  const [interval, setInterval] = useState<number>(30);
  const [startX, setStartX] = useState(0);
  const add = useRef(1);

  const clear = useInterval(() => {
    setStartX((state) => {
      if (scrollContainerInstance.current && contentInstance.current) {
        if (dir === 'left') {
          let max =
            scrollContainerInstance.current?.clientWidth -
            contentInstance.current?.clientWidth;
          if (state <= max && add.current === 1) {
            add.current = -1;
          }

          if (state >= 0 && add.current === -1) {
            add.current = 1;
          }
          return state - add.current;
        } else {
          let min =
            scrollContainerInstance.current?.clientWidth -
            contentInstance.current?.clientWidth;
          if (state >= 0 && add.current === 1) {
            add.current = -1;
          }

          if (state <= min && add.current === -1) {
            add.current = 1;
          }
          return state + add.current;
        }
      }

      return state;
    });
  }, interval);

  useImperativeHandle(
    ref,
    () => {
      return {
        stop: clear,
        continue() {
          setInterval(interval > 30 ? 30 : 31);
        }
      };
    },
    [clear, interval]
  );

  useEffect(() => {
    let bs: BScroll;
    if (scrollContainerInstance.current && contentInstance.current) {
      let diff =
        scrollContainerInstance.current?.clientWidth -
        contentInstance.current?.clientWidth;
      let max = 0;
      let startX = 0;
      if (dir === 'left') {
        max = diff;
        startX = 1;
        if (max >= 0) {
          clear();
        }
      } else {
        max = 1;
        startX = diff;
      }

      setStartX(startX);

      bs = new BScroll(scrollContainerInstance.current, {
        scrollX: true,
        probeType: 3,
        click: true,
        startX: startX
      });

      if (diff >= 0) {
        clear();
      }

      bs.on('beforeScrollStart', () => {
        clear();
      });
    }

    return () => {
      bs.destroy();
      clear();
    };
  }, []);

  return (
    <div
      className={'relative overflow-hidden whitespace-nowrap'}
      ref={scrollContainerInstance}
      onMouseEnter={() => {
        if (!allowPausing) return;
        clear();
        // setInterval(0);
      }}
      onMouseLeave={() => {
        if (!allowPausing) return;
        setInterval(interval > 30 ? 30 : 31);
      }}
    >
      <div
        className="inline-block min-w-full"
        ref={contentInstance}
        style={{ transform: `translateX(${startX}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default forwardRef(ScrollContainer);
