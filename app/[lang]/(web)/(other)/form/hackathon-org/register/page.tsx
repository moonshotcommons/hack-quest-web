'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRightIcon } from 'lucide-react';
import { ExitIcon } from '@/components/ui/icons/exit';
import { HACKQUEST_DISCORD } from '@/constants/links';
import { Button } from '@/components/ui/button';
import { Stepper } from '../components/stepper';
import { Info } from './components/form/info';
import { Judging } from './components/form/judging';
import { Application } from './components/form/application';
import { Sub } from './components/form/sub';
import { Links } from './components/form/links';
import { Cover } from './components/form/cover';
import { Timeline } from './components/form/timeline';
import { Rewards } from './components/form/rewards';

const items = [
  {
    value: 1,
    label: 'Info',
    completed: true,
    component: <Info />
  },
  {
    value: 2,
    label: 'Judging',
    completed: false,
    component: <Judging />
  },
  {
    value: 3,
    label: 'Appl.',
    completed: false,
    component: <Application />
  },
  {
    value: 4,
    label: 'Sub.',
    completed: false,
    component: <Sub />
  },
  {
    value: 5,
    label: 'Links',
    completed: false,
    component: <Links />
  },
  {
    value: 6,
    label: 'Cover',
    completed: false,
    component: <Cover />
  },
  {
    value: 7,
    label: 'Timeline',
    completed: false,
    component: <Timeline />
  },
  {
    value: 8,
    label: 'Rewards',
    completed: false,
    component: <Rewards />
  }
];

export default function Page() {
  const [value, setValue] = React.useState(1);
  return (
    <div className="min-h-screen w-full bg-neutral-off-white">
      <header className="sticky top-0 z-50 h-16  bg-neutral-white">
        <div className="relative flex h-full w-full items-center justify-center">
          <Image src="/images/logo/black-icon-text-logo.svg" width={134} height={16} alt="hackquest" />
          <button className="absolute right-10 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 text-neutral-off-black outline-none">
            <ExitIcon />
            <span className="body-l">Exit</span>
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-[806px] py-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="headline-h3">Shanghai Hackathon 2024</h2>
            <p className="flex items-center gap-4 text-center text-sm font-light text-neutral-black">
              Need any help?{' '}
              <Link
                aria-label="Join Discord"
                href={HACKQUEST_DISCORD}
                target="_blank"
                className="flex items-center gap-1.5"
              >
                Join Discord <MoveRightIcon className="h-4 w-4" />
              </Link>
            </p>
          </div>
          <Button className="w-60">finish setup 0/8</Button>
        </div>
        <Stepper items={items} value={value} onValueChange={setValue} />
      </main>
    </div>
  );
}
