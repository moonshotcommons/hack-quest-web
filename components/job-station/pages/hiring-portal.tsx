import { Button } from '@/components/ui/button';
import { Back } from '../components/back';
import { Badge } from '@/components/ui/badge';
import { ArrowIcon } from '@/components/ui/icons/arrow';

export default function Page() {
  return (
    <main
      className="flex h-full min-h-[calc(100vh-64px)] w-full flex-col bg-[var(--primary-color)] sm:bg-neutral-off-white"
      style={{
        ['--primary-color' as any]: '#6DF1CA'
      }}
    >
      <div className="bg-[var(--primary-color)] px-5 py-10 sm:px-0 sm:py-[60px]">
        <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
          <h1 className="font-next-book-bold text-[22px] font-bold sm:text-[28px]">Hiring Portal</h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl flex-1 space-y-6 rounded-t-[32px] bg-neutral-off-white px-5 py-10 sm:mt-6 sm:p-0 sm:pb-10">
        <div className="flex items-center justify-between">
          <Back />
          <Button className="w-[165px] bg-[var(--primary-color)] hover:bg-[var(--primary-color)]">Post NEW Job</Button>
        </div>
        <div className="space-y-6">
          <div className="sm:card-hover flex w-full flex-col gap-4 rounded-2xl bg-neutral-white p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[var(--primary-color)]"></div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold">Senior Front End Developer</h3>
                <p className="text-base text-neutral-rich-gray">Google</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 sm:ml-auto sm:justify-end">
              <Badge size="large">Open</Badge>
              <ArrowIcon className="rotate-180" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
