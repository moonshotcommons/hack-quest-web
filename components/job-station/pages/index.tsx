import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CircleHelpIcon, MoveRightIcon } from 'lucide-react';
import { JobCard } from '../components/job-card';
import { JobFilter } from '../components/job-filter';
import { FavoriteJob } from '../components/favorite-job';
import { getCachedPublishedJobCount } from '@/service/cach/jobs';
import { generateQueryParams, LIMIT_PER_PAGE, type SearchParams } from '../utils';
import { SearchForm } from '../components/search-form';
import { JobSkeleton } from '../components/job-skeleton';
import { Pagination } from '../components/pagination';
import { isAuthenticated } from '../utils/auth';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Category } from '../components/category';
import { getCachedJobs } from '../utils/actions';
import { FilterModal } from '../components/filter-modal';
import { PostButton } from '../components/post-button';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const description = 'Find and apply for Web 3 jobs.';
  return {
    title: {
      template: '%s - Job Station',
      default: 'Job Station'
    },
    description,
    openGraph: {
      title: 'Job Station',
      description,
      url: `https://hackquest.io/jobs`
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Job Station',
      description
    },
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.JOB_STATION}`,
      languages: {
        'x-default': `https://www.hackquest.io/en${MenuLink.JOB_STATION}`,
        en: `https://www.hackquest.io/en${MenuLink.JOB_STATION}`,
        zh: `https://www.hackquest.io/zh${MenuLink.JOB_STATION}`
      }
    }
  };
}

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
          <Category />
        </div>
      </div>
      <main className="container mx-auto rounded-t-[32px] bg-neutral-off-white px-5 py-10">
        {total > 0 && isAuthenticated() && (
          <div className="mb-5 grid w-full grid-cols-2 gap-5 sm:mb-10 sm:gap-10">
            <Link href="/jobs/hiring-portal">
              <button className="sm:card-hover flex h-full w-full items-center gap-4 rounded-2xl bg-neutral-light-gray p-4 sm:p-6">
                <Image src="/images/jobs/pagination.svg" alt="" width={64} height={64} className="hidden sm:block" />
                <div className="text-left sm:ml-8">
                  <h3 className="font-next-book-bold text-lg font-bold sm:text-[22px]">Hiring Portal</h3>
                  <p className="hidden text-base text-neutral-rich-gray sm:block">{open} positions open</p>
                </div>
                <MoveRightIcon size={20} className="ml-auto shrink-0" />
              </button>
            </Link>
            <Link href="/jobs/publish">
              <button className="sm:card-hover flex w-full items-center gap-4 rounded-2xl bg-neutral-light-gray p-4 sm:p-6">
                <Image src="/images/jobs/pagination.svg" alt="" width={64} height={64} className="hidden sm:block" />
                <div className="text-left sm:ml-8">
                  <h3 className="font-next-book-bold text-lg font-bold sm:text-[22px]">Post Web3 Job</h3>
                  <p className="hidden text-base text-neutral-rich-gray sm:block">
                    Grow your team for the future of web3
                  </p>
                </div>
                <MoveRightIcon size={20} className="ml-auto shrink-0" />
              </button>
            </Link>
          </div>
        )}
        {isAuthenticated() && (
          <div className="flex w-full items-center gap-5 sm:hidden">
            <Link href="/jobs/favorites" className="flex w-full">
              <button className="mb-5 flex w-full flex-1 items-center gap-4 rounded-2xl bg-neutral-light-gray p-4">
                <h3 className="text-left font-next-book-bold text-lg font-bold">Saved for Later</h3>
                <MoveRightIcon size={20} className="ml-auto shrink-0" />
              </button>
            </Link>
            {total <= 0 && (
              <Link href="/jobs/publish" className="flex w-full">
                <button className="mb-5 flex w-full flex-1 items-center gap-4 rounded-2xl bg-neutral-light-gray p-4">
                  <h3 className="text-left font-next-book-bold text-lg font-bold">Post Web3 Job</h3>
                  <MoveRightIcon size={20} className="ml-auto shrink-0" />
                </button>
              </Link>
            )}
          </div>
        )}
        <section className="grid w-full sm:grid-cols-[320px_1fr] sm:gap-10">
          <div className="relative hidden w-full sm:block">
            <div className="sticky top-10 flex flex-col gap-8">
              <JobFilter />
              {isAuthenticated() && <FavoriteJob />}
              {total <= 0 && (
                <PostButton>
                  <button className="sm:card-hover inline-flex w-full items-center  justify-between rounded-2xl bg-neutral-light-gray p-4 font-next-book-bold text-lg font-bold outline-none">
                    <span>Post a Web3 Job</span>
                    <MoveRightIcon size={20} />
                  </button>
                </PostButton>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="sm:hidden">
              <FilterModal />
            </div>
            <React.Suspense fallback={<JobSkeleton />}>
              {jobs.total > 0 ? (
                jobs.data?.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-white py-20">
                  <CircleHelpIcon size={32} className="text-neutral-medium-gray" />
                  <p className="text-neutral-medium-gray">No job found</p>
                </div>
              )}
              {}
            </React.Suspense>
            {jobs.total > LIMIT_PER_PAGE && <Pagination total={jobs.total} />}
          </div>
        </section>
      </main>
    </div>
  );
}
