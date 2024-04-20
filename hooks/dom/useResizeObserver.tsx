import { useEffect, useState } from 'react';

// useLayoutEffect问题 https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85

// 接收保存被监听dom的ref
const useResizeObserver = (ref: React.RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    // 使用ResizeObserver来监听DOM的变化
    const resizeObserver = new ResizeObserver(() => {
      setWidth((ref.current as HTMLElement)?.getBoundingClientRect()?.width);
    });
    resizeObserver.observe(ref.current as HTMLElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);
  return width;
};
export default useResizeObserver;
