import { BackLink } from '@/components/hackathon/back-link';
import { ParticipatedContent } from './components/content';

export default function Page() {
  return (
    <div className="w-full p-5">
      <BackLink href="/hackathon/dashboard" />
      <ParticipatedContent />
    </div>
  );
}
