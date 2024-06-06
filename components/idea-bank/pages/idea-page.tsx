import Link from 'next/link';
import { Lang, TransNs } from '@/i18n/config';
import { IdeaDetailCard } from './idea-detail-card';
import { getIdeaCached } from '@/service/cach/ideas';
import { IdeaContent } from './idea-content';
import { useTranslation } from '@/i18n/server';

type PageProps = {
  params: {
    lang: Lang;
    ideaId: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { lang, ideaId } = params;
  const { t } = await useTranslation(lang, TransNs.IDEA_BANK);
  const idea = await getIdeaCached(ideaId);

  return (
    <div className="container mx-auto px-5 pb-10 pt-5 sm:px-0 sm:pb-10 sm:pt-5">
      <nav aria-label="breadcrumb">
        <ol className="body-s flex items-center gap-2 text-neutral-off-black">
          <li>
            <Link href="/idea-bank">{t('title')}</Link>
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
