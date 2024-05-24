import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ecosystem-accordion';
import { SectionHeader } from './section-header';
import { ProjectCard } from '@/components/course/project-card';
import { ExploreCard } from './explore-card';

export function BuildSection() {
  return (
    <Accordion type="multiple" className="flex flex-col gap-6">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <SectionHeader
            title="Complete 3 Projects on Rust basics for Solana (0/3)"
            tag="Build"
            points={50}
            completed={false}
          />
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <ProjectCard />
            <ProjectCard />
            <ExploreCard label="explore courses" href="/" />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <SectionHeader
            title="Complete 5 Projects on Solana Ecosystem Deep Dive (0/5)"
            tag="Build"
            points={50}
            completed={false}
          />
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <ProjectCard />
            <ExploreCard label="explore courses" href="/" />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger completed>
          <SectionHeader title="Join & Submit one Hackathon" tag="Build" points={20} completed={true} />
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <ProjectCard />
            <ExploreCard label="explore hackathon" href="/hackathon/explore" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
