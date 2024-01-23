import { FC, ReactNode } from 'react';
import { SidebarItemType } from '.';
import { cn } from '@/helper/utils';

interface SidebarItemProps {
  children: ReactNode;
  onSelect: (key: string, data: unknown) => void;
  item: SidebarItemType;
  select: string;
}

const SidebarItem: FC<SidebarItemProps> = ({
  children,
  onSelect,
  item,
  select
}) => {
  return (
    <div
      className={cn(
        'px-10 py-[10px] flex items-center cursor-pointer relative',
        select === item.key
          ? 'bg-neutral-white before:absolute before:h-full before:left-0 before:top-0 before:w-[15px] before:bg-yellow-dark before:rounded-l-[5px] z-50'
          : ''
      )}
      onClick={() => {
        if (!item.disable) onSelect(item.key, item);
      }}
    >
      <div className="line-clamp-1 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default SidebarItem;
