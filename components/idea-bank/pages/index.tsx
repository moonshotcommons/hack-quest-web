import { IdeaCard } from './idea-card';
import { PageLayoutHeader } from './page-layout-header';
import { FilterPanel } from '../filters';
import { WebTopRatedIdeas, MobileTopRatedIdeas } from './top-rated-ideas';

export default async function Page() {
  return (
    <div className="container mx-auto pt-5 sm:pt-8">
      <PageLayoutHeader />
      <WebTopRatedIdeas />
      <MobileTopRatedIdeas />
      <AllIdeas />
    </div>
  );
}

function AllIdeas() {
  return (
    <div className="px-5 sm:px-0">
      <h1 className="sm:headline-h3 headline-h2-mob">All Ideas</h1>
      <FilterPanel />
      <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5 pb-8 sm:mt-0 sm:grid-cols-4 sm:pb-20 sm:pt-8">
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
      </div>
    </div>
  );
}
