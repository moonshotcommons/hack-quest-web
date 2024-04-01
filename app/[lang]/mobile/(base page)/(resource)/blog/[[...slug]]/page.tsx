import { Metadata } from 'next';
import Blog from '../components';

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
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/blog${pathname}${query}`
    }
  };

  return metadata;
}

export default Blog;
