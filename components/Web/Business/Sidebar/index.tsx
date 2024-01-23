import { cn } from '@/helper/utils';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState
} from 'react';
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
    onShowListChange
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
    <div className={cn('box-border relative z-10 h-full')}>
      {!showList && !isCustomOpen && (
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[2.625rem] h-60 bg-neutral-off-white rounded-r-[.625rem] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center cursor-pointer"
          onClick={() => setShowList(true)}
        >
          <LuChevronsRight size={24} />
        </div>
      )}
      {showList && (
        <motion.div
          {...ani}
          className={cn(
            'h-full flex flex-col bg-neutral-off-white shadow-[2px_0px_4px_0px_rgba(0,0,0,0.12)] overflow-hidden',
            className
          )}
        >
          <div
            className="pl-10 flex items-center h-20 border-b border-neutral-medium-gray cursor-pointer"
            onClick={() => {
              setShowList(false);
              onShowListChange?.(false);
            }}
          >
            <h3 className="flex-1 text-h3 text-neutral-black truncate">
              {title}
            </h3>
            <div className="w-10 flex justify-center items-center">
              {/* <LuChevronsLeft size={24} /> */}
              <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 0.5L1 4.5L5 8.5"
                  stroke="#0B0B0B"
                  strokeLinecap="round"
                />
                <path
                  d="M11 0.5L7 4.5L11 8.5"
                  stroke="#0B0B0B"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col h-full overflow-y-auto scroll-wrap-y">
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
                  >
                    {item.label}
                  </SidebarItem>
                );
              }
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Sidebar;
