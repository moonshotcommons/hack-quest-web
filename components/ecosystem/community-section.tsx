import Button from '@/components/Common/Button';
import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { SectionHeader } from './section-header';

export function CommunitySection({ tasks }: { tasks: EcosystemTask[] }) {
  return (
    <div className="flex flex-col gap-8">
      {tasks
        .sort((a, b) => a.exp - b.exp)
        .map((task) => (
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
              disabled={task.completed}
              size="small"
              ghost
              className="whitespace-nowrap text-xs uppercase sm:w-36"
            >
              {task.completed && task.claimed ? 'completed' : 'go now'}
            </Button>
          </div>
        ))}
    </div>
  );
}
