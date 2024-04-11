import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import { FC, ReactNode } from 'react';

interface LanguageTagProps {
  icon?: ReactNode;
  label?: ReactNode;
  value?: string;
  valueNode?: ReactNode;
  lang: Lang;
}

const defaultIcon = (
  <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.76822 10.8598C9.12179 11.2841 9.06446 11.9147 8.64018 12.2682L3.56205 16.5L8.64018 20.7318C9.06446 21.0854 9.12179 21.7159 8.76822 22.1402C8.41466 22.5645 7.78409 22.6218 7.35982 22.2682L1.35982 17.2682C1.13182 17.0783 1 16.7968 1 16.5C1 16.2032 1.13182 15.9218 1.35982 15.7318L7.35982 10.7318C7.78409 10.3782 8.41466 10.4356 8.76822 10.8598Z"
      fill="#3E3E3E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.2318 10.8598C23.5854 10.4356 24.2159 10.3782 24.6402 10.7318L30.6402 15.7318C30.8682 15.9218 31 16.2032 31 16.5C31 16.7968 30.8682 17.0783 30.6402 17.2682L24.6402 22.2682C24.2159 22.6218 23.5854 22.5645 23.2318 22.1402C22.8782 21.7159 22.9356 21.0854 23.3598 20.7318L28.438 16.5L23.3598 12.2682C22.9356 11.9147 22.8782 11.2841 23.2318 10.8598Z"
      fill="#3E3E3E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.3415 4.56023C20.8606 4.74897 21.1283 5.32274 20.9396 5.84177L12.9396 27.8418C12.7508 28.3608 12.1771 28.6286 11.658 28.4398C11.139 28.2511 10.8713 27.6773 11.06 27.1583L19.06 5.15828C19.2487 4.63925 19.8225 4.3715 20.3415 4.56023Z"
      fill="#3E3E3E"
    />
  </svg>
);

const LanguageTag: FC<LanguageTagProps> = async ({ icon, label, value, valueNode, lang, ...rest }) => {
  const { t } = await useTranslation(lang, TransNs.BASIC);
  return (
    <div className="flex items-center gap-3" {...rest}>
      {icon ? icon : defaultIcon}
      <div className="flex flex-col">
        {!!label && label}
        {!label && <span className="body-xs text-neutral-medium-gray">{t('courses.language')}</span>}
        {!!valueNode && valueNode}
        {!valueNode && value && <span className="body-s-bold capitalize">{value.toLowerCase()}</span>}
      </div>
    </div>
  );
};

export default LanguageTag;
