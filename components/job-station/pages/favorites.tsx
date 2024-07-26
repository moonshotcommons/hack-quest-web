import { getFavoritedCachedJobs } from '@/service/cach/jobs';
import { JobCard } from '../components/job-card';
import { JobFilter } from '../components/job-filter';
import { Back } from '../components/back';
import { generateQueryParams, SearchParams } from '../utils';

export default async function Page({ searchParams }: { searchParams?: SearchParams }) {
  const queryParams = generateQueryParams(searchParams);
  const favoriteJobs = await getFavoritedCachedJobs(queryParams);
  return (
    <main className="flex h-full w-full flex-col bg-neutral-white sm:bg-neutral-off-white">
      <div className="container mx-auto space-y-5 px-5 pt-10 sm:space-y-6 sm:px-0 sm:pt-[60px]">
        <Back />
        <h1 className="font-next-book-bold text-[22px] font-bold sm:text-[28px]">Saved for Later</h1>
      </div>
      <div className="container grid gap-10 rounded-t-[32px] bg-neutral-off-white px-5 py-10 sm:mt-6 sm:grid-cols-[1fr_320px] sm:p-0 sm:pb-10">
        <div className="flex flex-col space-y-6">
          {favoriteJobs.data?.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
        <JobFilter />
      </div>
    </main>
  );
}
