import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const JOB_TYPES = [
  {
    id: 'full-time',
    name: 'Full-time'
  },
  {
    id: 'part-time',
    name: 'Part-time'
  },
  {
    id: 'internship',
    name: 'Internship'
  }
];

const JOB_LOCATIONS = [
  {
    id: 'remote',
    name: 'Remote'
  },
  {
    id: 'on-site',
    name: 'On-site'
  }
];

function JobType() {
  return (
    <div className="flex flex-col space-y-4">
      {JOB_TYPES.map((jobType) => (
        <div className="flex items-center space-x-2.5" key={jobType.id}>
          <Checkbox size="large" id={jobType.id} />
          <label
            htmlFor={jobType.id}
            className="text-sm leading-none text-neutral-medium-gray peer-aria-checked:text-neutral-black"
          >
            {jobType.name}
          </label>
        </div>
      ))}
    </div>
  );
}

function JobLocation() {
  return (
    <div className="flex flex-col space-y-4">
      {JOB_LOCATIONS.map((jobLocation) => (
        <div className="flex items-center space-x-2.5" key={jobLocation.id}>
          <Checkbox size="large" id={jobLocation.id} />
          <label
            htmlFor={jobLocation.id}
            className="text-sm leading-none text-neutral-medium-gray peer-aria-checked:text-neutral-black"
          >
            {jobLocation.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export function JobFilter() {
  return (
    <div className="hidden w-full self-start rounded-2xl bg-neutral-white sm:block sm:p-6">
      <h2 className="mb-4 font-next-book-bold text-lg font-bold">Job Type</h2>
      <JobType />
      <h2 className="mb-4 mt-12 font-next-book-bold text-lg font-bold">Job Location</h2>
      <JobLocation />
    </div>
  );
}
