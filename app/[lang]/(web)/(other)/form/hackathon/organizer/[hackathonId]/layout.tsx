'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ExitIcon } from '@/components/ui/icons/exit';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <div className="no-scrollbar min-h-screen w-full bg-neutral-off-white">
      <header className="sticky top-0 z-50 h-16  bg-neutral-white">
        <div className="relative flex h-full w-full items-center justify-center">
          <Image src="/images/logo/black-icon-text-logo.svg" width={134} height={16} alt="hackquest" />
          <button
            className="absolute right-10 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 text-neutral-off-black outline-none"
            onClick={() => router.back()}
          >
            <ExitIcon />
            <span className="body-l">Exit</span>
          </button>
        </div>
      </header>
      <main className="mx-auto h-full max-w-[806px] py-10">{children}</main>
    </div>
  );
}
