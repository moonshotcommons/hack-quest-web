import { CSSProperties, ReactNode } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import SidebarItem from './SidebarItem';
import { HTMLMotionProps, motion } from 'framer-motion';
import { SidebarItemType } from '.';
import { cn } from '@/helper/utils';

interface SidebarGroupProps<T> {
  children: ReactNode;
  items: SidebarItemType[];
  onOpenChange: (key: string) => void;
  item: SidebarItemType;
  open: boolean;
  select: string;
  onSelect: (key: string, data: unknown) => void;
  selectStyle?: CSSProperties;
}

const ani: HTMLMotionProps<'div'> = {
  initial: {
    // scaleY: 0,
    opacity: 0,
    height: 0
  },
  animate: {
    opacity: 1,
    // scaleY: 1,
    height: '100%'
  },
  exit: {
    opacity: 1
    // scaleY: 1
  },
  transition: { duration: 0.1, type: 'tween', ease: 'easeOut' },
  style: { originY: 0 }
};

const SidebarGroup = <T,>(props: SidebarGroupProps<T>) => {
  const { children, items, onOpenChange, item, open, onSelect, select, selectStyle } = props;

  return (
    <div
      className="relative flex flex-col transition-all duration-300
     after:absolute after:bottom-0 after:left-1/2 after:z-[1] after:h-[1px] after:w-[calc(100%-80px)] after:-translate-x-1/2 after:bg-neutral-medium-gray
     "
    >
      <div
        className={cn('flex w-full cursor-pointer items-center justify-between px-10 py-[.9375rem]')}
        onClick={() => {
          onOpenChange(item.key);
        }}
      >
        <span className="body-l">{children}</span>
        <span className={`transition ${open ? 'rotate-180' : 'rotate-0'}`}>
          <LuChevronDown size={24} />
        </span>
      </div>
      {open && (
        <motion.div {...ani} className="flex flex-col pb-[15px]">
          {items.map((item) => {
            return (
              <SidebarItem key={item.key} item={item} onSelect={onSelect} select={select} selectStyle={selectStyle}>
                {item.label}
              </SidebarItem>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default SidebarGroup;
