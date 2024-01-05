import Modal from '@/components/Common/Modal';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FilterItemType, FilterOptionType } from './type';
import { cloneDeep } from 'lodash-es';

interface FilterModalProps {
  filters: FilterItemType[];
  sort?: FilterOptionType[];
  updateFilters: (newFilters: FilterItemType[]) => void;
  updateSort: (newSort: FilterOptionType[]) => void;
  radio?: boolean;
}

export interface FilterModalRef {
  open: VoidFunction;
}

const FilterModal = forwardRef<FilterModalRef, FilterModalProps>(
  (props, ref) => {
    const { filters, updateFilters, sort, updateSort, radio = false } = props;

    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        open() {
          setOpen(true);
        }
      };
    });

    return (
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        showCloseIcon
        icon={closeIcon}
      >
        <div className="flex flex-col gap-8 w-[18.75rem] px-5 py-8 bg-neutral-white rounded-[24px]">
          {filters.map((filter, filterIndex) => {
            return (
              <div key={filter.filterName} className="flex flex-col gap-4">
                <div className="body-m-bold text-neutral-off-black">
                  {filter.filterName}
                </div>
                {filter.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex gap-[.625rem] body-s"
                    onClick={() => {
                      if (radio) {
                        filters[filterIndex].options.map((option) => {
                          option.isSelect = false;
                          return option;
                        });
                        filters[filterIndex].options[optionIndex].isSelect =
                          true;
                      } else {
                        filters[filterIndex].options[optionIndex].isSelect =
                          !option.isSelect;
                      }
                      updateFilters(cloneDeep(filters));
                    }}
                  >
                    <div className="w-[22px] h-[22px] border border-neutral-black flex items-center justify-center rounded-[1px]">
                      {option.isSelect && (
                        <div className="bg-neutral-black w-[16px] h-[16px] box-border rounded-[1px]"></div>
                      )}
                    </div>
                    <span>{option.name}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Modal>
    );
  }
);

const closeIcon = (
  <div className="absolute -top-7 -right-6 cursor-pointer">
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="22.2734"
        y1="22.2745"
        x2="7.42416"
        y2="7.42521"
        stroke="#0B0B0B"
      />
      <line
        x1="7.42574"
        y1="22.2744"
        x2="22.275"
        y2="7.42513"
        stroke="#0B0B0B"
      />
    </svg>
  </div>
);

FilterModal.displayName = 'FilterModal';

export default FilterModal;
