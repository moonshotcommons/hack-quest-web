import { Metadata } from 'next';
import { Lang } from '@/i18n/config';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import Button from '@/components/Common/Button';
import { EcosystemCard } from './ecosystem-card copy';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'Dashboard',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/dashboard`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/dashboard`,
        en: `https://www.hackquest.io/${Lang.EN}/dashboard`,
        zh: `https://www.hackquest.io/${Lang.ZH}/dashboard`
      }
    }
  };
}

const ecosystems = [
  { id: 1, name: 'solana', description: 'Solana is the fastest Layer1 blockchain using Proof of History' },
  { id: 2, name: 'ethereum', description: 'Ethereum is the fastest Layer1 blockchain using Proof of History' },
  { id: 3, name: 'mantle', description: 'Mantle is the fastest Layer1 blockchain using Proof of History' },
  { id: 4, name: 'arbitrum', description: 'Arbitrum is the fastest Layer1 blockchain using Proof of History' }
];

export default function Page() {
  return (
    <>
      <div className="mt-8 flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h2 className="text-base font-bold text-neutral-off-black sm:text-lg">
            You’re not enrolled in any learning track
          </h2>
          <Button size="small" ghost className="text-xs uppercase">
            Explore ecosystems
          </Button>
        </div>
        <div className="flex flex-col gap-5 px-5 pb-6 sm:gap-8 sm:px-0 sm:pb-0">
          <h2 className="font-next-book-bold text-lg font-bold text-neutral-black">Explore Certified Learning Track</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ecosystems.map((ecosystem) => (
              <EcosystemCard
                key={ecosystem.id}
                title={`Certified ${ecosystem.name} Developer`}
                name={ecosystem.name}
                description={ecosystem.description}
                href={`/hackathon/explore/${ecosystem.name}`}
                tags={['Rust', 'Certified Learning Track', '15 Projects']}
              />
            ))}
          </div>
        </div>
      </div>
      <PageRetentionTime trackName="dashboard-页面留存时间" />
    </>
  );
}
