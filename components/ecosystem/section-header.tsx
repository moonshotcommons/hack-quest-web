'use client';

import Image from 'next/image';
import { message } from 'antd';
import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import webApi from '@/service';
import { cn } from '@/helper/utils';

export function SectionHeader({
  taskId,
  title,
  tag,
  progress,
  points,
  showProgress = true,
  claimed = false,
  completed = false
}: {
  taskId: string;
  title: string;
  tag: string;
  progress: [number, number];
  points: number;
  showProgress?: boolean;
  claimed?: boolean;
  completed?: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['claimTaskRewards', taskId],
    mutationFn: () => webApi.ecosystemApi.claimTaskRewards(taskId),
    onSuccess: () => {
      message.success('success');
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ['ecosystemTasks']
      });
    }
  });

  return (
    <span className="flex w-full items-center gap-6">
      <span className="relative hidden h-12 w-12 items-center justify-center rounded-[0.5rem] bg-yellow-light sm:flex">
        <Image src="/images/ecosystem/diamond.svg" alt="diamond" width={32} height={32} />
        {completed && claimed && (
          <span className="absolute -right-3 -top-2.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-status-success text-neutral-white">
            <CheckIcon size={16} />
          </span>
        )}
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-left text-base font-bold leading-[160%] text-neutral-off-black sm:text-lg">
          {title} {progress && !claimed && showProgress && `(${progress[0]}/${progress[1]})`}
        </span>
        <span className="flex items-center gap-2">
          <Badge>{tag}</Badge>
          <span className="text-xs leading-[160%] text-neutral-medium-gray sm:text-sm">+{points} Points</span>
        </span>
      </span>
      {completed && !claimed && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            if (!mutation.isPending) {
              mutation.mutate();
            }
          }}
          className={cn(
            'ml-auto mr-4 inline-flex h-[2.125rem] w-[8.75rem] cursor-pointer items-center justify-center rounded-full bg-yellow-primary text-xs font-medium uppercase text-neutral-off-black transition-all sm:hover:scale-105',
            {
              'pointer-events-none cursor-not-allowed opacity-40': mutation.isPending
            }
          )}
        >
          {mutation.isPending ? 'Claiming...' : 'Clain'}
        </span>
      )}
    </span>
  );
}
