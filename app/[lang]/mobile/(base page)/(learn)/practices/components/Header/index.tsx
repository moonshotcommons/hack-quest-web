'use client';
import MobCourseListPageHeader from '@/components/Mobile/MobCourseListPageHeader';
import { useTranslation } from '@/i18n/client';
import { Lang, TransNs } from '@/i18n/config';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

interface HeaderProps {
  lang: Lang;
  keyword: string;
}

const Header: FC<HeaderProps> = ({ lang, keyword }) => {
  const { t } = useTranslation(lang, TransNs.LEARN);

  const pathname = usePathname();

  const router = useRouter();

  const onSearch = (value: string) => {
    router.replace(`${pathname}?keyword=${value}`);
  };

  return (
    <MobCourseListPageHeader
      title={t('electives.title')}
      // description="Each elective course is relatively short and independent, with a focused topic. You will  learn how to build a project step by step."
      defaultValue={keyword}
      coverImageUrl={'/images/course/course_cover/elective_mobile_cover.svg'}
      coverWidth={120}
      coverImgClassName="top-[30px] right-4"
      coverHeight={92}
      onSearch={onSearch}
    />
  );
};

export default Header;
