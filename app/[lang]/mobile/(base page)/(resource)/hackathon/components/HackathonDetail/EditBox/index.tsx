import { cn } from '@/helper/utils';
import React, { ReactNode, useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Title from '../Title';
import {
  HackathonEditContext,
  HackathonEditModalType
} from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface EditBoxProp {
  className?: string;
  title?: string;
  children: ReactNode;
  type?: HackathonEditModalType;
  handleDelete?: VoidFunction;
  isExpandAll?: boolean;
  handleExpandAll?: VoidFunction;
}

const EditBox: React.FC<EditBoxProp> = ({
  title,
  className,
  children,
  type,
  handleDelete,
  handleExpandAll,
  isExpandAll
}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setModalType, isEdit } = useContext(HackathonEditContext);
  return (
    <div className="flex flex-col gap-[1rem]">
      {title && (
        <div className="flex items-center justify-between">
          <Title title={title} />
          <div>
            {isEdit && (
              <div className="underline-l flex cursor-pointer gap-[12px] text-neutral-off-black">
                {handleDelete && <div onClick={handleDelete}>{t('remove')}</div>}
                {type && <div onClick={() => setModalType(type)}>{t('edit')}</div>}
              </div>
            )}
            {!isEdit && handleExpandAll && (
              <div className="underline-s cursor-pointer text-neutral-black" onClick={handleExpandAll}>
                {isExpandAll ? t('courses.collapseAll') : t('courses.expandAll')}
              </div>
            )}
          </div>
        </div>
      )}
      <div
        className={cn(
          'overflow-hidden rounded-[1rem] border border-neutral-light-gray bg-neutral-white p-[1.5rem]',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default EditBox;
