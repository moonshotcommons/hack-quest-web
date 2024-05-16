'use client';

import * as React from 'react';
import { create } from 'zustand';
import Image from 'next/image';
import { cn } from '@/helper/utils';
import { CodeXmlIcon, MoveRightIcon, XIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { useRouter } from 'next/navigation';

interface Props {
  step: number;
  onNext: () => void;
}

const useOnboard = create<Props>((set) => ({
  step: 1,
  onNext: () => set((state) => ({ step: state.step + 1 }))
}));

function EcosystemCard({ selected = false }: { selected?: boolean }) {
  return (
    <div
      className={cn('flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-neutral-light-gray p-4', {
        'border-yellow-dark bg-yellow-extra-light': selected
      })}
    >
      <Image src="/images/ecosystem/solana.svg" alt="solana" width={64} height={64} />
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-neutral-off-black">Solana Developer</h2>
        <div className="flex items-center gap-2">
          <CodeXmlIcon size={16} />
          <span className="text-xs text-neutral-rich-gray">Solidity</span>
        </div>
      </div>
    </div>
  );
}

function ChooseEcosystem() {
  const [isShowVideo, setIsShowVideo] = React.useState(false);
  const [skipModalVisible, setSkipModalVisible] = React.useState(false);
  const onNext = useOnboard((state) => state.onNext);
  return (
    <div className="flex h-full w-full flex-col pt-8">
      {isShowVideo ? (
        <>
          <h1 className="text-center font-next-book-bold text-[1.75rem] font-bold">New to Web 3 Development?</h1>
          <div className="mt-8 w-full flex-1 rounded-[0.625rem] bg-blue-400"></div>
          <Button ghost className="mt-12 w-[16.875rem] self-end uppercase" onClick={() => setIsShowVideo(false)}>
            Back
          </Button>
        </>
      ) : (
        <>
          <h1 className="font-next-book-bold text-[1.75rem] font-bold">Start with an Ecosystem</h1>
          <p className="mt-1 text-base text-neutral-medium-gray">
            You can always enroll or change tracks in the explore page
          </p>
          <div className="my-8 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <EcosystemCard selected />
            <EcosystemCard />
            <EcosystemCard />
            <EcosystemCard />
          </div>
          <div
            className="flex cursor-pointer justify-between rounded-2xl bg-neutral-off-white p-4"
            onClick={() => setIsShowVideo(true)}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-neutral-off-black">New to Web 3 Development?</h3>
              <p className="text-sm text-neutral-medium-gray">
                If you don&#39;t know which to choose, check out a quick introduction of different ecosystems.
              </p>
              <div className="inline-flex items-center gap-1.5">
                <span className="text-sm text-neutral-black">Learn more</span>
                <MoveRightIcon size={16} />
              </div>
            </div>
            <Image src="/images/ecosystem/skip_cover.png" alt="Skip" width={103} height={80} />
          </div>
          <div className="mt-auto flex items-center justify-between">
            <button
              className="inline-flex items-center gap-1.5 text-neutral-black outline-none"
              onClick={() => setSkipModalVisible(true)}
            >
              <span className="text-sm">Skip for now</span>
              <MoveRightIcon size={16} />
            </button>
            <Button type="primary" className="w-[16.875rem] uppercase" onClick={onNext}>
              Continue
            </Button>
          </div>
          <SkipModal open={skipModalVisible} onClose={() => setSkipModalVisible(false)} />
        </>
      )}
    </div>
  );
}

function StartLearning() {
  return (
    <div className="flex h-full flex-col justify-between pt-8">
      <h1 className="font-next-book-bold text-[1.75rem] font-bold text-neutral-off-black">
        Your Web3 journey officially begins!
      </h1>
      <div className="mx-auto">
        <Image src="/images/ecosystem/begin_cover.png" width={588} height={240} alt="begining" />
      </div>
      <Button type="primary" className="w-[16.875rem] self-end uppercase">
        Start learning
      </Button>
    </div>
  );
}

function SkipModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();

  function handleSkip() {
    onClose();
    router.push('/');
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative flex w-[40rem] flex-col items-center gap-12 rounded-2xl bg-neutral-white p-12">
        <button aria-label="Close Modal" className="absolute right-6 top-6 outline-none" onClick={onClose}>
          <XIcon size={24} />
        </button>
        <Image src="/images/ecosystem/skip_modal_cover.png" alt="Skip" width={81} height={84} />
        <div>
          <h2 className="text-2xl font-bold text-neutral-rich-gray">Do you want to skip the onboarding for now?</h2>
          <p className="mt-4 text-base text-neutral-medium-gray">
            You can always enroll or change learning tracks in the explore page later
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-3">
          <Button type="primary" className="w-full uppercase" onClick={handleSkip}>
            Skip for now
          </Button>
          <Button ghost className="w-full uppercase" onClick={onClose}>
            cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

const steps: Record<number, React.FC> = {
  1: ChooseEcosystem,
  2: StartLearning
};

export default function Page() {
  const step = useOnboard((state) => state.step);

  const Compoent = steps[step];

  return (
    <div className="flex h-screen w-full flex-col bg-neutral-off-white">
      <header className="flex h-16 items-center justify-center bg-neutral-white">
        <Image
          src="/images/logo/black-icon-text-logo.svg"
          width={184}
          height={22}
          alt="HackQuest"
          aria-label="HackQuest"
          className="sm:h-4 sm:w-[8.375rem]"
        />
      </header>
      <main className="mx-auto w-full flex-1 sm:max-w-[62.5rem] sm:py-12">
        <div className="h-full rounded-[2rem] border border-neutral-light-gray bg-neutral-white p-12">
          <div className="flex items-center gap-2.5">
            {Object.keys(steps).map((_, index) => (
              <span
                key={index}
                className={cn('h-1.5 w-10 rounded-[0.5rem] bg-neutral-light-gray', {
                  'bg-yellow-dark': index === step - 1
                })}
              />
            ))}
          </div>
          <Compoent />
        </div>
      </main>
    </div>
  );
}
