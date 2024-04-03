import { Metadata } from 'next';
import Glossary from '..';

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

  const lang = params.lang;

  const metadata: Metadata = {
    title: 'HackQuest Glossary',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/glossary${pathname}${query}`
    }
  };

  return metadata;
}

export default Glossary;
