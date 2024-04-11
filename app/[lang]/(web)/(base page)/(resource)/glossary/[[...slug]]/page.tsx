import { Metadata } from 'next';
import Glossary from '..';
import { Lang } from '@/i18n/config';

interface SearchParamsType {
  searchParams: {};
  params: {
    slug?: string[];
    lang: string;
  };
}

export async function generateMetadata({ params, searchParams }: SearchParamsType): Promise<Metadata> {
  let pathname = `${params.slug?.join('/') ?? ''}` || '';
  pathname = pathname ? '/' + pathname : '';

  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';

  const { lang } = params;

  const metadata: Metadata = {
    title: 'HackQuest Glossary',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/glossary${pathname}${query}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/glossary${pathname}${query}`,
        en: `https://www.hackquest.io/${Lang.EN}/glossary${pathname}${query}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/glossary${pathname}${query}`
      }
    }
  };

  return metadata;
}

export default Glossary;
