import { useLayoutEffect, useState } from 'react'

// 接收保存被监听dom的ref
const useResizeObserver = (ref: React.RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>(0)
  useLayoutEffect(() => {
    // 使用ResizeObserver来监听DOM的变化
    const resizeObserver = new ResizeObserver(() => {
      setWidth((ref.current as HTMLElement).clientWidth)
    })
    resizeObserver.observe(ref.current as HTMLElement)
    return () => {
      resizeObserver.disconnect()
    }
  }, [ref])
  return width
}
export default useResizeObserver
