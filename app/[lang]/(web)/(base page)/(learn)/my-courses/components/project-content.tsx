'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/line-tabs';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import webApi from '@/service';
import { PageResult } from '@/service/webApi/type';
import { ProjectCard } from './project-card';
import { ProjectEmpty } from './project-empty';

export function ProjectContent() {
  const [value, setValue] = React.useState('inProcess');

  const { data } = useQuery({
    queryKey: ['myCourses', value],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: () =>
      webApi.courseApi.getCourseListBySearch<PageResult<ProjectCourseType | ElectiveCourseType>>({ status: value }),
    select: ({ data }) => {
      return data.filter((item) => {
        return item.type === CourseType.GUIDED_PROJECT;
      });
    }
  });

  return (
    <Tabs className="mt-6 w-full" value={value} onValueChange={setValue}>
      <TabsList className="justify-start">
        <TabsTrigger value="inProcess" className="sm:text-lg">
          In progress
        </TabsTrigger>
        <TabsTrigger value="completed" className="sm:text-lg">
          Completed
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inProcess">
        {data?.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {data?.map((item) => <ProjectCard key={item.id} project={item} />)}
          </div>
        ) : (
          <ProjectEmpty />
        )}
      </TabsContent>
      <TabsContent value="completed">
        {data?.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {data?.map((item) => <ProjectCard key={item.id} completed project={item} />)}
          </div>
        ) : (
          <ProjectEmpty />
        )}
      </TabsContent>
    </Tabs>
  );
}
