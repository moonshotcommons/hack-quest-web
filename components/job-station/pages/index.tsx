import { MegaphoneIcon, SearchIcon } from 'lucide-react';
import { JobCard } from '../components/job-card';
import { JobFilter } from '../components/job-filter';
import { Bookmark } from '../components/bookmark';

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col bg-yellow-primary sm:gap-12 sm:bg-neutral-off-white">
      <div className="bg-yellow-primary py-10 sm:py-[60px]">
        <div className="flex flex-col space-y-5 px-5 sm:container sm:space-y-10 sm:px-0">
          <h1 className="font-next-book-bold font-bold sm:text-[40px]">Job Station</h1>
          <form className="inline-flex w-full items-center gap-3 rounded-full border border-neutral-light-gray bg-neutral-white px-3 transition-colors duration-300 focus-within:border-neutral-medium-gray sm:w-[800px] sm:gap-5 sm:px-5">
            <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            <input
              type="search"
              className="h-[38px] flex-1 bg-transparent outline-none sm:h-[60px]"
              placeholder="Search for jobs"
            />
          </form>
          <section className="hidden flex-wrap gap-4 sm:flex">
            <button className="inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-extra-light px-3 py-2 font-bold sm:text-lg">
              <MegaphoneIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span>Marketing</span>
            </button>
          </section>
        </div>
      </div>
      <main className="container mx-auto rounded-t-[32px] bg-neutral-off-white px-5 py-10">
        <section className="grid w-full sm:grid-cols-[320px_1fr] sm:gap-10">
          <div className="hidden flex-col gap-8 sm:flex">
            <JobFilter />
            <Bookmark />
          </div>
          <div className="flex flex-col space-y-6">
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </section>
      </main>
    </div>
  );
}
