import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function toSnakeCase(str?: string) {
  if (!str) return '';
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .toLowerCase();
}

export const allLinks = [
  {
    id: 1,
    title: 'Your Hackathons',
    url: '/hackathon/dashboard'
  },
  {
    id: 2,
    title: 'Explore Hackathons',
    url: '/hackathon/explore'
  },
  {
    id: 3,
    title: 'Project Archive',
    url: '/hackathon/projects'
  },
  {
    id: 4,
    title: 'Hackathon Voting',
    url: '/hackathon/voting'
  }
];

export function PageLayout({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const filteredLinks = allLinks.filter((link) => link.title !== title);

  return (
    <div className="container mx-auto sm:py-12">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="w-full px-5 sm:max-w-[50rem] sm:px-0">
          <h1 className="flex items-center gap-2 font-next-book-bold text-[1.375rem] font-bold text-neutral-off-black sm:gap-3 sm:text-[2.5rem]">
            <div className="relative h-8 w-8 sm:h-12 sm:w-12">
              <Image src={`/images/hackathon/${toSnakeCase(title)}.png`} fill alt={title} />
            </div>
            <span>{title}</span>
          </h1>
          <p className="mt-4 text-sm text-neutral-rich-gray sm:mt-5 sm:text-lg">{description}</p>
          <div className="mt-5 w-full sm:mt-[3.75rem]">
            <h2 className="sm:body-lg text-base font-bold text-neutral-off-black">Quick Links:</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {filteredLinks.map((link) => (
                <Link href={link.url} key={link.id}>
                  <div className="flex items-center rounded-2xl bg-neutral-white px-[3.75rem] py-4 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)] sm:gap-2 sm:px-5 sm:py-5">
                    <div
                      data-id={link.id}
                      className="relative h-8 w-[1.625rem] data-[id='1']:w-8 data-[id='3']:w-8 sm:h-12 sm:w-10 sm:data-[id='1']:w-12 sm:data-[id='3']:w-12"
                    >
                      <Image src={`/images/hackathon/${toSnakeCase(link.title)}.png`} fill alt={link.title} />
                    </div>
                    <h3 className="flex-1 whitespace-nowrap text-center text-base text-neutral-black sm:text-lg">
                      {link.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="self-end py-2.5 pl-1 pr-5">
          <div className="relative h-[6.25rem] w-[7.8125rem] sm:h-[20.75rem] sm:w-[26rem]">
            <Image src={`/images/hackathon/${toSnakeCase(title)}_cover.png`} fill alt={title} priority />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
