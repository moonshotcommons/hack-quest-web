'use client';

import * as React from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Image from 'next/image';
import Link from 'next/link';

export const QUICK_LINKS = [
  {
    title: 'Explore Hackathons',
    url: '/hackathon',
    icon: 'dashboard_explore',
    size: {
      width: 40,
      height: 48
    }
  },
  {
    title: 'Project Archive',
    url: '/hackathon/projects',
    icon: 'dashboard_project',
    size: {
      width: 48,
      height: 48
    }
  },
  {
    title: 'Hackathon Voting',
    url: '/hackathon/voting',
    icon: 'dashboard_voting',
    size: {
      width: 40,
      height: 48
    }
  }
];

export function DashboardHeader() {
  const { lang } = React.useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex items-start justify-between">
      <div className="max-w-[800px]">
        <h1 className="flex items-center gap-3 font-next-book-bold text-[2.5rem] font-bold text-neutral-off-black">
          <Image src="/images/hackathon/hackathon_dashboard_logo.png" width={48} height={48} alt="Your Hackathons" />
          <span>Your Hackathons</span>
        </h1>
        <p className="body-l mt-5 text-neutral-rich-gray">
          Welcome to your hackathon dashboard! Manage projects, invite teammates, and track your hackathon journey with
          ease—all in one place.
        </p>
        <div className="mt-[3.75rem]">
          <h2 className="body-l-bold text-neutral-off-black">Quick Links:</h2>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {QUICK_LINKS.map((v, i) => (
              <Link href={v.url} key={i}>
                <div className="flex items-center gap-2 rounded-2xl bg-neutral-white p-5 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]">
                  <div className="h-12 w-12">
                    <Image
                      src={`/images/hackathon/${v.icon}.png`}
                      width={v.size.width}
                      height={v.size.height}
                      alt={v.title}
                    />
                  </div>
                  <h3 className="body-l whitespace-nowrap text-neutral-black">{v.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/hackathon/hackathon_dashboard_cover.png"
          width={416}
          height={332}
          alt="Your Hackathons Cover"
          priority
        />
      </div>
    </div>
  );
}
