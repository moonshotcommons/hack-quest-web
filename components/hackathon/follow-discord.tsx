import Button from '@/components/Common/Button';
import Image from 'next/image';

export function FollowDiscord() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-neutral-white p-4">
      <Image src="/images/hackathon/follow_discord.svg" width={64} height={64} alt="Follow Discord" />
      <p className="body-m-bold text-neutral-off-black">Follow HackQuest Discord to find your dream team!</p>
      <Button size="small" type="primary" className="uppercase">
        Join discord
      </Button>
    </div>
  );
}
