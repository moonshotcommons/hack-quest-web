import { cn } from '@/helper/utils';
import Image from 'next/image';

export function HackathonStats() {
  const selected = true;
  return (
    <div className="rounded-2xl bg-neutral-white p-6">
      <h1 className="font-next-book-bold text-lg text-neutral-black">Your Hackathon Stats</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Hackathon Registered</p>
          <p className="body-l-bold text-neutral-off-black">0</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Hackathon Submitted</p>
          <p className="body-l-bold text-neutral-off-black">0</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Winner Project</p>
          <p className="body-l-bold text-neutral-off-black">0</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-light text-neutral-rich-gray">Project Voted</p>
          <p className="body-l-bold text-neutral-off-black">0</p>
        </div>
      </div>
      <div className="my-5 h-px w-full bg-neutral-medium-gray" />
      <h1 className="font-next-book-bold text-lg text-neutral-black">Your Voting Role</h1>
      <div className="grid grid-cols-3 gap-3 py-4">
        <button
          className={cn(
            'flex flex-col items-center justify-center rounded-[0.5rem] border border-transparent bg-neutral-light-gray px-2 py-1.5 opacity-30',
            {
              'border-neutral-medium-gray bg-neutral-white opacity-100': selected
            }
          )}
        >
          <Image src="/images/hackathon/voting_role_user.svg" width={32} height={32} alt="voting role user" />
          <h3 className="body-s mt-1 text-neutral-black">User</h3>
          <span className="text-xs font-light text-neutral-rich-gray">50 Votes</span>
        </button>
        <button
          className={cn(
            'flex flex-col items-center justify-center rounded-[0.5rem] border border-transparent bg-neutral-light-gray px-2 py-1.5 opacity-30',
            {
              'border-neutral-medium-gray bg-neutral-white opacity-100': false
            }
          )}
        >
          <Image src="/images/hackathon/voting_role_advocate.svg" width={32} height={32} alt="voting role advocate" />
          <h3 className="body-s mt-1 text-neutral-black">Advocate</h3>
          <span className="text-xs font-light text-neutral-rich-gray">100 Votes</span>
        </button>
        <button
          className={cn(
            'flex flex-col items-center justify-center rounded-[0.5rem] border border-transparent bg-neutral-light-gray px-2 py-1.5 opacity-30',
            {
              'border-neutral-medium-gray bg-neutral-white opacity-100': false
            }
          )}
        >
          <Image src="/images/hackathon/voting_role_judge.svg" width={32} height={32} alt="voting role judge" />
          <h3 className="body-s mt-1 text-neutral-black">Judge</h3>
          <span className="text-xs font-light text-neutral-rich-gray">300 Votes</span>
        </button>
      </div>
      <p className="body-xs text-neutral-medium-gray">
        *The number of votes you get everyday is determined by your current role, current HackQuest level, and your
        registration time.
      </p>
    </div>
  );
}
