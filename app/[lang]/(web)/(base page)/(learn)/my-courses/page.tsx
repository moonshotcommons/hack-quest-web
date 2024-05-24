import { CourseContent } from './components/course-content';
import { ProjectContent } from './components/project-content';

export default function Page() {
  return (
    <div className="px-5 py-6 sm:container sm:mx-auto sm:px-0 sm:py-8">
      <h1 className="font-next-book-bold text-[1.75rem] font-bold text-neutral-off-black">My Courses</h1>
      <CourseContent />
      <h1 className="mt-[3.75rem] font-next-book-bold text-[1.75rem] font-bold text-neutral-off-black">My Projects</h1>
      <ProjectContent />
    </div>
  );
}
