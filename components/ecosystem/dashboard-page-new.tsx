import * as React from 'react';
import { cookies } from 'next/headers';
import { DashboardCourses } from './dashboard-courses';
import { DashboardProjects } from './dashboard-projects';
import { DashboardEcosystem } from './dashboard-ecosystem';
import { getMyCoursesCached } from '@/service/cach/learn/courses';

export default async function Page() {
  const cookieStore = cookies();
  const ecosystemId = cookieStore.get('ecosystemId')?.value;
  const courses = await getMyCoursesCached({ status: 'inProcess' });

  // if (ecosystemId) {
  //   redirect(`/dashboard/${ecosystemId}`);
  // }

  return (
    <>
      {courses?.total > 0 ? (
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
