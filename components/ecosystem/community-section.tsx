import Button from '@/components/Common/Button';
import { SectionHeader } from './section-header';

export function CommunitySection() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between p-3">
        <SectionHeader title="Follow Solana Twitter" tag="Community" points={5} completed={false} />
        <Button size="small" ghost className="text-xs uppercase sm:w-36">
          Go now
        </Button>
      </div>
      <div className="flex items-center justify-between p-3">
        <SectionHeader title="Join Solana Discord Community" tag="Community" points={5} completed={false} />
        <Button size="small" ghost className="text-xs uppercase sm:w-36">
          Go now
        </Button>
      </div>
      <div className="flex items-center justify-between p-3">
        <SectionHeader title="Check out Glossary" tag="Community" points={5} completed={false} />
        <Button size="small" ghost className="text-xs uppercase sm:w-36">
          Go now
        </Button>
      </div>
      <div className="flex items-center justify-between p-3">
        <SectionHeader title="Check out Blog" tag="Community" points={5} completed={false} />
        <Button size="small" ghost className="text-xs uppercase sm:w-36">
          Go now
        </Button>
      </div>
      <div className="flex items-center justify-between p-3">
        <SectionHeader title="Join & Submit one Hackathon" tag="Community" points={200} completed={false} />
        <Button size="small" ghost className="text-xs uppercase sm:w-36">
          Go now
        </Button>
      </div>
      <div className="flex items-center justify-between p-3">
        <SectionHeader title="Participate in bounty" tag="Community" points={200} completed={false} />
        <Button size="small" ghost className="text-xs uppercase sm:w-36">
          Go now
        </Button>
      </div>
    </div>
  );
}
