import { CourseCard } from '@/components/course/course-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ecosystem-accordion';
import { SectionHeader } from './section-header';

export function LearnSection() {
  return (
    <Accordion type="multiple" className="flex flex-col gap-6">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <SectionHeader title="Complete Web3 Basics (0/1)" tag="Learn" points={10} completed={false} />
        </AccordionTrigger>
        <AccordionContent>
          <CourseCard
            rootClassName="sm:gap-2 sm:border-neutral-light-gray"
            imageClassName="sm:h-[236px] sm:w-[288px]"
            actionClassName="sm:mt-4"
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger completed>
          <SectionHeader title="Complete Solana Ecosystem Overview" tag="Learn" points={10} completed={true} />
        </AccordionTrigger>
        <AccordionContent>
          <CourseCard
            rootClassName="sm:gap-2 sm:border-neutral-light-gray"
            imageClassName="sm:h-[236px] sm:w-[288px]"
            actionClassName="sm:mt-4"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
