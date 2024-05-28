'use client';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
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
    <CourseListPageHeader
      title={t('electives.title')}
      description={t('electives.description')}
      placeholder={t('courses.searchPlaceholder')}
      coverImageUrl={'/images/course/course_cover/elective_cover.png'}
      coverImgClassName="mt-[50px]"
      coverWidth={394}
      coverHeight={300}
      defaultValue={keyword}
      onSearch={onSearch}
    ></CourseListPageHeader>
  );
};

export default Header;
