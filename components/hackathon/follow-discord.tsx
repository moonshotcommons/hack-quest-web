import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Common/Button';
import { HACKQUEST_DISCORD } from '@/constants/links';

export function FollowDiscord() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-neutral-white p-4">
      <Image src="/images/hackathon/follow_discord.svg" width={64} height={64} alt="Follow Discord" />
      <p className="body-m-bold text-neutral-off-black">Follow HackQuest Discord to find your dream team!</p>
      <Link href={HACKQUEST_DISCORD} target="_blank" rel="noreferrer">
        <Button size="small" type="primary" className="uppercase">
          Join discord
        </Button>
      </Link>
    </div>
  );
}
