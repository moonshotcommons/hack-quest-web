import { EditHackathonModal } from '../modals/edit-hackathon-modal';

export function Hackathon() {
  return (
    <div className="mt-2 flex flex-col gap-5 bg-neutral-white px-5 py-4 sm:mt-12 sm:gap-8 sm:p-0">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Hackathon</h2>
      <EditHackathonModal open={false} onClose={() => {}} />
    </div>
  );
}
