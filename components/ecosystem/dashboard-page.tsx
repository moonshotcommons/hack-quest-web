import * as React from 'react';
import { cookies } from 'next/headers';
import { DashboardCourses } from './dashboard-courses';
import { DashboardProjects } from './dashboard-projects';
import { DashboardEcosystem } from './dashboard-ecosystem';
import webApi from '@/service';

export default async function Page() {
  const token = cookies().get('token')?.value || '';
  const { total } = await webApi.courseApi.getMyCourses({ status: 'inProcess' }, token);
  return (
    <>
      {total > 0 ? (
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
