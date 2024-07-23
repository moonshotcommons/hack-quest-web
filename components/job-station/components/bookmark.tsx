import * as React from 'react';
import { BookmarkIcon, MoveRightIcon } from 'lucide-react';
import Link from 'next/link';

export function Bookmark() {
  return (
    <div className="flex w-full flex-col space-y-6 rounded-2xl bg-neutral-white p-6">
      <h2 className="font-next-book-bold text-lg font-bold">Saved for later</h2>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-bold">Senior Front End Developer</h2>
          <div className="flex items-center gap-1">
            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-green-500"></div>
            <h3 className="text-neutral-rich-gray">Google</h3>
          </div>
        </div>
        <button className="outline-none" aria-hidden>
          <BookmarkIcon size={24} className="text-neutral-rich-gray" />
        </button>
      </div>
      <Link href="/jobs/bookmark">
        <button className="inline-flex items-center gap-1.5 outline-none">
          <span className="text-sm">View all</span>
          <MoveRightIcon size={16} />
        </button>
      </Link>
    </div>
  );
}
