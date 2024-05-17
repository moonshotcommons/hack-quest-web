import Link from 'next/link';
import { MoveLeftIcon } from 'lucide-react';
import type { UrlObject } from 'url';

export function BackLink({ href }: { href: string | UrlObject }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      <MoveLeftIcon size={20} />
      <span className="text-base capitalize text-neutral-off-black sm:text-lg">Back to your hackathon</span>
    </Link>
  );
}
