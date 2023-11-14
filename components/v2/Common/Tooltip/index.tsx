import { cloneElement } from '@/helper/utils';
import { title } from 'process';
import { FC, ReactElement, ReactNode, isValidElement, useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  title: ReactNode;
  color?: string;
}

const Tooltip: FC<TooltipProps> = (props) => {
  const { children, title, color = '#FFF' } = props;
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
          className="absolute -translate-y-[calc(100%+17px)] -left-[12px] p-[20px] whitespace-nowrap rounded-[10px] z-[99]"
          style={{ backgroundColor: color }}
        >
          <div className="absolute w-[24px] h-[24px] rotate-[45deg] bottom-0 translate-y-[50%] left-[24px] bg-white self-end shadow-[rgba(0,0,0,0.05)_1.5px_1.5px_1.5px] -z-[99]"></div>
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
