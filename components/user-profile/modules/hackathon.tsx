import { useMediaQuery } from '@/hooks/dom/use-media-query';
import { EditHackathon } from '../modals/edit-hackathon';
import { useProfile } from './profile-provider';
import { AddAttestation } from '../modals/add-attestation';
import { Attestations } from '../common/attestations';

export function Hackathon() {
  const { profile } = useProfile();
  const isLargeScreen = useMediaQuery('(min-width: 640px)');
  return (
    <div className="mt-2 flex flex-col gap-5 bg-neutral-white px-5 py-4 sm:mt-12 sm:gap-8 sm:p-0">
      <div className="flex items-center justify-between">
        <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Hackathon</h2>
        {profile?.isCurrentUser && profile?.hackathonExperiences.length > 0 && <EditHackathon type="create" />}
      </div>
      {profile?.hackathonExperiences?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          <p className="text-neutral-medium-gray">Share your hackathon experience with others</p>
          <EditHackathon type="create" iconOnly={false} />
        </div>
      )}
      {profile?.hackathonExperiences?.map((hackathon) => (
        <div
          key={hackathon.id}
          className="flex items-center justify-between gap-6 border-b border-b-neutral-light-gray pb-5 last:border-b-0 sm:pb-8"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-base text-neutral-off-black">
                <span className="whitespace-nowrap font-bold">{hackathon.projectTitle}</span>
                {hackathon.winner && (
                  <span className="rounded-[8px] bg-neutral-light-gray px-3.5 py-[3px] text-xs font-bold">WINNER</span>
                )}
                {!profile?.isCurrentUser && isLargeScreen && (
                  <AddAttestation type="Hackathon" sourceId={hackathon.id} />
                )}
              </div>
              <p className="text-sm text-neutral-medium-gray sm:text-base">{hackathon.hackathonName}</p>
              <p className="line-clamp-5 text-sm text-neutral-off-black sm:text-base">{hackathon.description}</p>
            </div>
            {!isLargeScreen && <AddAttestation type="Hackathon" sourceId={hackathon.id} />}
            <Attestations attestations={hackathon.attestations} />
          </div>
          {profile?.isCurrentUser && <EditHackathon type="edit" initialValues={hackathon} />}
        </div>
      ))}
    </div>
  );
}
