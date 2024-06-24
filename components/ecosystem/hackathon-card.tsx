'use client';

import Link from 'next/link';
import Image from 'next/image';
import MenuLink from '@/constants/MenuLink';
import Button from '@/components/Common/Button';
import { Badge } from '@/components/ui/badge';
import { useLang } from '@/components/Provider/Lang';
import { CourseDetailType } from '@/service/webApi/course/type';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';

export function HackathonCard({ course }: { course: CourseDetailType }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  return (
    <Link href={`${MenuLink.PRACTICES}/${course.id}`}>
      <div className="flex flex-col rounded-2xl border border-neutral-light-gray bg-neutral-white transition-all duration-300 sm:hover:-translate-y-1">
        <div className="relative h-40 w-full">
          <Image src={course.image || ''} alt={course.title} fill className="rounded-t-2xl object-cover" />
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{course.track}</Badge>
          </div>
          <h1 className="line-clamp-2 h-12 text-base font-bold text-neutral-off-black">{course.title}</h1>
          <Button ghost={course.progress === 1} type="primary" className="h-12 w-full uppercase">
            {course.progress === 1 ? t('completed') : t('continue')}
          </Button>
        </div>
      </div>
    </Link>
  );
}
