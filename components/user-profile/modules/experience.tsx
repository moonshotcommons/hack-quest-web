'use client';

import { calculateWorkExperience, convertMonthYear } from '../utils';
import { EditExperience } from '../modals/edit-experience';
import { useProfile } from './profile-provider';
import { AddAttestation } from '../modals/add-attestation';
import { EMPLOYMENT_TYPE } from '../constants';

export function Experience() {
  const { profile } = useProfile();
  return (
    <div className="mt-2 flex flex-col bg-neutral-white px-5 py-4 sm:mt-12 sm:p-0">
      <div className="flex items-center justify-between">
        <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Experience</h2>
        {profile?.isMe && <EditExperience type="create" />}
      </div>
      {profile?.workExperiences?.map((experience) => (
        <div
          key={experience.id}
          className="flex items-center justify-between gap-6 border-b border-b-neutral-light-gray py-5 last:border-b-0 sm:py-8"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-neutral-off-black">
              <span className="font-bold">{experience.title}</span>
              <span>·</span>
              <span>{experience.companyName}</span>
              <span>·</span>
              <span>{EMPLOYMENT_TYPE.find((type) => type.value === experience.employmentType)?.label || ''}</span>
              {profile?.isMe && <AddAttestation />}
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
          {profile?.isMe && <EditExperience type="edit" initialValues={experience} />}
        </div>
      ))}
    </div>
  );
}
