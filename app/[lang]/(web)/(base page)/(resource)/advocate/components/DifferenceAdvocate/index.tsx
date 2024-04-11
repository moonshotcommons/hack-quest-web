import Image from 'next/image';
import { FC } from 'react';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';

interface DifferenceAdvocateProps {
  lang: Lang;
}

const dataList = [
  {
    title: 'advocate.DifferenceAdvocate.section1.title',
    description: 'advocate.DifferenceAdvocate.section1.description'
  },
  {
    title: 'advocate.DifferenceAdvocate.section2.title',
    description: 'advocate.DifferenceAdvocate.section2.description'
  },
  {
    title: 'advocate.DifferenceAdvocate.section3.title',
    description: 'advocate.DifferenceAdvocate.section3.description'
  },
  {
    title: 'advocate.DifferenceAdvocate.section4.title',
    description: 'advocate.DifferenceAdvocate.section4.description'
  }
];

const DifferenceAdvocate: FC<DifferenceAdvocateProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="container mx-auto mt-[100px] flex flex-col items-center">
      <h2 className="text-h2 text-neutral-off-black"> {t('advocate.DifferenceAdvocate.title')}</h2>
      <div className="mt-[3.75rem] flex items-center justify-between gap-20">
        <Image src={'/images/advocate/difference_advocate.webp'} alt="hackquest" width={600} height={600}></Image>
        <ul className="flex-1">
          {dataList.map((item, index) => {
            return (
              <li
                key={item.title}
                className={index !== 0 ? 'mt-8 border-t border-dashed border-neutral-black pt-8' : ''}
              >
                <p className="body-xl-bold pl-3 text-neutral-off-black">{t(item.title)}</p>
                <p className="body-s mt-3 pl-3 text-neutral-medium-gray">{t(item.description)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DifferenceAdvocate;
