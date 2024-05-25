'use client';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import { useTranslation } from '@/i18n/client';
import { Lang, TransNs } from '@/i18n/config';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

interface HeaderProps {
  lang: Lang;
  keyword: string;
}

const coverImage = (
  <div className="pt-[50px]">
    <Image
      src={'/images/course/course_cover/practices_cover.png'}
      width={314}
      height={300}
      alt="Projects cover"
    ></Image>
  </div>
);

const Header: FC<HeaderProps> = ({ lang, keyword }) => {
  const { t } = useTranslation(lang, TransNs.LEARN);

  const pathname = usePathname();

  const router = useRouter();

  const onSearch = (value: string) => {
    router.replace(`${pathname}?keyword=${value}`);
  };

  return (
    <CourseListPageHeader
      title={t('practice.title')}
      description={t('practice.description')}
      placeholder={t('courses.searchPlaceholder')}
      defaultValue={keyword}
      coverImage={coverImage}
      coverWidth={523}
      coverHeight={277}
      onSearch={onSearch}
    ></CourseListPageHeader>
  );
};

export default Header;
