import Link from 'next/link';
import Image from 'next/image';
import { MegaphoneIcon, MoveRightIcon } from 'lucide-react';
import { JobCard } from '../components/job-card';
import { JobFilter } from '../components/job-filter';
import { FavoriteJob } from '../components/favorite-job';
import { getCachedJobs, getCachedPublishedJobCount } from '@/service/cach/jobs';
import { generateQueryParams, type SearchParams } from '../utils';
import { SearchForm } from '../components/search-form';

export default async function Page({ searchParams }: { searchParams?: SearchParams }) {
  const queryParams = generateQueryParams(searchParams);
  const jobs = await getCachedJobs(queryParams);

  const { total, open } = await getCachedPublishedJobCount();

  return (
    <div className="flex h-full w-full flex-col bg-yellow-primary sm:bg-neutral-off-white">
      <div className="bg-yellow-primary py-10 sm:py-[60px]">
        <div className="flex flex-col space-y-5 px-5 sm:container sm:space-y-10 sm:px-0">
          <h1 className="font-next-book-bold font-bold sm:text-[40px]">Job Station</h1>
          <SearchForm />
          <section className="hidden flex-wrap gap-4 sm:flex">
            <button className="inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-extra-light px-3 py-2 font-bold sm:text-lg">
              <MegaphoneIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>Marketing</span>
            </button>
          </section>
        </div>
      </div>
      <main className="container mx-auto rounded-t-[32px] bg-neutral-off-white px-5 py-10">
        {total > 0 && (
          <div className="mb-10 grid w-full grid-cols-2 gap-10">
            <Link href="/jobs/hiring-portal">
              <button className="flex w-full items-center rounded-2xl bg-neutral-light-gray p-6">
                <Image src="/images/jobs/pagination.svg" alt="" width={64} height={64} />
                <div className="ml-8 text-left">
                  <h3 className="font-next-book-bold text-[22px] font-bold">Hiring Portal</h3>
                  <p className="text-base text-neutral-rich-gray">{open} positions open</p>
                </div>
                <MoveRightIcon size={20} className="ml-auto" />
              </button>
            </Link>
            <Link href="/jobs/publish">
              <button className="flex w-full items-center rounded-2xl bg-neutral-light-gray p-6">
                <Image src="/images/jobs/pagination.svg" alt="" width={64} height={64} />
                <div className="ml-8 text-left">
                  <h3 className="font-next-book-bold text-[22px] font-bold">Post Web3 Job</h3>
                  <p className="text-base text-neutral-rich-gray">Grow your team for the future of web3</p>
                </div>
                <MoveRightIcon size={20} className="ml-auto" />
              </button>
            </Link>
          </div>
        )}
        <section className="grid w-full sm:grid-cols-[320px_1fr] sm:gap-10">
          <div className="hidden flex-col gap-8 sm:flex">
            <JobFilter />
            <FavoriteJob />
          </div>
          <div className="flex flex-col space-y-6">{jobs.data?.map((job) => <JobCard key={job.id} job={job} />)}</div>
        </section>
      </main>
    </div>
  );
}
