'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MoveRightIcon } from 'lucide-react';
import { useQueries } from '@tanstack/react-query';
import webApi from '@/service';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function MyCertificateCard() {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  const results = useQueries({
    queries: [
      {
        staleTime: Infinity,
        queryKey: ['userLearnedCount'],
        queryFn: () => webApi.userApi.getUserLearnedCount()
      },
      {
        staleTime: Infinity,
        queryKey: ['userProfile'],
        queryFn: () => webApi.userApi.getUserProfile()
      }
    ]
  });

  const { data: count } = results[0];
  const { data: profile } = results[1];

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-neutral-white p-4">
      <h1 className="text-h5 font-bold">{t('my_certificate')}</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 py-2">
          <h4 className="text-xs font-light text-neutral-rich-gray">{t('courses_completed')}</h4>
          <h2 className="body-l-bold text-neutral-off-black">{count?.courseCount}</h2>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <h4 className="text-xs font-light text-neutral-rich-gray">{t('certification_earned')}</h4>
          <h2 className="body-l-bold text-neutral-off-black">{count?.certificationCount}</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {profile?.certifications?.slice(0, 3)?.map((certificate) => (
          <div key={certificate.id} className="relative h-12 w-full overflow-hidden rounded">
            <Image src={certificate.image} alt={certificate.name} fill />
          </div>
        ))}
        {(profile?.certifications?.length || 0) < 3 && (
          <div className="h-12 w-full rounded border border-dashed border-neutral-medium-gray" />
        )}
      </div>
      <Link href={`/user/${profile?.user.username}`}>
        <div className="inline-flex items-center gap-2">
          <span className="text-xs font-medium uppercase text-neutral-off-black">{t('view_certificate')}</span>
          <MoveRightIcon size={16} />
        </div>
      </Link>
    </div>
  );
}
