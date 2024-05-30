import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { ProjectCard } from '@/components/course/project-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ecosystem-accordion';
import { SectionHeader } from './section-header';
import { ExploreCard } from './explore-card';

export function BuildSection({ tasks }: { tasks: EcosystemTask[] }) {
  return (
    <Accordion type="multiple" className="flex flex-col gap-6">
      {tasks.map((task, index) => (
        <AccordionItem key={task.taskId} value={`item-${index + 1}`}>
          <AccordionTrigger>
            <SectionHeader
              taskId={task.taskId}
              title={task.name}
              tag="Build"
              points={task.exp}
              completed={task.completed}
              claimed={task.claimed}
              progress={task.progress}
            />
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {task.courses?.map((course) => <ProjectCard key={course.id} course={course} />)}
              {/* TODO: href will be updated */}
              <ExploreCard label="explore courses" href="/" />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
