import {
  FC,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ReactNode,
  RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
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
    <ul className="pl-[1.5rem] mt-[1.25rem] font-normal border-l border-lesson-dropdown-select-line-color">
      {childrenData.map((item, index) => {
        return (
          <li
            key={item.key}
            className={`${index !== 0 ? 'pt-[0.75rem]' : ''} cursor-pointer ${
              item.disable
                ? 'text-lesson-dropdown-disable-text-color cursor-not-allowed'
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
      className="w-fit relative whitespace-nowrap cursor-pointer"
      ref={containerRef as any}
    >
      <div
        className="h-[2.25rem] text-lesson-dropdown-text-color rounded-full border border-solid border-lesson-dropdown-border-color flex justify-between items-center "
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="relative w-[72%] px-[3.125rem] h-full flex justify-center items-center border border-solid border-lesson-dropdown-border-color rounded-full">
          <span className="text-[0.75rem] font-futura-bold">
            {dropData.find((item) => item.key === defaultSelectKey)?.title}
          </span>
        </div>
        <div className="h-full flex items-center justify-center mr-[1.5rem] text-lesson-dropdown-icon-color">
          <DropDownIcon
            width={13}
            height={11}
            color="currentColor"
          ></DropDownIcon>
        </div>
      </div>

      {open ? (
        <ul
          className={`w-fit whitespace-nowrap absolute right-0 top-[3rem] pt-8 pl-8 pb-[1rem] pr-[3rem] rounded-[2rem] bg-lesson-dropdown-bg text-lesson-dropdown-text-color transition ease-in-out z-[99] shadow-2xl ${
            minWidth ? `min-w-[${minWidth}]` : ''
          }`}
        >
          {dropData.map((data) => {
            return (
              <li
                key={data.key}
                className={`pb-[1.25rem] cursor-pointer font-bold ${
                  data.disable
                    ? 'text-lesson-dropdown-disable-text-color cursor-not-allowed'
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
