'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Common/Button';
import { HACKQUEST_DISCORD } from '@/constants/links';
import { useLang } from '../Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function FollowDiscord() {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-neutral-white p-4">
      <Image src="/images/hackathon/follow_discord.svg" width={64} height={64} alt="Follow Discord" />
      <p className="body-m-bold text-neutral-off-black">{t('join_discord_desc')}</p>
      <Link href={HACKQUEST_DISCORD} target="_blank" rel="noreferrer">
        <Button size="small" type="primary" className="uppercase">
          {t('join_discord')}
        </Button>
      </Link>
    </div>
  );
}
