import { getTopIdeasCached } from '@/service/cach/ideas';
import { PageLayoutHeader } from './page-layout-header';
import { WebTopRatedIdeas, MobileTopRatedIdeas } from './top-rated-ideas';
import { AllIdeas } from './all-ideas';

export default async function Page() {
  const topIdeas = await getTopIdeasCached();
  return (
    <div className="container mx-auto pt-5 sm:pt-8">
      <PageLayoutHeader />
      <WebTopRatedIdeas ideas={topIdeas} />
      <MobileTopRatedIdeas />
      <AllIdeas />
    </div>
  );
}
