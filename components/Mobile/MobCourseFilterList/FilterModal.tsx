import Modal from '@/components/Common/Modal';
import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { FilterItemType, FilterOptionType } from './type';
import { cloneDeep } from 'lodash-es';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

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

const FilterModal = forwardRef<FilterModalRef, FilterModalProps>((props, ref) => {
  const { filters, updateFilters, sort, updateSort, radio = false } = props;
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
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
      <div className="flex w-[18.75rem] flex-col gap-8 rounded-[24px] bg-neutral-white px-5 py-8">
        {filters.map((filter, filterIndex) => {
          return (
            <div key={filter.filterName} className="flex flex-col gap-4">
              <div className="body-m-bold text-neutral-off-black">{t(filter.filterName)}</div>
              {filter.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="body-s flex gap-[.625rem]"
                  onClick={() => {
                    if (radio) {
                      filters[filterIndex].options.map((option) => {
                        option.isSelect = false;
                        return option;
                      });
                      filters[filterIndex].options[optionIndex].isSelect = true;
                    } else {
                      filters[filterIndex].options[optionIndex].isSelect = !option.isSelect;
                    }
                    updateFilters(cloneDeep(filters));
                  }}
                >
                  <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[1px] border border-neutral-black">
                    {option.isSelect && (
                      <div className="box-border h-[16px] w-[16px] rounded-[1px] bg-neutral-black"></div>
                    )}
                  </div>
                  <span>{t(option.name)}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </Modal>
  );
});

const closeIcon = (
  <div className="absolute -right-6 -top-7 cursor-pointer">
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="22.2734" y1="22.2745" x2="7.42416" y2="7.42521" stroke="#0B0B0B" />
      <line x1="7.42574" y1="22.2744" x2="22.275" y2="7.42513" stroke="#0B0B0B" />
    </svg>
  </div>
);

FilterModal.displayName = 'FilterModal';

export default FilterModal;
