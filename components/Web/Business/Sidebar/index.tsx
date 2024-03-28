import { cn } from '@/helper/utils';
import { CSSProperties, ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { LuChevronsRight } from 'react-icons/lu';
import { HTMLMotionProps, motion } from 'framer-motion';
import SidebarGroup from './SidebarGroup';
import SidebarItem from './SidebarItem';

const SidebarContext = createContext({});

interface SidebarProps<T> {
  className?: string;
  title: string;
  items: SidebarItemType[];
  onOpenChange?: (openKeys: string[]) => void;
  defaultOpenKeys?: string[];
  defaultSelect: string;
  onSelect?: (key: string, data: unknown) => void;
  isCustomOpen?: boolean;
  open?: boolean;
  onShowListChange?: (showList: boolean) => void;
  handleButton?: ReactNode;
  selectStyle?: CSSProperties;
}

export interface SidebarItemType {
  key: string;
  label: ReactNode;
  children?: SidebarItemType[];
  type: 'group' | 'item';
  disable?: boolean;
  data: unknown;
}

const ani: HTMLMotionProps<'div'> = {
  initial: {
    translateX: '-100%',
    opacity: 0
  },
  animate: {
    opacity: 1,
    translateX: 0
  },
  exit: {
    opacity: 0,
    translateX: '-100%'
  },
  transition: { duration: 0.3, type: 'tween', ease: 'easeOut' }
  // style: { originY: 0 }
};

const Sidebar = <T,>(props: SidebarProps<T>) => {
  const {
    title,
    items,
    className,
    onOpenChange,
    defaultOpenKeys = [],
    onSelect,
    defaultSelect,
    open = true,
    isCustomOpen = false,
    onShowListChange,
    handleButton,
    selectStyle = {}
  } = props;
  const [showList, setShowList] = useState(open);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);
  const [select, setSelect] = useState<string>(defaultSelect);

  const onOpen = useCallback(
    (key: string) => {
      let newOpenKeys = [...openKeys];
      if (openKeys.includes(key)) {
        newOpenKeys = newOpenKeys.filter((k) => k !== key);
      } else {
        newOpenKeys = newOpenKeys.concat(key);
      }

      onOpenChange?.(newOpenKeys);
      setOpenKeys(newOpenKeys);
    },
    [openKeys, onOpenChange]
  );

  useEffect(() => {
    setSelect(defaultSelect);
    items.forEach((item) => {
      if (item.type === 'group') {
        const openItem = item.children?.find((child) => {
          return child.key === defaultSelect && !openKeys.includes(item.key);
        });
        if (openItem) {
          setOpenKeys(openKeys.concat(item.key));
        }
      }
    });
  }, [defaultSelect]);

  return (
    <div className={cn('relative  z-[12] box-border h-full')}>
      {!showList && !isCustomOpen && (
        <div
          className="absolute top-1/2 flex h-60 w-[2.125rem] -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-[.625rem] bg-neutral-off-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
          onClick={() => setShowList(true)}
        >
          <LuChevronsRight size={24} />
        </div>
      )}
      {showList && (
        <motion.div
          {...ani}
          className={cn('flex h-full flex-col overflow-hidden bg-neutral-off-white shadow-[2px_0px_4px_0px_rgba(0,0,0,0.12)]', className)}
        >
          <div
            className="flex h-20 cursor-pointer items-center border-b border-neutral-medium-gray pl-10"
            onClick={() => {
              setShowList(false);
              onShowListChange?.(false);
            }}
          >
            <h3 className="text-h3 flex-1 truncate text-neutral-black">{title}</h3>
            <div className="flex w-10 items-center justify-center">
              {/* <LuChevronsLeft size={24} /> */}
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 0.5L1 4.5L5 8.5" stroke="#0B0B0B" strokeLinecap="round" />
                <path d="M11 0.5L7 4.5L11 8.5" stroke="#0B0B0B" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="scroll-wrap-y flex h-full flex-col overflow-y-auto">
            {items.map((item) => {
              if (item.type === 'group') {
                return (
                  <SidebarGroup
                    key={item.key}
                    items={item.children || []}
                    onOpenChange={onOpen}
                    item={item}
                    select={select}
                    open={openKeys.includes(item.key)}
                    onSelect={(key, data) => {
                      setSelect(key);
                      onSelect?.(key, data);
                    }}
                    selectStyle={selectStyle}
                  >
                    {item.label}
                  </SidebarGroup>
                );
              }

              if (item.type === 'item') {
                return (
                  <SidebarItem
                    key={item.key}
                    onSelect={(key, data) => {
                      setSelect(key);
                      onSelect?.(key, data);
                    }}
                    select={select}
                    item={item}
                    selectStyle={selectStyle}
                  >
                    {item.label}
                  </SidebarItem>
                );
              }
            })}
          </div>
          {handleButton && <>{handleButton}</>}
        </motion.div>
      )}
    </div>
  );
};

export default Sidebar;
