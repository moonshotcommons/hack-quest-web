import { MoveLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { ParticipatedContent } from './components/content';

export default function Page() {
  return (
    <div className="mx-auto max-w-[952px] pb-12 pt-5">
      <Link href="/hackathon/dashboard">
        <div className="inline-flex items-center gap-2">
          <MoveLeftIcon size={20} />
          <span className="text-lg capitalize text-neutral-off-black">Back to your hackathon</span>
        </div>
      </Link>
      <div className="mt-8">
        <h1 className="font-next-book-bold text-[1.75rem] font-bold text-neutral-black">Participated Hackathon</h1>
        <ParticipatedContent />
      </div>
    </div>
  );
}
