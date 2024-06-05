'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Common/Button';
import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { SectionHeader } from './section-header';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import webApi from '@/service';

export function CommunitySection({ tasks }: { tasks: EcosystemTask[] }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (taskId: string) => webApi.ecosystemApi.completeTask(taskId)
  });

  function completeTask(task: EcosystemTask) {
    const taskId = task.taskId;
    mutation.mutateAsync(taskId).then(() => {
      queryClient.invalidateQueries({ queryKey: ['ecosystemTasks'] });
      if (task.extra?.link?.startsWith('http')) {
        window.open(task.extra?.link, '_blank');
      } else {
        router.push(task.extra?.link as string);
      }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      {tasks.map((task) => (
        <div key={task.taskId} className="flex items-center justify-between p-3">
          <SectionHeader
            taskId={task.taskId}
            title={task.name}
            tag="Community"
            progress={task.progress}
            points={task.exp}
            claimed={task.claimed}
            completed={task.completed}
            showProgress={false}
          />
          <Button
            disabled={task.completed || mutation.isPending}
            size="small"
            ghost
            onClick={() => completeTask(task)}
            className="whitespace-nowrap text-xs uppercase sm:w-36"
          >
            {task.completed && task.claimed ? 'completed' : 'go now'}
          </Button>
        </div>
      ))}
    </div>
  );
}
