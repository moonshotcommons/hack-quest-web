'use client';

import Link from 'next/link';
import { MoveLeftIcon } from 'lucide-react';
import type { UrlObject } from 'url';
import { useLang } from '../Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function BackLink({ href }: { href: string | UrlObject }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      <MoveLeftIcon size={20} />
      <span className="text-base capitalize text-neutral-off-black sm:text-lg">{t('dashboard.back')}</span>
    </Link>
  );
}
