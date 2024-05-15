import * as React from 'react';
import { MoveRightIcon } from 'lucide-react';
import Link from 'next/link';
import { UrlObject } from 'url';

export function ViewAllLink({ href, children }: { href: string | UrlObject; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <div className="relative inline-flex items-center gap-1.5 after:absolute after:-bottom-1 after:h-[0.1875rem] after:w-full after:rounded-[0.125rem] after:bg-yellow-dark after:content-['']">
        <span className="text-sm text-neutral-off-black sm:text-base">{children}</span>
        <MoveRightIcon size={20} />
      </div>
    </Link>
  );
}
