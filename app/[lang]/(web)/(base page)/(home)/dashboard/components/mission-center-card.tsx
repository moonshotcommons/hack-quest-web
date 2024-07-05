import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon, MoveRightIcon } from 'lucide-react';

const days = [
  { day: 'M', status: 'completed' },
  { day: 'T', status: 'completed' },
  { day: 'W', status: 'reward' },
  { day: 'T', status: 'pending' },
  { day: 'F', status: 'pending' },
  { day: 'S', status: 'pending' },
  { day: 'S', status: 'pending' }
];

export function MissionCenterCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-neutral-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/images/ecosystem/fire.svg" width={36} height={36} alt="fire" />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-neutral-black">10</h2>
            <p className="text-sm text-neutral-medium-gray">Day Streak</p>
          </div>
        </div>
        <button className="text-sm text-neutral-off-black underline outline-none">Missing a streak?</button>
      </div>
      <div className="flex items-center justify-between">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-1">
            {day.status === 'completed' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-status-success text-neutral-white">
                <CheckIcon size={20} />
              </div>
            )}
            {day.status === 'reward' && (
              <button className="flex h-8 w-8 items-center justify-center outline-none">
                <Image src="/images/ecosystem/treasure.png" width={32} height={25.6} alt="treasure" />
              </button>
            )}
            {day.status === 'pending' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-light-gray bg-neutral-white"></div>
            )}
            <span className="text-xs text-neutral-medium-gray">{day.day}</span>
          </div>
        ))}
      </div>
      <Link href="/mission-center">
        <div className="inline-flex items-center gap-2">
          <span className="text-xs font-medium uppercase text-neutral-off-black">Rewards</span>
          <MoveRightIcon size={16} />
        </div>
      </Link>
    </div>
  );
}
