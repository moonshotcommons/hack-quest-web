import * as React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardCourses } from './dashboard-courses';
import { DashboardProjects } from './dashboard-projects';
import { DashboardEcosystem } from './dashboard-ecosystem';
import webApi from '@/service';

export default async function Page() {
  const token = cookies().get('token')?.value || '';
  const { total } = await webApi.courseApi.getMyCourses({ status: 'inProcess' }, token);

  const avtiveEcosystem = await webApi.ecosystemApi.getActiveEcosystem(token);

  console.log(avtiveEcosystem);

  if (Object.keys(avtiveEcosystem || {}).length > 0) {
    redirect(`/system/${avtiveEcosystem.info.id}`);
  }

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
