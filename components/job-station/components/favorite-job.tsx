import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MoveRightIcon } from 'lucide-react';
import { getFavoritedCachedJobs } from '@/service/cach/jobs';
import { FavoriteButton } from './favorite-button';

export async function FavoriteJob() {
  const favoriteJobs = await getFavoritedCachedJobs({ page: 1, limit: 3 });
  return (
    <div className="flex w-full flex-col space-y-6 rounded-2xl bg-neutral-white p-6">
      <h2 className="font-next-book-bold text-lg font-bold">Saved for later</h2>
      {!favoriteJobs.data?.length && <p className="text-center text-neutral-rich-gray">No saved jobs yet</p>}
      {favoriteJobs.data?.map((job) => (
        <div key={job.id} className="flex items-start justify-between">
          <div>
            <h2 className="font-bold">{job.name}</h2>
            <div className="flex items-center gap-1">
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image src={job.companyLogo} alt={job.companyName} fill className="rounded-full" />
              </div>
              <h3 className="text-neutral-rich-gray">{job.companyName}</h3>
            </div>
          </div>
          <FavoriteButton favorited={job.favorited} jobId={job.id} />
        </div>
      ))}
      {favoriteJobs.total > 0 && (
        <Link href="/jobs/favorites">
          <button className="inline-flex items-center gap-1.5 outline-none">
            <span className="text-sm">View all</span>
            <MoveRightIcon size={16} />
          </button>
        </Link>
      )}
    </div>
  );
}
