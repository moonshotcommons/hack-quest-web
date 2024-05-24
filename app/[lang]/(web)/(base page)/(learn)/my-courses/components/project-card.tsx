'use client';

import * as React from 'react';
import Button from '@/components/Common/Button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import Image from 'next/image';
import { getDefaultImageUrl } from './utils';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';

export function ProjectCard({ project }: { project: ProjectCourseType | ElectiveCourseType }) {
  const getCourseDetailLink = React.useCallback(() => {
    switch (project.type) {
      case CourseType.UGC:
        return `${MenuLink.PRACTICES}/${project.id}`;
      default:
        return `${MenuLink.ELECTIVES}/${project.id}`;
    }
  }, [project]);
  return (
    <Link href={getCourseDetailLink()}>
      <div className="card-hover flex flex-col overflow-hidden rounded-2xl bg-neutral-white">
        <div className="relative h-40 w-full">
          <Image
            src={project.image || getDefaultImageUrl(project.track)}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{project.track}</Badge>
          </div>
          <h1 className="text-base font-bold text-neutral-off-black">{project.title}</h1>
          <Progress value={Math.floor((project.progress || 0) * 100)} />
          <Button type="primary" className="w-full uppercase">
            continue
          </Button>
        </div>
      </div>
    </Link>
  );
}
