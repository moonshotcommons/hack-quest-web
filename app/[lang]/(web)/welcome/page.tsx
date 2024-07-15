'use client';

import * as React from 'react';
import { create } from 'zustand';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/helper/utils';
import { CodeXmlIcon, MoveRightIcon, PlayIcon, XIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { ecosystemStore } from '@/store/zustand/ecosystemStore';
import { useQueryClient } from '@tanstack/react-query';
import { getToken } from '@/helper/user-token';
import { useRedirect } from '@/hooks/router/useRedirect';
import { updateActiveEcosystem } from '@/components/ecosystem/actions';

interface Props {
  step: number;
  onNext: () => void;
}

const useOnboard = create<Props>((set) => ({
  step: 1,
  onNext: () => set((state) => ({ step: state.step + 1 }))
}));

function EcosystemCard({
  name,
  image,
  language,
  selected = false,
  onClick
}: {
  name: string;
  image: string;
  language: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn('flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-neutral-light-gray p-4', {
        'border-yellow-dark bg-yellow-extra-light': selected
      })}
      onClick={onClick}
    >
      <div className="relative h-12 w-12 flex-shrink-0">
        <Image src={image} alt={name} fill />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold text-neutral-off-black sm:text-lg">{name}</h2>
        <div className="flex items-center gap-2">
          <CodeXmlIcon size={16} />
          <span className="text-xs text-neutral-rich-gray">{language}</span>
        </div>
      </div>
    </div>
  );
}

