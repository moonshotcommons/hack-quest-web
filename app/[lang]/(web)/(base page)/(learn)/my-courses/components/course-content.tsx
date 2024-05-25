'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/hackathon/line-tabs';
import webApi from '@/service';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { PageResult } from '@/service/webApi/type';
import { useQuery } from '@tanstack/react-query';
import { CourseCard } from './course-card';
import { CourseEmpty } from './course-empty';

export function CourseContent() {
  const [value, setValue] = React.useState('inProcess');

  const { data } = useQuery({
    queryKey: ['myCourses', value],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: () =>
      webApi.courseApi.getCourseListBySearch<PageResult<ProjectCourseType | ElectiveCourseType>>({ status: value }),
    select: ({ data }) => {
      return data.filter((item) => {
        return item.type !== CourseType.GUIDED_PROJECT;
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
        <div className="flex flex-col gap-8">
          {data?.length ? data?.map((item) => <CourseCard key={item.id} course={item} />) : <CourseEmpty />}
        </div>
      </TabsContent>
      <TabsContent value="completed">
        <div className="flex flex-col gap-8">
          {data?.length ? data?.map((item) => <CourseCard key={item.id} completed course={item} />) : <CourseEmpty />}
        </div>
      </TabsContent>
    </Tabs>
  );
}
