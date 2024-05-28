import Button from '@/components/Common/Button';
import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { SectionHeader } from './section-header';

export function CommunitySection({ tasks }: { tasks: EcosystemTask[] }) {
  return (
    <div className="flex flex-col gap-8">
      {tasks.map((task) => (
        <div key={task.taskId} className="flex items-center justify-between p-3">
          <SectionHeader
            title={task.name}
            tag="Community"
            progress={task.progress}
            points={task.exp}
            completed={task.completed}
          />
          <Button disabled={task.completed} size="small" ghost className="text-xs uppercase sm:w-36">
            {task.completed ? 'completed' : 'go now'}
          </Button>
        </div>
      ))}
    </div>
  );
}
