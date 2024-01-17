import { cn } from '@/helper/utils';
import { useDebounceFn } from 'ahooks';
import { FC, ReactNode, useEffect, useState } from 'react';

export interface TooltipProps {
  children: React.ReactNode;
  title: ReactNode;
  color?: string;
  placement?:
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight';
  className?: string;
  /** 显示控制 */
  show?: boolean;
  /** 是否自定义显示控制，默认为false，值为true内部将不再控制显示隐藏 */
  customize?: boolean;
}

const Tooltip: FC<TooltipProps> = (props) => {
  const {
    children,
    title,
    color = '#FFF',
    placement = 'topLeft',
    className,
    show: propShow = false,
    customize = false
  } = props;
  const [show, setShow] = useState(propShow);

  // const

  useEffect(() => {
    setShow(propShow);
  }, [propShow]);

  const { run: handleMouseLeave } = useDebounceFn(
    () => {
      setShow(false);
    },
    { wait: 100 }
  );

  return (
    <div
      className="relative w-fit h-fit"
      onMouseEnter={() => {
        if (customize) return;
        handleMouseLeave.cancel();
        setShow(true);
      }}
      onMouseLeave={() => {
        if (customize) return;
        handleMouseLeave();
      }}
    >
      {show && (
        <div
          className={cn(
            ' font-next-book-Thin text-[#0b0b0b] text-[12px] absolute h-fit p-[20px] whitespace-nowrap rounded-[10px] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]',
            placement === 'topLeft'
              ? '-translate-y-[calc(100%+17px)] -left-[12px]'
              : '',
            placement === 'top'
              ? '-translate-y-[calc(100%+17px)] left-[50%] -translate-x-[50%]'
              : '',
            placement === 'topRight'
              ? '-translate-y-[calc(100%+17px)] -right-[12px]'
              : '',
            placement == 'bottomLeft'
              ? 'translate-y-[calc(100%+2px)] -left-[12px]'
              : '',
            placement == 'bottom'
              ? 'translate-y-[calc(100%+2px)] left-[50%] -translate-x-[50%]'
              : '',
            placement === 'bottomRight'
              ? 'translate-y-[calc(100%+2px)] -right-[12px]'
              : '',
            className
          )}
          style={{ backgroundColor: color }}
        >
          <div
            className={cn(
              'absolute w-[24px] h-[24px] bg-white self-end shadow-[rgba(0,0,0,0.05)_1.5px_1.5px_1.5px] -z-[99]',
              placement === 'topLeft'
                ? 'rotate-[45deg] bottom-0 translate-y-[50%] left-[24px]'
                : '',
              placement === 'top'
                ? 'rotate-[45deg] bottom-0 translate-y-[50%] left-[50%] -translate-x-[50%]'
                : '',
              placement == 'topRight'
                ? 'rotate-[45deg] bottom-0 translate-y-[50%] right-[24px]'
                : '',
              placement == 'bottomLeft'
                ? '-rotate-[135deg] top-0 -translate-y-[50%] left-[24px]'
                : '',
              placement == 'bottom'
                ? '-rotate-[135deg] top-0 -translate-y-[50%] left-[50%] -translate-x-[50%]'
                : '',
              placement == 'bottomRight'
                ? '-rotate-[135deg] top-0 -translate-y-[50%] right-[24px]'
                : ''
            )}
          ></div>
          {title}
        </div>
      )}

      {children}
      {/* <div className="h-[9px] w-full bg-red-400"></div> */}
    </div>
  );
};

export default Tooltip;
