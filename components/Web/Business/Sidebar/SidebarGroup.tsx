import { ReactNode } from 'react';
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
  const { children, items, onOpenChange, item, open, onSelect, select } = props;

  return (
    <div
      className="flex flex-col transition-all duration-300 relative
     after:absolute after:w-[calc(100%-80px)] after:h-[1px] after:bg-neutral-medium-gray after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:z-[1]
     "
    >
      <div
        className={cn(
          'px-10 w-full py-[.9375rem] flex justify-between items-center cursor-pointer'
        )}
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
              <SidebarItem
                key={item.key}
                item={item}
                onSelect={onSelect}
                select={select}
              >
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
