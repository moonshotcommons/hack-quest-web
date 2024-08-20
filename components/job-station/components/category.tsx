'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { categories } from '../validations';
import { createUrl } from '@/helper/utils';

export function Category() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams.toString());

  function onClick(value: string) {
    if (value) {
      currentParams.set('keyword', value);
      const url = createUrl(pathname, currentParams);
      router.replace(url, { scroll: false });
    }
  }

  return (
    <section className="hidden flex-wrap gap-4 sm:flex">
      {categories.map((category) => (
        <button
          key={category.id}
          className="inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-extra-light px-3 py-2 font-bold sm:text-lg"
          onClick={() => onClick(category.id)}
        >
          <category.icon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span>{category.label}</span>
        </button>
      ))}
    </section>
  );
}
