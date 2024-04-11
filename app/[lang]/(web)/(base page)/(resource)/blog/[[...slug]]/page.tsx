import { Metadata } from 'next';
import Blog from '../components';
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
  const lang = params.lang;

  const metadata: Metadata = {
    title: 'HackQuest Blog',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/blog${pathname}${query}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/blog${pathname}${query}`,
        en: `https://www.hackquest.io/${Lang.EN}/blog${pathname}${query}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/blog${pathname}${query}`
      }
    }
  };

  return metadata;
}

export default Blog;
