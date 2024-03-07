import { useRef, useState } from 'react';
import DropDownIcon from '../Icon/DropDown';
import { DropData, DropDataChildrenType } from './type';
import { useClickAway } from 'ahooks';

interface DropdownProps<P, T> {
  // children: ReactNode;
  autoOpen?: boolean;
  dropData: DropData<P, T>[];
  onSelect?: (item: DropData<P, T> | DropDataChildrenType<T>) => void;
  defaultSelectKey: string;
  minWidth?: string;
}

export const ChildrenDropDown = <T,>(props: {
  childrenData: DropDataChildrenType<T>[];
  onSelect?: (item: any) => void;
}) => {
  const { childrenData, onSelect } = props;
  return (
    <ul className="mt-[1.25rem] border-l border-lesson-dropdown-select-line-color pl-[1.5rem] font-normal">
      {childrenData.map((item, index) => {
        return (
          <li
            key={item.key}
            className={`${index !== 0 ? 'pt-[0.75rem]' : ''} cursor-pointer ${
              item.disable
                ? 'cursor-not-allowed text-lesson-dropdown-disable-text-color'
                : ''
            }`}
            onClick={(e) => {
              if (item.disable) return;
              e.stopPropagation();
              onSelect?.(item);
            }}
          >
            {item.render ? item.render(item) : item.title}
          </li>
        );
      })}
    </ul>
  );
};

const Dropdown = <P, T>(props: DropdownProps<P, T>) => {
  const {
    autoOpen = false,
    dropData,
    onSelect,
    defaultSelectKey,
    minWidth
  } = props;
  const [open, setOpen] = useState(() => (autoOpen ? true : false));
  const containerRef = useRef<HTMLElement>(null);

  const [currentData, setCurrent] = useState(defaultSelectKey);

  // 保留的进度条样式
  // after:absolute after:left-0 after:top-0 after:w-[1.9375rem] after:h-full after:rounded-3xl after:rounded-r-none after:border after:border-r-0 after:scale-[1.08] after:z-50
  useClickAway(() => {
    setOpen(false);
  }, containerRef);

  return (
    <div
      className="relative w-fit cursor-pointer whitespace-nowrap"
      ref={containerRef as any}
    >
      <div
        className="flex h-[2.25rem] items-center justify-between rounded-full border border-solid border-lesson-dropdown-border-color text-lesson-dropdown-text-color "
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="relative flex h-full w-[72%] items-center justify-center rounded-full border border-solid border-lesson-dropdown-border-color px-[3.125rem]">
          <span className="font-futura-bold text-[0.75rem]">
            {dropData.find((item) => item.key === defaultSelectKey)?.title}
          </span>
        </div>
        <div className="mr-[1.5rem] flex h-full items-center justify-center text-lesson-dropdown-icon-color">
          <DropDownIcon
            width={13}
            height={11}
            color="currentColor"
          ></DropDownIcon>
        </div>
      </div>

      {open ? (
        <ul
          className={`absolute right-0 top-[3rem] z-[99] w-fit whitespace-nowrap rounded-[2rem] bg-lesson-dropdown-bg pb-[1rem] pl-8 pr-[3rem] pt-8 text-lesson-dropdown-text-color shadow-2xl transition ease-in-out ${
            minWidth ? `min-w-[${minWidth}]` : ''
          }`}
        >
          {dropData.map((data) => {
            return (
              <li
                key={data.key}
                className={`cursor-pointer pb-[1.25rem] font-bold ${
                  data.disable
                    ? 'cursor-not-allowed text-lesson-dropdown-disable-text-color'
                    : ''
                }`}
                onClick={() => {
                  if (data.disable) return;
                  onSelect?.(data);
                  setOpen(false);
                }}
              >
                {data.key === defaultSelectKey && data.children?.length ? (
                  <li>
                    <div>{data.title}</div>
                    <ChildrenDropDown
                      childrenData={data.children}
                      onSelect={(value) => {
                        onSelect?.(value);
                        setOpen(false);
                      }}
                    ></ChildrenDropDown>
                  </li>
                ) : (
                  data.title
                )}

                {/* <div>{data.render ? data.render(data) : data.title}</div> */}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
