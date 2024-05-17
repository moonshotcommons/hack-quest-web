import { BackLink } from '@/components/hackathon/back-link';
import { VotingContent } from './components/voting-content';

export default function Page() {
  return (
    <div className="w-full p-5">
      <BackLink href={{ pathname: '/hackathon/dashboard', query: { type: 'voting' } }} />
      <VotingContent />
    </div>
  );
}
