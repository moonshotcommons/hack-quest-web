'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '@/components/Common/Loading';
import webApi from '@/service';
import { DashboardCourses } from './dashboard-courses';
import { DashboardProjects } from './dashboard-projects';
import { DashboardEcosystem } from './dashboard-ecosystem';

export default function Page() {
  const router = useRouter();
  const query = useQuery({
    queryKey: ['myCourses'],
    queryFn: () => webApi.courseApi.getMyCourses({ status: 'inProcess' })
  });

  const mutation = useMutation({
    mutationFn: () => webApi.ecosystemApi.getActiveEcosystem()
  });

  React.useEffect(() => {
    mutation.mutateAsync().then((data) => {
      if (data?.info) {
        router.replace(`/system/${data.info.id}`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = mutation.isPending || query.isLoading;

  return (
    <Loading loading={isLoading}>
      {(query.data?.total || 0) > 0 ? (
        <div className="flex flex-col sm:gap-8">
          <DashboardCourses />
          <DashboardProjects />
        </div>
      ) : (
        <DashboardEcosystem />
      )}
    </Loading>
  );
}
