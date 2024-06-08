import * as React from 'react';
import { redirect } from 'next/navigation';
import { getMyCoursesCached } from '@/service/cach/learn/courses';
import { getActiveEcosystemCached } from '@/service/cach/learn/ecosystem';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardCourses } from './dashboard-courses';
import { DashboardProjects } from './dashboard-projects';
import { DashboardEcosystem } from './dashboard-ecosystem';

function PageSkeleton() {
  return (
    <div className="flex w-full flex-col gap-8">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default async function Page() {
  const courses = await getMyCoursesCached({ status: 'inProcess' });
  const activeEcosystem = await getActiveEcosystemCached();

  if (activeEcosystem?.info) {
    redirect(`/dashboard/${activeEcosystem.info.id}`);
  } else {
    return (
      <React.Suspense fallback={<PageSkeleton />}>
        {courses?.total > 0 ? (
          <div className="flex flex-col sm:gap-8">
            <DashboardCourses />
            <DashboardProjects />
          </div>
        ) : (
          <DashboardEcosystem />
        )}
      </React.Suspense>
    );
  }
}
