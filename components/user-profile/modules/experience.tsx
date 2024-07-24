'use client';

import { useMediaQuery } from '@/hooks/dom/use-media-query';
import { calculateWorkExperience, convertMonthYear } from '../utils';
import { EditExperience } from '../modals/edit-experience';
import { useProfile } from './profile-provider';
import { AddAttestation } from '../modals/add-attestation';
import { EMPLOYMENT_TYPE } from '../constants';

export function Experience() {
  const { profile } = useProfile();
  const isLargeScreen = useMediaQuery('(min-width: 640px)');
  return (
    <div className="mt-2 flex flex-col bg-neutral-white px-5 py-4 sm:mt-12 sm:p-0">
      <div className="flex items-center justify-between">
        <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Experience</h2>
        {profile?.isMe && profile?.workExperiences.length > 0 && <EditExperience type="create" />}
      </div>
      {profile?.workExperiences?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          <p className="text-neutral-medium-gray">Share your work experience with others</p>
          <EditExperience type="create" iconOnly={false} />
        </div>
      )}
      {profile?.workExperiences?.map((experience) => (
        <div
          key={experience.id}
          className="flex items-center justify-between gap-6 border-b border-b-neutral-light-gray py-5 last:border-b-0 sm:py-8"
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-col text-base text-neutral-off-black sm:flex-row sm:items-center sm:gap-2">
              <span className="whitespace-nowrap font-bold">{experience.title}</span>
              <span className="hidden sm:block">·</span>
              <div className="text-sm sm:text-base">
                <span className="whitespace-nowrap">{experience.companyName}</span>
                <span>·</span>
                <span className="whitespace-nowrap">
                  {EMPLOYMENT_TYPE.find((type) => type.value === experience.employmentType)?.label || ''}
                </span>
              </div>
              {profile?.isMe && isLargeScreen && <AddAttestation />}
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-medium-gray sm:text-base">
              <span>
                {convertMonthYear(experience.startDate)} -{' '}
                {experience.endDate ? convertMonthYear(experience.endDate) : 'Present'}
              </span>
              <span>·</span>
              <span>{calculateWorkExperience(experience.startDate, experience.endDate)}</span>
            </div>
            <p className="text-sm text-neutral-medium-gray sm:text-base">{experience.location}</p>
            <p className="line-clamp-5 text-sm text-neutral-off-black sm:text-base">{experience.description}</p>
            {!isLargeScreen && <AddAttestation />}
          </div>
          {profile?.isMe && <EditExperience type="edit" initialValues={experience} />}
        </div>
      ))}
    </div>
  );
}
