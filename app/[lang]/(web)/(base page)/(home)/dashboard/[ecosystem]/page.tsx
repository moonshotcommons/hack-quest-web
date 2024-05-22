import { Progress, ProgressLabel } from '@/components/ui/progress';
import { EcosystemContent } from './components/ecosystem-content';

export default function Page({ params }: { params: { ecosystem: string } }) {
  return (
    <>
      <div className="flex items-center gap-12">
        <div className="flex flex-1 flex-col gap-6">
          <h1 className="font-next-book-bold text-[1.75rem] font-bold capitalize text-neutral-off-black">
            Certified {params.ecosystem} Developer
          </h1>
          <h2 className="flex items-center gap-3">
            <span className="font-next-book-bold text-lg font-bold text-neutral-off-black">Lvl 1. Learner</span>
            <span className="mt-0.5 text-sm text-neutral-medium-gray">Complete 100 points by completing tasks!</span>
          </h2>
          <Progress className="h-3 bg-neutral-white" value={30}>
            <ProgressLabel className="text-sm text-neutral-off-black">30/100</ProgressLabel>
          </Progress>
          <button
            disabled
            className="self-start rounded-full bg-yellow-primary px-6 py-4 text-sm font-medium uppercase text-neutral-black disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray"
          >
            claim certificate
          </button>
        </div>
        <div className="h-40 w-72 rounded-[0.5rem] border border-dashed border-neutral-light-gray">
          Certificate image
        </div>
      </div>
      <EcosystemContent />
    </>
  );
}
