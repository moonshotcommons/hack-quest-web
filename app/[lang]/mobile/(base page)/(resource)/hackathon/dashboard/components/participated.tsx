import { MoveRightIcon } from 'lucide-react';
import { HackathonCard } from './hackathon-card';
import Link from 'next/link';

export function Participated() {
  return (
    <div className="flex flex-col items-center gap-6">
      <HackathonCard title="Linea Mini-hack -May" tagName="REGISTERED" />
      <Link href="/">
        <div className="relative inline-flex items-center gap-1.5 after:absolute after:-bottom-1 after:h-[0.1875rem] after:w-full after:rounded-[0.125rem] after:bg-yellow-dark after:content-['']">
          <span className="text-sm text-neutral-off-black">View All Participated Hackathon</span>
          <MoveRightIcon size={20} />
        </div>
      </Link>
    </div>
  );
}
