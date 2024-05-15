import { MoveLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { ParticipatedContent } from './components/content';

export default function Page() {
  return (
    <div className="w-full p-5">
      <Link href="/hackathon/dashboard" className="inline-flex">
        <div className="inline-flex items-center gap-2">
          <MoveLeftIcon size={20} />
          <span className="text-sm capitalize text-neutral-off-black">Back to your hackathon</span>
        </div>
      </Link>
      <div className="mt-6">
        <h1 className="font-next-book-bold text-lg font-bold text-neutral-black">Participated Hackathon</h1>
        <ParticipatedContent />
      </div>
    </div>
  );
}
