import { BackLink } from '@/components/hackathon/back-link';
import { ParticipatedContent } from './components/content';

export default function Page() {
  return (
    <div className="mx-auto max-w-[952px] pb-12 pt-5">
      <BackLink href="/hackathon/dashboard" />
      <ParticipatedContent />
    </div>
  );
}
