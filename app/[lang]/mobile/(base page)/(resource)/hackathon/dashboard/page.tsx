import Image from 'next/image';
import Link from 'next/link';
import { HackathonContent } from './components/hackathon-content';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { HackathonStats } from '@/components/hackathon/hackathon-stats';
import { VotingRole } from '@/components/hackathon/voting-role';

export const QUICK_LINKS = [
  {
    title: 'Explore Hackathons',
    url: '/hackathon',
    icon: 'dashboard_explore',
    size: {
      width: 26,
      height: 32
    }
  },
  {
    title: 'Project Archive',
    url: '/hackathon/projects',
    icon: 'dashboard_project',
    size: {
      width: 32,
      height: 32
    }
  },
  {
    title: 'Hackathon Voting',
    url: '/hackathon/voting',
    icon: 'dashboard_voting',
    size: {
      width: 26,
      height: 32
    }
  }
];

export default function HackathonDashboard() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col">
        <div className="flex justify-end py-2.5 pl-1 pr-5">
          <Image
            src="/images/hackathon/hackathon_dashboard_cover.png"
            width={125}
            height={100}
            alt="Your Hackathons Cover"
            priority
          />
        </div>
        <div className="px-5">
          <h1 className="flex items-center gap-2 font-next-book-bold text-[1.375rem] font-bold text-neutral-off-black">
            <Image src="/images/hackathon/hackathon_dashboard_logo.png" width={32} height={32} alt="Your Hackathons" />
            <span>Your Hackathons</span>
          </h1>
          <p className="body-x mt-4 text-neutral-rich-gray">
            Welcome to your hackathon dashboard! Manage projects, invite teammates, and track your hackathon journey
            with ease—all in one place.
          </p>
          <div className="mt-5">
            <h2 className="body-m-bold text-neutral-off-black">Quick Links:</h2>
            <div className="mt-3 grid grid-cols-1 gap-4">
              {QUICK_LINKS.map((v, i) => (
                <Link href={v.url} key={i}>
                  <div className="flex items-center rounded-2xl bg-neutral-white px-[3.75rem] py-4 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]">
                    <div className="h-8 w-8">
                      <Image
                        src={`/images/hackathon/${v.icon}.png`}
                        width={v.size.width}
                        height={v.size.height}
                        alt={v.title}
                      />
                    </div>
                    <h3 className="body-m flex-1 whitespace-nowrap text-center text-neutral-black">{v.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <HackathonContent />
      </div>
      <div className="flex flex-col gap-8 px-5 py-8">
        <div className="rounded-2xl bg-neutral-white p-4">
          <HackathonStats />
          <div className="my-5 h-px w-full bg-neutral-medium-gray" />
          <VotingRole role="user" votes={{ user: 50, advocate: 100, judge: 200 }} />
        </div>
        <FollowDiscord />
      </div>
    </div>
  );
}
