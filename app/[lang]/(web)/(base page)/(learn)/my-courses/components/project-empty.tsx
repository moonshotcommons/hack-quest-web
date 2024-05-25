import Button from '@/components/Common/Button';
import webApi from '@/service';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { useQuery } from '@tanstack/react-query';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import { useRedirect } from '@/hooks/router/useRedirect';

export function ProjectEmpty() {
  const { redirectToUrl } = useRedirect();
  const { data } = useQuery({
    queryKey: ['featuredCourses'],
    queryFn: () => webApi.courseApi.getTopCourses<ProjectCourseType>({ type: CourseType.GUIDED_PROJECT })
  });
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-center gap-4 py-8">
        <h2 className="text-base font-bold text-neutral-black sm:text-lg">You’re not enrolled in any project</h2>
        <Button size="small" ghost className="uppercase" onClick={() => redirectToUrl('/practices')}>
          Explore projects
        </Button>
      </div>
      <div className="flex flex-col gap-5 sm:gap-8">
        <h2 className="text-lg font-bold text-neutral-black">Explore Projects</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 sm:gap-4">
          {data?.map((item) => <PracticeCard key={item.id} course={item} />)}
        </div>
      </div>
    </div>
  );
}
