import * as React from 'react';
import { redirect } from 'next/navigation';
import { getMyCoursesCached } from '@/service/cach/learn/courses';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardCourses } from './dashboard-courses';
import { DashboardProjects } from './dashboard-projects';
import { DashboardEcosystem } from './dashboard-ecosystem';
import { getActiveEcosystem } from './actions';

export function PageSkeleton() {
  return (
    <div className="flex w-full flex-col gap-8">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default async function Page() {
  const active = await getActiveEcosystem();
  const courses = await getMyCoursesCached({ status: 'inProcess' });

  if (active?.level) {
    redirect(`/dashboard/${active.level?.ecosystemId}`);
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
