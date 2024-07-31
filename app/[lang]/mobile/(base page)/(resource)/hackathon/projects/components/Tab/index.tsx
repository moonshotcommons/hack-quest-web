'use client';

import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';

const tabs = [
  {
    name: 'project',
    label: 'View by Project'
  },
  {
    name: 'hackathon',
    label: 'View by Hackathon'
  }
] as const;

export function Tab({ currentTab }: { currentTab: string }) {
  function getUrl(tab: string) {
    return tab === 'project' ? `${MenuLink.PROJECTS}` : `${MenuLink.PROJECTS}?view=${tab}`;
  }

  return (
    <div className="w-full">
      <SlideHighlight
        className="my-5 flex gap-8 pb-0.5"
        type="LEARNING_TRACK"
        currentIndex={tabs.findIndex((tab) => tab.name === currentTab)}
      >
        {tabs.map((tab) => (
          <Link key={tab.name} href={getUrl(tab.name)} scroll={false}>
            <div className={`body-l cursor-pointer text-neutral-off-black ${currentTab === tab.name && 'body-l-bold'}`}>
              {tab.label}
            </div>
          </Link>
        ))}
      </SlideHighlight>
    </div>
  );
}
