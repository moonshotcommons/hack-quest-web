import { cloneElement, cn } from '@/helper/utils';
import { title } from 'process';
import { FC, ReactElement, ReactNode, isValidElement, useState } from 'react';

interface TooltipProps {
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
}

const Tooltip: FC<TooltipProps> = (props) => {
  const { children, title, color = '#FFF', placement = 'topLeft' } = props;
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative w-fit h-fit"
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <div
          className={cn(
            'absolute p-[20px] whitespace-nowrap rounded-[10px] z-[99] shadow-md',
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
              ? 'translate-y-[calc(100%-2px)] -left-[12px]'
              : '',
            placement == 'bottom'
              ? 'translate-y-[calc(100%-2px)] left-[50%] -translate-x-[50%]'
              : '',
            placement === 'bottomRight'
              ? 'translate-y-[calc(100%-2px)] -right-[12px]'
              : ''
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
    </div>
  );
};

export default Tooltip;
