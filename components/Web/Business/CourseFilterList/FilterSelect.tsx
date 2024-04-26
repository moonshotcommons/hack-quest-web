import { FC, useContext, useMemo, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useDebounceFn } from 'ahooks';
import { animateProps } from './constant';
import { FilterItemType, FilterOptionType } from './type';
import { cn } from '@/helper/utils';
import { GoCheck } from 'react-icons/go';
import { cloneDeep } from 'lodash-es';
import { GoX } from 'react-icons/go';
import { PiSortAscendingBold } from 'react-icons/pi';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
interface FilterSelectProps {
  filters: FilterItemType[];
  sort?: FilterOptionType[];
  updateFilters: (newFilters: FilterItemType[]) => void;
  updateSort: (newSort: FilterOptionType[]) => void;
}

const FilterSelect: FC<FilterSelectProps> = ({ filters, updateFilters, sort, updateSort }) => {
  const [hoverFilter, setHoverFilter] = useState<null | string>(null);
  const [hoverSort, setHoverSort] = useState<boolean>(false);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);

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

  const selectFilterOptions = useMemo(() => {
    const options = filters.flatMap((filter) => filter.options);
    return options.filter((option) => option.isSelect);
  }, [filters]);

  // const [selectFilterOptions, setSelectFilterOptions] = useState<
  //   FilterOptionType[]
  // >([]);

  // const selectSort = useMemo(() => {
  //   return sort?.find((item) => item.isSelect);
  // }, [sort]);

  return (
    <div className="flex justify-between">
      {!!filters?.length && (
        <div className="flex flex-1 flex-wrap gap-4 pr-8">
          {filters.map((filter, filterIndex) => {
            return (
              <div
                key={filter.filterField}
                className={cn(
                  'body-l relative flex w-fit cursor-pointer items-center gap-x-[10px] rounded-full border border-neutral-rich-gray px-6 py-[10px]',
                  hoverFilter === filter.filterName ? 'border-transparent bg-yellow-light transition-all' : ''
                )}
                onMouseEnter={() => {
                  mouseLeaveFilter.cancel();
                  setHoverFilter(filter.filterName);
                }}
                onMouseLeave={mouseLeaveFilter}
              >
                <span>{t(filter.filterName)}</span>
                <span
                  className={cn(
                    hoverFilter === filter.filterName ? '-rotate-180' : 'transition-transform duration-200'
                  )}
                >
                  <FiChevronDown size={24} />
                </span>

                {hoverFilter === filter.filterName && (
                  <motion.ul
                    {...animateProps}
                    className="absolute -bottom-[3px] left-0 z-[99] w-full min-w-[160px] translate-y-[100%] rounded-[10px] border border-neutral-light-gray bg-neutral-white py-4 shadow-sm"
                  >
                    {filter.options.map((option, optionIndex) => {
                      return (
                        <li
                          key={option.name}
                          className="body-m flex cursor-pointer items-center justify-between px-3 py-2 text-neutral-black hover:bg-yellow-light"
                          onClick={() => {
                            filters[filterIndex].options[optionIndex].isSelect = !option.isSelect;
                            // const select =
                            //   filters[filterIndex].options[optionIndex];
                            // if (
                            //   selectFilterOptions.find(
                            //     (item) => item.name === select.name
                            //   )
                            // ) {
                            //   setSelectFilterOptions(
                            //     selectFilterOptions.filter(
                            //       (item) => item.name !== select.name
                            //     )
                            //   );
                            // } else {
                            //   setSelectFilterOptions(
                            //     selectFilterOptions.concat(select)
                            //   );
                            // }
                            updateFilters(cloneDeep(filters));
                          }}
                        >
                          <span>{t(option.name)}</span>
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
                className="body-l flex items-center gap-[10px] rounded-full bg-yellow-primary px-6 py-[10px]"
              >
                <span>{t(item.name)}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    filters.forEach((filter) => {
                      filter.options.forEach((option) => {
                        if (option.name === item.name) option.isSelect = false;
                      });
                    });
                    // setSelectFilterOptions(
                    //   selectFilterOptions.filter((o) => o.name !== item.name)
                    // );
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
          <div className="relative flex cursor-pointer items-center gap-[10px] px-3 py-[10px]">
            <span>
              <PiSortAscendingBold size={32} />
            </span>
            <span className="body-l text-neutral-off-black">{t('courses.sortBy')}</span>
          </div>
          {hoverSort && (
            <motion.ul
              {...animateProps}
              className="absolute -bottom-[4px]  right-0 z-[99] w-fit min-w-[160px] rounded-[10px] border border-neutral-light-gray bg-neutral-white py-4 shadow-sm"
            >
              {sort.map((option, optionIndex) => {
                return (
                  <li
                    key={option.name}
                    className="body-m flex cursor-pointer items-center justify-between px-3 py-2 text-neutral-black hover:bg-yellow-light"
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
                    <span>{t(option.name)}</span>
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
