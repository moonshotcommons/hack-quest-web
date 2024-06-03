import Link from 'next/link';
import { IdeaDetailCard } from './idea-detail-card';

export default function Page({ params }: { params: { ideaId: string } }) {
  return (
    <div className="container mx-auto p-5 sm:px-0 sm:pb-10 sm:pt-5">
      <nav aria-label="breadcrumb">
        <ol className="body-s flex items-center gap-2 text-neutral-off-black">
          <li>
            <Link href="/idea-bank">Idea Bank</Link>
          </li>
          <li>/</li>
          <li className="underline">Lorem ipsum dolor sit amet</li>
        </ol>
      </nav>
      <div className="mt-5 flex flex-col-reverse sm:mt-10 sm:flex-row sm:gap-10">
        <div className="flex-1">hello</div>
        <IdeaDetailCard />
      </div>
    </div>
  );
}
