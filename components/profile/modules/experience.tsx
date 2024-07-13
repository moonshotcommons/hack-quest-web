'use client';

import { calculateWorkExperience, convertMonthYear, useProfile } from '../utils';
import { EditExperience } from '../modals/edit-experience';

export function Experience() {
  const { loading, data } = useProfile();
  return (
    <div className="mt-2 flex flex-col bg-neutral-white px-5 py-4 sm:mt-12 sm:p-0">
      <div className="flex items-center justify-between">
        <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Experience</h2>
        <EditExperience type="add" />
      </div>
      {data?.workExperiences?.map((experience) => (
        <div
          key={experience.id}
          className="flex items-center justify-between gap-6 border-b border-b-neutral-light-gray py-8 last:border-b-0"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-neutral-off-black">
              <span className="font-bold">{experience.title}</span>
              <span>·</span>
              <span>{experience.companyName}</span>
              <span>·</span>
              <span>{experience.employmentType}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-medium-gray">
              <span>
                {convertMonthYear(experience.startDate)} -{' '}
                {experience.endDate ? convertMonthYear(experience.endDate) : 'Present'}
              </span>
              <span>·</span>
              <span>{calculateWorkExperience(experience.startDate, experience.endDate)}</span>
            </div>
            <p className="text-neutral-medium-gray">{experience.location}</p>
            <p className="line-clamp-5 text-neutral-off-black">{experience.description}</p>
          </div>
          <EditExperience type="edit" preset={experience} />
        </div>
      ))}
    </div>
  );
}
