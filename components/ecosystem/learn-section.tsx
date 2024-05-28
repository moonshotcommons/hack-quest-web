'use client';

import * as React from 'react';
import { MoveRightIcon } from 'lucide-react';
import { CourseCard } from '@/components/course/course-card';
import { EcosystemTask } from '@/service/webApi/ecosystem/type';
import { useQueryRouter } from '@/hooks/hackathon/use-query-router';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ecosystem-accordion';
import { SectionHeader } from './section-header';

const languageMap = {
  en: 'English',
  zh: 'Chinese'
};

export function LearnSection({ tasks }: { tasks: EcosystemTask[] }) {
  const { value, isPending, onValueChange } = useQueryRouter({
    queryKey: 'lang',
    defaultValue: 'en'
  });

  const nextLang = value === 'en' ? 'zh' : 'en';

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
            <div>
              {task.courses?.map((course) => (
                <CourseCard
                  key={course.id}
                  rootClassName="sm:gap-2 sm:border sm:border-neutral-light-gray"
                  imageClassName="sm:h-[236px] sm:w-[288px]"
                  actionClassName="sm:mt-4"
                  course={course}
                />
              ))}
              <p className="mt-6 text-sm text-neutral-rich-gray">
                A {languageMap[nextLang]} version of this course is available.
                <button
                  disabled={isPending}
                  className="ml-4 inline-flex items-center gap-1.5 outline-none"
                  onClick={() => onValueChange(nextLang)}
                >
                  Switch to {languageMap[nextLang]} <MoveRightIcon size={14} />
                </button>
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
