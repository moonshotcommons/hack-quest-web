import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ecosystem-accordion';
import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { SectionHeader } from './section-header';
import { ProjectCard } from '@/components/course/project-card';
import { ExploreCard } from './explore-card';

export function BuildSection({ tasks }: { tasks: EcosystemTask[] }) {
  return (
    <Accordion type="multiple" className="flex flex-col gap-6">
      {tasks.map((task, index) => (
        <AccordionItem key={task.taskId} value={`item-${index + 1}`}>
          <AccordionTrigger>
            <SectionHeader
              title={task.name}
              tag="Build"
              points={task.exp}
              completed={task.completed}
              progress={task.progress}
            />
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {task.courses?.map((course) => <ProjectCard key={course.id} course={course} />)}
              <ExploreCard label="explore courses" href="/" />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
