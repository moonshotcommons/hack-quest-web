import { cn } from '@/helper/utils';
import React, { ReactNode, useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Title from '../Title';

interface EditBoxProp {
  className?: string;
  title: string;
  children: ReactNode;
  handleEdit?: VoidFunction;
  handleDelete?: VoidFunction;
}

const EditBox: React.FC<EditBoxProp> = ({ title, className, children, handleEdit, handleDelete }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex items-center justify-between">
        <Title title={title} />
        <div className="underline-l flex cursor-pointer gap-[12px] text-neutral-off-black">
          {handleDelete && <div onClick={handleDelete}>{t('remove')}</div>}
          {handleEdit && <div onClick={handleEdit}>{t('edit')}</div>}
        </div>
      </div>
      <div
        className={cn(
          'overflow-hidden rounded-[24px] border border-neutral-light-gray bg-neutral-white p-[24px]',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default EditBox;
