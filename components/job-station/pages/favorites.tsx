import * as React from 'react';
import { redirect } from 'next/navigation';
import { CircleHelpIcon } from 'lucide-react';
import { getFavoritedCachedJobs } from '@/service/cach/jobs';
import { JobCard } from '../components/job-card';
import { JobFilter } from '../components/job-filter';
import { Back } from '../components/back';
import { generateQueryParams, LIMIT_PER_PAGE, SearchParams } from '../utils';
import { JobSkeleton } from '../components/job-skeleton';
import { Pagination } from '../components/pagination';
import { FilterModal } from '../components/filter-modal';

export default async function Page({ searchParams }: { searchParams?: SearchParams }) {
  try {
    const queryParams = generateQueryParams(searchParams);
    const favoriteJobs = await getFavoritedCachedJobs(queryParams);
    return (
      <main className="flex h-full min-h-[calc(100vh-64px)] w-full flex-col bg-neutral-white sm:min-h-full sm:bg-neutral-off-white">
        <div className="container mx-auto space-y-5 px-5 py-10 sm:space-y-6 sm:px-0 sm:pb-0 sm:pt-[60px]">
          <Back />
          <h1 className="font-next-book-bold text-[22px] font-bold sm:text-[28px]">Saved for Later</h1>
        </div>
        <div className="container flex-1 gap-10 rounded-t-[32px] bg-neutral-off-white px-5 py-10 sm:mt-6 sm:grid sm:grid-cols-[1fr_320px] sm:p-0 sm:pb-10">
          <div className="mb-5 sm:mb-0 sm:hidden">
            <FilterModal />
          </div>
          <div className="flex flex-col space-y-6">
            <React.Suspense fallback={<JobSkeleton />}>
              {favoriteJobs.data?.length > 0 ? (
                favoriteJobs.data?.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-white py-20">
                  <CircleHelpIcon size={32} className="text-neutral-medium-gray" />
                  <p className="text-neutral-medium-gray">No saved jobs</p>
                </div>
              )}
            </React.Suspense>
            {favoriteJobs.total > LIMIT_PER_PAGE && <Pagination total={favoriteJobs.total} />}
          </div>
          <div className="relative hidden w-full sm:block">
            <div className="sticky top-10">
              <JobFilter />
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error: any) {
    if (error.code === 401) {
      redirect('/jobs');
    }
  }
}
