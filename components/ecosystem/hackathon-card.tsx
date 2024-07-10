'use client';

import Link from 'next/link';
import Image from 'next/image';
import MenuLink from '@/constants/MenuLink';
import Button from '@/components/Common/Button';
import { Badge } from '@/components/ui/badge';
import { useLang } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';

export function HackathonCard({ hackathon }: { hackathon: any }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  console.log(hackathon);
  const href = hackathon?.isSubmit ? `${MenuLink.HACKATHON}/${hackathon.alias}` : MenuLink.HACKATHON_DASHBOARD;
  return (
    <Link href={href}>
      <div className="flex flex-col rounded-2xl border border-neutral-light-gray bg-neutral-white transition-all duration-300 sm:hover:-translate-y-1">
        <div className="relative h-40 w-full">
          <Image
            src={hackathon?.info?.image || hackathon?.image}
            alt={hackathon?.name}
            fill
            className="rounded-t-2xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-3">
            {hackathon?.track && <Badge>{hackathon?.track}</Badge>}
            {hackathon?.language && <Badge>{hackathon?.language}</Badge>}
            {!hackathon?.track && !hackathon?.language && <Badge>Hackathon</Badge>}
          </div>
          <h1 className="line-clamp-1 h-6 text-base font-bold text-neutral-off-black">{hackathon?.name}</h1>
          <Button type="primary" ghost={hackathon?.isSubmit} className="h-12 w-full uppercase">
            {hackathon?.isSubmit ? t('submitted') : t('learn_more')}
          </Button>
        </div>
      </div>
    </Link>
  );
}
