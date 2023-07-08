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
import { DropData } from './type';
import { useClickAway } from 'ahooks';

interface DropdownProps {
  // children: ReactNode;
  autoOpen?: boolean;
  dropData: DropData<any>[];
  onSelect?: (item: any) => void;
  defaultSelectKey: string;
}

export const ChildrenDropDown = (props: {
  childrenData: DropData<any>[];
  onSelect?: (item: any) => void;
}) => {
  const { childrenData, onSelect } = props;
  return (
    <ul className="pl-[1.5rem] mt-[1.25rem] border-l border-[#404040]">
      {childrenData.map((item, index) => {
        return (
          <li
            key={item.key}
            className={`${index !== 0 ? 'pt-[0.75rem]' : ''} cursor-pointer ${
              item.disable ? 'text-[#505050] cursor-not-allowed' : ''
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

const Dropdown: ForwardRefRenderFunction<unknown, DropdownProps> = (
  props,
  ref
) => {
  const { autoOpen = false, dropData, onSelect, defaultSelectKey } = props;
  const [open, setOpen] = useState(() => (autoOpen ? true : false));
  const containerRef = useRef<HTMLElement>(null);

  const [currentData, setCurrent] = useState(defaultSelectKey);

  // 保留的进度条样式
  // after:absolute after:left-0 after:top-0 after:w-[1.9375rem] after:h-full after:rounded-3xl after:rounded-r-none after:border after:border-r-0 after:scale-[1.08] after:z-50
  useClickAway(() => {
    setOpen(false);
  }, containerRef);

  useImperativeHandle(
    ref,
    () => {
      return {
        openDispatch: (value: boolean) => setOpen(value)
      };
    },
    []
  );

  return (
    <div className="w-fit relative cursor-pointer" ref={containerRef as any}>
      <div
        className="w-[11.125rem] h-[2.25rem] text-white rounded-full border border-solid border-[#505050] flex justify-between items-center "
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="relative w-[8rem] h-full flex justify-center items-center border border-solid border-[#505050] rounded-full">
          <span className="text-[0.75rem] font-futura-bold">mint</span>
        </div>
        <div className="h-full flex items-center justify-center mr-[1.5rem]">
          <DropDownIcon width={13} height={11}></DropDownIcon>
        </div>
      </div>

      {open ? (
        <ul className="w-fit whitespace-nowrap absolute right-0 top-[3rem] pt-8 pl-8 pb-[1rem] pr-[3rem] rounded-[2rem] bg-[#171717] text-[#D9D9D9] transition ease-in-out z-[99]">
          {dropData.map((data) => {
            return (
              <li
                key={data.key}
                className={`pb-[1.25rem] cursor-pointer ${
                  data.disable ? 'text-[#505050] cursor-not-allowed' : ''
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

export default forwardRef(Dropdown);
