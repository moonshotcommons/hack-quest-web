import { CourseCard } from '@/components/course/course-card';
import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ecosystem-accordion';
import { SectionHeader } from './section-header';

export function LearnSection({ tasks }: { tasks: EcosystemTask[] }) {
  return (
    <Accordion type="multiple" className="flex flex-col gap-6">
      {tasks.map((task, index) => (
        <AccordionItem key={task.taskId} value={`item-${index + 1}`}>
          <AccordionTrigger>
            <SectionHeader
              title={task.name}
              tag="Learn"
              progress={task.progress}
              points={task.exp}
              completed={task.completed}
            />
          </AccordionTrigger>
          <AccordionContent>
            {task.courses?.map((course) => (
              <CourseCard
                key={course.id}
                rootClassName="sm:gap-2 sm:border sm:border-neutral-light-gray"
                imageClassName="sm:h-[236px] sm:w-[288px]"
                actionClassName="sm:mt-4"
                course={course}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
