import Link from 'next/link';
import { IdeaDetailCard } from './idea-detail-card';
import { getIdeaCached } from '@/service/cach/ideas';
import { IdeaContent } from './idea-content';

export default async function Page({ params }: { params: { ideaId: string } }) {
  const { ideaId } = params;
  const idea = await getIdeaCached(ideaId);
  console.log(idea);
  return (
    <div className="container mx-auto px-5 pb-10 pt-5 sm:px-0 sm:pb-10 sm:pt-5">
      <nav aria-label="breadcrumb">
        <ol className="body-s flex items-center gap-2 text-neutral-off-black">
          <li>
            <Link href="/idea-bank">Idea Bank</Link>
          </li>
          <li>/</li>
          <li className="underline">{idea.name}</li>
        </ol>
      </nav>
      <div className="mt-5 flex flex-col-reverse sm:mt-10 sm:flex-row sm:gap-10">
        <IdeaContent {...idea} />
        <IdeaDetailCard {...idea} />
      </div>
    </div>
  );
}
