import { CSSProperties, FC, ReactNode } from 'react';
import { SidebarItemType } from '.';
import { cn } from '@/helper/utils';

interface SidebarItemProps {
  children: ReactNode;
  onSelect: (key: string, data: unknown) => void;
  item: SidebarItemType;
  select: string;
  selectStyle?: CSSProperties;
}

const SidebarItem: FC<SidebarItemProps> = ({
  children,
  onSelect,
  item,
  select,
  selectStyle = {}
}) => {
  console.log(item);
  return (
    <div
      className={cn(
        'relative flex items-center px-10 py-[10px]',
        select === item.key
          ? 'z-50 bg-neutral-white before:absolute before:left-0 before:top-0 before:h-full before:w-[15px] before:rounded-l-[5px] before:bg-yellow-dark'
          : '',
        item.disable ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
      style={select === item.key ? selectStyle : {}}
      onClick={() => {
        if (!item.disable) onSelect(item.key, item);
      }}
    >
      <div className="line-clamp-1 flex w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default SidebarItem;
