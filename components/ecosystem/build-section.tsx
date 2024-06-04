'use client';

import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ecosystem-accordion';
import { SectionHeader } from './section-header';
import { ExploreCard } from './explore-card';
import { ProjectCard } from './dashboard-projects';

export function BuildSection({ tasks }: { tasks: EcosystemTask[] }) {
  const generateLink = (task: EcosystemTask) => {
    const currentParams = new URLSearchParams();
    if (task.language) {
      currentParams.set('language', task.language);
    }
    if (task.track) {
      currentParams.set('track', task.track);
    }
    const url = `/electives?${currentParams.toString()}`;
    return url;
  };

  return (
    <Accordion type="multiple" className="flex flex-col gap-6">
      {tasks.map((task, index) => (
        <AccordionItem key={task.taskId} value={`item-${index + 1}`}>
          <AccordionTrigger completed={task.completed && task.claimed}>
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
              <ExploreCard label="explore courses" href={generateLink(task)} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
