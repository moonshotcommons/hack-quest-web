import { JobCard } from './components/job-card';
import { JobFilter } from './components/job-filter';
import { Back } from './components/back';

export default function Page() {
  return (
    <main className="container mx-auto flex flex-col space-y-6 py-[60px]">
      <Back />
      <h1 className="font-next-book-bold text-[28px] font-bold">Saved for Later</h1>
      <div className="grid gap-10 sm:grid-cols-[1fr_320px]">
        <div className="flex flex-col space-y-6">
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
        <JobFilter />
      </div>
    </main>
  );
}
