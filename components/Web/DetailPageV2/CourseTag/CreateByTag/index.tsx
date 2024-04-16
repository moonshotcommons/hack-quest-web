import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import { FC, ReactNode } from 'react';

interface CreateByTagProps {
  icon?: ReactNode;
  label?: ReactNode;
  value?: string;
  valueNode?: ReactNode;
  lang: Lang;
}

const defaultIcon = <span></span>;

const CreateByTag: FC<CreateByTagProps> = async ({ icon, label, valueNode, value, lang }) => {
  const { t } = await useTranslation(lang, TransNs.BASIC);
  return (
    <div className="flex items-center gap-3">
      {icon ? icon : defaultIcon}
      <div className="flex flex-col">
        {!!label && label}
        {!label && <span className="body-xs text-neutral-medium-gray">{t('courses.createdBy')}</span>}
        {!!valueNode && valueNode}
        {!valueNode && value}
      </div>
    </div>
  );
};

export default CreateByTag;
