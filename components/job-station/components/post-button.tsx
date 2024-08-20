'use client';

import Link from 'next/link';
import { useUserStore } from '@/store/zustand/userStore';

export function PostButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { userInfo, setAuthModalOpen } = useUserStore();

  function onClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (!userInfo) {
      e.preventDefault();
      e.stopPropagation();
      setAuthModalOpen(true);
      return;
    }
  }

  return (
    <Link href="/jobs/publish" data-prevent-nprogress={!userInfo} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
