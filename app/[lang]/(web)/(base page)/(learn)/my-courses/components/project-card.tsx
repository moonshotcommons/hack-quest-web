'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckIcon, CodeXmlIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import { Badge } from '@/components/ui/badge';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import MenuLink from '@/constants/MenuLink';
import { getCoverImageByTrack } from '@/helper/utils';

export function ProjectCard({
  project,
  completed = false
}: {
  project: ProjectCourseType | ElectiveCourseType;
  completed?: boolean;
}) {
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
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          ) : (
            getCoverImageByTrack(project.track)
          )}
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <Badge>{project.track}</Badge>
            {completed && (
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-status-success text-neutral-white">
                <CheckIcon size={20} />
              </span>
            )}
          </div>
          <h1 className="text-base font-bold text-neutral-off-black">{project.title}</h1>
          {completed && <p className="line-clamp-4 text-sm text-neutral-medium-gray">{project.description}</p>}
          {completed ? (
            <div className="mt-4 flex items-center justify-between sm:mt-auto">
              <div className="flex items-center gap-2">
                <CodeXmlIcon size={20} />
                <span className="text-xs text-neutral-rich-gray">{project.language}</span>
              </div>
            </div>
          ) : (
            <>
              <Progress value={Math.floor((project.progress || 0) * 100)}>
                <ProgressLabel>{Math.floor((project.progress || 0) * 100)}%</ProgressLabel>
              </Progress>
              <Button type="primary" className="w-full uppercase">
                continue
              </Button>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
