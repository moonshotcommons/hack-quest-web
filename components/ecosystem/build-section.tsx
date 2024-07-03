'use client';

import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ecosystem-accordion';
import { SectionHeader } from './section-header';
import { ExploreCard } from './explore-card';
import { ProjectCard } from './dashboard-projects';
import { HackathonCard } from './hackathon-card';

export function BuildSection({ tasks }: { tasks: EcosystemTask[] }) {
  const generateLink = (task: EcosystemTask) => {
    const currentParams = new URLSearchParams();
    if (task.language) {
      currentParams.set('language', task.language);
    }
    if (task.track) {
      currentParams.set('track', task.track);
    }
    const url = `/practices?${currentParams.toString()}`;
    return url;
  };

  return (
    <Accordion type="multiple" defaultValue={['item-1']} className="flex flex-col gap-6">
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
          <AccordionContent className="px-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {task?.courses && (
                <>
                  {task.courses?.map((course) => <ProjectCard key={course.id} course={course} />)}
                  <ExploreCard label="explore courses" href={generateLink(task)} />
                </>
              )}
              {task?.hackathons && (
                <>
                  {task.hackathons?.map((hackathon) => <HackathonCard key={hackathon.id} hackathon={hackathon} />)}
                  <ExploreCard
                    className="h-[314px] sm:h-[314px]"
                    label="explore hackathons"
                    href="/hackathon/explore"
                  />
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
