'use client';

import * as React from 'react';
import Image from 'next/image';
import moment from 'moment';
import { Clock4Icon, MapPinIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/service/webApi/jobs/types';
import { workTypes } from '../validations';
import { FavoriteButton } from './favorite-button';
import ApplyJob from './apply-job';
import { formatLocation, formatSalary } from '../utils';
import Link from 'next/link';
import { capitalize } from 'lodash-es';

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="sm:card-hover relative flex w-full flex-col gap-4 rounded-2xl bg-neutral-white p-4 sm:gap-6 sm:p-6">
        <FavoriteButton jobId={job.id} favorited={job.favorited} className="absolute right-6 top-6 hidden sm:block" />
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image src={job.companyLogo} alt={job.companyName} fill className="rounded-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="line-clamp-1 text-lg font-bold">{job.name}</h3>
            <span
              className="line-clamp-1 self-start text-base text-neutral-rich-gray hover:underline"
              data-prevent-nprogress={true}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(job.website, '_blank');
              }}
            >
              {job.companyName}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {job.tags.map((tag) => (
            <Badge key={tag} size="large">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex items-center gap-4 sm:gap-8">
            {job.minSalary && job.maxSalary ? <span>{formatSalary(job)}</span> : null}
            <div className="flex items-center gap-2">
              <Clock4Icon className="h-5 w-5" />
              <span>{workTypes.find((type) => type.id === job.workType)?.label ?? capitalize(job.workType)}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 sm:ml-8 sm:mt-0">
            <MapPinIcon className="h-5 w-5" />
            <span className="line-clamp-1 max-w-[300px]">{formatLocation(job)}</span>
          </div>
          <div className="mt-6 flex items-center justify-end gap-4 sm:ml-auto sm:mt-0">
            <time dateTime={job.createdAt} className="text-neutral-medium-gray">
              {moment(job.createdAt).fromNow()}
            </time>
            <ApplyJob contact={job.contact} />
          </div>
        </div>
        <FavoriteButton jobId={job.id} favorited={job.favorited} className="absolute bottom-7 left-4 sm:hidden" />
      </div>
    </Link>
  );
}