function ChooseEcosystem() {
  const queryClient = useQueryClient();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [isShowVideo, setIsShowVideo] = React.useState(false);
  const [skipModalVisible, setSkipModalVisible] = React.useState(false);
  const onNext = useOnboard((state) => state.onNext);

  const { ecosystems } = ecosystemStore(
    useShallow((state) => ({
      ecosystems: state.ecosystems
    }))
  );

  function update(ecosystemId: string) {
    setLoading(true);
    updateActiveEcosystem(ecosystemId)
      .then(() => {
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ['enrolledEcosystems'] });
        onNext();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handlePlayPause() {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div className="flex h-full w-full flex-col pt-5 sm:pt-8">
      {isShowVideo ? (
        <>
          <h1 className="font-next-book-bold text-[1.375rem] font-bold sm:text-center sm:text-[1.75rem]">
            New to Web 3 Development
          </h1>
          <div className="relative mt-5 aspect-video sm:mt-8">
            <video ref={videoRef} controls className="rounded-[0.625rem]" src="/videos/web3.mp4" />
            {!isPlaying && (
              <div
                className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-[0.625rem] bg-black/50"
                onClick={handlePlayPause}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-dark sm:h-20 sm:w-20">
                  <PlayIcon className="h-6 w-6 text-neutral-white sm:h-10 sm:w-10" />
                </div>
              </div>
            )}
          </div>
          <Button
            ghost
            className="mt-auto w-full self-start uppercase sm:mt-12 sm:w-[16.875rem] sm:self-end"
            onClick={() => setIsShowVideo(false)}
          >
            Back
          </Button>
        </>
      ) : (
        <>
          <h1 className="font-next-book-bold text-[1.375rem] font-bold sm:text-[1.75rem]">Start with an Ecosystem</h1>
          <p className="mt-1 text-sm text-neutral-medium-gray sm:text-base">
            You can always enroll or change tracks in the explore page
          </p>
          <div className="my-5 grid grid-cols-1 gap-x-4 gap-y-5 sm:my-8 sm:grid-cols-2 sm:gap-y-6">
            {ecosystems.map((ecosystem) => (
              <EcosystemCard
                key={ecosystem.name}
                {...ecosystem}
                selected={selected === ecosystem.id}
                onClick={() => setSelected(ecosystem.id)}
              />
            ))}
          </div>
          {/* <div
            className="flex flex-col-reverse justify-between p-4 cursor-pointer rounded-2xl bg-neutral-off-white sm:flex-row"
            onClick={() => setIsShowVideo(true)}
          >
            <div className="flex flex-col gap-2 mt-4 sm:mt-0">
              <h3 className="text-base font-bold text-neutral-off-black">New to Web 3 Development?</h3>
              <p className="text-sm text-neutral-medium-gray">
                If you don&#39;t know which to choose, check out a quick introduction of different ecosystems.
              </p>
              <div className="inline-flex items-center gap-1.5">
                <span className="text-sm text-neutral-black">Learn more</span>
                <MoveRightIcon size={16} />
              </div>
            </div>
            <Image
              src="/images/ecosystem/skip_cover.png"
              alt="Skip"
              width={62}
              height={48}
              className="sm:h-20 sm:w-[6.5rem]"
            />
          </div> */}
          <div className="mt-6 flex flex-col-reverse items-center justify-between sm:mt-8 sm:flex-row">
            <button
              className="mt-4 inline-flex items-center gap-1.5 text-neutral-black outline-none"
              onClick={() => setSkipModalVisible(true)}
            >
              <span className="text-sm">Skip for now</span>
              <MoveRightIcon size={16} />
            </button>
            <Button
              disabled={!selected}
              type="primary"
              loading={loading}
              className="w-full uppercase sm:w-[16.875rem]"
              onClick={() => {
                if (selected) {
                  update(selected);
                }
              }}
            >
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
    <div className="flex h-full flex-col justify-between pt-5 sm:pt-8">
      <h1 className="font-next-book-bold text-[1.375rem] font-bold text-neutral-off-black sm:text-[1.75rem]">
        Your Web3 journey officially begins!
      </h1>
      <div className="mx-auto">
        <Image
          src="/images/ecosystem/begin_cover.png"
          width={350}
          height={144}
          alt="begining"
          className="sm:h-60 sm:w-[36.75rem]"
        />
      </div>
      <Link href="/dashboard">
        <Button type="primary" className="w-full self-start uppercase sm:w-[16.875rem] sm:self-end">
          Start learning
        </Button>
      </Link>
    </div>
  );
}

function SkipModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();

  function handleSkip() {
    onClose();
    router.push('/ecosystem-explore');
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative flex w-[40rem] flex-col items-center gap-5 rounded-2xl bg-neutral-white p-5 sm:gap-12 sm:p-12">
        <button aria-label="Close Modal" className="absolute right-6 top-6 outline-none" onClick={onClose}>
          <XIcon size={24} />
        </button>
        <Image
          src="/images/ecosystem/skip_modal_cover.png"
          alt="Skip"
          width={57}
          height={60}
          className="sm:h-20 sm:w-[5.25rem]"
        />
        <div>
          <h2 className="text-center text-lg font-bold text-neutral-rich-gray sm:text-2xl">
            Do you want to skip the onboarding for now?
          </h2>
          <p className="mt-4 text-center text-sm text-neutral-medium-gray sm:text-base">
            You can always enroll or change learning tracks in the explore page later
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
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
  const { redirectToUrl } = useRedirect();
  const step = useOnboard((state) => state.step);

  const Component = steps[step];

  React.useEffect(() => {
    const token = getToken();
    if (!token) {
      redirectToUrl('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-full flex-col overflow-y-auto bg-neutral-white sm:h-screen sm:bg-neutral-off-white">
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-center bg-neutral-white">
        <Image
          src="/images/logo/black-icon-text-logo.svg"
          width={184}
          height={22}
          alt="HackQuest"
          aria-label="HackQuest"
          className="sm:h-4 sm:w-[8.375rem]"
        />
      </header>
      <main className="mt-16 w-full flex-1 sm:mx-auto sm:max-w-[62.5rem] sm:py-12">
        <div className="h-full bg-neutral-white px-5 py-6 sm:rounded-[2rem] sm:border sm:border-neutral-light-gray sm:p-12">
          <div className="flex items-center gap-2.5">
            {Object.keys(steps).map((_, index) => (
              <span
                key={index}
                className={cn('h-1.5 w-10 rounded-[0.5rem] bg-neutral-light-gray', {
                  'bg-yellow-dark': index + 1 <= step
                })}
              />
            ))}
          </div>
          <Component />
        </div>
      </main>
    </div>
  );
}
