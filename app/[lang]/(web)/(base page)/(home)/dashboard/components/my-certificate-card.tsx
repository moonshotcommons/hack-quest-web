import Link from 'next/link';
import Image from 'next/image';
import { MoveRightIcon } from 'lucide-react';

export function MyCertificateCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-neutral-white p-4">
      <h1 className="font-next-book-bold text-lg font-bold">My Certificate</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 py-2">
          <h4 className="text-xs font-light text-neutral-rich-gray">Courses Completed</h4>
          <h2 className="text-lg font-bold text-neutral-off-black">3</h2>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <h4 className="text-xs font-light text-neutral-rich-gray">Certification Earned</h4>
          <h2 className="text-lg font-bold text-neutral-off-black">3</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="relative h-12 w-full rounded">
          <Image src="/images/ecosystem/solana-certificate.png" alt="solana certificate" fill />
        </div>
        <div className="h-12 w-full rounded border border-dashed border-neutral-medium-gray"></div>
      </div>
      <Link href="/hackathon/explore">
        <div className="inline-flex items-center gap-2">
          <span className="text-xs font-medium uppercase text-neutral-off-black">View certificate</span>
          <MoveRightIcon size={16} />
        </div>
      </Link>
    </div>
  );
}
