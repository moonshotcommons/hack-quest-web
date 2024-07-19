import { EditHackathon } from '../modals/edit-hackathon';
import { useProfile } from './profile-provider';

export function Hackathon() {
  const { profile } = useProfile();
  return (
    <div className="mt-2 flex flex-col gap-5 bg-neutral-white px-5 py-4 sm:mb-20 sm:mt-12 sm:gap-8 sm:p-0">
      <div className="flex items-center justify-between">
        <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Hackathon</h2>
        {profile?.isMe && <EditHackathon type="create" />}
      </div>
    </div>
  );
}
