import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/line-tabs';
import { CourseCard } from './components/course-card';
import { ProjectCard } from './components/project-card';
import { CourseEmpty } from './components/course-empty';

export default async function Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="font-next-book-bold text-[1.75rem] font-bold text-neutral-off-black">My Courses</h1>
      <Tabs defaultValue="progress" className="mt-6 w-full">
        <TabsList className="justify-start">
          <TabsTrigger value="progress" className="sm:text-lg">
            In progress
          </TabsTrigger>
          <TabsTrigger value="completed" className="sm:text-lg">
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="progress">
          <div className="flex flex-col gap-8">
            <CourseCard />
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <CourseEmpty />
        </TabsContent>
      </Tabs>
      <h1 className="mt-[3.75rem] font-next-book-bold text-[1.75rem] font-bold text-neutral-off-black">My Projects</h1>
      <Tabs defaultValue="progress" className="mt-6 w-full">
        <TabsList className="justify-start">
          <TabsTrigger value="progress" className="sm:text-lg">
            In progress
          </TabsTrigger>
          <TabsTrigger value="completed" className="sm:text-lg">
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="progress">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="flex flex-col gap-8">
            <CourseCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
