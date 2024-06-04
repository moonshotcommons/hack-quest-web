'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import { DashboardCourses } from './dashboard-courses';
import { DashboardProjects } from './dashboard-projects';
import { DashboardEcosystem } from './dashboard-ecosystem';
import webApi from '@/service';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const { data: myCourses } = useQuery({
    queryKey: ['myCourses'],
    queryFn: () => webApi.courseApi.getMyCourses({ status: 'inProcess' })
  });

  const { data: activeEcosystem } = useQuery({
    queryKey: ['activeEcosystem'],
    queryFn: () => webApi.ecosystemApi.getActiveEcosystem()
  });

  console.log(activeEcosystem);

  React.useEffect(() => {
    if (Object.keys(activeEcosystem || {}).length == 0) return;
    redirect(`/system/${activeEcosystem?.info?.id}`);
  }, [activeEcosystem]);

  return (
    <>
      {(myCourses?.total || 0) > 0 ? (
        <div className="flex flex-col sm:gap-8">
          <DashboardCourses />
          <DashboardProjects />
        </div>
      ) : (
        <DashboardEcosystem />
      )}
    </>
  );
}
