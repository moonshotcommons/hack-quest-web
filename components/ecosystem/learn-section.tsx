'use client';

import * as React from 'react';
import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ecosystem-accordion';
import { SectionHeader } from './section-header';
import { CourseCard } from './dashboard-courses';

export function LearnSection({ tasks }: { tasks: EcosystemTask[] }) {
  return (
    <Accordion defaultValue={['item-1']} type="multiple" className="flex flex-col gap-6">
      {tasks.map((task, index) => (
        <AccordionItem key={task.taskId} value={`item-${index + 1}`}>
          <AccordionTrigger completed={task.completed && task.claimed}>
            <SectionHeader
              taskId={task.taskId}
              title={task.name}
              tag="Learn"
              progress={task.progress}
              points={task.exp}
              claimed={task.claimed}
              completed={task.completed}
            />
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-5 sm:gap-6">
              {task?.courses?.map((course) => (
                <CourseCard showDescription={false} type="course" key={course.id} course={course} />
              ))}
              {task?.learningTracks?.map((course) => (
                <CourseCard type="learningTrack" showDescription={false} key={course.id} course={course} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
