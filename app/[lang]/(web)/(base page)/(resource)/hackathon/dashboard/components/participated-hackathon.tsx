import Link from 'next/link';
import { HackathonCard } from './hackathon-card';
import { MoveRightIcon } from 'lucide-react';

export function Participated() {
  return (
    <div className="flex flex-col items-center gap-8">
      <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
      <HackathonCard title="Linea Mini-hack -May" tagName="MISSED" />
      <HackathonCard title="Linea Mini-hack -May" tagName="ENDED" />
      <Link href="/">
        <div className="relative inline-flex items-center gap-1.5 after:absolute after:-bottom-1 after:h-[0.1875rem] after:w-full after:rounded-[0.125rem] after:bg-yellow-dark after:content-['']">
          <span className="body-m text-neutral-off-black">View All Participated Hackathon</span>
          <MoveRightIcon size={20} />
        </div>
      </Link>
    </div>
  );
}
