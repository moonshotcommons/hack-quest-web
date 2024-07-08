import Image from 'next/image';

export default function Page() {
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
      <main className="mt-16 w-full flex-1 px-4 sm:mx-auto sm:max-w-[62.5rem] sm:px-0 sm:py-12">
        <video className="aspect-video rounded-xl" controls src="/videos/web3.mp4"></video>
      </main>
    </div>
  );
}
