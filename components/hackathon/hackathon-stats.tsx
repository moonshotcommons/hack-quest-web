'use client';

import { useTranslation } from '@/i18n/client';
import { useLang } from '../Provider/Lang';
import { TransNs } from '@/i18n/config';

export function HackathonStats({
  registered,
  submitted,
  winner,
  projectVoted
}: {
  registered: number;
  submitted: number;
  winner: number;
  projectVoted: number;
}) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  return (
    <div>
      <h1 className="font-next-book-bold text-lg font-bold text-neutral-black">{t('dashboard.yourHackathonStats')}</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">{t('dashboard.hackathonRegistered')}</p>
          <p className="body-l-bold text-neutral-off-black">{registered}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">{t('dashboard.hackathonSubmitted')}</p>
          <p className="body-l-bold text-neutral-off-black">{submitted}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">{t('dashboard.winnerProject')}</p>
          <p className="body-l-bold text-neutral-off-black">{winner}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">{t('dashboard.projectVoted')}</p>
          <p className="body-l-bold text-neutral-off-black">{projectVoted}</p>
        </div>
      </div>
    </div>
  );
}
