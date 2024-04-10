import Button from '@/components/Common/Button';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ApplyAdvocateProps {
  lang: Lang;
}

const ApplyAdvocate: FC<ApplyAdvocateProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="mt-[100px] flex w-full flex-col items-center gap-[60px] bg-neutral-white p-20">
      <h2 className="text-h2 text-neutral-off-black">{t('advocate.ApplyAdvocate.title')}</h2>
      <div className="relative h-[420px] w-[900px]">
        <Image src={'/images/advocate/map.webp'} fill alt="hackquest"></Image>
      </div>
      <Link href={'https://xsxo494365r.typeform.com/to/X1n7gsPH'} target="_blank">
        <Button className="w-[165px] py-4 uppercase" type="primary">
          {t('advocate.ApplyAdvocate.applyNow')}
        </Button>
      </Link>
    </div>
  );
};

export default ApplyAdvocate;
