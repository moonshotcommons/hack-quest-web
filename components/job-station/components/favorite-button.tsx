'use client';

import { BookmarkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/helper/utils';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';

export function FavoriteButton({
  jobId,
  favorited = false,
  className
}: {
  jobId: string;
  favorited?: boolean;
  className?: string;
}) {
  const router = useRouter();

  const favoriteMutation = useMutation({
    mutationKey: ['favorite', jobId],
    mutationFn: () => webApi.jobApi.favoriteJob(jobId),
    onSuccess: () => {
      router.refresh();
      toast.success('Job saved');
    }
  });

  const unfavoriteMutation = useMutation({
    mutationKey: ['unfavorite', jobId],
    mutationFn: () => webApi.jobApi.unfavoriteJob(jobId),
    onSuccess: () => {
      router.refresh();
      toast.success('Saved job removed');
    }
  });

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (favorited) {
      unfavoriteMutation.mutate();
    } else {
      favoriteMutation.mutate();
    }
  }

  return (
    <button
      aria-label={favorited ? 'Remove from saved' : 'Save for later'}
      data-prevent-nprogress={true}
      disabled={favoriteMutation.isPending || unfavoriteMutation.isPending}
      className={cn('outline-none', className)}
      onClick={onClick}
    >
      <BookmarkIcon
        aria-hidden
        size={24}
        className={cn('text-neutral-rich-gray', { 'fill-neutral-rich-gray': favorited })}
      />
    </button>
  );
}
