import Image from 'next/image';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { EcosystemContent } from './ecosystem-content';

export default function Page({ params }: { params: { ecosystem: string } }) {
  return (
    <>
      <div className="flex flex-col px-5 py-6 sm:flex-row sm:items-center sm:gap-12 sm:px-0 sm:py-0">
        <h1 className="font-next-book-bold text-[1.375rem] font-bold capitalize text-neutral-off-black sm:hidden">
          Certified {params.ecosystem} Developer
        </h1>
        <div className="order-2 mt-5 flex flex-1 flex-col sm:order-1 sm:mt-0 sm:gap-6">
          <h1 className="hidden font-next-book-bold text-[1.75rem] font-bold capitalize text-neutral-off-black sm:block">
            Certified {params.ecosystem} Developer
          </h1>
          <div className="flex flex-col sm:gap-2">
            <h2 className="mb-2 flex items-center gap-3 sm:mb-0">
              <span className="font-next-book-bold text-base font-bold text-neutral-off-black sm:text-lg">
                Lvl 1. Learner
              </span>
              <span className="mt-0.5 hidden text-sm text-neutral-medium-gray sm:block">
                Complete 100 points by completing tasks!
              </span>
            </h2>
            <Progress className="h-3 bg-neutral-white" value={30}>
              <ProgressLabel className="text-sm text-neutral-off-black">30/100</ProgressLabel>
            </Progress>
          </div>
          <button
            disabled
            className="mt-6 rounded-full bg-yellow-primary px-6 py-4 text-sm font-medium uppercase text-neutral-black disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray sm:mt-0 sm:self-start"
          >
            claim certificate
          </button>
        </div>
        <div className="relative order-1 mt-5 h-48 w-full rounded-[0.5rem] sm:order-2 sm:mt-0 sm:h-40 sm:w-72">
          <Image src="/images/ecosystem/solana-certificate.png" alt="solana certificate" fill />
        </div>
      </div>
      <EcosystemContent />
    </>
  );
}
