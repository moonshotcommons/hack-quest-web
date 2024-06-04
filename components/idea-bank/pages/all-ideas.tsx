import * as React from 'react';
import { IdeaCard } from './idea-card';
import { FilterPanel } from '../filters';
import { Pagination } from './pagination';

export function AllIdeas() {
  return (
    <div className="px-5 sm:px-0">
      <h1 className="sm:headline-h3 headline-h2-mob">All Ideas</h1>
      <FilterPanel />
      <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5 sm:mt-0 sm:grid-cols-4 sm:pt-8">
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
      </div>
      <Pagination />
    </div>
  );
}