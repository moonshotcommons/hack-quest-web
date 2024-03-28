import { cn } from '@/helper/utils';
import { useDebounceFn } from 'ahooks';
import { FC, ReactNode, useEffect, useState } from 'react';

export interface TooltipProps {
  children: React.ReactNode;
  title: ReactNode;
  color?: string;
  placement?: 'topLeft' | 'top' | 'topRight' | 'bottomLeft' | 'bottom' | 'bottomRight';
  className?: string;
  /** 显示控制 */
  show?: boolean;
  /** 是否自定义显示控制，默认为false，值为true内部将不再控制显示隐藏 */
  customize?: boolean;
}

const Tooltip: FC<TooltipProps> = (props) => {
  const { children, title, color = '#FFF', placement = 'topLeft', className, show: propShow = false, customize = false } = props;
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
      className="relative h-fit w-fit"
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
            ' body-xs absolute h-fit whitespace-nowrap rounded-[10px] p-[20px] text-neutral-black shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]',
            placement === 'topLeft' ? '-left-[12px] -translate-y-[calc(100%+17px)]' : '',
            placement === 'top' ? 'left-[50%] -translate-x-[50%] -translate-y-[calc(100%+17px)]' : '',
            placement === 'topRight' ? '-right-[12px] -translate-y-[calc(100%+17px)]' : '',
            placement == 'bottomLeft' ? '-left-[12px] translate-y-[calc(100%+2px)]' : '',
            placement == 'bottom' ? 'left-[50%] -translate-x-[50%] translate-y-[calc(100%+2px)]' : '',
            placement === 'bottomRight' ? '-right-[12px] translate-y-[calc(100%+2px)]' : '',
            className
          )}
          style={{ backgroundColor: color }}
        >
          <div
            className={cn(
              'absolute -z-[99] h-[24px] w-[24px] self-end bg-neutral-white shadow-[rgba(0,0,0,0.05)_1.5px_1.5px_1.5px]',
              placement === 'topLeft' ? 'bottom-0 left-[24px] translate-y-[50%] rotate-[45deg]' : '',
              placement === 'top' ? 'bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] rotate-[45deg]' : '',
              placement == 'topRight' ? 'bottom-0 right-[24px] translate-y-[50%] rotate-[45deg]' : '',
              placement == 'bottomLeft' ? 'left-[24px] top-0 -translate-y-[50%] -rotate-[135deg]' : '',
              placement == 'bottom' ? 'left-[50%] top-0 -translate-x-[50%] -translate-y-[50%] -rotate-[135deg]' : '',
              placement == 'bottomRight' ? 'right-[24px] top-0 -translate-y-[50%] -rotate-[135deg]' : ''
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
