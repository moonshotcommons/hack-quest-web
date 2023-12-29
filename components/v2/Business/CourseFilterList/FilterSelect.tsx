import { FC, useMemo, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useDebounceFn } from 'ahooks';
import { animateProps } from './constant';
import { FilterItemType, FilterOptionType } from './type';
import { cn } from '@/helper/utils';
import { GoCheck } from 'react-icons/go';
import { cloneDeep } from 'lodash-es';
import { GoX } from 'react-icons/go';
import { PiSortAscendingLight } from 'react-icons/pi';
interface FilterSelectProps {
  filters: FilterItemType[];
  sort?: FilterOptionType[];
  updateFilters: (newFilters: FilterItemType[]) => void;
  updateSort: (newSort: FilterOptionType[]) => void;
}

const FilterSelect: FC<FilterSelectProps> = ({
  filters,
  updateFilters,
  sort,
  updateSort
}) => {
  const [hoverFilter, setHoverFilter] = useState<null | string>(null);
  const [hoverSort, setHoverSort] = useState<boolean>(false);

  const { run: mouseLeaveFilter } = useDebounceFn(
    () => {
      setHoverFilter(null);
    },
    { wait: 100 }
  );

  const { run: mouseLeaveSort } = useDebounceFn(
    () => {
      setHoverSort(false);
    },
    { wait: 100 }
  );

  // const selectFilterOptions = useMemo(() => {
  //   const options = filters.flatMap((filter) => filter.options);
  //   return options.filter((option) => option.isSelect);
  // }, [filters]);

  const [selectFilterOptions, setSelectFilterOptions] = useState<
    FilterOptionType[]
  >([]);

  const selectSort = useMemo(() => {
    return sort?.find((item) => item.isSelect);
  }, [sort]);

  return (
    <div className="flex justify-between">
      {!!filters?.length && (
        <div className="flex flex-1 gap-4 pr-8 flex-wrap">
          {filters.map((filter, filterIndex) => {
            return (
              <div
                key={filter.filterField}
                className={cn(
                  'px-6 py-[10px] body-l rounded-full border border-neutral-rich-gray w-fit flex gap-x-[10px] items-center relative cursor-pointer',
                  hoverFilter === filter.filterName
                    ? 'bg-yellow-light border-transparent transition-all'
                    : ''
                )}
                onMouseEnter={() => {
                  mouseLeaveFilter.cancel();
                  setHoverFilter(filter.filterName);
                }}
                onMouseLeave={mouseLeaveFilter}
              >
                <span>{filter.filterName}</span>
                <span
                  className={cn(
                    hoverFilter === filter.filterName
                      ? '-rotate-180'
                      : 'transition-transform duration-200'
                  )}
                >
                  <FiChevronDown size={24} />
                </span>

                {hoverFilter === filter.filterName && (
                  <motion.ul
                    {...animateProps}
                    className="absolute min-w-[160px] w-full bg-neutral-white left-0 -bottom-[3px] translate-y-[100%] z-[99] border border-neutral-light-gray rounded-[10px] py-4 shadow-sm"
                  >
                    {filter.options.map((option, optionIndex) => {
                      return (
                        <li
                          key={option.name}
                          className="px-3 py-2 body-m text-neutral-black cursor-pointer hover:bg-yellow-light flex justify-between items-center"
                          onClick={() => {
                            filters[filterIndex].options[optionIndex].isSelect =
                              !option.isSelect;
                            const select =
                              filters[filterIndex].options[optionIndex];
                            if (
                              selectFilterOptions.find(
                                (item) => item.name === select.name
                              )
                            ) {
                              setSelectFilterOptions(
                                selectFilterOptions.filter(
                                  (item) => item.name !== select.name
                                )
                              );
                            } else {
                              setSelectFilterOptions(
                                selectFilterOptions.concat(select)
                              );
                            }
                            updateFilters(cloneDeep(filters));
                          }}
                        >
                          <span>{option.name}</span>
                          {option.isSelect && (
                            <span>
                              <GoCheck size={20} />
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </div>
            );
          })}
          {selectFilterOptions.map((item, index) => {
            return (
              <div
                key={index}
                className="px-6 py-[10px] body-l bg-yellow-primary rounded-full flex gap-[10px] items-center"
              >
                <span>{item.name}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    filters.forEach((filter) => {
                      filter.options.forEach((option) => {
                        if (option.name === item.name) option.isSelect = false;
                      });
                    });
                    setSelectFilterOptions(
                      selectFilterOptions.filter((o) => o.name !== item.name)
                    );
                    updateFilters(cloneDeep(filters));
                  }}
                >
                  <GoX size={24} />
                </span>
              </div>
            );
          })}
        </div>
      )}
      {sort?.length && (
        <div
          className="relative h-fit"
          onMouseEnter={() => {
            mouseLeaveSort.cancel();
            setHoverSort(true);
          }}
          onMouseLeave={mouseLeaveSort}
        >
          <div className="flex gap-[10px] items-center px-3 py-[10px] cursor-pointer relative">
            <span>
              <PiSortAscendingLight size={20} />
            </span>
            <span className="body-l text-neutral-off-black">{`Sort By ${selectSort?.name}`}</span>
          </div>
          {hoverSort && (
            <motion.ul
              {...animateProps}
              className="absolute min-w-[160px]  w-fit bg-neutral-white right-0 -bottom-[4px] z-[99] border border-neutral-light-gray rounded-[10px] py-4 shadow-sm"
            >
              {sort.map((option, optionIndex) => {
                return (
                  <li
                    key={option.name}
                    className="px-3 py-2 body-m text-neutral-black cursor-pointer hover:bg-yellow-light flex justify-between items-center"
                    onClick={() => {
                      const newSort = cloneDeep(sort).map((item) => {
                        item.isSelect = false;
                        if (item.name === option.name) {
                          item.isSelect = true;
                        }
                        return item;
                      });
                      updateSort(newSort);
                    }}
                  >
                    <span>{option.name}</span>
                    {option.isSelect && (
                      <span>
                        <GoCheck size={20} />
                      </span>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
